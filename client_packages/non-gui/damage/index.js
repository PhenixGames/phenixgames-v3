mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    if (targetEntity.type === 'player') {
        var newdamage;
        let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
        let weaponModel = mp.game.weapon.getWeapontypeModel(weaponHash);





        
        newdamage = damage * 11;


        mp.gui.chat.push(`hash: ${weaponHash}, model: ${weaponModel}`);
        mp.gui.chat.push(`olddmg: ${damage}, newdmg: ${newdamage}`);
        mp.events.callRemote("Apply:Damage:to:Player", targetEntity, newdamage);
        return true;
    }else {
        return false;
    }
});
