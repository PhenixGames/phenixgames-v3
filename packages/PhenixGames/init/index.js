const debug = require('../../../_assets/json/debug/debug.json');

const console = require('better-console');
const vehicleAPI = require("../vehicle/")
const playerAPI = require('../playerAPI/');
const weatherAPI = require('../weatherAPI');
const Fuelstations = require('../Fuelstation/');
const { delay } = require('../../../_assets/functions/delay');
const { log } = require('../../../_assets/functions/log/logs');
const {
    spawn
} = require('child_process');
const { DatabaseBackup } = require('../../../_assets/functions/DatabaseBackup/DatabaseBackup');


mp.events.delayInitialization = true;
(async () => {
    if(debug.init){
        await delay(1);
        console.log('[PhenixGames] Initializing... no delay');
    }
    else {
        await delay(15000);
        console.log('[PhenixGames] Initializing... 15 seconds delay');
    }
    
    mp.events.delayInitialization = false;
})();

mp.events.add("playerQuit", (player) => {
    playerAPI.playerOnline = playerAPI.playerOnline - 1;
});

mp.events.add('packagesLoaded', async() =>
{
    await vehicleAPI.spawnAllVehicles();
    weatherAPI.setWeather();
    await Fuelstations.Load_Fuel_stations();

    await delay(15000);

    setInterval(() => {
        console.time('Vehicle Server wurde gesynct in: ');
        vehicleAPI.syncAllVehciles();
        console.timeEnd('Vehicle Server wurde gesynct in: ');
        console.time('Player Server wurde gesynct in: ');
        playerAPI.syncAllPlayers();
        console.timeEnd('Player Server wurde gesynct in: ');
        
    }, 5000);

    if(debug.createBackup){
        new DatabaseBackup();
    }

    setInterval(() => {
        weatherAPI.setWeather();
    }, 10800000); // 3h
});


//! ERROR --
process.on('unhandledRejection', err => {
    log({
        message: err,
        isFatal: true
    });
    if(!debug.global && process.platform !== 'win32') {
        log({
            message: 'BOT RESTARTED...'  + new Date(),
            isFatal: false
        });
        spawn(process.argv[1], process.argv.slice(2), {
            detached: true,
            stdio: ['ignore', null, null]
        }).unref()
        process.exit()
    }
});

process.on('uncaughtException', err => {
    log({
        message: err,
        isFatal: true
    });
    if(!debug.global && process.platform !== 'win32') {
        log({
            message: 'BOT RESTARTED...'  + new Date(),
            isFatal: false
        });
        spawn(process.argv[1], process.argv.slice(2), {
            detached: true,
            stdio: ['ignore', null, null]
        }).unref()
        process.exit()
    }
});