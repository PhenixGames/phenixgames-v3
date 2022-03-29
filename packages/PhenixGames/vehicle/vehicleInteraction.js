mp.events.add('keypress:X', (player) => {
    try {
        var veh = player.vehicle;
        let fuel = veh.getVariable("veh_fuel");
        if(!fuel == 0){
            veh.engine = !veh.engine;
            veh.setVariable("veh_engine", veh.engine);
        }else {
           return player.notify("Der Tank des Fahzeuges ist leer");
        }
    }catch(err) {
        return;
    }
});
mp.events.add("vehicleDeath", (vehicle) => {
    setTimeout(() => {
        try {
            if(vehicle) return vehicle.destroy(); 
        }catch(err){
        }
        
    }, 10000);
    
});

mp.events.add("playerExitVehicle", (player, vehicle) => {
    setTimeout(() => {
        try{
            vehicle.engine = vehicle.getVariable("veh_engine");
        }catch(err){
            return;
        }
    }, 1000);
});

setInterval(() => {
    mp.vehicles.forEach((veh) => {
        var speed = veh.getVariable("veh_speed");
        var engine = veh.getVariable("veh_engine");
        let fuel = veh.getVariable("veh_fuel");
        let amount = 0;
        if(!engine) return;
        if(!speed== 0){
            amount = (speed / 1500) 
        }else {
            amount = 0.05
        }
        RemovefuelfromVehicle(veh, amount, fuel);
        }
    );
}, 1000);
function RemovefuelfromVehicle(veh, amount, fuel){
    if(fuel <= amount){
        veh.engine = false;
        veh.setVariable("veh_engine", veh.engine);
        fuel = 0;
    }else {
        fuel = fuel - amount;
    }
    veh.setVariable("veh_fuel", fuel);
}
mp.events.add('Set:Variable:Of:ent', (player, speed) => {
    var veh = player.vehicle;
    veh.setVariable('veh_speed', speed);
});