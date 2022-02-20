let Debug = true;

mp.events.add('Player:pressed:f2', (player) => {
    if(player.getVariable('isTeam')) {
    player.vehicle.engine = !player.vehicle.engine;
    }else {
        if(!debug) return player.notify('~r~Dazu hast du keine Rechte');
    }
});
