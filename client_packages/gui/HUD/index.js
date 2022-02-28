var browser;
var modded_Speed = 1;
var Admin = false;
mp.events.add("Change:Admin:Duty:Value:On:Client", (state) => {
    Admin = state;
});

mp.events.add('Player:ActivateHUD', () => {
    browser = mp.browsers.new("package://gui/HUD/index.html");
    browser.execute(`setPlayerId("${mp.players.local.getVariable('playerId')}");`);
});

mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {
    browser.execute(`showSpeedometer();`)
});

mp.events.add("playerLeaveVehicle", (player, vehicle) => {
    browser.execute(`removeSpeedometer();`)
});

//Render For Car
mp.events.add("render", () => {
    if (Admin) {//Ist Er im Admin Dienst
        //Daten Vom Fahrzeug Rendern
        mp.vehicles.forEachInStreamRange((vehicle) => {
            if (mp.players.local.position.subtract(vehicle.position).length() < 10) {
                //Dont touch IT - Works only if it exists XD
                if (!mp.players.local.vehicle) {
                    const drawPosition = [vehicle.position.x, vehicle.position.y, vehicle.position.z + 0.3];
                    mp.game.graphics.drawText(`~b~Id: ~w~${vehicle.getVariable('veh_id')}\n~b~Model: ~w~${mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model))}\n~b~Position: ~w~${vehicle.position.x.toFixed(2)}, ${vehicle.position.y.toFixed(2)}, ${vehicle.position.z.toFixed(2)}\n`, drawPosition, {
                        font: 0,
                        color: [255, 255, 255, 185],
                        scale: [0.25, 0.25],
                        outline: true,
                        centre: false
                    });
                    var speed = vehicle.getSpeed();
                    speed = speed * 3.6;
                    mp.game.graphics.drawText(`\n\n\n~b~Heading: ~w~${vehicle.getHeading().toFixed(2)}\n~b~Health: ~w~${vehicle.getHealth()}\n~b~Speed: ~w~${Math.round(speed)}\n`, drawPosition, {
                        font: 0,
                        color: [255, 255, 255, 185],
                        scale: [0.25, 0.25],
                        outline: true,
                        centre: false
                    });
                }
                
            }
        });
        //Player Daten Rendern
        mp.players.forEachInStreamRange((player) => {

            if (mp.players.local.position.subtract(player.position).length() < 10 && mp.players.local.position.subtract(player.position).length() !== 0) {
                const drawPosition = [player.position.x, player.position.y, player.position.z + 0.3];
                mp.game.graphics.drawText(`~b~Id: ~w~${player.getVariable('playerId')}\n~b~Name: ~w~${player.name}\n~b~Position: ~w~${player.position.x.toFixed(2)}, ${player.position.y.toFixed(2)}, ${player.position.z.toFixed(2)}\n`, drawPosition, {
                    font: 0,
                    color: [255, 255, 255, 185],
                    scale: [0.25, 0.25],
                    outline: true,
                    centre: false
                });

                mp.game.graphics.drawText(`\n\n\n~b~Heading: ~w~${player.getHeading().toFixed(2)}\n~b~Health: ~w~${player.getHealth()}`, drawPosition, {
                    font: 0,
                    color: [255, 255, 255, 185],
                    scale: [0.25, 0.25],
                    outline: true,
                    centre: false
                });
                if (player.getVariable("isMedia")) {
                    if (mp.players.local.position.subtract(player.position).length() < 10 && mp.players.local.position.subtract(player.position).length() !== 0) {
                        const drawPosition = [player.position.x, player.position.y, player.position.z + 1.2];
                        mp.game.graphics.drawText(`~p~${player.name}`, drawPosition, {
                            font: 0,
                            color: [255, 255, 255, 185],
                            scale: [0.5, 0.5],
                            outline: false,
                            centre: true
                        });
                    }

                } else {
                    if (mp.players.local.position.subtract(player.position).length() < 10 && mp.players.local.position.subtract(player.position).length() !== 0) {
                        const drawPosition = [player.position.x, player.position.y, player.position.z + 1.2];
                        mp.game.graphics.drawText(`${player.name}`, drawPosition, {
                            font: 0,
                            color: [255, 255, 255, 185],
                            scale: [0.5, 0.5],
                            outline: false,
                            centre: true
                        });
                    }
                }

            }


        });
    }
    //Hier wird Das Speedometer Geupdated.
    if(mp.players.local.vehicle){
        mp.console.logInfo('test2', true, true)
        var player = mp.players.local;
        var vehicle = player.vehicle;

        var speed = vehicle.getSpeed();
        speed = speed * 3.6;

        vehicle.setEngineTorqueMultiplier(modded_Speed);
        mp.players.local.vehicle.setEnginePowerMultiplier(modded_Speed)

        browser.execute(`setSpeedometer("${0}", "${Math.round(speed)}");`)
    }

    //Hier wird der Name Des Admins Gerendert für die Spieler die in 10 Meter reichweite sind (Er selber ausgeschlossen)
    mp.players.forEachInStreamRange((player) => {
        if (player.getVariable("Aduty")) {
            if (mp.players.local.position.subtract(player.position).length() < 10 && mp.players.local.position.subtract(player.position).length() !== 0) {
                const drawPosition = [player.position.x, player.position.y, player.position.z + 1.2];
                mp.game.graphics.drawText(`~r~${player.name}`, drawPosition, {
                    font: 0,
                    color: [255, 255, 255, 185],
                    scale: [0.5, 0.5],
                    outline: false,
                    centre: true
                });
            }
        }
    });
});

//Dieses Event ändert die Variable auf den Passenden wert der vom server übergeben wurde
mp.events.add("Set:ModdedSpeed", (speed) => {
    mp.game.graphics.notify(`Dein Speed wurde auf ${speed} gesetzt`);
    modded_Speed = Number(speed);
});

mp.keys.bind(0x73, true, function() {//F4
    mp.voiceChat.muted = !mp.voiceChat.muted;
    if(!mp.voiceChat.muted) browser.execute(`manageVoice("${1}");`);
    else browser.execute(`manageVoice("${0}");`);
    
    mp.game.graphics.notify("Voice Chat: " + ((!mp.voiceChat.muted) ? "~g~enabled" : "~r~disabled"));
});