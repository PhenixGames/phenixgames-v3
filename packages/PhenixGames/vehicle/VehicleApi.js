const debug = require('../../../_assets/json/debug/debug.json').vehicle;

const { log } = require('../../../_assets/functions/log/logs');
const pg_vehicles = require('../../Models/tables/pg_vehicles');
const generellAPI = require('../allgemein/index');
const { InventoryApi } = require('../InventoryAPI/InventoryApi');

class VehicleApi {
    defaultFuel = 150;

    constructor() {}

    get(id) {
        return new Promise(async (resolve) => {
            await pg_vehicles
                .findOne({
                    where: {
                        veh_id: id,
                    },
                })
                .then((res) => {
                    return resolve(res);
                })
                .catch((err) => {
                    log({
                        message: err,
                        isFatal: true,
                    });
                    return resolve(false);
                });
        });
    }

    async save(veh, veh_data) {
        return await pg_vehicles
            .create({
                veh_name: veh_data.veh_name,
                veh_owner: veh_data.veh_owner,
                veh_keys: veh_data.veh_keys,
                veh_state: veh_data.veh_state,
                veh_pos: veh.position,
                veh_rot: veh.heading,
                veh_prim: veh.getColor(0),
                veh_sec: veh.getColor(1),
                veh_fuel: veh_data.veh_fuel,
                veh_max: veh_data.veh_max,
                veh_type: veh_data.veh_type,
            })
            .then((res) => {
                generellAPI.saveLocalVar(veh, {
                    veh_id: res.veh_id,
                    veh_name: veh_data.veh_name,
                    veh_owner: veh_data.veh_owner,
                    veh_keys: veh_data.veh_keys,
                    veh_state: veh_data.veh_state,
                    veh_pos: veh.position,
                    veh_rot: veh.heading,
                    veh_prim_color: veh.getColor(0),
                    veh_sec_color: veh.getColor(1),
                    veh_fuel: veh_data.veh_fuel,
                    veh_max: veh_data.veh_max,
                    veh_type: veh_data.veh_type,
                });
            })
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                });
                return false;
            });
    }

    async update(
        veh,
        {
            veh_id = veh.getVariable('veh_id'),
            veh_name = veh.getVariable('veh_name'),
            veh_owner = veh.getVariable('veh_owner'),
            veh_keys = veh.getVariable('veh_keys'),
            veh_state = veh.getVariable('veh_state'),
            veh_pos = veh.position,
            veh_rot = veh.heading,
            veh_prim = veh.getColor(0),
            veh_sec = veh.getColor(1),
            veh_fuel = veh.getVariable('veh_fuel'),
            veh_max = veh.getVariable('veh_max'),
            veh_type = veh.getVariable('veh_type'),
        }
    ) {
        generellAPI.saveLocalVar(veh, {
            veh_id: veh_id,
            veh_name: veh_name,
            veh_owner: veh_owner,
            veh_keys: veh_keys,
            veh_state: veh_state,
            veh_pos: veh_pos,
            veh_rot: veh_rot,
            veh_fuel: veh_fuel,
            veh_prim_color: veh_prim,
            veh_sec_color: veh_sec,
            veh_max: veh_max,
            veh_type: veh_type,
        });
        return await pg_vehicles
            .update(
                {
                    veh_id: veh_id,
                    veh_name: veh_name,
                    veh_owner: veh_owner,
                    veh_keys: veh_keys,
                    veh_state: veh_state,
                    veh_pos: JSON.parse(veh_pos),
                    veh_rot: veh_rot,
                    veh_fuel: veh_fuel,
                    veh_prim_color: veh_prim,
                    veh_sec_color: veh_sec,
                    veh_max: veh_max,
                    veh_type: veh_type,
                },
                {
                    where: {
                        veh_id,
                    },
                }
            )
            .then((res) => {
                log({
                    message: err,
                    isFatal: true,
                });
                return true;
            })
            .catch((err) => {
                return false;
            });
    }

    async spawnAll() {
        await pg_vehicles
            .findAll()
            .then((res) => {
                if (res.length > 0) {
                    for (let i in res) {
                        const newVeh = mp.vehicles.new(
                            mp.joaat(res[i].veh_name),
                            JSON.parse(res[i].veh_pos),
                            {
                                heading: res[i].veh_rot,
                                numberPlate: res[i].veh_owner,
                                color: [res[i].veh_prim, res[i].veh_sec],
                            }
                        );
                        this.update(newVeh, {
                            veh_id: res[i].veh_id,
                            veh_name: res[i].veh_name,
                            veh_owner: res[i].veh_owner,
                            veh_keys: JSON.parse(res[i].veh_keys),
                            veh_state: res[i].veh_state,
                            veh_pos: res[i].veh_pos,
                            veh_rot: res[i].veh_rot,
                            veh_prim: res[i].veh_prim,
                            veh_sec: res[i].veh_sec,
                            veh_fuel: res[i].veh_fuel,
                            veh_max: res[i].veh_max,
                            veh_type: res[i].veh_type,
                        });
                    }
                }
            })
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                });
            });
    }

    async syncAll() {
        mp.vehicles.forEach((vehicle) => {
            this.update(vehicle, {});
        });
    }

    async delete(id) {
        return await pg_vehicles
            .destroy({
                where: {
                    veh_id: id,
                },
            })
            .catch((err) => {
                log({
                    message: err,
                    isFatal: true,
                });
                return false;
            });
    }

    async isVehicleOwner(player_id, owner) {
        return player_id === owner;
    }

    async isKeyOwner(player_id, keys) {
        return keys.indexOf(player_id) !== -1;
    }

    getNearVehicles({ pos, range, id }) {
        let returnVehicle = {};
        mp.vehicles.forEachInRange(pos, range, (vehicle) => {
            if (vehicle.getVariable('veh_id') == id) {
                return (returnVehicle = vehicle);
            }
        });
        return returnVehicle;
    }

    addToKeys(player_id, veh_id) {
        return new Promise(async (resolve, reject) => {
            if ((await InventoryApi.getKeyLength(player_id)) >= 5) {
                return reject('You have already 5 keys');
            }

            const veh = await this.get(veh_id);
            if (!veh) return reject('Vehicle not found');

            const keys = veh.veh_keys;
            if (keys.indexOf(player_id) !== -1) return reject('Player already has keys');
            keys.push(player_id);

            const userInventory = await InventoryApi.get(player_id);
            if (!userInventory) return reject('Player not found');

            await this.update(veh, {
                veh_keys: keys,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    log({
                        message: err,
                        isFatal: true,
                    });
                    reject(err);
                });
        });
    }

    removeFromKeys(player_id, veh_id) {
        return new Promise(async (resolve, reject) => {
            const veh = await this.get(veh_id);
            if (!veh) return reject('Vehicle not found');

            const keys = veh.veh_keys;
            if (keys.indexOf(player_id) === -1) return reject('Player has no keys');

            keys.splice(keys.indexOf(player_id), 1);

            await this.update(veh, {
                veh_keys: keys,
            })
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    log({
                        message: err,
                        isFatal: true,
                    });
                    reject(err);
                });
        });
    }
}

const VehicleAPI = new VehicleApi();
module.exports = VehicleAPI;
