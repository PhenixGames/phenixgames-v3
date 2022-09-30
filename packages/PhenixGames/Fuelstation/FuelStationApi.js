const database = require("../../_db/db");

class FuelStationApi {
    constructor() {

    }

    async getFuelStation({stationid}) {
        return await database.query('SELECT * FROM pg_fuelstations WHERE id = ?', [stationid])
        .then(res => {
            return res[0];
        })
        .catch(err => {
            return false;
        })
    }

    async getMarker({stationid}) {
        return await database.query('SELECT * FROM pg_fuelstations_marker WHERE fuelstation_id = ?', [stationid])
        .then(res => {
            return res;
        })
        .catch(err => {
            return false;
        })
    }

    calculatePrice({fueltype, fuelstation}) {
        if (fueltype == "diesel") {
            return fuelstation.fuel_sell_price_d * fuelstation.business_profit_mp;
        }else {
            return fuelstation.fuel_sell_price_b * fuelstation.business_profit_mp;
        }
    }

    spawnMarker({player, pos, size, id}) {
        player.call("Fuelstation:Spawn:Marker", [pos, size, id]);
    }
    
    removeMarkers(player) {
        player.call("Fuelstation:Destroy:Markers");
    }
}

module.exports.FAPI = new FuelStationApi();