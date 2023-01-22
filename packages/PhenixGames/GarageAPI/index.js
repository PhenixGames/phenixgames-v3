const { log } = require('../../../_assets/functions/log/logs');
const pg_garages = require('../../Models/tables/pg_garages');
const pg_vehicles = require('../../Models/tables/pg_vehicles');
const debug = require('../../../_assets/json/debug/debug.json').GarageAPI;

class api {
    constructor() {}
    NPC_Array = [];

    /*
        - Load All Garages from Database
        - Load All Ausparkpunkte From Database into an Array Witch Update function
        - Get All Vehicles From Player Which are "InGarage" 
        - Is Ausparkpunkt Free function
        - Spawn Vehicle From DB
        + Car Death => Delete Car from Map and add InGarage True
    */

    load() {
        return new Promise(async (resolve, reject) => {
            const Garages = await this.get();

            if (debug) {
                console.log('-- Create Garages -- ' + Garages.length + ' --');
                console.log(Garages);
            }
            for (let i in Garages) {
                try {
                    this.spawncolshape(
                        Garages[i].garagen_type,
                        new mp.Vector3(Garages[i].garagen_pos.split(', ')),
                        garages[i].id
                    );
                    var NPC = [
                        new mp.Vector3(Garages[i].garagen_pos.split(', ')),
                        Garages[i].npc_rot,
                        Garages[i].id,
                    ];
                    this.NPC_Array.push(NPC);
                } catch (error) {
                    log({
                        message: 'Fehler beim Erstellen der Garage: ' + error,
                        isFatal: true,
                    });
                    return reject(false);
                }
            }
            return resolve(true);
        });
    }
    get(id = false) {
        return new Promise(async (resolve, reject) => {
            if (id) {
                return await pg_garages
                    .findOne({
                        where: {
                            id: id,
                        },
                    })
                    .then((garage) => {
                        return resolve(garage);
                    })
                    .catch((err) => {
                        log({
                            message: 'Fehler beim Laden der Garagen: ' + err,
                            isFatal: true,
                        });
                        return reject(false);
                    });
            }
            return await pg_garages
                .findAll()
                .then((garages) => {
                    return resolve(garages);
                })
                .catch((err) => {
                    log({
                        message: 'Fehler beim Laden aller Garagen: ' + err,
                        isFatal: true,
                    });
                    return reject(false);
                });
        });
    }

    spawncolshape(type, pos, id) {
        let col = mp.colshapes.newCircle(Number(pos.x), Number(pos.y), 20);
        col.setVariable('Type', type); //Garage Type
        col.setVariable('id', id); //Garage id

        mp.blips.new(50, new mp.Vector3(Number(pos.x), Number(pos.y), Number(pos.z)), {
            name: 'Garage',
            color: 3,
            shortRange: true,
        });
    }

    loadAusparkpunkte() {}
    getVehicleFromGarage() {}
    isAusparkpunktEmpty() {}
    spawnVehicleOutOfGarage(player, vehicle) {}

    loadNpc(player) {
        for (let i in this.NPC_Array) {
            player.call('Garage:LoadNPC', [
                this.NPC_Array[i][0],
                this.NPC_Array[i][1],
                this.NPC_Array[i][2],
            ]);
        }
    }

    setGarageToVehicle(Vehicle, Value) {
        return new Promise(async (resolve, reject) => {
            if (Value == true || Value == false) {
                await pg_vehicles
                    .update(
                        {
                            veh_state: Value,
                        },
                        {
                            where: {
                                veh_id: Vehicle.getVariable('veh_id'),
                            },
                        }
                    )
                    .then((res) => {
                        return resolve(res[0]);
                    })
                    .catch((err) => {
                        log({
                            message: 'Fehler beim Setzen des Garagen Status: ' + err,
                            isFatal: true,
                        });
                        return reject(false);
                    });
            } else {
                return reject('Wrong Input setGarageToVehicle');
            }
        });
    }
}

module.exports.GarageAPI = new api();

mp.events.add('vehicleDeath', (vehicle) => {
    setTimeout(async () => {
        try {
            if (vehicle) {
                await this.setGarageToVehicle(vehicle, true)
                    .then((res) => {
                        vehicle.destroy();
                    })
                    .catch((err) => {
                        if (debug) {
                            console.log(err);
                        }
                    });
            }
        } catch (err) {}
    }, 20000); // 20 Sekunden
});
