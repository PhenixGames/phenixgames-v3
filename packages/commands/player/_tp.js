mp.events.addCommand('tp', (player, location) => {
    if(player.getVariable('isTeam')) {
        location = location.split(', ');
        console.log(location)
        player.position = new mp.Vector3(Number(location[0]), Number(location[1]), Number(location[2]));
    }
});

mp.events.addCommand('tpto', (player, target) =>{
    if(player.getVariable('isTeam')){
        mp.players.forEach(
            (tg) => {
                if(tg.name == target){
                    player.position = tg.position;
                    player.dimension = tg.dimension;
                }
            }
        );
    }
});