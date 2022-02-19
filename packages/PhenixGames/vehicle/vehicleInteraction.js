mp.events.add('keypress:X', (player) => {
    player.vehicle.engine = true
});

mp.events.add('playerEnterVehicle', (player, vehicle, seat) => {
    vehicle.engine = false;
});