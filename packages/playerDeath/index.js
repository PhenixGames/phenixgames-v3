function playerDeathHandler(player, reason, killer) {
    if(player.getVariable('isTeam')) {
        var rot = player.rotation;
        player.health = 100
        player.spawn(player.position);
        player.rotation = rot;
    }
 }
 
 mp.events.add("playerDeath", playerDeathHandler);