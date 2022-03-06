const permissionSystem = require('../../PhenixGames/playerAPI/permissionSystem')

mp.events.add('perms', ( player, args ) => {
    console.log(JSON.stringify(args));
});

mp.events.addCommand("permsupdate", (player, args) => {
    console.log('1')
    mp.players.forEach((player) => {
        if(player.getVariable('syncPlayer')) {
            await permissionSystem.setPlayerPermissionsLocal(player);
        }
    });
});