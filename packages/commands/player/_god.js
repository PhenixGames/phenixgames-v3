mp.events.addCommand("god", (player) => {

    //? IF USER IS ALREADY IN GODMODE
    if(player.getVariable('god')) {
        player.setVariable('god', false);
        mp.players.call("Set:God", [false]);
    }else {
        player.setVariable('god', true);
        mp.players.call("Set:God", [true]);
    }

    player.notify((player.getVariable('god')) ? '~g~Du bist im Godmode': '~r~Du hast den Godmode verlassen');
});