const config = require('_config/config').config;

var browser = null;

mp.events.add('Player:InGameName:Choose', () => {
    player.callRemote('Server:Player:interacteBrowser', true)
    browser = mp.browsers.new(`http://${config.domain}:8080/#/namechooser`);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 500);
});

mp.players.local.freezePosition(true);
mp.game.ui.displayRadar(false);
mp.game.ui.displayHud(false);
mp.gui.chat.show(false);

mp.events.add('uiNameChooser_accept', (firstname, lastname) => {
    mp.events.callRemote('Player:Set:InGameName', firstname, lastname);
});

mp.events.add('Player:InGameName:Choose:Succes:close:Windows', () => {
    player.callRemote('Server:Player:interacteBrowser', false)
    mp.events.remove(["Player:InGameName:Choose:Succes:close:Windows", "Player:InGameName:Choose", "uiNameChooser_accept" ]);
    browser.destroy();
    mp.gui.cursor.show(false, false);
    mp.players.local.freezePosition(false);
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
});