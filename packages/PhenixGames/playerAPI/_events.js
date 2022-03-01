mp.events.add('Apply:Damage:to:Player', (player, target, damage) => {
    target.health = target.health - damage;

    const health = (target.health < 0) ? 0 : target.health;

    console.log(health);

    setTimeout(() => {
        console.log('target new healt ' + health)
    }, 100)
});