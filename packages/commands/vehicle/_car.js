mp.events.addCommand("car", (player, args) => {
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

        if(player.getVariable('Player.Tmp.Admin.Veh')) {
            player.getVariable('Player.Tmp.Admin.Veh').destroy();
        }

        var setVeh = mp.vehicles.new(mp.joaat(veh), player.position,
        {
            numberPlate: player.name,
            color: [prim,sec]
        });
        player.setVariable('Player.Tmp.Admin.Veh', setVeh);
        player.putIntoVehicle(setVeh, 0);
    }
});