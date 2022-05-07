const config = require('_config/config').config;

var invBrowser;
var isInvOpen = false;

exports.interacteInventory = () => {
    mp.gui.chat.push(typeof mp.players.local.isTypingInTextChat)
    if(mp.players.local.getVariable('hasBrowserOpen') || mp.players.local.isTypingInTextChat) return;

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
