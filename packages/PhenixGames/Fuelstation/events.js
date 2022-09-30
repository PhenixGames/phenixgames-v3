const Fuelstations = require('../Fuelstation/');
const {
    FAPI
} = require("./FuelStationApi");
const debug = require('../../../_assets/json/debug/debug.json').fuelstation;

mp.events.add('playerEnterColshape', async (player, shape) => {
    if (Fuelstations.is_entity_fuelstation(shape)) {
        await playerEnteredFuelstation(player, shape)
        if (debug) player.notify("Du betrittst das gelände einer Tankstelle");
        return;
    }
    
    if (debug) player.notify("~r~Du bist nicht in einer Tankstelle");
});

mp.events.add("playerExitColshape", (player, shape) => {
    if (debug) {
        console.log("Player Exit Colshape");
    }
    if (Fuelstations.is_entity_fuelstation(shape)) {
        if (debug) player.notify("~g~Du verlässt das gelände einer Tankstelle");
    } else {
        if (debug) player.notify("~r~Du bist nicht in einer Tankstelle");
    }

    FAPI.removeMarkers(player);

    player.setVariable('isnearFuelstation', false);
    player.setVariable("Fuelstation_id", null);
});

mp.events.add("Server:Request:Data:Fuelstation", async (player) => {

    var fuelstation = await FAPI.getFuelStation({
        stationid: player.getVariable("Fuelstation_id")
    });

    if (!fuelstation) {
        return player.call("Player:Gasstation:NotFound", [fuelstation]);
    }

    var denzinpreis = FAPI.calculatePrice({
        fueltype: "diesel",
        fuelstation: fuelstation
    });

    var dieselpreis = FAPI.calculatePrice({
        fueltype: "benzin",
        fuelstation: fuelstation
    })

    var fuelsationname = fuelstation.name;

    var cars = [{
        name: "test",
        name: "test2"
    }]; //Only the nearest 5 in range of 5[meter=?] of fuelstation

    let items = {
        'name': fuelsationname,
        'diesel_price': dieselpreis,
        'benzin_price': denzinpreis,
        'cars': cars
    };

    player.call("Player:Init:Gasstation", [JSON.stringify(items)])
    if (debug) console.log(items);
});

async function playerEnteredFuelstation(player, shape) {
    var res = await FAPI.getMarker({
        stationid: shape.getVariable('id')
    });
    
    if (debug) {
        console.log("-- Create Markers -- " + res.length + " --");
        console.log(res);
    }
    for (var i = 0; i < res.length; i++) {
        try {

            FAPI.spawnMarker({
                player,
                pos: new mp.Vector3(res[i].pos.split(', ')),
                size: res[i].size,
                id: res[i].marker_id
            });

        } catch (error) {
            console.log("Fehler beim erstellen des Markers: " + error);
        }
    }
    player.setVariable('isnearFuelstation', true);
    player.setVariable("Fuelstation_id", shape.getVariable('id'));
}

