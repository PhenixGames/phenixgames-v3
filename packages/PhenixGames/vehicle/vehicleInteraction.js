mp.events.add('keypress:X', (player) => {
    try {
        var veh = player.vehicle;
        veh.engine = !veh.engine;
        veh.setVariable("veh_engine", veh.engine);
    }catch(err) {
        return;
    }
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
            amount = (speed / 1000) + 0.1 
        }else {
            amount = 0.05
        }
        RemovefuelfromVehicle(veh, amount, fuel);
        }
    );
}, 1000);
function RemovefuelfromVehicle(veh, amount, fuel){
    fuel = fuel - amount;
    veh.setVariable("veh_fuel", fuel);
}
mp.events.add('Set:Variable:Of:ent', (player, ent, data_name, data) => {
    try{
        ent.setVariable(data_name, data);
    }catch (err){
        player.notify("Error: Datasetter of ent");
    }
    
});