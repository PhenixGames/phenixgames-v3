const config = require('_config/config').config;

let gasBrowser;
let isBrowserOpen = false;

exports.interacteGasstation = () => {
    if (mp.players.local.getVariable('hasBrowserOpen') || mp.players.local.isTypingInTextChat) {
        return;
    }
    return isBrowserOpen ? closeBrowser() : openBrowser();
};

function closeBrowser() {
    if (isBrowserOpen) {
        gasBrowser.destroy();
        mp.gui.cursor.show(false, false);
        isBrowserOpen = false;
    }
}
function openBrowser() {
    if (!isBrowserOpen) {
        isBrowserOpen = true;
        gasBrowser = mp.browsers.new(`http://${config.domain}:8080/#/gasstation`);
        mp.gui.cursor.show(true, true);
        setTimeout(() => {
            mp.gui.cursor.show(true, true);
        }, 1000);
    }
}

mp.events.add('Ui:Fuelstation:Init', () => {
    mp.events.callRemote('Server:Fuelstation:RequestData');
});

/**
 cars: [{
    name: '',
    id: '',
    fuel_type: '',
    max: ''
 }, {}, ...]
*/
mp.events.add('Player:Gasstation:Init', (items) => {
    gasBrowser.execute("gui.gasstation.initGasStation('" + items + "');");
});

mp.events.add('Player:Gasstation:NotFound', (items) => {
    gasBrowser.execute('gui.gasstation.notFound();');
});

mp.events.add('Player:Fuelstation:BrowserClose', () => {
    closeBrowser();
});

mp.events.add('Client::CarRefuel', (carId, carFuel, price) => {
    if (isBrowserOpen) {
        closeBrowser();
        mp.events.callRemote('Server:Fuelstation:CarRefuel', carId, carFuel, price);
        return true;
    }
});
