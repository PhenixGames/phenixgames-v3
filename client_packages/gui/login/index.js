var browser = mp.browsers.new("package://gui/login/index.html");

mp.players.local.freezePosition(true);
mp.gui.cursor.visible = true;
mp.game.ui.displayRadar(false);
mp.game.ui.displayHud(false);
mp.gui.chat.show(false);

mp.events.add('uiLogin_LoginButton', (password) => {
    mp.events.callRemote('LoginAccount', password);
});

mp.events.add('Login:Succes:close:Windows', () => {
    mp.events.remove(["Login:Succes:close:Windows", "uiLogin_LoginButton"]);
    browser.destroy();
    mp.gui.cursor.visible = false;
    mp.players.local.freezePosition(false);
    mp.gui.chat.show(true);
});