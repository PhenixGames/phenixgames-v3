const {
    FAPI
} = require("./FuelStationApi");
const debug = require('../../../_assets/json/debug/debug.json').fuelstation;

mp.events.add('playerEnterColshape', async (player, shape) => {

    if(!FAPI.isFuelstation(shape)) return;

    await FAPI.enter(player, shape);

    if (debug) player.notify("Du betrittst das gelände einer Tankstelle");
});

mp.events.add("playerExitColshape", (player, shape) => {
    if (debug) console.log("Player Exit Colshape");

    if(!FAPI.isFuelstation(shape)) return;
    
    if (debug) player.notify("~g~Du verlässt das gelände einer Tankstelle");

    FAPI.removeMarkers(player);
    
    player.setVariable('isnearFuelstation', false);
    player.setVariable("Fuelstation_id", null);
});

mp.events.add("Server:Request:Data:Fuelstation", async (player) => {

    if(player.vehicle) return player.notify("~r~Du kannst nicht in einem Fahrzeug sein!");

    const fuelstation = await FAPI.getFuelStation({
        stationid: player.getVariable("Fuelstation_id")
    });

    if (!fuelstation) {
        return player.call("Player:Gasstation:NotFound", [fuelstation]);
    }

    const dieselpreis = FAPI.calculatePrice({
        fueltype: "diesel",
        fuelstation
    });

    const benzinpreis = FAPI.calculatePrice({
        fueltype: "benzin",
        fuelstation
    })

    const fuelsationname = fuelstation.name;
    
    const cars = FAPI.getClosestVehicles({player, range: 5, amount: 5})

    const items = {
        'name': fuelsationname,
        'diesel_price': dieselpreis,
        'benzin_price': benzinpreis,
        'cars': cars
    };

    player.call("Player:Init:Gasstation", [JSON.stringify(items)])
    if (debug) console.log(items);
});


mp.events.add('Server:Car:Refuel', async (player, carId, newfuel, price) => {
    return await FAPI.fuel({player, newfuel, id: carId, price});
});