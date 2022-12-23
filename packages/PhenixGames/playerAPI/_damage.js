const weaponDamage = {
    ignoreWeapons: {
        911657153: 'Stun Gun',
    },
    damageWeapons: {
        3249783761: {
            // weaponHash
            max: 90,
            min: 85,
        },
    },
    damageWeaponGroups: {
        2685387236: {
            // weaponGroupHash
            name: 'melee',
            max: 80,
            min: 40,
        },
        416676503: {
            name: 'handguns',
            max: 80,
            min: 40,
        },
        3337201093: {
            name: 'submachine gun',
            max: 80,
            min: 40,
        },
        860033945: {
            name: 'shotgun',
            max: 80,
            min: 40,
        },
        970310034: {
            name: 'Assault Rifle',
            max: 80,
            min: 40,
        },
        1159398588: {
            name: 'Light Machine Gun',
            max: 80,
            min: 40,
        },
        3082541095: {
            name: 'Sniper',
            max: 80,
            min: 40,
        },
        2725924767: {
            name: 'Heavy Weapon',
            max: 80,
            min: 40,
        },
        1548507267: {
            name: 'Throwables',
            max: 80,
            min: 40,
        },
        4257178988: {
            name: 'Misc',
            max: 80,
            min: 40,
        },
    },
};

const defaultPercent = {
    max: 85,
    min: 60,
};

mp.events.add('Server:Handle:Damage', (player, target, weapon, boneIndex, damage) => {
    if (!target || target.getVariable('Aduty')) return;

    const max = defaultPercent.max;
    const min = defaultPercent.max;

    const weaponGroupHash = mp.game.weapon.getWeapontypeGroup(weapon);
    if (weapon in damageWeapons) {
        max = damageWeapons[weapon].max;
        min = damageWeapons[weapon].min;
    } else if (weaponGroupHash in damageWeaponGroups) {
        max = damageWeaponGroups[weaponGroupHash].max;
        min = damageWeaponGroups[weaponGroupHash].min;
    }

    const percent = Math.random() * (max - min) + min / 100;
    let customDamage = damage - damage * percent;

    if (boneIndex === 20) {
        customDamage /= 10;
    }

    target.applyDamageTo(parseInt(customDamage), true);

    const currentHealth = target.getHealth();
    if (currentHealth > 0) {
        return true;
    }

    //applyDamage(player, target, newdamage);
});

// function applyDamage(player, target, damage) {
//     player.outputChatBox(`Du hast getroffen mit ${damage} Schaden`);
//     target.outputChatBox(`Du wurdest getroffen mit ${damage} Schaden`);
//     const health = target.health;
//     const armour = target.armour;

//     if (damage >= armour) {
//         damage = damage - armour;

//         target.armour = 0;

//         target.health = health < damage ? (target.health = 0) : (target.health = health - damage);
//     } else {
//         target.armour = armour - damage;
//     }
// }
