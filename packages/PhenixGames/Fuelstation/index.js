const debug = require('../../../_assets/json/debug/debug.json').fuelstation;

const database = require("../../_db/db");
const console = require('better-console');
const { log } = require('../../../_assets/functions/log/logs');
require('../Fuelstation/events.js');
//TODO: Make code more readable
var Fuelstations = [
        1,//Kleine Tankstelle
        2,//Mittlere Tankstelle
        3,//Große Tankstelle
        4,//Tankstelle Boot/Helikopter
];
/**
 * 
 * @param {Colspahe} shape 
 * @returns 
 */
module.exports.is_entity_fuelstation = async function (shape) {
    for (var i = 0; i < Fuelstations.length; i++) {
        if(Fuelstations[i] == shape.getVariable("Type")){
            return true
        }
     }
     return false
}
/**
 * Funktion wird Vom Server aufgerufen beim server start - initialisiert alle fuel stations
 * @returns true
 */
module.exports.Load_Fuel_stations = async function () {
    await Create_All_fuel_stations_colshapes();
    return true;
}

/**
 * Holt sich die gewollten daten aus der Datenbank
 * @param {string} type 
 * @returns Data from Database as JSON
 */
async function GetDataFromDatabase(type){
 if(type = "all"){
    return await database.query('SELECT * FROM pg_fuelstations')
    .then(res => {
        return res;
    })
    .catch(err => {
        log({
            message: err,
            isFatal: true
        });
        return false;
    })
 }
 return false;
}
/**
 * Loops though JSON data and spawns them (SpawnCol)
 * @returns true
 */
async function Create_All_fuel_stations_colshapes(){
 var res = await GetDataFromDatabase("all");
 if(debug){
    console.log("-- Create Fuelstations -- " + res.length + " --");
    console.log(res);
 }
    for (var i = 0; i < res.length; i++) {
        try {
            await SpawnCol(res[i].type, new mp.Vector3(res[i].pos.split(', ')), res[i].id);
        } catch (error) {
            log({
                message: "Fehler beim erstellen der Fuelstation: " + error,
                isFatal: false
            });
        }
    }
 return true;
}

/**
 * Finaly Spawns the colshape and Creates the blip on the map
 * @param {int} type 
 * @param {Vector3} pos 
 * @param {int} id 
 * @returns true
 */
async function SpawnCol(type, pos, id){
    var col = mp.colshapes.newCircle(Number(pos.x), Number(pos.y), 20);
    col.setVariable("Type", type);//Fuelstations 
    col.setVariable("id",id);//Tankstellen id

    mp.blips.new(361, new mp.Vector3(Number(pos.x), Number(pos.y), Number(pos.z)),
        {
            name: "Tankstelle",
            color: 25,
            shortRange: true,
            
        });
    return true
}   

module.exports.InsertMarkerToDatabase = async function (fuelstation, pos) {
    return await database.query('INSERT INTO pg_fuelstations_marker (fuelstation_id, pos) VALUES (?, ?)', [fuelstation, pos])
        .then(() => {
            return true
        })
        .catch(err => {
            log({
                message: err,
                isFatal: true
            });
            return false;
        });
}

mp.events.addCommand('fuelmarker', ( player, arg, id ) => {
    pos = player.position.x + ', ' + player.position.y + ', ' + (player.position.z - 1);
    this.InsertMarkerToDatabase(id, pos);
 });