require('./non-gui/vehicle/anti_windowbreak');

let seatbelt = false;
let radioInterval = null;

mp.events.add('Client:Vehicle:SetEngine', (state) => {
    if (mp.players.local.vehicle) {
        mp.game.vehicle.defaultEngineBehaviour = false;
        setTimeout(() => {
            mp.players.local.vehicle.engine = state; // setzen der Engine
        }, 1000);
    }
});
//ConfigFlag, dass der Motor ausbleibt beim einsteigen.
mp.players.local.setConfigFlag(429, true);

mp.events.add('playerEnterVehicle', (player, vehicle, seat) => {
    mp.game.vehicle.defaultEngineBehaviour = false; //enginBehabior, dass der Motor ausbleibt beim einsteigen.
    //mp.gui.chat.push(JSON.stringify(mp.players.local.vehicle.isSirenOn()))
    // mp.players.local.vehicle.setSiren(mp.players.local.vehicle.isSirenOn())
    // mp.players.local.vehicle.setSirenSound(mp.players.local.vehicle.isSirenSoundOn())
});

mp.events.add('Client:Vehicle:ApplySeatbelt', () => {
    this.applySeatbelt();
});

mp.events.add('playerLeaveVehicle', () => {
    if (seatbelt) {
        mp.game.graphics.notify('Du hast dich beim Aussteigen abgeschnallt.');
        seatbelt = false;
    }
});

mp.events.add('Client:Vehicle:RemoveDirtLevel', (args) => {
    if (args.type !== 'vehicle') return;
    args.setDirtLevel(0);
});

mp.events.add('playerStartEnterVehicle', () => {
    radioInterval = setInterval(() => {
        if (mp.players.local.vehicle) {
            mp.game.audio.setRadioToStationName('OFF');
        }
    }, 1000);
});

mp.events.add('playerLeaveVehicle', () => {
    clearInterval(radioInterval);
});

exports.applySeatbelt = function () {
    mp.players.local.setConfigFlag(32, !seatbelt);
    seatbelt = !seatbelt;
};
