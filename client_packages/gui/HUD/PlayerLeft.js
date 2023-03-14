//Declar Var
let leftarray = [];
const drawtext = '~y~Spieler hat\n den Server Verlassen';
let item;
//Code
mp.events.add('Player:Quit:Lable', (drawpos) => {
    item = [Number(drawpos.x), Number(drawpos.y), Number(drawpos.z)]; //Item erstellen
    leftarray.push(item); //Item dem Array Hinzufügen
    setTimeout(() => {
        leftarray = leftarray.filter((i) => i !== item); //Item nach 10 Sekunden Entfernen
    }, 10000); //10 Sekunden
});
mp.events.add('render', () => {
    //Render Funktion wird jeden Frame Ausgeführt
    leftarray.map((item) => {
        //Mappe durch den Array an Leftplayers
        mp.game.graphics.drawText(drawtext, [item[0], item[1], item[2] + 1], {
            //Zeichne Den text in die Welt
            font: 0,
            color: [255, 255, 255, 185],
            scale: [0.2, 0.2],
            outline: false,
            centre: true,
        });
    });
});
