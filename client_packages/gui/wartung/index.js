const config = require('_config/config').config;
let browser;

mp.events.add('Player:Wartung:Show', (reason) => {
    mp.console.logInfo('TEST')
    player.setVariable('syncPlayer', false);
    player.position = new mp.Vector3(0, 0, -20);

    mp.players.local.freezePosition(true);
    mp.game.ui.displayRadar(false);
    mp.game.ui.displayHud(false);

    mp.events.callRemote('Server:Browser:PlayerInteracte', true);
    browser = mp.browsers.new(`http://${config.domain}:8080/#/wartung`);

    browser.execute('gui.wartung.init(' + reason.toString() + ');');
});


mp.events.add('Player:Wartung:Close', () => {
    mp.events.callRemote('Server:Browser:PlayerInteracte', false);
    mp.events.remove(['Player:Spawn', 'Player:Spawn:Options', 'Player:Spawn:Succes:close:Windows']);
    browser.destroy();
});