const console = require('better-console');
mp.events.add("vehicleDeath", (vehicle) => {
    setTimeout(() => {
        vehicle.destroy();
    }, 10000);
    
});

mp.events.add("debug", (player) =>{
    console.info("Player " +player.name +" has called Debug")
});

