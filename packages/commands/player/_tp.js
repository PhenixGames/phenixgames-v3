const playerAPI = require("../../PhenixGames/playerAPI");

mp.events.addCommand('tp', (player, location) => {
    if(player.getVariable('isTeam') && location.indexOf(',') !== -1) {
        const changePos = playerAPI.changePlayerPos(player, JSON.stringify(location));
        if(!changePos) player.notfiy('Etwas ist schief gelaufen!')
    }
});

mp.events.addCommand('tpto', (player, target) =>{
    if(player.getVariable('isTeam')){
        mp.players.forEach(
            (tg) => {
                if(tg.name == target){
                    const pos = tg.position.x + ', ' + tg.position.y + ', ' + tg.position.z;
                    const changePos = playerAPI.changePlayerPos(player, pos, null, JSON.stringify(tg.dimension))
                    if(!changePos) player.notfiy('Etwas ist schief gelaufen!')
                }else {
                    return player.notfiy("Der Spieler wurde nicht gefunden");
                }
            }
        );
    }
});