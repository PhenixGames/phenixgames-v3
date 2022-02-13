mp.events.addCommand("god", (player) => {

    //? IF USER IS ALREADY IN GODMODE
    if(player.getVariable('god')) {

        player.setVariable('god', false);
        mp.players.call("Set:God", [false]);

    }else {

        player.setVariable('god', true);
        mp.players.call("Set:God", [true]);

    }
});


mp.events.addCommand('weapon', (player, weapon = "weapon_specialcarbine_mk2") => {
    player.giveWeapon(mp.joaat(weapon), 1000);
});