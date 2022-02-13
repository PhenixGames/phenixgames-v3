mp.events.addCommand('weapon', (player, weapon = "weapon_specialcarbine_mk2") => {
    player.giveWeapon(mp.joaat(weapon), 1000);
});