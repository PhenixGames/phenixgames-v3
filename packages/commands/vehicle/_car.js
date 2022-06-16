const vehicle = require('../../PhenixGames/vehicle/index');
const Perms = require('../../PhenixGames/playerAPI/permissionSystem');
const generellAPI = require('../../PhenixGames/allgemein/');
const { log } = require('../../../_assets/functions/log/logs');
const database = require("../../_db/db");

mp.events.addCommand("car", async (player, args) => {
    spawncar(player, args);
});

mp.events.addCommand("veh", async (player, args) => {
    spawncar(player, args);
});

async function spawncar(player, args){
    if(await Perms.hasPermissions(player, ["car_spawn"])) {
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
            console.log(err);
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

        var saveVeh = vehicle.saveVehicleData({
            veh_name: veh,
            veh_owner: player.socialClub,
            veh_keys: JSON.stringify([player.getVariable('playerId')]),
            veh_state: '1',
            veh_pos: JSON.stringify(setVeh.position)
        });
        
        vehicle.setLocalData(setVeh, {
            veh_id: saveVeh.id,
            veh_name: veh,
            veh_owner: player.socialClub,
            veh_keys: JSON.stringify([player.getVariable('playerId')]),
            veh_state: '1',
            veh_pos: JSON.stringify(setVeh.position),
            veh_fuel: 100
            
        });

        if(!saveVeh) {
            return log({
                message: 'Error: Vehicle could not be saved in database!',
                isFatal: true
            });
        }
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
        log({
            message: err,
            isFatal: true
        });
        return false;
        
    });
}