mp.events.add("vehicleDeath", (vehicle) => {
    setTimeout(() => {
        vehicle.destroy();
    }, 10000);
    
});

mp.events.add("debug", (player) =>{
    console.log("Player " +player.name +" has called Debug")
});

