let linearray = [];
let isAdmin = false;

mp.events.add('render', () => {
    if (isAdmin) {
        //Vehicle Daten über dem Fahrzeug rendern
        mp.vehicles.forEachInStreamRange((vehicle) => {
            if (mp.players.local.position.subtract(vehicle.position).length() < 10) {
                //!Dont touch IT
                if (!mp.players.local.vehicle) {
                    const drawPosition = [
                        vehicle.position.x,
                        vehicle.position.y,
                        vehicle.position.z + 0.3,
                    ];
                    mp.game.graphics.drawText(
                        `~b~Id: ~w~${vehicle.getVariable(
                            'veh_id'
                        )}\n~b~Model: ~w~${mp.game.ui.getLabelText(
                            mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model)
                        )}\n~b~Position: ~w~${vehicle.position.x.toFixed(
                            2
                        )}, ${vehicle.position.y.toFixed(2)}, ${vehicle.position.z.toFixed(2)}\n`,
                        drawPosition,
                        {
                            font: 0,
                            color: [255, 255, 255, 185],
                            scale: [0.25, 0.25],
                            outline: true,
                            centre: false,
                        }
                    );
                    var speed = vehicle.getSpeed();
                    speed = speed * 3.6;
                    mp.game.graphics.drawText(
                        `\n\n\n~b~Heading: ~w~${vehicle
                            .getHeading()
                            .toFixed(
                                2
                            )}\n~b~Health: ~w~${vehicle.getHealth()}\n~b~Fuel: ~w~${vehicle
                            .getVariable('veh_fuel')
                            .toFixed(2)}\n~b~Speed: ~w~${Math.round(speed)}\n`,
                        drawPosition,
                        {
                            font: 0,
                            color: [255, 255, 255, 185],
                            scale: [0.25, 0.25],
                            outline: true,
                            centre: false,
                        }
                    );
                }
            }
        });

        //Player Daten über dem Spieler rendern
        mp.players.forEachInStreamRange((player) => {
            if (
                mp.players.local.position.subtract(player.position).length() < 10 &&
                mp.players.local.position.subtract(player.position).length() !== 0
            ) {
                const drawPosition = [
                    player.position.x,
                    player.position.y,
                    player.position.z + 0.3,
                ];
                mp.game.graphics.drawText(
                    `~b~Id: ~w~${player.getVariable('playerId')}\n~b~Name: ~w~${
                        player.name
                    }\n~b~Position: ~w~${player.position.x.toFixed(2)}, ${player.position.y.toFixed(
                        2
                    )}, ${player.position.z.toFixed(2)}\n`,
                    drawPosition,
                    {
                        font: 0,
                        color: [255, 255, 255, 185],
                        scale: [0.25, 0.25],
                        outline: true,
                        centre: false,
                    }
                );

                mp.game.graphics.drawText(
                    `\n\n\n~b~Heading: ~w~${player
                        .getHeading()
                        .toFixed(2)}\n~b~Health: ~w~${player.getHealth()}`,
                    drawPosition,
                    {
                        font: 0,
                        color: [255, 255, 255, 185],
                        scale: [0.25, 0.25],
                        outline: true,
                        centre: false,
                    }
                );
                if (player.isDead()) {
                    if (
                        mp.players.local.position.subtract(player.position).length() < 10 &&
                        mp.players.local.position.subtract(player.position).length() !== 0
                    ) {
                        const drawPosition = [
                            player.position.x,
                            player.position.y,
                            player.position.z + 1.5,
                        ];
                        mp.game.graphics.drawText(`~r~${'Der Spieler ist Tot'}`, drawPosition, {
                            font: 0,
                            color: [255, 255, 255, 185],
                            scale: [0.5, 0.5],
                            outline: false,
                            centre: true,
                        });
                    }
                }
                if (player.getVariable('isMedia')) {
                    if (
                        mp.players.local.position.subtract(player.position).length() < 10 &&
                        mp.players.local.position.subtract(player.position).length() !== 0
                    ) {
                        const drawPosition = [
                            player.position.x,
                            player.position.y,
                            player.position.z + 1.2,
                        ];
                        mp.game.graphics.drawText(`~p~${player.name}`, drawPosition, {
                            font: 0,
                            color: [255, 255, 255, 185],
                            scale: [0.5, 0.5],
                            outline: false,
                            centre: true,
                        });
                    }
                } else {
                    if (
                        mp.players.local.position.subtract(player.position).length() < 10 &&
                        mp.players.local.position.subtract(player.position).length() !== 0
                    ) {
                        const drawPosition = [
                            player.position.x,
                            player.position.y,
                            player.position.z + 1.2,
                        ];
                        mp.game.graphics.drawText(`${player.name}`, drawPosition, {
                            font: 0,
                            color: [255, 255, 255, 185],
                            scale: [0.5, 0.5],
                            outline: false,
                            centre: true,
                        });
                    }
                }
            }
        });

        linearray.map((item) => {
            mp.game.graphics.drawLine(
                item[0],
                item[1],
                item[2],
                item[3],
                item[4],
                item[5],
                item[6],
                item[7],
                item[8],
                item[9],
                item[10]
            );
        });
    }
});

mp.events.add('Player:Admin:DrawShotLine', (player, targetpos, targetEntity) => {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 255;
    if (targetEntity == null) {
        b = 255;
    } else {
        if (targetEntity.getVariable('isMedia') || player.getVariable('isMedia')) {
            r = 255;
            b = 255;
        } else {
            r = 255;
        }
    }
    let item = [
        Number(player.position.x),
        Number(player.position.y),
        Number(player.position.z + 0.5),
        Number(targetpos.x),
        Number(targetpos.y),
        Number(targetpos.z),
        r,
        g,
        b,
        a,
    ];
    linearray.push(item);
    setTimeout(() => {
        linearray = linearray.filter((i) => i !== item);
    }, 10000);
});

mp.events.add('Player:Admin:ChangeDuty', (state) => {
    isAdmin = state;
});
