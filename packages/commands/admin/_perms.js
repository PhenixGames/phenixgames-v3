const PermissionSystem = require('../../PhenixGames/playerAPI/PermissionSystem');

mp.events.addCommand('perms', (player, args) => {});

mp.events.addCommand('permsupdate', (player, args) => {
    mp.players.forEach((player) => {
        if (player.getVariable('syncPlayer')) {
            PermissionSystem.setPerms(player);
        }
    });
});
