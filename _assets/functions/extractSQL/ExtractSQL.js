const cp = require('child_process');
const dbconfig = require('../../../packages/_db/db_config.json');
const { log } = require('../log/logs');


class ExtractSQL {
    constructor() {
        this.dumb();
        this.pushToRepo();
    }

    getStructurePath() {
        return './phenixgames_dumb_strucutre.sql';
    }

    getDataPath() {
        return './phenixgames_dumb_data.sql';
    } 

    dumb() {
        cp.exec(`mysqldump -u ${dbconfig.backup_user} -p'${dbconfig.backup_password}' ${dbconfig.database} --no-tablespaces > ${this.getStructurePath()}`, (error, stdout, stderr) => {
            if (error !== null) {
              log({
                message: error,
                isFatal: true
              })
            }
          });

        cp.exec(`mysqldump -u ${dbconfig.backup_user} -p'${dbconfig.backup_password}' ${dbconfig.database} --no-tablespaces --no-create-info --no-create-db > ${this.getDataPath()}`, (error, stdout, stderr) => {
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
            cp.exec(` git pull && git add . && git commit -m "Database backup created due server restart" && git push`, (error, stdout, stderr) => {
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

new ExtractSQL();

module.exports.ExtractSQL = new ExtractSQL();