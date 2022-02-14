mp.events.addCommand('weapon', (player, weapon = "weapon_specialcarbine_mk2") => {
    if(player.getVariable('isTeam')) {
        player.giveWeapon(mp.joaat(weapon), 1000);
    }
});