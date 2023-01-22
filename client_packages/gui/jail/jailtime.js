const config = require('_config/config').config;

let browser = null;
mp.events.add('Player:Browser:JailOpen', () => {
    if (browser == null) {
        browser = mp.browsers.new(`http://${config.domain}:8080/#/jailtime`);
    }
});

mp.events.add('Player:Browser:JailClose', () => {
    if (browser != null) {
        browser.destroy();
        browser = null;
    }
});

mp.events.add('Player:Browser:JailUpdate', (time, isAdmin, reason) => {
    if (browser != null) {
        browser.execute('gui.jailtime.init(' + time + ', ' + reason + ', ' + isAdmin + ');');
    }
});
