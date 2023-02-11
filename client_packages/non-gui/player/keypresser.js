//https://docs.microsoft.com/de-de/windows/win32/inputdev/virtual-key-codes

const { interacteGasstation } = require('./gui/gasstation/index.js');
const { interacteInventory } = require('./gui/inventory/index.js');
const vehiclemoduele = require('./non-gui/vehicle/index.js');
var Chatbool = false;
mp.gui.chat.activate(false);
mp.gui.chat.show(false);
// -STRG- MOTOR
mp.keys.bind(0x11, true, function () {
    mp.events.callRemote('Server:Keypress:Strg');
    if (mp.players.local.vehicle.isSirenOn()) {
        setTimeout(() => {
            mp.players.local.vehicle.setSiren(true);
        }, 100);
    }
});

// -X- SIRENE
mp.keys.bind(0x58, true, function () {
    mp.players.local.vehicle.setSirenSound(
        mp.players.local.vehicle.isSirenSoundOn() == 1 ? true : false
    );
});

// -E-
mp.keys.bind(0x45, true, function () {
    if (mp.players.local.getVariable('isNearFuelstation') && !mp.players.local.vehicle) {
        return interacteGasstation();
    }
});

//f2 NO CLIP

mp.keys.bind(0x71, true, function () {
    mp.events.callRemote('Player:pressed:f2');
});

//f10
mp.keys.bind(0x79, true, function () {
    mp.players.local.setToRagdoll(3000, 6000, 0, false, false, false);
});

//f6 //SEATBELT
mp.keys.bind(0x75, true, function () {
    vehiclemoduele.ApplySeatbelt();
});

//i //INVENTORY
mp.keys.bind(0x49, true, function () {
    interacteInventory();
});

//f12 - Chat
mp.keys.bind(0x7b, true, function () {
    Chatbool = !Chatbool;
    mp.gui.chat.activate(Chatbool);
    mp.gui.chat.show(Chatbool);
});

// F3 - Admin(Show/hide entity boxes)
let showEntityBoxes = false;
mp.keys.bind(0x72, true, function () {
    if (!showEntityBoxes) {
        mp.events.call('Player:Admin:ShowEntityBoxFromPlayers');
    } else {
        mp.events.call('Player:Admin:HideEntityBoxFromPlayers');
    }

    showEntityBoxes = !showEntityBoxes;
});
