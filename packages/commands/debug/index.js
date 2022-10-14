mp.events.addCommand('pos', (player) => {
    console.log(
        'POSITION: ' + player.position.x + ', ' + player.position.y + ', ' + (player.position.z - 1)
    );
    console.log('ROTATION: ' + player.heading);
    console.log(player.dimension);
});
//TODO REMOVE DEBUG COMMANDS
mp.events.addCommand('callfunc', (player, arg, name) => {
    player.call(name);
});

//TODO Remove debug commands
mp.events.addCommand('spawnped', (player, arg, ped) => {
    let dynamicPed = mp.peds.new(mp.joaat(ped), mp.players.at(0).position, { dynamic: true });
    dynamicPed.controller = mp.players.at(0);
});
