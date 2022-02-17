var browser;

mp.events.add('Player:Spawn:Options', (type) => {
    mp.players.local.freezePosition(true);
    mp.gui.cursor.visible = true;
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);
    mp.gui.chat.show(false);
    browser = mp.browsers.new("package://gui/spawnChoose/index.html");
});

mp.events.add('Player:Spawn', (type) => {
    if(type) {
        mp.events.callRemote('Player:Spawn:House')
    }else {
        mp.events.callRemote('Player:Spawn:LastPos');
    }
    mp.events.call('Player:Spawn:Succes:close:Windows');
});

mp.events.add('Player:Spawn:Succes:close:Windows', () => {
    mp.events.remove(["Player:Spawn", "Player:Spawn:Options", "Player:Spawn:Succes:close:Windows"]);
    browser.destroy();
    mp.gui.cursor.visible = false;
    mp.players.local.freezePosition(false);
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
});