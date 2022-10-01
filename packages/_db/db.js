const mysql = require('mysql');
const { log } = require('../../_assets/functions/log/logs');

class Database {
  constructor() {
    console.log(process.env)
    this.connection = mysql.createPool({
      connectionLimit: 100,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      acquireTimeout: 1000000,
      debug: JSON.parse(process.env.DB_DEBUG),
    });

    this.connection.getConnection((err, connection) => {
      if (err) throw err;
      console.log('-------Database connected successfully------');
      connection.release();
    });
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if(err){
          log({
            message: err,
            isFatal: true,
          })
          return reject(err);
        }
        resolve(rows);
      })
    })
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err =>{
        if(err) return reject(err);
        resolve();
      })
    })
  }
}


const database = new Database();
module.exports = database;