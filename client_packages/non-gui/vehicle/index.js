// -X-
mp.keys.bind(0x58, true, function() {
    mp.events.callRemote('keypress:X');
});

// mp.events.add({
//     'playerEnterVehicle': (vehicle, seat) => {
//       if (mp.players.local.getSeatIsTryingToEnter() !== -1 || vehicle.getIsEngineRunning()) {
//         return;
//       }
//       vehicle.setEngineOn(false, true, true);
//     }
//   });