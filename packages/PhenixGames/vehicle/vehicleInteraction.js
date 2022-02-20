mp.events.add('keypress:X', (player) => {
    player.vehicle.engine = !player.vehicle.engine;
});


mp.events.add('Vehicle:Engine:state', (player, [state]) => {
    mp.gui.push(state);

    setTimeout(() => {
        player.vehicle.engine = state[0];
        
    }, 1000)
});
