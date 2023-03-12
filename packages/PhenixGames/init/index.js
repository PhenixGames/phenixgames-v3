const debug = require('../../../_assets/json/debug/debug.json');

const weatherAPI = require('../weatherAPI');
const { delay } = require('../../../_assets/functions/delay');
const { log } = require('../../../_assets/functions/log/logs');
const { spawn } = require('child_process');
const { DatabaseBackup } = require('../../../_assets/functions/DatabaseBackup/DatabaseBackup');
const { FAPI } = require('../Fuelstation/FuelStationApi');
const IplsAPI = require('../ipls');
const { SyncApi } = require('../SyncAPI/SyncApi');
const database = require('../../_db/db');
const VehicleApi = require('../vehicle/VehicleApi');

mp.events.delayInitialization = true;
(async () => {
    if (debug.init) {
        await delay(5000);
        console.log('[PhenixGames] Initializing... 5 seconds delay');
    } else {
        await delay(15000);
        console.log('[PhenixGames] Initializing... 15 seconds delay');
    }

    mp.events.delayInitialization = false;
})();

mp.events.add('packagesLoaded', async () => {
    try {
        await new VehicleApi().spawnAll();
        weatherAPI.setWeather();
        await FAPI.load();
        IplsAPI.load();

        await delay(15000);

        SyncApi.sync();
        SyncApi.syncWeather();

        if (debug.createBackup) {
            new DatabaseBackup();
        }
    } catch (err) {
        log({
            message: err,
            isFatal: true,
        });
    }
});

//! ERROR --
process.on('unhandledRejection', async (err) => {
    log({
        message: err,
        isFatal: true,
    });
    if (!debug.global && process.platform !== 'win32') {
        await database.close();
        log({
            message: 'BOT RESTARTED...' + new Date(),
            isFatal: false,
        });
        spawn(process.argv[1], process.argv.slice(2), {
            detached: true,
            stdio: ['ignore', null, null],
        }).unref();
        process.exit();
    }
});

process.on('uncaughtException', async (err) => {
    log({
        message: err,
        isFatal: true,
    });
    if (!debug.global && process.platform !== 'win32') {
        await database.close();
        log({
            message: 'BOT RESTARTED...' + new Date(),
            isFatal: false,
        });
        spawn(process.argv[1], process.argv.slice(2), {
            detached: true,
            stdio: ['ignore', null, null],
        }).unref();
        process.exit();
    }
});
