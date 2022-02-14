mp.events.addCommand("heal", (player) => {
    if(player.getVariable('isTeam')) {
        player.health = 100;
    }
});