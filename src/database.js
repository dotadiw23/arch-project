const mysql = require('mysql');
require('dotenv').config();

const mysqlPool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

module.exports = mysqlPool;