const config = require('_config/config').config;

let Deathbrowser = null;

mp.events.add('Open:Death:Browser', () => {
    Deathbrowser = mp.browsers.new(`http://${config.domain}:8080/#/deathscreen`);
    mp.gui.cursor.visible = true;
});
mp.events.add('close:Death:Browser', () => {
    Deathbrowser.destroy();
    mp.gui.cursor.visible = false;
});

mp.events.add('HTML:Call:Respawn', () => {
    mp.events.callRemote('Respawn:At:Hospital');
});