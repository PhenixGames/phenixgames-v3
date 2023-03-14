require('./_car.js');

mp.events.addCommand('color', (player, color = null) => {
    if (player.getVariable('isTeam')) {
        if (color === null) return player.notify('~r~Geb ne farbe an du Depp!');

        color = color.split(' ');
        player.vehicle.setColor(Number(color[0]), Number(color[1]));
    }
});

mp.events.addCommand('speed', (player, speed = 1) => {
    if (player.getVariable('isTeam')) {
        if (speed === null) return player.notify('~r~Geb nh Speed an du Depp!');

        player.call('Player:Vehicle:ChangeSpeed', [speed]);
    }
});

mp.events.addCommand('fuel', (player) => {
    if(!player.getVariable('Aduty')) return;
    var fuel = 150; //150 ist aktuell der Maximale Tankstand
    let closest = mp.vehicles.getClosest(
        [player.position.x, player.position.y, player.position.z],
        1
    )[0];
    closest.setVariable('veh_fuel', fuel);
    player.notify('~g~Du hast mithilfe deines Adminmodus das Fahrzeug getankt!');
});
