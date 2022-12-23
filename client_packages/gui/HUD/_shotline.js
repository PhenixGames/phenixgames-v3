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
    var item = [
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
