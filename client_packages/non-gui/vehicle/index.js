// -STRG-
mp.keys.bind(0x11, true, function() {
    mp.events.callRemote('keypress:X');
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

//f10

mp.keys.bind(0x79, true, function() {
    mp.players.local.setToRagdoll(3000, 6000, 0, false, false, false);
});

mp.events.add('Vehicle:Engine:state', (state) => {
    if(mp.players.local.vehicle){
        mp.game.vehicle.defaultEngineBehaviour = false;
        setTimeout(() => {
            mp.players.local.vehicle.engine = state;
            
        }, 1000)
    }

});
mp.players.local.setConfigFlag(429, true);


mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {    
    mp.game.vehicle.defaultEngineBehaviour = false;
});
