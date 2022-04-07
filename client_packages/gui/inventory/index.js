const config = require('_config/config').config;

var invBrowser;

mp.events.add('Player:ActivateInventory', () => {
    invBrowser = mp.browsers.new(`http://${config.domain}:8080/#/inventory`);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 1000);
});