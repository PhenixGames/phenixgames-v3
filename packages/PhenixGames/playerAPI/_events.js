
mp.events.add('Server:Handle:Damage', (Shootingplayer, targetplayer, weapon, boneIndex, damage) => {
    let newdamage;
    if (boneIndex === 20) {
        newdamage = 60;
    }else {
        newdamage = damage * 0.3
    }
    
    
    ApplyDamageToPlayer(Shootingplayer, targetplayer, newdamage);

});

function ApplyDamageToPlayer(Shootingplayer, target, damage){
    //Shootingplayer need a Hud to show if he Hitted
    Shootingplayer.outputChatBox(`Du hast an dem Spieler ${damage} Schaden gemacht`);
    var health = target.health;
    var armour = target.armour;

    if(damage >= armour){
        damage = damage - armour;

        target.armour = 0;

        target.health = (health < damage) ? target.health = 0 : target.health = health - damage;
    }else {
        target.armour = armour - damage;
    }
}