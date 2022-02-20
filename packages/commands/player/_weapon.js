mp.events.addCommand('weapon', (player, weapon = "specialcarbine_mk2") => {
    if(player.getVariable('isTeam')) {
        player.giveWeapon(mp.joaat("weapon_" + weapon), 10000);
    }
});