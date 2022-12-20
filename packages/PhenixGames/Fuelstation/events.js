const debug = require('../../../_assets/json/debug/debug.json').fuelstation;

mp.events.add('playerEnterColshape', async (player, shape) => {
    if (!global.FAPI.isFuelstation(shape)) return;

    await global.FAPI.enter(player, shape);

    if (debug) player.notify('Du betrittst das gelände einer Tankstelle');
});

mp.events.add('playerExitColshape', (player, shape) => {
    if (debug) console.log('Player Exit Colshape');

    if (!global.FAPI.isFuelstation(shape)) return;

    if (debug) player.notify('~g~Du verlässt das gelände einer Tankstelle');

    global.FAPI.removeMarkers(player);

    player.setVariable('isnearFuelstation', false);
    player.setVariable('Fuelstation_id', null);
});

mp.events.add('Server:Request:Data:Fuelstation', async (player) => {
    const fuelstation = await global.FAPI.getFuelStation({
        stationid: player.getVariable('Fuelstation_id'),
    });

    if (!fuelstation) {
        return player.call('Player:Gasstation:NotFound', [fuelstation]);
    }

    const dieselpreis = global.FAPI.calculatePrice({
        fueltype: 'diesel',
        fuelstation,
    });

    const benzinpreis = global.FAPI.calculatePrice({
        fueltype: 'benzin',
        fuelstation,
    });

    const fuelsationname = fuelstation.name;

    const cars = global.FAPI.getClosestVehicles({ player, range: 5, amount: 5 });

    const items = {
        name: fuelsationname,
        diesel_price: dieselpreis,
        benzin_price: benzinpreis,
        cars: cars,
    };

    player.call('Player:Init:Gasstation', [JSON.stringify(items)]);
    if (debug) console.log(items);
});

mp.events.add('Server:Car:Refuel', async (player, carId, newfuel, price) => {
    return await global.FAPI.fuel({ player, newfuel, id: carId, price });
});
