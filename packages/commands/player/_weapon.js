const PermissionSystem = require('../../PhenixGames/playerAPI/PermissionSystem.js');

mp.events.addCommand('weapon', async (player, weapon = "specialcarbine_mk2") => {
    if(await PermissionSystem.hasPermissions(player, ["spawn_weapon"])) {
        player.giveWeapon(mp.joaat("weapon_" + weapon), 10000);
    }
});