
//Load all Fuel stations
//mp.colshapes.newRectangle(x, y, width, height, dimension)

//Test
//POSITION: -2096.231689453125, -320.1805114746094, 12.16186809539795
var pos = new mp.Vector3(-2096.231689453125, -320.1805114746094, 12.16186809539795);
var col = mp.colshapes.newCircle(pos.x , pos.y, 20);
col.setVariable("debuggggg", 1);

mp.events.add('playerEnterColshape', (player, shape) => {
    player.notify(`You entered a colshape with id "${shape.getVariable("debuggggg")}".`);
    player.call("Create:Tankstellen:Main:Marker");
});

mp.events.add("playerExitCheckpoint", (checkpoint) => {
    console.log(checkpoint);
    player.notify("Testttt");
   });