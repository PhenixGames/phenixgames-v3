mp.events.addCommand("god", (player) => {
    if(player.getVariable('god')) {
        player.setVariable('god', false);
        mp.events.call("set:god", false);
    }else {
        player.setVariable('god', true);
        mp.events.call("set:god", true);
    }
});