const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 50,
});

function getConnection(callback) {
  pool.getConnection((error, connection) => {
    if (error) throw error;

    callback(connection);
  });
}

module.exports = getConnection;
