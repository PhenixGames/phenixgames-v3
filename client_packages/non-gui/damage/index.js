mp.events.add('outgoingDamage', (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
    if (targetEntity.type === 'player') {
        var newdamage;
        const Headshotmp = 1.1;
        let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
        let weaponModel = mp.game.weapon.getWeapontypeModel(weaponHash);
        var Headshot = false;
        if (boneIndex === 20) {
            Headshot = true;
            damage = 100;
        }

        var damageConfig = [
            {
                'i': '0',
                'd': '100',
            },
            {
                'i': '111',
                'd': ''
            },
            {
                'i': '5',
                'd': '0.3'
            },
            {
                'i': '96',
                'd': '1.3'
            },
            {
                'i': '44',
                'd': '0.2'
            },
            {
                'i': '45',
                'd': '0.2'
            },
            {
                'i': '56',
                'd': '0.2'
            },
            {
                'i': '57',
                'd': '0.2'
            },
            {
                'i': '59',
                'd': '0.2'
            },
            {
                'i': '60',
                'd': '0.2'
            },
            {
                'i': '49',
                'd': '0.2'
            },
            {
                'i': '50',
                'd': '0.2'
            },
            {
                'i': '53',
                'd': '0.2'
            },
            {
                'i': '54',
                'd': '0.2'
            },
            {
                'i': '66',
                'd': '1.3'
            },
            {
                'i': '91',
                'd': '1.1'
            },
            {
                'i': '27',
                'd': '1.1'
            },
            {
                'i': '68',
                'd': '1.4'
            },
            {
                'i': '112',
                'd': '1.05'
            },
            {
                'i': '1',
                'd': '1.4'
            },
            {
                'i': '99',
                'd': '100'
            },
            {
                'i': '4',
                'd': '1.1'
            },
            {
                'i': '23',
                'd': '1.2'
            },
            {
                'i': '119',
                'd': '1'
            },
            {
                'i': '117',
                'd': '1'
            },
            {
                'i': '42',
                'd': '1.1'
            },
            {
                'i': '110',
                'd': '1'
            },
            {
                'i': '114',
                'd': '1'
            },
            {
                'i': '116',
                'd': '1'
            },
            {
                'i': '120',
                'd': '1'
            },
            {
                'i': '17',
                'd': '0.1'
            },
            {
                'i': '106',
                'd': '1'
            },
            {
                'i': '67',
                'd': '1.3'
            },
            {
                'i': '35',
                'd': '2'
            },
            {
                'i': '26',
                'd': '1'
            },
            {
                'i': '36',
                'd': '2'
            },
            {
                'i': '37',
                'd': '2'
            },
            {
                'i': '38',
                'd': '2'
            },
            {
                'i': '105',
                'd': '1.8'
            },
            {
                'i': '43',
                'd': '1'
            },
            {
                'i': '48',
                'd': '1'
            },
            {
                'i': '52',
                'd': '1'
            },
            {
                'i': '55',
                'd': '1'
            },
            {
                'i': '58',
                'd': '1'
            },
            {
                'i': '109',
                'd': '1.8'
            },
            {
                'i': '70',
                'd': '1.2'
            },
            {
                'i': '90',
                'd': '1.3'
            },
            {
                'i': '107',
                'd': '1'
            },
            {
                'i': '98',
                'd': '2'
            },
            {
                'i': '18',
                'd': '0.4'
            },
            {
                'i': '124',
                'd': '1.4'
            },
            {
                'i': '62',
                'd': '1'
            },
            {
                'i': '15',
                'd': '1'
            },
            {
                'i': '95',
                'd': '1.3'
            },
            {
                'i': '113',
                'd': '1.7'
            },
            {
                'i': '97',
                'd': '1.7'
            },
            {
                'i': '69',
                'd': '1.2'
            },
            {
                'i': '108',
                'd': '1'
            },
            {
                'i': '94',
                'd': '1.1'
            },
            {
                'i': '104',
                'd': '1'
            },
            {
                'i': '122',
                'd': '1'
            },
            {
                'i': '14',
                'd': '1.2'
            },
            {
                'i': '16',
                'd': '0.4'
            },
            {
                'i': '127',
                'd': '1'
            },
            {
                'i': '71',
                'd': '1'
            },
            {
                'i': '34',
                'd': '1.7'
            },
            {
                'i': '7',
                'd': '0.7'
            },
            {
                'i': '2',
                'd': '1.5'
            },
            {
                'i': '103',
                'd': '1'
            },
            {
                'i': '72',
                'd': '1'
            },
            {
                'i': '11',
                'd': '1.3'
            },
            {
                'i': '118',
                'd': '1'
            },
            {
                'i': '121',
                'd': '1'
            },
            {
                'i': '123',
                'd': '1'
            },
            {
                'i': '81',
                'd': '0.3'
            },
            {
                'i': '84',
                'd': '0.3'
            },
            {
                'i': '87',
                'd': '0.3'
            },
            {
                'i': '61',
                'd': '0.8'
            },
            {
                'i': '65',
                'd': '1'
            },
            {
                'i': '41',
                'd': '1.2'
            },
            {
                'i': '115',
                'd': '1'
            },
            {
                'i': '3',
                'd': '1'
            },
            {
                'i': '73',
                'd': '0.3'
            },
            {
                'i': '74',
                'd': '0.3'
            },
            {
                'i': '85',
                'd': '0.3'
            },
            {
                'i': '86',
                'd': '0.3'
            },
            {
                'i': '88',
                'd': '0.3'
            },
            {
                'i': '89',
                'd': '0.3'
            },
            {
                'i': '78',
                'd': '0.3'
            },
            {
                'i': '79',
                'd': '0.3'
            },
            {
                'i': '82',
                'd': '0.3'
            },
            {
                'i': '83',
                'd': '0.3'
            },
            {
                'i': '89',
                'd': '0.3'
            },
            {
                'i': '39',
                'd': '1.2'
            },
            {
                'i': '102',
                'd': '2'
            },
            {
                'i': '6',
                'd': '0.8'
            }




        ]

        damageConfig.map(damageC => {
            if(boneIndex === damageC.i) {
                mp.gui.chat.push(JSON.stringify(damageC))
                newdamage = damage * Number(damageC.d)
            }
        });


        //Headshotmp ist am ende auf den dmg wert anzuwenden falls ein Headschot gemacht wurde!
        if(Headshot){
            newdamage = newdamage * Headshotmp;
        }


        //mp.gui.chat.push(`hash: ${weaponHash}, model: ${weaponModel}, bone: ${boneIndex}`);
        //mp.gui.chat.push(`olddmg: ${damage}, newdmg: ${newdamage}`);
        //mp.events.callRemote("Apply:Damage:to:Player", targetEntity, newdamage);
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