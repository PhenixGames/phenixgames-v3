const debug = require('../../../_assets/json/debug/debug.json').sync;
const VehicleAPI = require('../vehicle/VehicleApi');
const { setWeather } = require('../weatherAPI');

class SyncApi {
    defaultTick = 5000;
    defaultWeatherTick = 10800000; // 3h

    constructor() {}

    sync() {
        setInterval(() => {
            global.AccountAPI.check();

            console.time('Vehicle Server wurde gesynct in: ');
            VehicleAPI.syncAll();
            console.timeEnd('Vehicle Server wurde gesynct in: ');
            console.time('Player Server wurde gesynct in: ');
            global.AccountAPI.syncAllPlayers();
            console.timeEnd('Player Server wurde gesynct in: ');
        }, this.defaultTick);
    }

    syncWeather() {
        setInterval(() => {
            setWeather();
        }, this.defaultWeatherTick);
    }
}

module.exports.SyncApi = new SyncApi();
