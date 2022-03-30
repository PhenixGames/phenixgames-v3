const config = require('_config/config').config;

var invBrowser;

mp.events.add('Player:ActivateInventory', () => {
    mp.console.logInfo('1', true, true)
    invBrowser = mp.browsers.new(`http://${config.domain}:8080/#/inventory`);
});