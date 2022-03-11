const Perms = require('../../PhenixGames/playerAPI/permissionSystem.js');

mp.events.addCommand("heal", async (player) => {

    if(await Perms.hasPermissions(player, ["heal"])) {
        player.health = 100;
    }

});

mp.events.addCommand("revive", async (player, target) => {
    if(await Perms.hasPermissions(player, ["revive"])) {
        if(typeof target == 'number'){
            mp.players.forEach(
                (tg) => {
                    if(tg.getVariable("playerId") == target){
                        tg.cal("close:Death:Browser");
                        tg.spawn(new mp.Vector3(tg.position.x, tg.position.y, tg.position.z + 1));
                    }else {
                        return player.notify(`Der Spieler mit der ID ${target} wurde nicht gefunden`);
                    }
                }
            );
        }else {
            mp.players.forEach(
                (tg) => {
                    if(tg.socialClub == target){
                        tg.cal("close:Death:Browser");
                        tg.spawn(new mp.Vector3(tg.position.x, tg.position.y, tg.position.z + 1));
                    }else {
                        return player.notify("Der Spieler wurde nicht gefunden");
                    }
                }
            );
        }
    }

});