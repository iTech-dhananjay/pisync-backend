import { Op } from 'sequelize';
import { SyncEvent } from '../../database/models/syncEvent.js';

let failureCounts = {}; // in-memory sliding counter for bonus

export default {
    async recordEvent({ device_id, timestamp, total_files_synced, total_errors, internet_speed }) {
        const event = await SyncEvent.create({
            device_id,
            timestamp,
            total_files_synced,
            total_errors,
            internet_speed
        });
        
        // Bonus: console-log if 3 consecutive failures
        if (!failureCounts[device_id]) failureCounts[device_id] = 0;
        if (total_errors > 0) {
            failureCounts[device_id]++;
            if (failureCounts[device_id] >= 3) {
                console.log(`⚠️ Device ${device_id} failed to sync ${failureCounts[device_id]} times in a row.`);
            }
        } else {
            failureCounts[device_id] = 0;
        }
        
        return event;
    },
    
    fetchHistory(deviceId) {
        return SyncEvent.findAll({
            where: { device_id: deviceId },
            order: [['timestamp', 'DESC']],
            limit: 1000
        });
    },
    
    async findRepeatedFailures() {
        // devices with >3 events having total_errors>0 in the last 24h
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const rows = await SyncEvent.findAll({
            attributes: ['device_id',
                [SyncEvent.sequelize.fn('COUNT', '*'), 'fail_count']
            ],
            where: {
                total_errors: { [Op.gt]: 0 },
                timestamp: { [Op.gte]: since }
            },
            group: ['device_id'],
            having: SyncEvent.sequelize.where(
                SyncEvent.sequelize.fn('COUNT', '*'), '>', 3
            )
        });
        return rows.map(r => ({ device_id: r.device_id, failures: r.get('fail_count') }));
    }
};
