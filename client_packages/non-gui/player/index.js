require('./non-gui/player/keypresser.js');
require('./non-gui/player/medikit');
require('./non-gui/player/weste');

const colour = { r: 255, g: 0, b: 0 }; // set this to the colour you want
const serverName = 'PhenixGames'; // set this to the pause menu title you want
//Der Code wird Ausgeführt wenn alle Sachen vom Client geladen wurden.
//Dann setze ich farben und alle wichtigen daten.
mp.events.add('playerReady', () => {
    mp.game.invoke('0xF314CF4F0211894E', 143, colour.r, colour.g, colour.b, 255); // Replace Michael colour
    mp.game.invoke('0xF314CF4F0211894E', 116, colour.r, colour.g, colour.b, 255); // Replace freemode colour
    mp.game.gxt.set('PM_PAUSE_HDR', serverName); // Replace map title
});
//Disable Nametag from Ragemp
mp.nametags.enabled = false;

//Godmode
mp.events.add('Set:God', (isGod) => {
    mp.players.local.setInvincible(isGod);
});
//Discord Rich Preset
mp.events.add('Set:Discord', (title, playing) => {
    mp.discord.update(title, playing);
});

//DAMAGESYSTEM
mp.events.add(
    'outgoingDamage',
    (sourceEntity, targetEntity, sourcePlayer, weapon, boneIndex, damage) => {
        if (targetEntity.type === 'player') {
            mp.events.callRemote('Server:Handle:Damage', targetEntity, weapon, boneIndex, damage);
            return true;
        } else {
            return false;
        }
    }
);

//Hier wird geschaut ob ein spieler schießt und ob ein admin in der nähe ist
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    mp.players.forEachInStreamRange((player) => {
        //Loop of every player in range
        if (player.getVariable('Aduty')) {
            //if player is admin
            mp.events.callRemote('Get:Shot:Info:to:Admin', player, targetPosition, targetEntity); //Übergebe daten an den server
        }
    });
});

//Hier wird Das schlagen mit der Waffe deaktiviert.
mp.events.add('render', () => {
    let weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
    let weaponModel = mp.game.weapon.getWeapontypeModel(weaponHash); //Get Weaponmodel
    mp.game.controls.disableControlAction(0, 140, true); //Disable hitting with weapon part1
    if (!weaponModel == 0) {
        //Abfragen ob er eine Waffe in der Hand hat, da er sonst nicht schlagen kann.
        mp.game.controls.disableControlAction(0, 142, true); //Disable hitting with weapon part2
    }
});
