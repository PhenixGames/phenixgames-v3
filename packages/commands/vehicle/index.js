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

mp.events.addCommand("color", (player, color = null) => {
    if(color === null) return player.notify('~r~Geb ne farbe an du Depp!');
    
    color = color.split(' ');
    player.vehicle.setColor(Number(color[0]),Number(color[1]))
});

mp.events.addCommand("speed", (player, speed = 1) => {
    if(speed === null) return player.notify('~r~Geb nh Speed an du Depp!');

    mp.players.call("Set:ModdedSpeed", [speed]);
});