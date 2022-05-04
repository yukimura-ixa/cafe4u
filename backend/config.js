const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',

  // password: '4545', //Nut DB
  // database: 'test', //Nut DB

  //password: 'admin',  //Art DB
  //database: 'cafewebpro', //Art DB

  password: '', //Nook DB
  database: 'test', //Nook DB
  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;