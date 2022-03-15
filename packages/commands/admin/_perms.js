const permissionSystem = require('../../PhenixGames/playerAPI/permissionSystem')

mp.events.addCommand('perms', (player, args) => {
    console.log('1')
    player.call('Player:ActivateInventory')
    console.log(JSON.stringify(args));
});

mp.events.addCommand("permsupdate", (player, args) => {
    console.log('1')
    mp.players.forEach((player) => {
        if(player.getVariable('syncPlayer')) {
            permissionSystem.setPlayerPermissionsLocal(player);
        }
    });
});