mp.events.addCommand("car", (player, args) => {

    args = args.split(' ');

    let veh = args[0];

    let prim = args[1] || 0;
    let sec = args[2] || 0;

    if(veh === 'delete') {
        return player.vehicle.destroy();
    }else if(veh === 'repair') {
        return player.vehicle.repair();
    }

	mp.vehicles.new(mp.joaat(veh), player.position,
    {
        numberPlate: "ADMIN",
        color: [prim,sec]
    });
});