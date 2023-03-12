require('./non-gui/player/keypresser.js');
require('./non-gui/player/medikit');
require('./non-gui/player/weste');
require('./non-gui/player/_damage');

const colour = { r: 255, g: 0, b: 0 };
const serverName = `PhenixGames`;

mp.events.add('playerReady', () => {
    mp.game.invoke('0xF314CF4F0211894E', 143, colour.r, colour.g, colour.b, 255); // Replace Michael colour
    mp.game.invoke('0xF314CF4F0211894E', 116, colour.r, colour.g, colour.b, 255); // Replace freemode colour
    mp.game.gxt.set('PM_PAUSE_HDR', serverName); // Replace map title
});

//Disable Nametag from Ragemp
mp.nametags.enabled = false;

//Godmode
mp.events.add('Client:Admin:setGod', (isGod) => {
    mp.players.local.setInvincible(isGod);
});

//Discord Rich Preset
mp.events.add('Client:Player:setDiscord', (title, playing) => {
    mp.discord.update(title, playing);
});

//Hier wird geschaut ob ein spieler schießt und ob ein admin in der nähe ist
mp.events.add('playerWeaponShot', (targetPosition, targetEntity) => {
    mp.players.forEachInStreamRange((player) => {
        if (player.getVariable('Aduty')) {
            mp.events.callRemote('Server:Admin:ShotInfo', player, targetPosition, targetEntity);
        }
    });
});

//Hier wird Das schlagen mit der Waffe deaktiviert.
mp.events.add('render', () => {
    const weaponHash = mp.game.invoke(`0x0A6DB4965674D243`, mp.players.local.handle); //GET_SELECTED_PED_WEAPON
    const weaponModel = mp.game.weapon.getWeapontypeModel(weaponHash);
    mp.game.controls.disableControlAction(0, 140, true);
    if (!weaponModel == 0) {
        //Abfragen ob er eine Waffe in der Hand hat, da er sonst nicht schlagen kann.
        mp.game.controls.disableControlAction(0, 142, true);
    }
});
