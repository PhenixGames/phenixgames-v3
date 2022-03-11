// const mainBrowser = require('index');

var LoginCam;
// mp.events.add('Open:Login:Browser', () => {
//     mp.gui.chat.push(JSON.stringify(mainBrowser))
//     //mainBrowser.execute(`gui.Login.show()`)
// });

mp.events.add('Create:Login:Cam', ( ) => {
    LoginCam = mp.cameras.new('default', new mp.Vector3(-100, -966, 296), new mp.Vector3(0,0,-159), 40);

    LoginCam.pointAtCoord(292, -2031, 22); // PointAtCoord can't use Vector3 position in version 1.1. Use position.x, position.y, position.z instead.
    LoginCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});
mp.events.add('Destroy:Login:Cam', ( ) => {
    LoginCam.setActive(false);
    mp.game.cam.renderScriptCams(false, false, 0, false, false);
    LoginCam.destroy();
});


mp.players.local.freezePosition(true);
mp.game.ui.displayRadar(false);
mp.game.ui.displayHud(false);
mp.gui.chat.show(false);

// mp.events.add('Login:NoAccount', () => {
//     browser.execute('hasNoAccount()');
// });

// mp.events.add('Wrong:Password', () => {
//     browser.execute('wrongPassword();')
// })

mp.events.add('uiLogin_LoginButton', (password) => {
    mp.events.callRemote('LoginAccount', password);
});

mp.events.add('uiRegister_RegisterButton', (password) => {
    mp.events.callRemote('RegisterAccount', password);
});

// mp.events.add('Login:Succes:close:Windows', () => {
//     mp.events.remove(["Login:Succes:close:Windows", "uiLogin_LoginButton", "uiRegister_RegisterButton"]);
//     browser.destroy();
//     mp.gui.cursor.show(false, false);
//     mp.players.local.freezePosition(false);
//     mp.gui.chat.show(true);
//     mp.game.ui.displayRadar(true);
//     mp.game.ui.displayHud(true);
// });