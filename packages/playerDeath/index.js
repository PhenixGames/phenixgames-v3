function playerDeathHandler(player, reason, killer) {
    if(player.getVariable('isTeam')) {
        player.health = 100
        player.spawn(player.position);
    }
 }
 
 mp.events.add("playerDeath", playerDeathHandler);