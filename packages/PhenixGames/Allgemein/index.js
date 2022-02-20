mp.events.add("vehicleDeath", (vehicle) => {
    vehicle.destroy()
});

mp.events.add("debug", (player) =>{
    console.log("Player " +player.name +" has called Debug")
});