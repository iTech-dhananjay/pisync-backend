// sequelize.config.js
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
console.log(dotenv.config())

const __dirname = path.resolve(); // For absolute resolution

export default {
    development: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        migrationStorageTableName: 'sequelize_meta',
        migrationStorage: 'sequelize',
        define: {
            underscored: true
        },
        migrations: {
            // THIS is what CLI expects:
            path: path.join(__dirname, 'src/database/migrations')
        }
    }
};
