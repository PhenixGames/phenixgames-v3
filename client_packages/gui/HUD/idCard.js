const config = require('_config/config').config;

let browser = null;
let targetBrowser = null;

mp.events.add('Client:IDCard:Show', (player) => {
    if (browser == null) {
        browser = mp.browsers.new(`http://${config.domain}:8080/#/idcard`);
    }
});

mp.events.add('Client:IDCard:Hide', (player) => {
    if (browser != null) {
        browser.destroy();
        browser = null;
    }
});

mp.events.add('Client:IDCard:ShowToPlayer', (target) => {
    if (targetBrowser == null) {
        targetBrowser = mp.browsers.new(`http://${config.domain}:8080/#/idcard`);
    }
});

mp.events.add('Client:IDCard:HideToPlayer', (target) => {
    if (browser != null) {
        targetBrowser.destroy();
        targetBrowser = null;
    }
});
