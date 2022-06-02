const Perms = require('../../PhenixGames/playerAPI/permissionSystem.js');

mp.events.addCommand("heal", async (player) => {

    if(await Perms.hasPermissions(player, ["heal"])) {
        player.health = 100;
    }

});

mp.events.addCommand("revive", async (player, target) => {
    if(!player.getVariable("Aduty"))return

    if(await Perms.hasPermissions(player, ["tp_to"])) {
        var playerFound = false;
        if(typeof target !== Number) {
            mp.players.forEach(
                (tg) => {
                    if(tg.getVariable("playerId") == target){
                        if(tg.health == 0) return player.notify("Der spieler muss nicht wiederbelebt werden");
                        tg.call("close:Death:Browser");
                        tg.spawn(new mp.Vector3(tg.position.x, tg.position.y, tg.position.z + 1));
                        tg.health = 100;
                        tg.notify("Du wurdest von einem Administrator Wiederbelebt");
                        player.notify("Du hast einen Spieler wiederbelebt");
                        return playerFound = true;
                    }
                }
            );

            if(!playerFound) return player.notify(`Der Spieler mit der ID ${target} wurde nicht gefunden`);
        }
    }

});