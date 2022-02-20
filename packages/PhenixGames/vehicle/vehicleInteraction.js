mp.events.add('keypress:X', (player) => {
    player.vehicle.engine = !player.vehicle.engine;
});


mp.events.add('Vehicle:Engin:state', (player, [state]) => {
    setTimeout(() => {
        player.vehicle.engine = state[0];
    }, 1000)
});
