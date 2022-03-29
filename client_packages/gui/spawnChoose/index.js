const config = require('_config/config').config;

var spawnChooseBrowser;

mp.events.add('Player:Spawn:Options', (type) => {
    mp.players.local.freezePosition(true);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.gui.chat.show(false);
    spawnChooseBrowser = mp.browsers.new(`http://${config.domain}:8080/#/spawnchooser`);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.events.add('Player:Spawn', (type) => {
    /**
     * 0 = House
     * 1 = Last Pos
     * 2 = airport
     */
    if(type === 0) {
        mp.events.callRemote('Player:Spawn:house');
        mp.events.call('Player:Spawn:Succes:close:Windows');
    }else if(type === 1) {
        mp.events.callRemote('Player:Spawn:LastPos');
        mp.events.call('Player:Spawn:Succes:close:Windows');
    }else {
        mp.events.callRemote('Player:Spawn:airport');
        mp.events.call('Player:Spawn:Succes:close:Windows');
    }

});

mp.events.add('Player:Spawn:Succes:close:Windows', () => {
    mp.events.remove(["Player:Spawn", "Player:Spawn:Options", "Player:Spawn:Succes:close:Windows"]);
    spawnChooseBrowser.destroy();
    mp.gui.cursor.show(false, false);
    mp.players.local.freezePosition(false);
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
});