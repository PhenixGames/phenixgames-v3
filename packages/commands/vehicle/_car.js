const VehicleApi = require('../../PhenixGames/vehicle/VehicleApi');

mp.events.addCommand('car', (player, args) => {
    new VehicleApi().spawnCar(player, args);
});

mp.events.addCommand('veh', (player, args) => {
    new VehicleApi().spawnCar(player, args);
});

mp.events.addCommand('clean', (player) => {
    if (!player.vehicle) return;
    new VehicleApi().removeDirt(player);
});
mp.events.addCommand('delVeh', async (player, args) => {
    try {
        args = args.split(' ');
    } catch (err) {
        return;
    }

    let veh_id = args[0];
    let veh_spawned = false;

    if (!veh_id) {
        if (!player.vehicle) return player.notify('~r~Du bist in keinem Auto!');
        veh_id = player.vehicle.getVariable('veh_id');
    }

    await new VehicleApi().delete(veh_id)
        .then(() => {
            mp.vehicles.forEach((vehicle) => {
                if (vehicle.getVariable('veh_id') == veh_id) {
                    vehicle.destroy();
                    veh_spawned = true;
                }
            });

            player.notify(
                `~r~Das Fahrzeug mit der ID ${veh_id} wurde aus der${
                    veh_spawned ? ' Welt und ' : ' '
                }Datenbank entfernt!`
            );
        })
        .catch((err) => {
            player.notify(`~r~Es ist ein Fehler aufgetreten.`);
        });
});

mp.events.addCommand('color', (player, color = null) => {
    if (player.getVariable('isTeam')) {
        if (!color) return player.notify('~r~Geb ne farbe an du Depp!');

        color = color.split(' ');
        player.vehicle.setColor(Number(color[0]), Number(color[1]));
    }
});

mp.events.addCommand('speed', (player, speed = 1) => {
    if (player.getVariable('isTeam')) {
        player.call('Set:ModdedSpeed', [speed]);
    }
});

mp.events.addCommand('fuel', (player) => {
    const fuel = 150;
    const closest = mp.vehicles.getClosest(
        [player.position.x, player.position.y, player.position.z],
        1
    )[0];

    if (player.getVariable('Aduty')) {
        closest.setVariable('veh_fuel', fuel);
        return player.notify('~g~Du hast mithilfe deines Adminmodus das Fahrzeug getankt!');
    }

    if (player.getVariable('isNearFuelstation')) {
        closest.setVariable('veh_fuel', fuel);
        player.notify('~g~Du hast dein Fahrzeug erfolgreich aufgefüllt!');
    } else {
        player.notify('~r~Du bist nicht bei einer Tankstelle');
    }
});
