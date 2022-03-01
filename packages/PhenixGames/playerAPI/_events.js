mp.events.add('Apply:Damage:to:Player', (player, target, damage) => {

    const health = target.healt;
    const armour = target.armour;
    armour = armour -damage;
    if(armour > 0){
        health = health + armour
    }
    if(health<0){
        health = 0;
    }
    target.healt = health;

    console.log("Health " + target.healt, "armour " = target.armour);

    setTimeout(() => {
        console.log('target new healt ' + health)
    }, 100)
});