const console = require('better-console');

const database = require("../../_db/db");
const vehicleAPI = require("../vehicle/")
const playerAPI = require('../playerAPI/');
const generellAPI = require('../allgemein/');
const weatherAPI = require('../weatherAPI');
const { delay } = require('../../../_assets/functions/delay');


mp.events.delayInitialization = true;
(async () => {
    await delay(15000);
    mp.events.delayInitialization = false;
})();

mp.events.add("playerQuit", (player) => {
    playerAPI.playerOnline = playerAPI.playerOnline - 1;
});

mp.events.add('packagesLoaded', async() =>
{
    await vehicleAPI.spawnAllVehicles();
    weatherAPI.setWeather();

    await delay(15000);

    setInterval(() => {
        console.time('Vehicle Server wurde gesynct in: ');
        vehicleAPI.syncAllVehciles();
        console.timeEnd('Vehicle Server wurde gesynct in: ');
        console.time('Player Server wurde gesynct in: ');
        playerAPI.syncAllPlayers();
        console.timeEnd('Player Server wurde gesynct in: ');
        
    }, 5000);

    setInterval(() => {
        weatherAPI.setWeather();
    }, 1080000);
});