const { log } = require('../../../_assets/functions/log/logs');
const VehicleAPI = require('./VehicleApi');

const debug = require('../../../_assets/json/debug/debug.json').vehicle;

mp.events.add('Server:Keypress:Strg', async (player) => {
    try {
        console.log('Strg')
        const veh = player.vehicle;
        if (!veh) {
            return player.notify('Du bist in keinem Fahrzeug');
        }
        console.log('Strg2')
        const vehApi = new VehicleAPI();
        const db_veh = await vehApi.get(veh.getVariable('veh_id'));
        console.log('Strg3')
        if (!db_veh) {
            return player.notify('Dieses Fahrzeug existiert nicht');
        }
        console.log('Str4', db_veh.veh_owner, player.getVariable('Aduty'), db_veh.veh_keys)
        if (!vehApi.isVehicleOwner(player, db_veh.veh_owner)) return;
        console.log('Str5')
        if (!vehApi.isKeyOwner(player, db_veh.veh_keys)) return;
        console.log('Strg6')

        const fuel = veh.getVariable('veh_fuel');
        if (fuel <= 0) return player.notify('Der Tank des Fahzeuges ist leer');

        const speed = veh.getVariable('veh_speed');
        if (speed <= 5) {
            veh.engine = !veh.engine;
            console.log('Strg7')
            veh.setVariable('veh_engine', veh.engine);
        }

        console.log(JSON.stringify(db_veh), fuel, veh.engine, speed);
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
