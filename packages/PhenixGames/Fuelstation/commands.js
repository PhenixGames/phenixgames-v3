const { FAPI } = require('./FuelStationApi');

const PermissionSystem = require('../../PhenixGames/playerAPI/PermissionSystem');

mp.events.addCommand('fuelmarker', (player, arg, id) => {
    if (!player.getVariable('Aduty')) return;
    if (PermissionSystem.hasPermissions(player, ['fuelmarker'])) {
        const pos = player.position.x + ', ' + player.position.y + ', ' + (player.position.z - 1);
        FAPI.saveMarker(id, pos);
    }
});
