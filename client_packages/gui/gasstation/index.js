const config = require('_config/config').config;

var gasBrowser;
var isBrowserOpen = false;

exports.interacteGasstation = () => {
    mp.console.logInfo("Der Code wurde gestartet", true, true);
    if(mp.players.local.getVariable('hasBrowserOpen') || mp.players.local.isTypingInTextChat) return;

    if(isBrowserOpen) {
        mp.console.logInfo("Der Code wurde als Bereits geöffnet ausgeführt", true, true);
        gasBrowser.destroy();
        mp.gui.cursor.show(false, false);    
        isBrowserOpen = false;
    }else {
        mp.console.logInfo("Der Code wurde bis zur else abfrage ausgeführt ausgeführt", true, true);
        isBrowserOpen = true;
        gasBrowser = mp.browsers.new(`http://${config.domain}:8080/#/gasstation`);
        mp.console.logInfo("Der Code wurde bis zum öffnen des Browsers ausgeführt", true, true);
        mp.events.callremote("Server:Request:Data:Fuelstation");
        mp.console.logInfo("Der Code wurde bis nach dem Browser ausgeführt", true, true);
        mp.gui.cursor.show(true, true);
        setTimeout(() => {
            mp.gui.cursor.show(true, true);
        }, 1000);
        mp.console.logInfo("Der Code wurde bis zum ende ausgeführt", true, true);
    }
}

mp.events.add('uiInitGasStation', () => {
    mp.events.callRemote('Server:Init:GasstationUI');
})

/**
 cars: [{
    name: '',
    id: '',
    fuel_type: '',
    max: ''
 }, {}, ...]
*/
mp.events.add('Player:Init:Gasstation', (items) => {
    gasBrowser.execute(`gui.gasstation.initGasStation({
        gasstation_name: '${items.name}',
        diesel_price: ${items.diesel_price},
        benzin_price: ${items.benzin_price},
        cars: ${items.cars}
    });`);
});

mp.events.add('carRefuel', (carId, carFuel, price) => {
    mp.events.callRemote('Server:Car:Refuel', carId, carFuel, price);
});