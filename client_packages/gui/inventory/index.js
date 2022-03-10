const config = require('_config/config').config;

var inventoryBrowser;
mp.events.add('Player:ActivateInventory', () => {
    mp.gui.chat.push(JSON.stringify(config.domain))
    inventoryBrowser = mp.browsers.new(`http://${config.domain}:8080/`);
    setTimeout(() => {
        mp.gui.cursor.show(true, true);
    }, 500);
});