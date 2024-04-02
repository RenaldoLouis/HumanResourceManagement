const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config()

const db = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "attendance",
  port: "3306"
};

async function query(sql, params) {
  const connection = await mysql.createConnection(db);
  const [results,] = await connection.execute(sql, params);

  return results;
}

module.exports = query;
