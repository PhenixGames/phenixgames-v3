const config = require('_config/config').config;
mp.players.local.freezePosition(true);
mp.game.ui.displayRadar(false);
mp.game.ui.displayHud(false);
mp.gui.chat.show(false);

let browser;

mp.events.add('Player:Wartung:Show', (reason) => {
    mp.events.callRemote('Server:Browser:PlayerInteracte', true);
    browser = mp.browsers.new(`http://${config.domain}:8080/#/wartung`);

    browser.execute('gui.wartung.init(' + reason + ');');
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 500);
});
