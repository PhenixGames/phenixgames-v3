const { log } = require('../../../_assets/functions/log/logs');
const VehicleAPI = require('./VehicleApi');

const debug = require('../../../_assets/json/debug/debug.json').vehicle;

mp.events.add('Server:Keypress:Strg', (player) => {
    try {
        const veh = player.vehicle;
        if (!veh) return;
        
        const vehApi = new VehicleAPI();
        const db_veh = vehApi.get(veh.getVariable('veh_id'));
        if (!db_veh) return;
        if (!vehApi.isVehicleOwner(player.id, db_veh.veh_owner)) return;
        if (!vehApi.isKeyOwner(player.id, db_veh.veh_keys)) return;

        const fuel = veh.getVariable('veh_fuel');
        if (fuel <= 0) return player.notify('Der Tank des Fahzeuges ist leer');

        const speed = veh.getVariable('veh_speed');
        if (speed <= 5) {
            veh.engine = !veh.engine;
            veh.setVariable('veh_engine', veh.engine);
        }
    } catch (err) {
        log({
            message: err,
            isFatal: true,
        });
        return;
    }
});
mp.events.add('playerExitVehicle', (player, vehicle) => {
    setTimeout(() => {
        try {
            vehicle.engine = vehicle.getVariable('veh_engine');
            vehicle.setVariable('veh_speed', 0);
        } catch (err) {
            return;
        }
    }, 1000);
});

setInterval(() => {
    mp.vehicles.forEach((veh) => {
        const speed = veh.getVariable('veh_speed');
        const engine = veh.getVariable('veh_engine');
        const fuel = veh.getVariable('veh_fuel');
        let amount = 0;
        if (!engine) return;
        if (!speed == 0) {
            amount = speed / 2000;
        } else {
            amount = 0.01;
        }
        removeFuelFromVehicle(veh, amount, fuel);
    });
}, 1000);

function removeFuelFromVehicle(veh, amount, fuel) {
    if (fuel <= amount) {
        veh.engine = false;
        veh.setVariable('veh_engine', veh.engine);
        fuel = 0;
    } else {
        fuel = fuel - amount;
    }
    veh.setVariable('veh_fuel', fuel);
}
mp.events.add('Client:Vehicle:setVariable', (player, speed) => {
    const veh = player.vehicle;
    if (veh) {
        veh.setVariable('veh_speed', speed);
    }
});
