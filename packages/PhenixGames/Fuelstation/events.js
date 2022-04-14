const database = require("../../_db/db");
const console = require('better-console');
const Fuelstations = require('../Fuelstation/');
const debug = true;


mp.events.add('playerEnterColshape', (player, shape) => {
    if(Fuelstations.is_entity_fuelstation(shape)){
        player.notify("Du betrittst das gelände einer Tankstelle");
    }else {
        if(debug){
        player.notify("~r~Du bist nicht in einer Tankstelle");
        }
    }
    Player_entered_fuelstation(player, shape)

  });
  
  mp.events.add("playerExitColshape", (player, shape) => {
      if(debug){
          console.log("Player Exit Colshape");
      }
      if(Fuelstations.is_entity_fuelstation(shape)){
          player.notify("~g~Du verlässt das gelände einer Tankstelle");
      }else {
          if(debug){
          player.notify("~r~Du bist nicht in einer Tankstelle");
          }
      }
      Remove_all_marker_of_fuelstation(player);
     });
async function Get_Marker_out_of_Database(shape){
    return await database.query('SELECT * FROM pg_fuelstations_marker WHERE fuelstation_id = ?', [shape.getVariable('id')])
    .then(res => {
        return res;
    })
    .catch(err => {
        console.error(err);
        return false;
    })
}
async function Player_entered_fuelstation(player, shape){
    var res = await Get_Marker_out_of_Database(shape);
    if(debug){
       console.log("-- Create Markers -- " + res.length + " --");
       console.log(res);
    }
       for (var i = 0; i < res.length; i++) {
           try {
               await Spawn_Marker_Of_Fuelstation(player, new mp.Vector3(res[i].pos.split(', ')), res[i].size, res[i].marker_id);
           } catch (error) {
               console.log("Fehler beim erstellen des Markers: " + error);
           }
       }
}

async function Spawn_Marker_Of_Fuelstation(player, pos, size, id){
    player.call("Fuelstation:Spawn:Marker", [pos, size, id]);
    return true;
}
async function Remove_all_marker_of_fuelstation(player){
    player.call("Fuelstation:Destroy:Markers");
    return true;
}