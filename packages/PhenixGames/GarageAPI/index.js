const database = require('../../_db/db');
const MoneyApi = require('../moneyAPI/MoneyApi');
const VehicleAPI = require('../vehicle/VehicleApi');
const debug = require('../../../_assets/json/debug/debug.json').GarageAPI;

class api {
    constructor() {}
    NPC_Array = [];

    /*
        + Load All Garages from Database
        - Load All Ausparkpunkte From Database into an Array Witch Update function
        + Get All Vehicles From Player Which are "InGarage" 
        - Is Ausparkpunkt Free function
        - Spawn Vehicle From DB
        + Car Death => Delete Car from Map and add InGarage True
    */

    async load() {
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
            }
        }
        return true;
    }
    async get(id = false) {
        let query = `SELECT * FROM pg_garage ${id ? 'WHERE id = ?' : ''}`;

        return await database
            .query(query, [id])
            .then((res) => {
                return id ? res[0] : res;
            })
            .catch((err) => {
                return false;
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
    
    async IsAusparkpunktempty(pos, range = 5) {
        //Hier muss geschaut werden ob ein Ausparkpunkt frei ist ( Umkreis von 5 Meter )
        if(pos == undefined) return false;
        //TODO
    }
    
    async SpawnVehicleFromGarage(player, vehicle) {}
    async LoadAusparkpunkte(shapeid) {
        return await database
            .query(`SELECT * FROM pg_garage_ausparkpunkte WHERE garagen_id = ?`, [shapeid])
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return false;
            });
            //TODO Hier muss noch der Code zum Spawnen von Markern rein
    }
    async GetVehiclesFromPlayerGarage(playerid) {
        return await database
            .query(`SELECT * FROM pg_vehicles WHERE veh_owner = ? AND veh_state = ?`, [
                playerid,
                true,
            ])
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return false;
            });
    }
    async Load_NPC_on_Player(player) {
        for (let i in this.NPC_Array) {
            player.call('Garage:LoadNPC', [
                this.NPC_Array[i][0],
                this.NPC_Array[i][1],
                this.NPC_Array[i][2],
            ]);
        }
    }

    async SetGarageValue(Vehicle, Value) {
        //This Function Will Change the state of InGarage True Or False
        if (Value == true || Value == false) {
            return await database
                .query(`UPDATE pg_vehicles SET veh_state = ? WHERE veh_id = ?`, [
                    Value,
                    Vehicle.getVariable('veh_id'),
                ])
                .then((res) => {
                    return res[0];
                })
                .catch((err) => {
                    return false;
                });
        } else {
            if (debug) {
                console.log('Wrong Input SetGarageValue');
            }
            return false;
        }
    }

    async VehicleIntoGarageAfterDeath(vehicle) {
        await this.SetGarageValue(vehicle, true);
        vehicle.destroy();
    }
}

module.exports.GarageAPI = new api();

mp.events.add('vehicleDeath', (vehicle) => {
    setTimeout(() => {
        try {
            if (vehicle) return this.VehicleIntoGarageAfterDeath();
        } catch (err) {}
    }, 20000); // 20 Sekunden
});
