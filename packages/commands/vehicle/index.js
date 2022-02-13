require('./_car.js');

mp.events.addCommand("color", (player, color = null) => {
    if(color === null) return player.notify('~r~Geb ne farbe an du Depp!');
    
    color = color.split(' ');
    player.vehicle.setColor(Number(color[0]),Number(color[1]))
});

mp.events.addCommand("speed", (player, speed = 1) => {
    if(speed === null) return player.notify('~r~Geb nh Speed an du Depp!');

    mp.players.call("Set:ModdedSpeed", [speed]);
});