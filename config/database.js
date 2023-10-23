// config/database.js

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'engineer' 
});

db.connect((err) => {
  if (err) {
    console.error('Databese not connected: ' + err.stack);
    return;
  }
  console.log('Connected to database using ID ' + db.threadId);
});

module.exports = db;
