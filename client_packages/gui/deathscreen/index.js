const config = require('_config/config').config;

let browser = null;

mp.events.add('Client:DeathBrowser:Open', () => {
    mp.events.callRemote('Server:Browser:PlayerInteracte', true);
    browser = mp.browsers.new(`http://${config.domain}:8080/#/deathscreen`);
    mp.gui.cursor.visible = true;
});
mp.events.add('Client:DeathBrowser:Close', () => {
    if (!browser) return;
    mp.events.callRemote('Server:Browser:PlayerInteracte', false);
    browser.destroy();
    browser = null;
    mp.gui.cursor.visible = false;
});

mp.events.add('Client:Respawn', () => {
    mp.events.callRemote('Client:Respawn:Hospital');
});
