const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const database = require('../../../packages/_db/db');
const {
  log
} = require('../log/logs');

class DatabaseBackup {
  detailed = false;
  #tables = [];
  currentDate = {};

  constructor(detailed = false) {

    this.makeBackupPath();

    this.currentDate.day = new Date().getDate();
    this.currentDate.month = new Date().getMonth() + 1;
    this.currentDate.year = new Date().getFullYear();

    this.detailed = detailed;

    if (this.checkLastBackup()) {
      if (this.detailed) {
        this.makeTablePath();
        this.dumbTables();
      } else {
        this.makeDBPath();
        this.dumb();
      }
      this.pushToRepo();
    }
  }

  async getTables() {
    return await database.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = ?`, [process.env.DB_NAME]).then((tables) => {
      this.#tables = tables;
    }).catch(err => {
      return false;
    });
  }

  getStructurePath() {
    return 'phenixgames_dumb_strucutre.sql';
  }

  getDataPath() {
    return 'phenixgames_dumb_data.sql';
  }
  
  makeBackupPath() {
    fs.mkdir('./_backup', (err) => {
      if (err &&  err.errno !== -17) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });
  }

  makeTablePath() {
    fs.mkdir('./_backup/tables', (err) => {
      if (err &&  err.errno !== -17) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });
  }

  makeDBPath() {
    fs.mkdir('./_backup/database', (err) => {
      if (err &&  err.errno !== -17) {
        return console.error(err);
      }
      console.log('Directory created successfully!');
    });
  }


  checkLastBackup() {
    return true;
    const data = fs.readFileSync('./_assets/functions/DatabaseBackup/last_backup.json', 'utf8');

    const lastBackup = JSON.parse(data);

    if (this.currentDate.day > lastBackup.day || this.currentDate.month > lastBackup.month || this.currentDate.year > lastBackup.year) {
      const newDate = {}
      newDate.day = this.currentDate.day;
      newDate.month = this.currentDate.month;
      newDate.year = this.currentDate.year;

      fs.writeFileSync('./_assets/functions/DatabaseBackup/last_backup.json', JSON.stringify(newDate, null, 4))

      return true;
    }

    return false;
  }

  dumb(table = null) {
    cp.exec(`mysqldump -u ${process.env.DB_USER} -p'${process.env.DB_PWD}' ${process.env.DB_NAME} --no-tablespaces --no-data ${(table) ? table : ''} > ./${(table) ? './_backup/tables/'+table+'-' : './_backup/database/'}${this.getStructurePath()}`, (error, stdout, stderr) => {
      if (error !== null) {
        log({
          message: error,
          isFatal: true
        })
      }
    });

    cp.exec(`mysqldump -u ${process.env.DB_USER} -p'${process.env.DB_PWD}' ${process.env.DB_NAME} --no-tablespaces --no-create-info --no-create-db ${(table) ? table : ''} > ./${(table) ? './_backup/tables/'+table+'-' : './_backup/database/'}${this.getDataPath()}`, (error, stdout, stderr) => {
      if (error !== null) {
        log({
          message: error,
          isFatal: true
        })
      }
    });
  }

  async dumbTables() {
    await this.getTables();
    this.#tables.forEach(table => {
      this.dumb(table.table_name);
    });
  }

  pushToRepo() {
    setTimeout(() => {
      cp.exec(` git pull && git add ${this.getDataPath()} && git add ${this.getStructurePath()} && git commit -m "Database backup created due server restart" && git push`, (error, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          log({
            message: error,
            isFatal: true
          })
        }
      });
      console.info(`Database backuped successfully`);
    }, 10000);
    return true;
  }
}

module.exports.DatabaseBackup = DatabaseBackup;