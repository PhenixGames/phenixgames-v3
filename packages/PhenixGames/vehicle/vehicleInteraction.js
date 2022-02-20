mp.events.add('keypress:X', (player) => {
    player.vehicle.engine = !player.vehicle.engine;
});


mp.events.add('Vehicle:Engin:state', (player, state) => {
    player.vehicle.engine = state;
});
