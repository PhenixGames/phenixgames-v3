var Fuelstations = [
        1,
        2,
        3,
        4,
]
//Load all Fuel stations
//mp.colshapes.newRectangle(x, y, width, height, dimension)

//Test
//POSITION: -2096.231689453125, -320.1805114746094, 12.16186809539795
var pos = new mp.Vector3(-2096.231689453125, -320.1805114746094, 12.16186809539795);
var col = mp.colshapes.newCircle(pos.x , pos.y, 20);
col.setVariable("Type", 1);

mp.events.add('playerEnterColshape', (player, shape) => {
  if(isentfuelstation(shape)){
      player.call("Du betrittst das gelände einer Tankstelle");
      player.call("fuelstation.open", [shape.getVariable("Type")]);
  }
});

mp.events.add("playerExitCheckpoint", (col) => {
    console.log(col);
    player.notify("Testttt");
   });



module.exports.isentfuelstation = async function (shape) {
    for (var i = 0; i < Fuelstations.length; i++) {
        if(Fuelstations[i] == shape.getVariable("Type")){
            return true
        }
     }
     return false
}