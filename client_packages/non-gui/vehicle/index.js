// -X-
mp.keys.bind(0x58, true, function() {
    mp.events.callRemote('keypress:X');
});

//f2
mp.keys.bind(0x71, true, function() {
    mp.events.callRemote('Player:pressed:f2');
});


// mp.events.add({
//     'playerEnterVehicle': (vehicle, seat) => {
//       if (mp.players.local.getSeatIsTryingToEnter() !== -1 || vehicle.getIsEngineRunning()) {
//         return;
//       }
//       vehicle.setEngineOn(false, true, true);
//     }
//   });

mp.events.add('Vehicle:Engine:state', (state) => {
    mp.gui.chat.push("state:" +JSON.stringify(state));
    setTimeout(() => {
        mp.players.local.vehicle.engine = state;
        
    }, 1000)
});
