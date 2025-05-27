import dotenv from 'dotenv';
dotenv.config();

export default {
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL,
};
