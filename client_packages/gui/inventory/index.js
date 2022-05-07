const config = require('_config/config').config;

var invBrowser;
var isInvOpen = false;

module.exports.interacteInventory = () => {
    if(isInvOpen) {
        invBrowser.destroy();
        mp.gui.cursor.show(false, false);
        isInvOpen = false;
    }else {
        isInvOpen = true;
        invBrowser = mp.browsers.new(`http://${config.domain}:8080/#/inventory`);
        setTimeout(() => {
            mp.gui.cursor.show(true, true);
        }, 1000);
    }
}
