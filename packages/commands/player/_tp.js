const AccountAPI = require("../../PhenixGames/account/AcountAPI");
const PermissionSystem = require("../../PhenixGames/playerAPI/PermissionSystem");

mp.events.addCommand('tp', async (player, location) => {
    if(await PermissionSystem.hasPermissions(player, ["tp"])  && location.indexOf(',') !== -1) {
        const changePos = AccountAPI.changePos(player, JSON.stringify(location));
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
    
    if(await PermissionSystem.hasPermissions(player, ["tp_to"])) {
        var found = false;
        if(!isNaN(target)){
            mp.players.forEach(
                (tg) => {
                    if(tg.getVariable("playerId") == target){
                        const changePos = AccountAPI.changePos(player, tg.position, null, JSON.stringify(tg.dimension))
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
    if(await PermissionSystem.hasPermissions(player, ["tp_to"])) {
        var found = false;
        if(!isNaN(target)){
            mp.players.forEach(
                (tg) => {
                    if(tg.getVariable("playerId") == target) {
                        const changePos = AccountAPI.changePos(target, player.position, player.heading, player.dimension)
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

async function tptoveh(player, target){
    if(!player.getVariable("Aduty"))return
    
    if(await PermissionSystem.hasPermissions(player, ["tp_to"])) {
        var found = false;
        if(!isNaN(target)){
            mp.vehicles.forEach(
                (tg) => {
                    if(tg.getVariable("veh_id") == target){
                        const changePos = AccountAPI.changePos(player, tg.position, player.heading, tg.dimension)
                        if(!changePos) player.notify('Etwas ist schief gelaufen!')
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
    if(await PermissionSystem.hasPermissions(player, ["tp_to"])) {
        var found = false;
        if(!isNaN(target)){
            mp.vehicles.forEach(
                (tg) => {
                    if(tg.getVariable("veh_id") == target){
                        const changePos = AccountAPI.changePos(target, player.position, player.heading, player.dimension)
                        if(!changePos) player.notify('Etwas ist schief gelaufen!')
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

