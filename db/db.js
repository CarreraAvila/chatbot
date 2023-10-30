const mysql  = require ('mysql2/promise')



 const pool = mysql.createPool({
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'faztpassword',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3000,
  database: process.env.DB_NAME || 'users'
})



module.exports = pool;