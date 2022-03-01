mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    if (targetEntity.type === 'player') {
        var newdamage;
        const Headshotmp = 1.1;
        let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
        let weaponModel = mp.game.weapon.getWeapontypeModel(weaponHash);
        var Headshot = false;

        if (boneIndex === 20) {
            Headshot = true;
        }
       


  
        newdamage = damage * 11;


        //Headshotmp ist am ende auf den dmg wert anzuwenden falls ein Headschot gemacht wurde!
        if(Headshot){
            newdamage = newdamage * Headshotmp;
        }


        mp.gui.chat.push(`hash: ${weaponHash}, model: ${weaponModel}`);
        mp.gui.chat.push(`olddmg: ${damage}, newdmg: ${newdamage}`);
        mp.events.callRemote("Apply:Damage:to:Player", targetEntity, newdamage);
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