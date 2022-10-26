const { Sequelize } = require('sequelize');
const { log } = require('../../_assets/functions/log/logs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: JSON.parse(process.env.DB_DEBUG),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    retry: {
        max: 3
    },
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

(async () => {
    const dir = path.resolve('packages/Models/tables/');

    await database.authenticate().then(() => {
        fs.readdirSync(dir).forEach(file => {
            console.log('Loading model: ' + file);
            require(path.join(dir, file));
        });
    }).catch(err => {
        log({
            message: 'There was an error when creating models: ' + err.toString(),
            isFatal: true
        });
    });
})();


database.afterSync(async (connection) => {
    log({
        message: "Database connection established and synced successfully.",
        isFatal: false
    });

});

database.afterDestroy((error) => {
    log({
        message: "Database connection error! " + error.toString(),
        isFatal: true
    });
});

module.exports = database;