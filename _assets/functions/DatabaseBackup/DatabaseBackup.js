const cp = require('child_process');
const fs = require('fs')
const { log } = require('../log/logs');


class DatabaseBackup {
    constructor() {
        if(this.checkLastBackup()) {
          this.dumb();
          this.pushToRepo();
        }
    }

    getStructurePath() {
        return './phenixgames_dumb_strucutre.sql';
    }

    getDataPath() {
        return './phenixgames_dumb_data.sql';
    } 

    checkLastBackup() {
      fs.readFile('./_assets/functions/DatabaseBackup/last_backup.json', 'utf8', function (err, data) {
        if(err) log({
          message: err,
          isFatal: true
        })
    
        data = JSON.parse(data)
    
        if (currentDate.day > data.day || currentDate.month > data.month || currentDate.year > data.year) {
          const newDate = {}
          newDate.day = currentDate.day;
          newDate.month = currentDate.month;
          newDate.year = currentDate.year;
          newDate.count = data.count + 1;
    
          fs.writeFileSync('./_assets/functions/DatabaseBackup/last_backup.json', JSON.stringify(newDate, null, 4))

          return true;
        }

        return false;
      });
    }

    dumb() {
        cp.exec(`mysqldump -u ${process.env.DB_USER} -p'${process.env.DB_PWD}' ${process.env.DB_NAME} --no-tablespaces --no-data > ${this.getStructurePath()}`, (error, stdout, stderr) => {
            if (error !== null) {
              log({
                message: error,
                isFatal: true
              })
            }
          });

        cp.exec(`mysqldump -u ${process.env.DB_USER} -p'${process.env.DB_PWD}' ${process.env.DB_NAME} --no-tablespaces --no-create-info --no-create-db > ${this.getDataPath()}`, (error, stdout, stderr) => {
            if (error !== null) {
                log({
                    message: error,
                    isFatal: true
                  })
            }
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