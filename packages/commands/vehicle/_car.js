const vehicle = require('../../PhenixGames/vehicle/index');

mp.events.addCommand("car", async (player, args) => {
    if(player.getVariable('isTeam')) {
        args = args.split(' ');

        let veh = args[0];

        let prim = args[1] || 0;
        let sec = args[2] || 0;

        if(veh === 'delete') {
            return player.vehicle.destroy();
        }else if(veh === 'repair') {
            return player.vehicle.repair();
        }

        // if(player.getVariable('Player.Tmp.Admin.Veh')) {
        //     player.getVariable('Player.Tmp.Admin.Veh').destroy();
        // }

        var setVeh = mp.vehicles.new(mp.joaat(veh), player.position,
        {
            numberPlate: player.name,
            color: [prim,sec]
        });
        setVeh.rotation = player.rotation;
        player.setVariable('Player.Tmp.Admin.Veh', setVeh);
        player.putIntoVehicle(setVeh, 0);

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