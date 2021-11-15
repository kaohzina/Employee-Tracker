const mysql = require('mysql2');
require('dotenv').config();

greeting = () => {
  console.log(' _____________________');
  console.log('|                     |');
  console.log('|                     |');
  console.log('|  EMPLOYEE  TRACKER  |');
  console.log('|                     |');
  console.log('|_____________________|');
}

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
  }
)

module.exports = db