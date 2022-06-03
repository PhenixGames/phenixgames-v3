const debug = require('../../../_assets/json/debug/debug.json').playerapi;

const {getPlayerInventory} = require('./_inventory');

mp.events.add('Server:Handle:Damage', (Shootingplayer, targetplayer, weapon, boneIndex, damage) => {
    let newdamage;
    if (boneIndex === 20) {
        newdamage = 60;
    }else {
        newdamage = damage * 0.3
    }
    
    if(!targetplayer.getVariable('Aduty')){
        ApplyDamageToPlayer(Shootingplayer, targetplayer, newdamage);
    }
});

//? Get the player inventory
mp.events.add('Server:Init:Inventory', (player) => {
    return getPlayerInventory({
        player_id: player.getVariable('player_id')
    });
});

//? Heal the player with a medikit
mp.events.add('Server:Activate:Medikit', (player) => {
    player.health = 100;
});

//? Heal the player with a weste
mp.events.add('Server:Activate:Weste', (player) => {
    player.armour = 100;
});

mp.events.add('Server:Player:interacteBrowser', (player, hasOpen) => {
    player.setVariable('hasBrowserOpen', hasOpen);
});

mp.events.add("Player:pressed:f6", ( player ) => {
    console.log("F6 pressed");
    if(player.getVariable('hasBrowserOpen')) return;
    var state = player.getVariable('chat:activated');// weil ich keine lust habe mit dem Hurensohn zu diskutieren
    player.call("chat:activate", state);
    player.setVariable("chat:activated", state);
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