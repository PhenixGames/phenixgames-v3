const Perms = require('../../PhenixGames/playerAPI/permissionSystem.js')
mp.events.addCommand("heal", (player) => {
    if(Perms.hasPermissions(player, ["heal"])) {
        player.health = 100;
    }
});