const { FAPI } = require("./FuelStationApi");

mp.events.addCommand('fuelmarker', (player, arg, id) => {
    const pos = player.position.x + ', ' + player.position.y + ', ' + (player.position.z - 1);
    FAPI.saveMarker(id, pos);
 });