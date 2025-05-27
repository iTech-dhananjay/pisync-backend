import app from './app.js';
import config from './config/index.js';


// Datebase connection check
import pool from './database/index.js';



app.listen(config.port, () =>
    console.log(`PiSync backend running on port ${config.port}`)
);
