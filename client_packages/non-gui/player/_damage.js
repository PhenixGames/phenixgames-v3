mp.events.add(
    'incomingDamage',
    (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
        if (targetEntity.type !== 'player') return false;

        const weaponGroupHash = mp.game.weapon.getWeapontypeGroup(weapon);
        mp.events.callRemote(
            'Server:Handle:Damage',
            sourceEntity,
            targetEntity,
            sourcePlayer,
            weapon,
            boneIndex,
            damage,
            weaponGroupHash
        );
        return false;
    }
);
