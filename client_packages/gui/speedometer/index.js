var modded_Speed = 1;

mp.events.add('render', () => {
    var player = mp.players.local;
    var vehicle = player.vehicle;

    if(vehicle === undefined || vehicle === null) return;

    var speed = vehicle.getSpeed();
    speed = speed * 3.6;

    if(speed === 0) speed = '0';

    vehicle.setEngineTorqueMultiplier(modded_Speed);
    mp.players.local.vehicle.setEnginePowerMultiplier(modded_Speed)

    mp.game.graphics.drawText(Math.round(speed), [0.5, 0.005], {
      font: 4,
      color: [255, 255, 255, 255],
      scale: [1.0, 1.0],
      outline: true
    });
});

mp.events.add("Set:ModdedSpeed", (Speed) => {
    mp.gui.chat.push(Speed + ' speed')
    modded_Speed = Number(Speed);
});