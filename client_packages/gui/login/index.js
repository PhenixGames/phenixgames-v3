mp.players.local.freezePosition(true);
mp.game.ui.displayRadar(false);
mp.game.ui.displayHud(false);
mp.gui.chat.show(false);

let mainBrowser;
mp.events.add('Player:Login:Open', (isLogin) => {
    mp.events.callRemote('Server:Browser:PlayerInteracte', true);
    const config = require('_config/config').config;
    mainBrowser = mp.browsers.new(`http://${config.domain}:8080/#/login?isLogin=${isLogin}`);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 1000);
});

let loginCam;
mp.events.add('Player:Login:CreateCam', () => {
    loginCam = mp.cameras.new(
        'default',
        new mp.Vector3(-100, -966, 296),
        new mp.Vector3(0, 0, -159),
        40
    );

    loginCam.pointAtCoord(292, -2031, 22); // PointAtCoord can't use Vector3 position in version 1.1. Use position.x, position.y, position.z instead.
    loginCam.setActive(true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
});

mp.events.add('Player:Login:DestroyCam', () => {
    loginCam.setActive(false);
    mp.game.cam.renderScriptCams(false, false, 0, false, false);
    loginCam.destroy();
});

mp.events.add('Player:Login:WrongPassword', () => {
    mainBrowser.execute('gui.login.wrongPassword();');
});

mp.events.add('Player:Login:Wartung', (reason) => {
    mainBrowser.execute(`gui.login.wartung('${reason}');`);
});

mp.events.add('Ui:Login:Login', (password) => {
    mp.events.callRemote('Server:Login:Login', password);
});

mp.events.add('Ui:Login:Register', (password) => {
    mp.events.callRemote('Server:Login:Register', password);
});

mp.events.add('Player:Login:Close', () => {
    mp.events.callRemote('Server:Browser:PlayerInteracte', false);

    mp.events.remove([
        'Player:Login:Close',
        'Ui:Login:Login',
        'Ui:Login:Register',
        'Player:Login:WrongPassword',
        'Player:Login:CreateCam',
        'Player:Login:Open',
    ]);
    mainBrowser.destroy();
    mp.gui.cursor.show(false, false);
    mp.players.local.freezePosition(false);
    mp.gui.chat.show(true);
    mp.game.ui.displayRadar(true);
    mp.game.ui.displayHud(true);
});
