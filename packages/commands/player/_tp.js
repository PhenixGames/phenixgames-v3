const playerAPI = require("../../PhenixGames/playerAPI");
const Perms = require('../../PhenixGames/playerAPI/permissionSystem.js')

mp.events.addCommand('tp', (player, location) => {
    if(await Perms.hasPermissions(player, ["tp"])  && location.indexOf(',') !== -1) {
        const changePos = playerAPI.changePlayerPos(player, JSON.stringify(location));
        if(!changePos) player.notify('Etwas ist schief gelaufen!')
    }
});

mp.events.addCommand('tpto', (player, target) =>{
    if(await Perms.hasPermissions(player, ["tp_to"])) {
        mp.players.forEach(
            (tg) => {
                if(tg.socialClub == target){
                    const pos = tg.position.x + ', ' + tg.position.y + ', ' + tg.position.z;
                    const changePos = playerAPI.changePlayerPos(player, pos, null, JSON.stringify(tg.dimension))
                    if(!changePos) player.notify('Etwas ist schief gelaufen!')
                }else {
                    return player.notify("Der Spieler wurde nicht gefunden");
                }
            }
        );
    }
});

mp.events.addCommand('tptovehid', (player, target) =>{
    if(await Perms.hasPermissions(player, ["tp_to"])) {
        mp.vehicles.forEach(
            (tg) => {
                if(tg.getVariable("veh_id") == target){
                    const pos = tg.position.x + ', ' + tg.position.y + ', ' + tg.position.z;
                    const changePos = playerAPI.changePlayerPos(player, pos, null, JSON.stringify(tg.dimension))
                    if(!changePos) player.notify('Etwas ist schief gelaufen!')
                }else {
                    return player.notify("Das Fahrzeug wurde nicht gefunden");
                }
            }
        );
    }
});