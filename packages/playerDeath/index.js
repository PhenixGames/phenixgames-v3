function playerDeathHandler(player, reason, killer) {
    player.health = 100
    player.spawn(player.position);
 }
 
 mp.events.add("playerDeath", playerDeathHandler);