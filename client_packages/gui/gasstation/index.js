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
        mp.gui.cursor.show(true, true);
        setTimeout(() => {
            mp.gui.cursor.show(true, true);
        }, 1000);
        
    }
}

mp.events.add('uiInitGasStation', () => {
    mp.events.callRemote("Server:Request:Data:Fuelstation");
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
    gasBrowser.execute(`gui.gasstation.initGasStation("${[items]}");`);
});

mp.events.add('carRefuel', (carId, carFuel, price) => {
    mp.events.callRemote('Server:Car:Refuel', carId, carFuel, price);
});