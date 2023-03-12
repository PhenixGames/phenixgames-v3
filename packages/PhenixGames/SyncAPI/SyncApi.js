const debug = require('../../../_assets/json/debug/debug.json').sync;
const AccountAPI = require('../account/AcountAPI');
const { AfkApi } = require('../AfkAPI/AfkApi');
const VehicleApi = require('../vehicle/VehicleApi');
const { setWeather } = require('../weatherAPI');

class SyncApi {
    defaultTick = 5000;
    defaultWeatherTick = 10800000; // 3h

    constructor() {}

    sync() {
        setInterval(() => {
            AfkApi.check();

            console.time('Vehicle Server wurde gesynct in: ');
            new VehicleApi().syncAll();
            console.timeEnd('Vehicle Server wurde gesynct in: ');
            console.time('Player Server wurde gesynct in: ');
            AccountAPI.syncAllPlayers();
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
