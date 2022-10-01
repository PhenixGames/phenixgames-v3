const cp = require('child_process');
const { log } = require('../log/logs');


class DatabaseBackup {
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
        cp.exec(`mysqldump -u ${process.env.DB_USER} -p'${process.env.DB_PWD}' ${process.env.DB_NAME} --no-tablespaces > ${this.getStructurePath()}`, (error, stdout, stderr) => {
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