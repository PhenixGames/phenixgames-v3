const { log } = require('../../../_assets/functions/log/logs');
const pg_server = require('../../Models/tables/pg_server');

module.exports = class ServerApi {
    constructor() {}

    get() {
        return new Promise((resolve, reject) => {
            pg_server
                .findOne({
                    where: {
                        id: 1,
                    },
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    log({
                        message: err,
                        isFatal: true,
                    });
                    return reject(err);
                });
        });
    }

    update(data) {
        return new Promise((resolve, reject) => {
            pg_server
                .update(data, {
                    where: {
                        id: 1,
                    },
                })
                .then(() => {
                    resolve();
                })
                .catch((err) => {
                    log({
                        message: err,
                        isFatal: true,
                    });
                    return reject(err);
                });
        });
    }

    isWartung() {
        return new Promise((resolve, reject) => {
            this.get()
                .then((data) => {
                    resolve({
                        is: data.wartung,
                        reason: data.wartung_reason,
                    });
                })
                .catch((err) => {
                    log({
                        message: err,
                        isFatal: true,
                    });
                    return reject(err);
                });
        });
    }
};
