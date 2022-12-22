const { log } = require('../../../_assets/functions/log/logs');
const pg_garages = require('../../Models/tables/pg_garages');
const database = require('../../_db/db');
const debug = require('../../../_assets/json/debug/debug.json').GarageAPI;
class api {
    constructor() {}
    npcs = [];

    /*
        + Load All Garages from Database
        - Load All Ausparkpunkte From Database into an Array Witch Update function
        + Get All Vehicles From Player Which are "InGarage" 
        - Is Ausparkpunkt Free function
        - Spawn Vehicle From DB
        + Car Death => Delete Car from Map and add InGarage True
    */

    load() {
        return new Promise(async (resolve) => {
            const garages = await this.get();
            this.npcs = [];

            mp.colshapes.forEach((shape) => {
                if (shape.getVariable('Garage') == true) {
                    shape.destroy();
                }
            });

            mp.blips.forEach((blip) => {
                if ((blip.name = 'Garage')) {
                    blip.destroy();
                }
            });

            if (debug) {
                console.log('-- Create Garages -- ' + garages.length + ' --');
                console.log(garages);
            }
            for (let i in garages) {
                try {
                    this.spawncolshape(
                        garages[i].garagen_type,
                        new mp.Vector3(garages[i].garagen_pos.split(', ')),
                        garages[i].id
                    );
                    const npc = [
                        new mp.Vector3(garages[i].garagen_pos.split(', ')),
                        garages[i].npc_rot,
                        garages[i].id,
                    ];
                    this.npcs.push(npc);
                } catch (error) {
                    log({
                        message: 'Fehler beim Erstellen der Garage: ' + error,
                        isFatal: true,
                    });
                    resolve(false);
                }
            }
            return resolve(true);
        });
    }
    get(id = false) {
        return new Promise(async (resolve) => {
            if (id) {
                const garage = await pg_garages
                    .findOne({
                        where: {
                            id: id,
                        },
                    })
                    .then((garage) => {
                        return garage;
                    })
                    .catch((err) => {
                        return [];
                    });
                return resolve(garage);
            }
            const garages = await pg_garages.findAll().catch((err) => {
                return resolve([]);
            });
            return resolve(garages);
        });
    }
    update(player) {
        //player Needs to be Player which run a command to update this
        //TODO permissions need to be implemented
        this.load();
    }

    spawncolshape(type, pos, id) {
        const col = mp.colshapes.newCircle(Number(pos.x), Number(pos.y), 20);
        col.setVariable('type', type); //Garage Type
        col.setVariable('id', id); //Garage id
        col.setVariable('garage', true);

        mp.blips.new(50, new mp.Vector3(Number(pos.x), Number(pos.y), Number(pos.z)), {
            name: 'Garage',
            color: 3,
            shortRange: true,
        });
    }

    isAusparkpunktEmpty(pos, range = 5) {
        //Hier muss geschaut werden ob ein Ausparkpunkt frei ist ( Umkreis von 5 Meter )
        if (pos == undefined) return false;
        //TODO
    }

    spawnVehicleFromGarage(player, vehicle) {}

    loadAusparkpunkte(shapeid) {
        return new Promise(async (resolve) => {
            await database
                .findAll({
                    where: {
                        garagen_id: shapeid,
                    },
                })
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve([]);
                });
            //TODO Hier muss noch der Code zum Spawnen von Markern rein
        });
    }
    getVehFromGarage(playerid) {
        return new Promise(async (resolve) => {
            await database
                .findAll({
                    where: {
                        veh_owner: playerid,
                        veh_state: true,
                    },
                })
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return resolve([]);
                });
        });
    }
    async loadNpc(player) {
        for (let i in this.NPC_Array) {
            player.call('Garage:LoadNPC', [
                this.NPC_Array[i][0],
                this.NPC_Array[i][1],
                this.NPC_Array[i][2],
            ]);
        }
    }

    isGarage(shape) {
        resolve(shape.getVariable(Garage) == true);
    }

    setGarageValue(vehicle, inGarage) {
        //This Function Will Change the state of InGarage True Or False
        return new Promise(async (resolve) => {
            if (typeof inGarage !== Boolean) return false;

            const vid = vehicle.getVariable('veh_id');
            if (debug) console.log('Das Fahrzeug ' + vid + ' wurde eingeparkt');
            return await database
                .update(
                    {
                        veh_state: inGarage,
                    },
                    {
                        where: {
                            veh_id: vid,
                        },
                    }
                )
                .then((res) => {
                    return resolve(res[0]);
                })
                .catch((err) => {
                    log({
                        message: 'Fehler beim updaten des Fahrzeugs: ' + err,
                        isFatal: true,
                    });
                    return reject(false);
                });
        });
    }

    vehicleIntoGarageAfterDeath(vehicle) {
        return new Promise(async (resolve) => {
            await this.setGarageValue(vehicle, true);
            vehicle.destroy();
            return resolve(true);
        });
    }
}

module.exports.GarageAPI = new api();

mp.events.add('vehicleDeath', (vehicle) => {
    setTimeout(() => {
        try {
            if (vehicle) this.VehicleIntoGarageAfterDeath();
        } catch (err) {}
    }, 20 * 1000); // 20 Sekunden
});
