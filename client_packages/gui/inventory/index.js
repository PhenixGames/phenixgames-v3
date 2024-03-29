const config = require('_config/config').config;

let invBrowser;
let isInvOpen = false;

exports.interacteInventory = () => {
    if (mp.players.local.getVariable('hasBrowserOpen') || mp.players.local.isTypingInTextChat)
        return;

    if (isInvOpen) {
        closeBrowser();
    } else {
        openBrowser();
    }
};
function closeBrowser() {
    if (isInvOpen) {
        invBrowser.execute('gui.inventory.saveInventory();');
        invBrowser.destroy();
        mp.gui.cursor.show(false, false);
        isInvOpen = false;
    }
}
function openBrowser() {
    if (!isInvOpen) {
        isInvOpen = true;
        invBrowser = mp.browsers.new(`http://${config.domain}:8080/#/inventory`);
        mp.gui.cursor.show(true, true);
        setTimeout(() => {
            mp.gui.cursor.show(true, true);
        }, 1000);
    }
}

mp.events.add('uiInitInventory', () => {
    if (isInvOpen) {
        mp.events.callRemote('Server:Init:Inventory');
    }
});

mp.events.add('uiSaveInventory', (items) => {
    if (isInvOpen) {
        mp.events.callRemote('Server:Save:Inventory', items);
    }
});

mp.events.add('Player:Browser:Inventory:close', () => {
    closeBrowser();
});

mp.events.add('Player:Init:Inventory', (items) => {
    if (isInvOpen) {
        invBrowser.execute('gui.inventory.insertItemsIntoInv(' + items + ');');
    }
});

mp.events.add('dropItem', (itemid) => {
    mp.events.callRemote('Server:Item:Drop', itemid);
});

mp.events.add('useItem', (itemid) => {
    mp.events.callRemote('Server:Item:Use', itemid);
});

mp.events.add('splitItem', (itemid, amount) => {
    mp.events.callRemote('Server:Item:Split', itemid);
});
