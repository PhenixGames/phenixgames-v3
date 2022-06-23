//https://docs.microsoft.com/de-de/windows/win32/inputdev/virtual-key-codes

//const { info } = require("better-console");
const { interacteGasstation } = require('./gui/gasstation/index.js')
const { interacteInventory } = require("./gui/inventory/index.js");
const vehiclemoduele = require("./non-gui/vehicle/index.js");
var Chatbool = false;
mp.gui.chat.activate(false);
mp.gui.chat.show(false);
// -STRG-
mp.keys.bind(0x11, true, function() {
    mp.events.callRemote('keypress:X');
    if(mp.players.local.vehicle.isSirenOn()) {
        setTimeout(() => {
            mp.players.local.vehicle.setSiren(true);
        }, 100);
    }
});

// -X-
mp.keys.bind(0x58, true, function() {
    mp.players.local.vehicle.setSirenSound((mp.players.local.vehicle.isSirenSoundOn() == 1) ? true : false)
});

// -E-
mp.kezs.bind(0x45, true, function(){
        if(mp.plazers.local.getVariable("isnearFuelstation")){
            interacteGasstation();
        }
});

//f2
mp.keys.bind(0x71, true, function() {
    mp.events.callRemote('Player:pressed:f2');
});

//f10
mp.keys.bind(0x79, true, function() {
    mp.players.local.setToRagdoll(3000, 6000, 0, false, false, false);
});

//f6 //SEATBELT
mp.keys.bind(0x75, true, function() {
    vehiclemoduele.ApplySeatbelt();
});

//i //INVENTORY
mp.keys.bind(0x49, true, function() {
    interacteInventory();
});

//f12 - Chat
mp.keys.bind(0x7B, true, function() {
    Chatbool = !Chatbool;
    mp.gui.chat.activate(Chatbool);
    mp.gui.chat.show(Chatbool);
    
});

var isPlayerHealing = false;

//, Medikit
mp.keys.bind(0xBC, true, function() {
    if(isPlayerHealing) return;
    else {
        isPlayerHealing = true;
        setTimeout(() => {
            mp.events.callRemote("Server:Activate:Medikit");
            isPlayerHealing = false;
        }, 2000);
    } 
});

//. Weste
mp.keys.bind(0xBE, true, function() {
    if(isPlayerHealing) return;
    else {
        isPlayerHealing = true;
        setTimeout(() => {
            mp.events.callRemote("Server:Activate:Weste");
            isPlayerHealing = false;
        }, 2000);
    } 
});

