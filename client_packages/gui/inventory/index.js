const config = require('_config/config').config;

var invBrowser;
var isInvOpen = false;

exports.interacteInventory = () => {
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

mp.events.add('uiInitInventory', () => {
    mp.events.callRemote('Server:Init:Inventory');
})


mp.events.add('Player:Init:Inventory', (items) => {
    invBrowser.execute(`gui.inventory.insertItemsIntoInv({
        item: ${items}
    );`);
});