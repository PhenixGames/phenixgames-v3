/**
 * © PHENIXGAMES
 * * FIRST COMMIT BY Mittelblut9
 */
var browser;
mp.events.add('Open:Login:Browser', () => {
    browser = mp.browsers.new("package://gui/login/index.html");
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 1000);
});

mp.players.local.freezePosition(true);
//mp.gui.cursor.visible = true;
mp.game.ui.displayRadar(false);
mp.game.ui.displayHud(false);
mp.gui.chat.show(false);

mp.events.add('Login:NoAccount', () => {
    browser.execute('hasNoAccount()');
});

mp.events.add('uiLogin_LoginButton', (password) => {
    mp.events.callRemote('LoginAccount', password);
});

mp.events.add('uiRegister_RegisterButton', (password) => {
    mp.events.callRemote('RegisterAccount', password);
});

mp.events.add('Login:Succes:close:Windows', () => {
    mp.events.remove(["Login:Succes:close:Windows", "uiLogin_LoginButton", "uiRegister_RegisterButton"]);
    browser.destroy();
    mp.gui.cursor.visible = false;
    mp.players.local.freezePosition(false);
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
});