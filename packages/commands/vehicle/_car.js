const vehicle = require('../../PhenixGames/vehicle/index');
const Permissionsytem = require('../../PhenixGames/playerAPI/PermissionSystem');
const generellAPI = require('../../PhenixGames/allgemein/');
const { log } = require('../../../_assets/functions/log/logs');
const database = require("../../_db/db");
const VehicleAPI = require('../../PhenixGames/vehicle/VehicleApi');

mp.events.addCommand("car", async (player, args) => {
    spawncar(player, args);
});

mp.events.addCommand("veh", async (player, args) => {
    spawncar(player, args);
});

async function spawncar(player, args){
    if(await Permissionsytem.hasPermissions(player, ["car_spawn"])) {
        try {
            args = args.split(' ');
        }catch(err) {
            return;
        }

        let veh = args[0];

        let prim = args[1] || 0;
        let sec = args[2] || 0;

        try{
            if(veh === 'repair') {
                return player.vehicle.repair()
            }
        }catch(err){
            return player.notify('~r~Du bist in keinem Auto!');
        }
            
        
        var setVeh = mp.vehicles.new(mp.joaat(veh), player.position,
        {
            numberPlate: player.name,
            color: [prim,sec],
            heading: player.heading,
            engine: false
            
        });
        generellAPI.saveLocalVar(player, {
            'Player.Tmp.Admin.Veh': setVeh
        });

        player.putIntoVehicle(setVeh, 0);
        
        player.call("Vehicle:Engine:state" , [false])

        await VehicleAPI.save(setVeh, {
            veh_name: veh,
            veh_owner: player.socialClub,
            veh_keys: JSON.stringify([player.getVariable('playerId')]),
            veh_state: '1',
            veh_fuel: 100,
            veh_type: 'benzin',
            veh_maxfuel: 150,
        });
    }
}

mp.events.addCommand("clean", async (player) => {
    if(!player.vehicle) return;
    clean(player);
});
mp.events.addCommand("dv", async (player, args) => {
    try {
        args = args.split(' ');
    }catch(err) {
        return;
    }

    let veh_id = args[0];
    var veh_spawned = false;
   if(vid = null){
         if(!player.vehicle) return player.notify('~r~Du bist in keinem Auto!');
         vid = player.vehicle.getVariable('veh_id');
   }

   mp.vehicles.forEach(
    (vehicle) => {
        if(vehicle.getVariable('veh_id') == veh_id) {
            vehicle.destroy();
            veh_spawned = true;
        }
    });
    await DeleteVehicleFromDatabase(Number(veh_id));
    if(veh_spawned){
        player.notify("~r~Das Fahrzeug mit der ID " + veh_id + " wurde aus Der Welt und der Datenbank entfernt!");
    }else {
        player.notify("~r~Das Fahrzeug mit der ID " + veh_id + " wurde aus der Datenbank entfernt");
    }
});


async function clean(player){
    mp.players.forEach(
        (tg) => {
            let veh = player.vehicle;
            tg.call('Vehicle:Remove:Dirt:Level', [veh]);
        }
    );
}

async function DeleteVehicleFromDatabase(veh_id){
    return await database.query('DELETE FROM pg_vehicles WHERE veh_id = ?', [veh_id])
    .then(() => {
        return true

    })
    .catch(err => {
        return false;
    });
}