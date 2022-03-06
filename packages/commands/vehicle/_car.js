const vehicle = require('../../PhenixGames/vehicle/index');
const Perms = require('../../PhenixGames/playerAPI/permissionSystem');
const generellAPI = require('../../PhenixGames/allgemein/');

mp.events.addCommand("car", async (player, args) => {
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
            if(veh === 'delete') {
                return player.vehicle.destroy()
            }else if(veh === 'repair') {
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

        var saveVeh =  vehicle.saveVehicleData({
            veh_name: veh,
            veh_owner: player.socialClub,
            veh_keys: JSON.stringify([player.getVariable('playerId')]),
            veh_state: '1',
            veh_pos: JSON.stringify(setVeh.position)
        });

        const latestCarIdInDatabase = await vehicle.getLatestCarInDatabase();
        
        vehicle.setLocalData(setVeh, {
            veh_id: latestCarIdInDatabase,
            veh_name: veh,
            veh_owner: player.socialClub,
            veh_keys: JSON.stringify([player.getVariable('playerId')]),
            veh_state: '1',
            veh_pos: JSON.stringify(setVeh.position)
        });

        if(!saveVeh) {
            return console.log('Error by saving the car into Database');
        }
    }
});