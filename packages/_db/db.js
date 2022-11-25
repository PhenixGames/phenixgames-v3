const { Sequelize } = require('sequelize');
const { log } = require('../../_assets/functions/log/logs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: (...msg) => {
        if (msg[1].showWarnings) {
            log({ message: msg, type: 'db' });
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    retry: {
        max: 3,
    },
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

(async () => {
    const dir = path.resolve('packages/Models/tables/');
    await database
        .authenticate()
        .then(() => {
            fs.readdirSync(dir).forEach(async (file) => {
                console.log('Loading model: ' + file);
                require(path.join(dir, file));
            });
        })
        .catch((err) => {
            log({
                message: 'There was an error when creating models: ' + err.toString(),
                isFatal: true,
            });
        });
    await database.sync({ alter: true });

    const data_mg_path = path.resolve('packages/Models/data_migration/');
    fs.readdirSync(data_mg_path).forEach(async (file) => {
        if (!file.includes('.default')) return;
        console.log('Inserting default data from: ' + file);
        require(path.join(data_mg_path, file));
    });
})();

database.afterSync(async (connection) => {
    log({
        message: `Successfully synced ${connection.name.plural}.`,
        isFatal: false,
    });
});

database.afterDestroy((error) => {
    log({
        message: 'Database connection error! ' + error.toString(),
        isFatal: true,
    });
});

module.exports = database;
