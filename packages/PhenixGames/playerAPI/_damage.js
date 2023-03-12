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

mp.events.add(
    'Server:Handle:Damage',
    (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage, weaponGroupHash) => {
        const max = defaultPercent.max;
        const min = defaultPercent.max;

        if (weapon in weaponDamage.damageWeapons) {
            max = weaponDamage.damageWeapons[weapon].max;
            min = weaponDamage.damageWeapons[weapon].min;
        } else if (weaponGroupHash in weaponDamage.damageWeaponGroups) {
            max = weaponDamage.damageWeaponGroups[weaponGroupHash].max;
            min = weaponDamage.damageWeaponGroups[weaponGroupHash].min;
        }

        const percent = Math.random() * (max - min) + min / 100;
        let customDamage = damage - damage * percent;

        if (boneIndex === 20) {
            customDamage /= 10;
        }

        targetEntity.health -= parseInt(customDamage) || 100;
    }
);
