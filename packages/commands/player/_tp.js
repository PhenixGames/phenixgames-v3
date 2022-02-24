const playerAPI = require("../../PhenixGames/playerAPI");

mp.events.addCommand('tp', (player, location) => {
    if(Perms.hasPermissions(player, ["tp"])  && location.indexOf(',') !== -1) {
        const changePos = playerAPI.changePlayerPos(player, JSON.stringify(location));
        if(!changePos) player.notify('Etwas ist schief gelaufen!')
    }
});

mp.events.addCommand('tpto', (player, target) =>{
    if(Perms.hasPermissions(player, ["tp_to"])) {
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