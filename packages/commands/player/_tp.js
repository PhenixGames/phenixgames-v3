const playerAPI = require("../../PhenixGames/playerAPI");

mp.events.addCommand('tp', (player, location) => {
    if(player.getVariable('isTeam') && location.indexOf(',') !== -1) {
        playerAPI.changePlayerPos(player, JSON.stringify(location));
    }
});

mp.events.addCommand('tpto', (player, target) =>{
    if(player.getVariable('isTeam')){
        mp.players.forEach(
            (tg) => {
                if(tg.name == target){
                    const pos = tg.position.x + ', ' + tg.position.y + ', ' + tg.position.z;
                    playerAPI.changePlayerPos(player, pos, null, JSON.stringify(tg.dimension))
                }
            }
        );
    }
});