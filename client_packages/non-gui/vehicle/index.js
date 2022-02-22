// -STRG-
mp.keys.bind(0x11, true, function() {
    mp.events.callRemote('keypress:X');
    mp.gui.chat.push(mp.players.local.vehicle.isSirenOn() + ' 123')
    mp.gui.chat.push(typeof mp.players.local.vehicle.isSirenOn())
    if(mp.players.local.vehicle.isSirenOn()) {
        setTimeout(() => {
            mp.players.local.vehicle.setSiren(true);
        }, 1);
        
    }
});

// -X-
mp.keys.bind(0x58, true, function() {
    mp.players.local.vehicle.setSirenSound((mp.players.local.vehicle.isSirenSoundOn() == 1) ? true : false)
});

//f2
mp.keys.bind(0x71, true, function() {
    mp.events.callRemote('Player:pressed:f2');
});

mp.events.add('Vehicle:Engine:state', (state) => {
    mp.game.vehicle.defaultEngineBehaviour = false;
    setTimeout(() => {
        mp.players.local.vehicle.engine = state;
        
    }, 1000)

});
mp.players.local.setConfigFlag(429, true);


mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {    
    mp.game.vehicle.defaultEngineBehaviour = false;
});