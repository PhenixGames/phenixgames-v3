mp.events.add('Apply:Damage:to:Player', (player, target, damage) => {

    var health = target.healt;
    var armour = target.armour;
    armour = armour - damage;
    if (armour > 0) {
        health = health + armour
    }
    if (health < 0) {
        health = 0;
    }
    target.healt = health;

    console.log("Health " + target.health + "armour " + target.armour);

    setTimeout(() => {
        console.log('target new healt ' + health)
    }, 100)
});