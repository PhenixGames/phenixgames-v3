const database = require("../../_db/db");
const console = require('better-console');
const Fuelstations = require('../Fuelstation/');
const debug = Fuelstations.debug;

mp.events.add('playerEnterColshape', (player, shape) => {
    if(Fuelstations.is_entity_fuelstation(shape)){
        player.notify("Du betrittst das gelände einer Tankstelle");
    }else {
        if(debug){
        player.notify("~r~Du bist nicht in einer Tankstelle");
        }
    }
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
     });