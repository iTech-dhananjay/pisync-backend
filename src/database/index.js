import { Sequelize } from 'sequelize';
import config from '../config/index.js';
const sequelize = new Sequelize(config.dbUrl, {
    logging: false,
    pool: { max: 20, min: 0, acquire: 30000, idle: 10000 },
});
export default sequelize;
