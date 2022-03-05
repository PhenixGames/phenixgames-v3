mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {

    
    if (targetEntity.type === 'player') {
        mp.events.callRemote("Server:Handle:Damage", targetEntity, weapon, boneIndex, damage);
        return true;
    }else {
        return false;
    }
});

//Hier wird geschaut ob ein spieler schießt und ob ein admin in der nähe ist
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    mp.players.forEachInStreamRange((player) => {//Loop of every player in range
        if (player.getVariable("Aduty")) {//if player is admin
            mp.events.callRemote("Get:Shot:Info:to:Admin", player, targetPosition, targetEntity);//Übergebe daten an den server
        }
    });
});
mp.events.add('render', () => {
    let weaponModel = mp.game.weapon.getWeapontypeModel(weaponHash);
    mp.game.controls.disableControlAction(0, 140, true);
    if(!weapon == 0){
        mp.game.controls.disableControlAction(0, 142, true);
    }
});


//Debug
 mp.keys.bind(0x76, false, function () { // F7 key
let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
let weaponModel = mp.game.weapon.getWeapontypeModel(weaponHash);
mp.gui.chat.push(`hash: ${weaponHash}, model: ${weaponModel}`);
})