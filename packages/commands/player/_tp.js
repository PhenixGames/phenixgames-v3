const playerAPI = require("../../PhenixGames/playerAPI");
const Perms = require('../../PhenixGames/playerAPI/permissionSystem')

mp.events.addCommand('tp', async (player, location) => {
    if(await Perms.hasPermissions(player, ["tp"])  && location.indexOf(',') !== -1) {
        const changePos = playerAPI.changePlayerPos(player, JSON.stringify(location));
        if(!changePos) player.notify('Etwas ist schief gelaufen!')
    }
});
//good pos > -1081.7393798828125, -251.78213500976562, 36.7633171081543
//bad pos > 1.000098705291748, -250.7820281982422, -0.0738491415977478
//tp pos > "-1044.193, -236.9535, 37.96496"
//original > -1044.193, -236.9535, 37.96496
mp.events.addCommand('tpto', async (player, target) =>{
    tpto(player, target);
});
mp.events.addCommand('goto', async (player, target) =>{
    tpto(player, target);
});
mp.events.addCommand('bring', async (player, target) =>{
    bring(player, target);
});
mp.events.addCommand('tptoveh', async (player, target) =>{
    tptoveh(player, target);
});
mp.events.addCommand('bringveh', async (player, target) =>{
    bringveh(player, target);
});


async function tpto(player, target){
    if(!player.getVariable("Aduty"))return
    
    if(await Perms.hasPermissions(player, ["tp_to"])) {
        var found = false;
        if(typeof target !== Number){
            mp.players.forEach(
                (tg) => {
                    if(tg.getVariable("playerId") == target){
                        const pos = tg.position.x + ', ' + tg.position.y + ', ' + tg.position.z;
                        const changePos = playerAPI.changePlayerPos(player, pos, null, JSON.stringify(tg.dimension))
                        if(!changePos) player.notify('Etwas ist schief gelaufen!')
                        return found = true;
                    }
                }
            );
        }
        if(!found){
            return player.notify(`Der Spieler mit der ID ${target} wurde nicht gefunden`);
        }
        
    }
}
async function bring(player, target){
    if(await Perms.hasPermissions(player, ["tp_to"])) {
        var found = false;
        if(typeof target !== Number){
            mp.players.forEach(
                (tg) => {
                    if(tg.getVariable("playerId") == target){
                        tg.position = player.position;
                        tg.heading = player.heading;
                        tg.dimension = player.dimension;
                        return found = true;
                    }
                }
            );
        }
        if(!found){
            return player.notify(`Der Spieler mit der ID ${target} wurde nicht gefunden`);
        }
        
    }
}

async function tptoveh(player, target){
    if(!player.getVariable("Aduty"))return
    
    if(await Perms.hasPermissions(player, ["tp_to"])) {
        var found = false;
        if(typeof target !== Number){
            mp.vehicles.forEach(
                (tg) => {
                    if(tg.getVariable("veh_id") == target){
                        player.position = tg.position;
                        player.heading = tg.heading;
                        player.dimension = tg.dimension;
                        return found = true;
                    }
                }
            );
        }
        if(!found){
            return player.notify(`Das Fahrzeug mit der ID ${target} wurde nicht gefunden`);
        }
        
    }
}

async function bringveh(player, target){
    if(await Perms.hasPermissions(player, ["tp_to"])) {
        var found = false;
        if(typeof target !== Number){
            mp.vehicles.forEach(
                (tg) => {
                    if(tg.getVariable("veh_id") == target){
                        tg.position = player.position;
                        tg.heading = player.heading;
                        tg.dimension = player.dimension;
                        return found = true;
                    }
                }
            );
        }
        if(!found){
            return player.notify(`Das Fahrzeug mit der ID ${target} wurde nicht gefunden`);
        }
        
    }
}

