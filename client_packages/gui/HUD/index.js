const config = require('_config/config').config;
require('./gui/HUD/_admin.js');

let hudBrowser;
let active = false;
let modded_Speed = 1;

mp.events.add('Player:ActivateHUD', () => {
    hudBrowser = mp.browsers.new(`http://${config.domain}:8080/#/hud`);

    hudBrowser.execute(`gui.hud.setPlayerId("${mp.players.local.getVariable('playerId')}");`);
    active = true;
});

mp.events.add('playerEnterVehicle', (player, vehicle, seat) => {
    hudBrowser.execute(`gui.hud.showSpeedometer();`);
});

mp.events.add('playerLeaveVehicle', (player, vehicle) => {
    if (active) {
        hudBrowser.execute(`gui.hud.removeSpeedometer();`);
    }
});

mp.events.add('render', () => {
    //Hier wird Das Speedometer Geupdated.
    if (mp.players.local.vehicle) {
        var player = mp.players.local;
        var vehicle = player.vehicle;
        var fuel = vehicle.getVariable('veh_fuel');
        var speed = vehicle.getSpeed();
        speed = speed * 3.6;

        vehicle.setEngineTorqueMultiplier(modded_Speed);
        mp.players.local.vehicle.setEnginePowerMultiplier(modded_Speed);

        hudBrowser.execute(
            `gui.hud.setSpeedometer("${Math.round(fuel)}", "${Math.round(speed)}");`
        );
    }

    //Hier wird der Name Des Admins Gerendert für die Spieler die in 10 Meter reichweite sind (Er selber ausgeschlossen)
    mp.players.forEachInStreamRange((player) => {
        if (player.getVariable('Aduty')) {
            if (
                mp.players.local.position.subtract(player.position).length() < 10 &&
                mp.players.local.position.subtract(player.position).length() !== 0
            ) {
                const drawPosition = [
                    player.position.x,
                    player.position.y,
                    player.position.z + 1.2,
                ];
                mp.game.graphics.drawText(`~r~${player.name}`, drawPosition, {
                    font: 0,
                    color: [255, 255, 255, 185],
                    scale: [0.5, 0.5],
                    outline: false,
                    centre: true,
                });
            }
        }
        if (player.getVariable('isAFK')) {
            if (
                mp.players.local.position.subtract(player.position).length() < 10 &&
                mp.players.local.position.subtract(player.position).length() !== 0
            ) {
                const drawPosition = [
                    player.position.x,
                    player.position.y,
                    player.position.z + 1.5,
                ];
                mp.game.graphics.drawText(`~h~AFK`, drawPosition, {
                    font: 0,
                    color: [255, 255, 255, 185],
                    scale: [0.5, 0.5],
                    outline: false,
                    centre: true,
                });
            }
        }
    });
});

//Dieses Event ändert die Variable auf den Passenden wert der vom server übergeben wurde
mp.events.add('Player:Vehicle:ChangeSpeed', (speed) => {
    mp.game.graphics.notify(`Dein Speed wurde auf ${speed} gesetzt`);
    modded_Speed = Number(speed);
});

mp.keys.bind(0x73, true, function () {
    //F4
    mp.voiceChat.muted = !mp.voiceChat.muted;
    if (!mp.voiceChat.muted) {
        hudBrowser.execute(`gui.hud.manageVoice("${false}");`); //inaktiv
    } else {
        hudBrowser.execute(`gui.hud.manageVoice("${true}");`); //Aktiv
    }
});

setInterval(() => {
    if (mp.players.local.vehicle) {
        var vehicle = mp.players.local.vehicle;

        var speed = vehicle.getSpeed();
        speed = speed * 3.6;
        mp.events.callRemote('Set:Variable:Of:ent', speed);
    }
}, 500);

mp.events.add('Player:HUD:UpdateMoney', (money) => {
    hudBrowser.execute("gui.hud.setMoney('" + money + "');");
});
