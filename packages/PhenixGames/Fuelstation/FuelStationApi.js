const database = require("../../_db/db");
const HandMoneyAPI = require("../moneyAPI/handmoney");
const debug = require('../../../_assets/json/debug/debug.json').fuelstation;

class FuelStationApi {

    types = [
        1,//Kleine Tankstelle
        2,//Mittlere Tankstelle
        3,//Große Tankstelle
        4,//Tankstelle Boot/Helikopter
    ]

    constructor() {}

    async load() {
        const fuelstations = await this.get();

        if(debug){
           console.log("-- Create Fuelstations -- " + fuelstations.length + " --");
           console.log(fuelstations);
        }
        for(let i in fuelstations){
            try {
                this.spawn(fuelstations[i].type, new mp.Vector3(fuelstations[i].pos.split(', ')), fuelstations[i].id);
            } catch (error) {
                log({
                    message: "Fehler beim Erstellen der Fuelstation: " + error,
                    isFatal: true
                });
            }
        }
        return true;
    }

    async get(id = false) {
        let query = `SELECT * FROM pg_fuelstations ${id ? "WHERE id = ?" : ""}`;

        return await database.query(query, [id])
        .then(res => {
            return (id) ? res[0] : res;
        })
        .catch(err => {
            return false;
        })
    }

    spawn(type, pos, id) {
        let col = mp.colshapes.newCircle(Number(pos.x), Number(pos.y), 20);
        col.setVariable("Type", type); //Fuelstation z
        col.setVariable("id", id); //Tankstellen id
    
        mp.blips.new(361, new mp.Vector3(Number(pos.x), Number(pos.y), Number(pos.z)),{
                name: "Tankstelle",
                color: 25,
                shortRange: true,
                
        });
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

    isFuelstation(shape) {
        return this.types.includes(shape.getVariable("Type"));
    }

    async saveMarker(id, pos) {
        return await database.query('INSERT INTO pg_fuelstations_marker (fuelstation_id, pos) VALUES (?, ?)', [id, pos])
        .catch(err => {
            return false;
        });
    }

    async enter(player, shape) {
        const marker = await this.getMarker({
            stationid: shape.getVariable('id')
        });
        
        if (debug) {
            console.log("-- Create Markers -- " + marker.length + " --");
            console.log(marker);
        }

        for (let i in marker) {
            try {
                this.spawnMarker({
                    player,
                    pos: new mp.Vector3(marker[i].pos.split(', ')),
                    size: marker[i].size,
                    id: marker[i].marker_id
                });
    
            } catch (error) {
                console.log("Fehler beim Erstellen des Markers: " + error);
            }
        }
        player.setVariable('isnearFuelstation', true);
        player.setVariable("Fuelstation_id", shape.getVariable('id'));
    }

    getClosestVehicles({player, range = 50, amount = 1}) {
        const returnVehicles = [];
        mp.vehicles.forEachInRange(player.position, range,
            (vehicle) => {
                if(returnVehicles.length <= amount){
                    returnVehicles.push({
                        id: vehicle.getVariable('veh_id'),
                        name: vehicle.getVariable('veh_name'),
                        fuel: vehicle.getVariable('veh_fuel'),
                        type: vehicle.getVariable('veh_type'),
                        enigne: vehicle.engine,
                        max: vehicle.getVariable('veh_max'),
                    });
                }
            }
        );
	    return returnVehicles;
    }

    fuel(player, fuel, id, price) {
        
        mp.vehicles.forEachInRange(player.position, range,
            (vehicle) => {
                if(vehicle.getVariable('veh_id') == id){

                    const hasMoney = HandMoneyAPI.has(player.getVariable("playerId"), price)
                    if(!hasMoney) return player.notify("~r~Du hast nicht genug Geld dabei!");
                    
                    vehicle.setVariable('veh_fuel', vehicle.getVariable("veh_fuel") + fuel);
                    HandMoneyAPI.remove(player.getVariable("playerId"), price);
                    player.notify("~g~Du hast erfolgreich getankt!");
                }
            }
        );
        car.setVariable("veh_fuel", fuel);
        player.notify("~g~Du hast dein Fahrzeug erfolgreich aufgefüllt!");
    }
}

module.exports.FAPI = new FuelStationApi();