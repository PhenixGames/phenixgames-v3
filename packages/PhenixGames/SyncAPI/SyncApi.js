const debug = require('../../../_assets/json/debug/debug.json').sync;
const AccountAPI = require('../account/AcountAPI');
const VehicleAPI = require('../vehicle/VehicleApi');
const { setWeather } = require('../weatherAPI');


class SyncApi {

    defaultTick = 5000;

    constructor() {}

    sync() {
        setInterval(() => {
            console.time('Vehicle Server wurde gesynct in: ');
            VehicleAPI.syncAll();
            console.timeEnd('Vehicle Server wurde gesynct in: ');
            console.time('Player Server wurde gesynct in: ');
            AccountAPI.syncAllPlayers();
            console.timeEnd('Player Server wurde gesynct in: ');
        }, 5000);
    }

    syncWeather() {
        setInterval(() => {
            setWeather();
        }, 10800000); // 3h
    }

}

module.exports.SyncApi = new SyncApi();
