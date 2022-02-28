const Perms = require('../../PhenixGames/playerAPI/permissionSystem.js');

mp.events.addCommand("heal", async (player) => {

    if(await Perms.hasPermissions(player, ["heal"])) {
        player.health = 100;
    }

});