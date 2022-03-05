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
    mp.game.controls.disableControlAction(0, 140, true);
    mp.game.controls.disableControlAction(0, 223, true);
    mp.game.controls.disableControlAction(0, 257, true);
});