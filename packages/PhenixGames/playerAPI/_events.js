mp.events.add('Apply:Damage:to:Player', (player, target, damage) => {

    var health = target.health;
    var armour = target.armour;

    if(damage >= armour){
        damage = damage - armour;

        target.armour = 0;

        target.health = (health < damage) ? target.health = 0 : target.health = health - damage;
    }else {
        target.armour = armour - damage;
    }
});