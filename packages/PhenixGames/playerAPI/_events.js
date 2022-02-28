mp.events.add('Apply:Damage:to:Player', (player, target, damage) => {
    target.health = player.health - damage;
});