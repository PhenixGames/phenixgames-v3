const debug = require('../../../_assets/json/debug/debug.json').vehicle;

const pg_vehicles = require('../../Models/tables/pg_vehicles');
const generellAPI = require('../allgemein/index');

class VehicleApi {
    defaultFuel = 150;

    constructor() {}

    async get(id) {
        return await pg_vehicles
            .findOne({
                where: {
                    veh_id: id,
                },
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return false;
            });
    }

    async save(veh, veh_data) {
        const veh_name = veh_data.veh_name;
        const veh_owner = veh_data.veh_owner;
        const veh_keys = veh_data.veh_keys;
        const veh_state = veh_data.veh_state;
        const veh_pos = veh.position;
        const veh_rot = veh.heading;
        const veh_prim = veh.getColor(0);
        const veh_sec = veh.getColor(1);
        const veh_fuel = veh_data.veh_fuel;
        const veh_max = veh_data.veh_max;
        const veh_type = veh_data.veh_type;

        return await pg_vehicles
            .create({
                veh_name: veh_name,
                veh_owner: veh_owner,
                veh_keys: veh_keys,
                veh_state: veh_state,
                veh_pos: veh_pos,
                veh_rot: veh_rot,
                veh_prim: veh_prim,
                veh_sec: veh_sec,
                veh_fuel: veh_fuel,
                veh_max: veh_max,
                veh_type: veh_type,
            })
            .then((res) => {
                generellAPI.saveLocalVar(veh, {
                    veh_id: res.insertId,
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
            })
            .catch((err) => {
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
            .update({
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
            })
            .then((res) => {
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
                        var newVeh = mp.vehicles.new(
                            mp.joaat(res[i].veh_name),
                            JSON.parse(res[i].veh_pos),
                            {
                                heading: Number(res[i].veh_rot),
                                numberPlate: res[i].veh_owner,
                                color: [res[i].veh_prim, res[i].veh_sec],
                            }
                        );
                        this.update(newVeh, {
                            veh_id: res[i].veh_id,
                            veh_name: res[i].veh_name,
                            veh_owner: res[i].veh_owner,
                            veh_keys: res[i].veh_keys,
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
            .catch((err) => {});
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
                return false;
            });
    }

    async isVehicleOwner(id, owner) {
        return id === owner;
    }

    async isKeyOwner(id, keys) {
        return keys.indexOf(id) !== -1;
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
}

const VehicleAPI = new VehicleApi();
module.exports = VehicleAPI;
