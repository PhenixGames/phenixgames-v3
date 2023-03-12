let leftarray = [];
const drawtext = 'Spieler hat den Server Verlassen';
let item;
mp.events.add('Player:Quit:Lable', (drawpos) => {
    item = [Number(drawpos.x), Number(drawpos.y), Number(drawpos.z)];
    leftarray.push(item);
    setTimeout(() => {
        leftarray = leftarray.filter((i) => i !== item);
    }, 10000); //10 Sekunden
});
mp.events.add('render', () => {
    leftarray.map((item) => {
        mp.game.graphics.drawText(drawtext, mp.Vector3(item[0], item[1], item[2]), {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [1,1],
            outline: false,
            centre: true,
        });
    });
});
