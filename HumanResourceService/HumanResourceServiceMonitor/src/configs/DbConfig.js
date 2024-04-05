const dbConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "attendance_monitor",
  port: "3306"
};

const mysql = require('mysql2/promise');

async function query(sql, params) {
  const connection = await mysql.createConnection(dbConfig);
  const [results,] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}