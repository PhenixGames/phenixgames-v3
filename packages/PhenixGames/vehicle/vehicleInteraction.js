mp.events.add('keypress:X', (player) => {
    try {
        var veh = player.vehicle;
        veh.engine = !veh.engine;
        veh.setVariable("Engin", veh.engine);
    }catch(err) {
        return;
    }
});

mp.events.add("playerExitVehicle", (player, vehicle) => {
    setTimeout(() => {
        try{
            vehicle.engine = vehicle.getVariable("Engin");
        }catch(err){
            return;
        }
    }, 1000);
});