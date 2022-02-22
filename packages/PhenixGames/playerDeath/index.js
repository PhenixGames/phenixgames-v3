mp.events.add("playerDeath", (player, reason, killer) => {
    player.call("Open:Death:Browser");
});

 mp.events.add("Respawn:At:Hospital", (player) => {
    player.spawn(new mp.Vector3(342.44623, -1398.0957, 32.50924));
    player.notify("~g~Du wurdest Respawnt")
    player.call('close:Death:Browser')
});