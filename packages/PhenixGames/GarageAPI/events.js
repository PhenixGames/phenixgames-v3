const { GarageAPI } = require('./index.js');
hasPermissions;
const debug = require('../../../_assets/json/debug/debug.json').garage;

mp.events.add('playerEnterColshape', async (player, shape) => {
    if (!GarageAPI.isGarage(shape)) return;

    GarageAPI.spawncolshape(1);
    if (debug) player.notify('Du betrittst das gelände einer Garage');
});

mp.events.add('playerExitColshape', (player, shape) => {
    if (!GarageAPI.isGarage(shape)) return;
    if (debug) console.log('Player Exit Colshape Garage');

    if (debug) player.notify('~g~Du verlässt das gelände einer Garage');

    //TODO Kill markers etc

    player.setVariable('isNearGarage', false);
    player.setVariable('garageId', null);
});

mp.events.add('Server:Request:Data:Garage', async (player) => {
    const playerVehicles = GarageAPI.getVehFromGarage(player.getVariable('playerId'));

    player.call('Player:Init:Garage', [JSON.stringify(playerVehicles)]);
    if (debug) console.log(playerVehicles);
});

mp.events.add('Server:Car:Refuel', async (player, carId, newfuel, price) => {
    return await FAPI.fuel({ player, newfuel, id: carId, price });
});
