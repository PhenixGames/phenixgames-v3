const permissionSystem = require('../playerAPI/permissionSystem')

mp.events.add('perms', ( player, args ) => {
    console.log(JSON.stringify(args));
});

mp.events.addCommand("permsupdate", () => {
    mp.players.forEach((player) => {
        if(player.getVariable('syncPlayer')) {
            permissionSystem.setPlayerPermissionsLocal(player);
        }
    });
});