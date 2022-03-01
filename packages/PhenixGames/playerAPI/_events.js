mp.events.add('Apply:Damage:to:Player', (player, target, damage) => {

    var health = target.health;
    var armour = target.armour;

    console.log(health, armour)

    if(damage >= armour){
        damage = damage - armour;

        target.armour = 0;

        if(health < damage){
            target.health = 0;
        }else {
            target.health = health - damage;
        }

    }else {
        target.armour = armour - damage;
    }
});