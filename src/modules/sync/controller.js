import { validationResult } from 'express-validator';
import SyncService from './service.js';
import { messages } from '../../constants/messages.js';

export default {
    async createEvent(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const event = await SyncService.recordEvent(req.body);
        res.status(201).json({ message: messages.EVENT_RECORDED, data: event });
    },
    
    async getHistory(req, res) {
        const { id } = req.params;
        const logs = await SyncService.fetchHistory(id);
        res.json({ message: messages.HISTORY_FETCHED, data: logs });
    },
    
    async getRepeatedFailures(_req, res) {
        const devices = await SyncService.findRepeatedFailures();
        res.json({ message: messages.REPEATED_FAILURES, data: devices });
    }
};
