const Perms = require('../../PhenixGames/playerAPI/permissionSystem.js')
mp.events.addCommand('weapon', async (player, weapon = "specialcarbine_mk2") => {
    if(await Perms.hasPermissions(player, ["spawn_weapon"])) {
        player.giveWeapon(mp.joaat("weapon_" + weapon), 10000);
    }
});