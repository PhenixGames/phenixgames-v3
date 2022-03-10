const playerAPI = require("../../PhenixGames/playerAPI");
const Perms = require('../../PhenixGames/playerAPI/permissionSystem')

mp.events.addCommand('tp', async (player, location) => {
    if(await Perms.hasPermissions(player, ["tp"])  && location.indexOf(',') !== -1) {
        const changePos = playerAPI.changePlayerPos(player, JSON.stringify(location));
        if(!changePos) player.notify('Etwas ist schief gelaufen!')
    }
});

mp.events.addCommand('tpto', async (player, target) =>{
    tpto(player, target);
});
mp.events.addCommand('goto', async (player, target) =>{
    tpto(player, target);
});
mp.events.addCommand('bring', async (player, target) =>{
    bring(player, target);
});
async function tpto(player, target){
    if(!player.getVariable("Aduty"))return

    if(await Perms.hasPermissions(player, ["tp_to"])) {
        if(typeof target == 'number'){
            mp.players.forEach(
                (tg) => {
                    if(tg.getVariable("playerId") == target){
                        const pos = tg.position.x + ', ' + tg.position.y + ', ' + tg.position.z;
                        const changePos = playerAPI.changePlayerPos(player, pos, null, JSON.stringify(tg.dimension))
                        if(!changePos) player.notify('Etwas ist schief gelaufen!')
                    }else {
                        return player.notify(`Der Spieler mit der ID ${target} wurde nicht gefunden`);
                    }
                }
            );
        }else {
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
        
    }
}
function bring(player, target){
    if(await Perms.hasPermissions(player, ["tp_to"])) {
        if(typeof target == 'number'){
            mp.players.forEach(
                (tg) => {
                    if(tg.getVariable("playerId") == target){
                        const pos = player.position.x + ', ' + player.position.y + ', ' + player.position.z;
                        const changePos = playerAPI.changePlayerPos(target, pos, null, JSON.stringify(tg.dimension))
                        if(!changePos) player.notify('Etwas ist schief gelaufen!')
                    }else {
                        return player.notify(`Der Spieler mit der ID ${target} wurde nicht gefunden`);
                    }
                }
            );
        }else {
            mp.players.forEach(
                (tg) => {
                    if(tg.socialClub == target){
                        const pos = player.position.x + ', ' + player.position.y + ', ' + player.position.z;
                        const changePos = playerAPI.changePlayerPos(target, pos, null, JSON.stringify(tg.dimension))
                        if(!changePos) player.notify('Etwas ist schief gelaufen!')
                    }else {
                        return player.notify("Der Spieler wurde nicht gefunden");
                    }
                }
            );
        }
        
    }
}

mp.events.addCommand('tptoveh', async (player, target) =>{
    if(!player.getVariable("Aduty"))return
    if(await Perms.hasPermissions(player, ["tp_to"])) {
        if(!typeof target == 'number') return player.notify(`Das Fahrzeug ${target} ist keine ID`);
        mp.vehicles.forEach(
            (tg) => {
                if(tg.getVariable("veh_id") == target){
                    const pos = tg.position.x + ', ' + tg.position.y + ', ' + tg.position.z;
                    const changePos = playerAPI.changePlayerPos(player, pos, null, JSON.stringify(tg.dimension))
                    if(!changePos) player.notify('Etwas ist schief gelaufen!')
                }else {
                    return player.notify(`Das Fahrzeug mit der ID ${target} wurde nicht gefunden`);
                }
            }
        );
    }
});