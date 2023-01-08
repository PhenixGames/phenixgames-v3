const { log } = require('../../../_assets/functions/log/logs');
const pg_fuelstations = require('../../Models/tables/pg_fuelstations');
const pg_fuelstations_marker = require('../../Models/tables/pg_fuelstations_marker');
const MoneyApi = require('../moneyAPI/MoneyApi');
const VehicleAPI = require('../vehicle/VehicleApi');
const debug = require('../../../_assets/json/debug/debug.json').fuelstation;

class FuelStationApi {
    types = [
        1, //Kleine Tankstelle
        2, //Mittlere Tankstelle
        3, //Große Tankstelle
        4, //Tankstelle Boot/Helikopter
    ];

    constructor() {}

    async load() {
        const fuelstations = await this.get();

        if (debug) {
            console.log('-- Create Fuelstations -- ' + fuelstations.length + ' --');
            console.log(fuelstations);
        }
        for (let i in fuelstations) {
            try {
                this.spawn(
                    fuelstations[i].type,
                    new mp.Vector3(fuelstations[i].pos.split(', ')),
                    fuelstations[i].id
                );
            } catch (error) {
                log({
                    message: 'Fehler beim Erstellen der Fuelstation: ' + error,
                    isFatal: true,
                });
            }
        }
        return true;
    }

    async get(id = false) {
        if (id) {
            return await pg_fuelstations
                .findOne({
                    where: {
                        id: id,
                    },
                })
                .then((fuelstation) => {
                    return fuelstation;
                })
                .catch((err) => {
                    return false;
                });
        }

        return await pg_fuelstations
            .findAll()
            .then((fuelstations) => {
                return fuelstations;
            })
            .catch((err) => {
                return [];
            });
    }

    spawn(type, pos, id) {
        let col = mp.colshapes.newCircle(Number(pos.x), Number(pos.y), 20);
        col.setVariable('Type', type); //Fuelstation z
        col.setVariable('id', id); //Tankstellen id

        mp.blips.new(361, new mp.Vector3(Number(pos.x), Number(pos.y), Number(pos.z)), {
            name: 'Tankstelle',
            color: 25,
            shortRange: true,
        });
    }

    async getFuelStation({ stationid }) {
        return await pg_fuelstations.findOne({
            where: {
                id: stationid,
            },
        });
    }

    async getMarker({ stationid }) {
        return await pg_fuelstations
            .findOne({
                where: {
                    id: stationid,
                },
            })
            .then((fuelstation) => {
                return fuelstation.getMarkers();
            });
    }

    calculatePrice({ fueltype, fuelstation }) {
        if (fueltype == 'diesel') {
            return fuelstation.fuel_sell_price_d * fuelstation.business_profit_mp;
        } else {
            return fuelstation.fuel_sell_price_b * fuelstation.business_profit_mp;
        }
    }

    spawnMarker({ player, pos, size, id }) {
        player.call('Client:Fuelstation:Marker:SpawnOne', [pos, size, id]);
    }

    removeMarkers(player) {
        player.call('Client:Fuelstation:Marker:DestroyAll');
    }

    isFuelstation(shape) {
        return this.types.includes(shape.getVariable('Type'));
    }

    async saveMarker(id, pos) {
        const fuelstation = await this.get(id);

        if (!fuelstation) {
            return false;
        }

        fuelstation.createMarker({
            pos: pos,
        });
    }

    async enter(player, shape) {
        const marker = await this.getMarker({
            stationid: shape.getVariable('id'),
        });

        if (debug) {
            console.log('-- Create Markers -- ' + marker.length + ' --');
            console.log(marker);
        }

        for (let i in marker) {
            try {
                this.spawnMarker({
                    player,
                    pos: new mp.Vector3(marker[i].pos.split(', ')),
                    size: marker[i].size,
                    id: marker[i].marker_id,
                });
            } catch (error) {
                console.log('Fehler beim Erstellen des Markers: ' + error);
            }
        }
        player.setVariable('isNearFuelstation', true);
        player.setVariable('Fuelstation_id', shape.getVariable('id'));
    }

    getClosestVehicles({ player, range = 50, amount = 1 }) {
        const returnVehicles = [];
        mp.vehicles.forEachInRange(player.position, range, (vehicle) => {
            if (returnVehicles.length <= amount) {
                returnVehicles.push({
                    id: vehicle.getVariable('veh_id'),
                    name: vehicle.getVariable('veh_name'),
                    fuel: vehicle.getVariable('veh_fuel'),
                    type: vehicle.getVariable('veh_type'),
                    enigne: vehicle.engine,
                    max: vehicle.getVariable('veh_max') || VehicleAPI.defaultFuel,
                });
            }
        });
        return returnVehicles;
    }

    fuel({ player, newfuel, id, price }) {
        const hasMoney = MoneyApi.hasHand(player.getVariable('playerId'), price);
        if (!hasMoney) return player.notify('~r~Du hast nicht genug Geld dabei!');

        const vehicle = VehicleAPI.getNearVehicles({
            pos: player.position,
            range: 10,
            id,
        });
        if (vehicle.engine) return player.notify('~r~Du musst den Motor ausmachen!');

        MoneyApi.removeHand(player.getVariable('playerId'), price);
        vehicle.setVariable('veh_fuel', parseInt(vehicle.getVariable('veh_fuel')) + newfuel);

        return player.notify(`~g~Du hast erfolgreich ${newfuel}L getankt!`);
    }
}

module.exports.FAPI = new FuelStationApi();
