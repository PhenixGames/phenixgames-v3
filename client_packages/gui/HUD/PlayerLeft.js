let leftarray = [];
const drawtext = '~y~Spieler hat\n den Server Verlassen';
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
        mp.game.graphics.drawText(drawtext, [item[0], item[1], item[2]+1], {
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.5,0.5],
            outline: false,
            centre: true,
        });
    });
});
