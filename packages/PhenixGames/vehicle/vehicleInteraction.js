mp.events.add('keypress:X', (player) => {
    try {
        player.vehicle.engine = !player.vehicle.engine;
    }catch(err) {
        return;
    }
});


// mp.events.add('Vehicle:Engine:state', (player, [state]) => {
//     

//     setTimeout(() => {
//         player.vehicle.engine = state[0];
        
//     }, 1000)
// });
