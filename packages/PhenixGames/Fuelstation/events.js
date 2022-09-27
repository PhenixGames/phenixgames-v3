const database = require("../../_db/db");
const console = require('better-console');
const Fuelstations = require('../Fuelstation/');
const debug = require('../../../_assets/json/debug/debug.json').fuelstation;


mp.events.add('playerEnterColshape', (player, shape) => {
    if(Fuelstations.is_entity_fuelstation(shape)){
        Player_entered_fuelstation(player, shape)
        if(debug) player.notify("Du betrittst das gelände einer Tankstelle");
    }else {
        if(debug)player.notify("~r~Du bist nicht in einer Tankstelle");
    }
  });
  
  mp.events.add("playerExitColshape", (player, shape) => {
      if(debug){
          console.log("Player Exit Colshape");
      }
      if(Fuelstations.is_entity_fuelstation(shape)){
          if(debug)player.notify("~g~Du verlässt das gelände einer Tankstelle");
      }else {
          if(debug)player.notify("~r~Du bist nicht in einer Tankstelle");
      }
      Remove_all_marker_of_fuelstation(player);
      player.setVariable('isnearFuelstation', false);
      player.setVariable("Fuelstation_id", null);
     });

mp.events.add("Server:Request:Data:Fuelstation", async (player) => {
    console.log("Got Called!")
    var stationid = player.getVariable("Fuelstation_id");
    var res = await Get_Data_from_database(stationid);
    var Benzinpreis = res[0].fuel_sell_price_b * res[0].business_profit_mp;
    var Dieselpreis = res[0].fuel_sell_price_d * res[0].business_profit_mp;
    var Fuelsationname = res[0].name;
    var Cars = []; //Only the nearest 5 in range of 5[meter=?] of fuelstation
    let items = {
        
        'name': Fuelsationname, 
        'diesel_price': Dieselpreis,
        'benzin_price': Benzinpreis,
        'cars': Cars
    };
    player.call("Player:Init:Gasstation", [items])
    if(debug)console.log(items);
    
});
async function Get_Data_from_database(stationid){
    return await database.query('SELECT * FROM pg_fuelstations WHERE id = ?', [stationid])
    .then(res => {
        return res;
    })
    .catch(err => {
        console.error(err);
        return false;
    })
}

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
       player.setVariable('isnearFuelstation', true);
       player.setVariable("Fuelstation_id", shape.getVariable('id'));
}

async function Spawn_Marker_Of_Fuelstation(player, pos, size, id){
    player.call("Fuelstation:Spawn:Marker", [pos, size, id]);
    return true;
}
async function Remove_all_marker_of_fuelstation(player){
    player.call("Fuelstation:Destroy:Markers");
    return true;
}

