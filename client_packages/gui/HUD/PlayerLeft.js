let leftarray = [];
const drawtext = 'Spieler hat den Server Verlassen';
let item;
mp.events.add('Player:Quit:Lable', (drawpos) => {
    item = [Number(drawpos.x), Number(drawpos.y), Number(drawpos.z)];
    leftarray.push(item);
    setTimeout(() => {
        leftarray = leftarray.filter((i) => i !== item);
    }, 10000); //10 Sekunden
    mp.console.logInfo("Drawpos: " + drawpos, true, true);
    mp.console.logInfo("item: " + item, true, true);
});
mp.events.add('render', () => {
    leftarray.map((item) => {
        const pos = new mp.Vector3(item[0], item[1], item[2])
        mp.game.graphics.drawText(drawtext, pos, {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.5,0.5],
            outline: false,
            centre: true,
        });
    });
});
