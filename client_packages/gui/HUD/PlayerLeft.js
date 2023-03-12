//Player:Quit:Lable
var leftarray = [x, y, z];
const drawtext = 'Spieler hat den Server Verlassen';
mp.events.add('Player:Quit:Lable', (drawpos) => {
    var item = [Number(drawpos.x), Number(drawpos.y), Number(drawpos.z)];
    leftarray.push(item);
    setTimeout(() => {
        leftarray = leftarray.filter((i) => i !== item);
    }, 10000); //10 Sekunden
});
mp.events.add('render', () => {
    linearray.map((item) => {
        mp.game.graphics.drawText(drawtext, new mp.Vector3(item[0], item[1], item[2]), {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.5, 0.5],
            outline: false,
            centre: true,
        });
    });
});
