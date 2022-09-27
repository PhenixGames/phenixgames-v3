const config = require('_config/config').config;

var gasBrowser;
var isBrowserOpen = false;

exports.interacteGasstation = () => {
    if(mp.players.local.getVariable('hasBrowserOpen') || mp.players.local.isTypingInTextChat) return;

    if(isBrowserOpen) {
        gasBrowser.destroy();
        mp.gui.cursor.show(false, false);    
        isBrowserOpen = false;
    }else {
        isBrowserOpen = true;
        gasBrowser = mp.browsers.new(`http://${config.domain}:8080/#/gasstation`);
        mp.events.callRemote("Server:Request:Data:Fuelstation");
        mp.gui.cursor.show(true, true);
        setTimeout(() => {
            mp.gui.cursor.show(true, true);
        }, 1000);
        
    }
    process.exit()
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
    mp.console.logWarning(items, true, true); // When pressing F11, you should now see a message saying "example"
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