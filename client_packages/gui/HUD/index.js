const config = require('_config/config').config;

var hudBrowser;
let active = false;
var modded_Speed = 1;
var Admin = false;
var linearray = [];

mp.events.add('Player:ActivateHUD', () => {
    
    hudBrowser = mp.browsers.new(`http://${config.domain}:8080/#/hud`);

    hudBrowser.execute(`gui.hud.setPlayerId("${mp.players.local.getVariable('playerId')}");`);
    active = true;
});


mp.events.add("Change:Admin:Duty:Value:On:Client", (state) => {
    Admin = state;
});

mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {
    hudBrowser.execute(`gui.hud.showSpeedometer();`)
});

mp.events.add("playerLeaveVehicle", (player, vehicle) => {
    if(active){
        hudBrowser.execute(`gui.hud.removeSpeedometer();`)
    }
    
});

//Render For Car
mp.events.add("render", () => {
//testing
//var pos = new mp.Vector3(-2096.231689453125, -320.1805114746094, 12.16186809539795);
//mp.game.graphics.drawDebugSphere(pos.x , pos.y, 20, 255, 0, 0, 255);
//


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
                    mp.game.graphics.drawText(`\n\n\n~b~Heading: ~w~${vehicle.getHeading().toFixed(2)}\n~b~Health: ~w~${vehicle.getHealth()}\n~b~Fuel: ~w~${vehicle.getVariable('veh_fuel').toFixed(2)}\n~b~Speed: ~w~${Math.round(speed)}\n`, drawPosition, {
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
                if (player.isDead()){
                    if (mp.players.local.position.subtract(player.position).length() < 10 && mp.players.local.position.subtract(player.position).length() !== 0) {
                        const drawPosition = [player.position.x, player.position.y, player.position.z + 1.5];
                        mp.game.graphics.drawText(`~r~${"Der Spieler ist Tot"}`, drawPosition, {
                            font: 0,
                            color: [255, 255, 255, 185],
                            scale: [0.5, 0.5],
                            outline: false,
                            centre: true
                        });
                    }
                }
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

        linearray.map(item => {
            mp.game.graphics.drawLine(item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7], item[8], item[9], item[10]);
        });

    }
    //Hier wird Das Speedometer Geupdated.
    if(mp.players.local.vehicle){
        var player = mp.players.local;
        var vehicle = player.vehicle;
        var fuel = vehicle.getVariable("veh_fuel");
        var speed = vehicle.getSpeed();
        speed = speed * 3.6;

        vehicle.setEngineTorqueMultiplier(modded_Speed);
        mp.players.local.vehicle.setEnginePowerMultiplier(modded_Speed)

        hudBrowser.execute(`gui.hud.setSpeedometer("${Math.round(fuel)}", "${Math.round(speed)}");`)
        
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
    if(!mp.voiceChat.muted){
        hudBrowser.execute(`gui.hud.manageVoice("${false}");`);//inaktiv
    } else {
        hudBrowser.execute(`gui.hud.manageVoice("${true}");`);//Aktiv
    } 
});
//Hier wird die line vom schuss gemahlt
mp.events.add("Admin:draw:shot:line", (player, targetpos, targetEntity) => {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 255;
    if(targetEntity == null){
        b = 255;
    }else {
        if(targetEntity.getVariable("isMedia") || player.getVariable("isMedia")){
            r = 255;
            b = 255;
        }else {
            r = 255;
        }
        
    }
    var item = [Number(player.position.x), Number(player.position.y), Number(player.position.z +0.5), Number(targetpos.x), Number(targetpos.y), Number(targetpos.z), r, g, b, a];
    linearray.push(item);
    setTimeout(() => {
        linearray = linearray.filter(i => i !== item);
    }, 10000);
});

setInterval(() => {

    if(mp.players.local.vehicle){
        var vehicle = mp.players.local.vehicle;

        var speed = vehicle.getSpeed();
        speed = speed * 3.6;
        mp.events.callRemote('Set:Variable:Of:ent', speed);
    }
}, 5000);

