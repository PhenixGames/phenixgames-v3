const Perms = require('../../PhenixGames/playerAPI/permissionSystem.js')
mp.events.addCommand('weapon', (player, weapon = "specialcarbine_mk2") => {
    if(Perms.hasPermissions(player, ["spawn_weapon"])) {
        player.giveWeapon(mp.joaat("weapon_" + weapon), 10000);
    }
});