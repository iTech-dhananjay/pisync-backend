import { DataTypes, Model } from 'sequelize';
import sequelize from '../index.js';

export class SyncEvent extends Model {}

SyncEvent.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    device_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    },
    total_files_synced: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    total_errors: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    internet_speed: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'sync_events',
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ['device_id'] },
        { fields: ['timestamp'] }
    ]
});
