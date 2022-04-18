const debug = require('../../../_assets/json/debug/debug.json').houseapi;

const console = require('better-console');
const database = require("../../_db/db");

const config = {
    "normiehouse": "261.4586, -998.8196, -99.00863"
}

/**
 * 
 * @param {int} player_id 
 * @returns {array | boolean}
 */
module.exports.saveNewHouse = async function(player_id) {
    return await database.query('INSERT INTO pg_houses (player_id, house_pos) VALUES (?, ?)', [player_id, config.normiehouse])
    .then(() => {return config.normiehouse.split(', ')})
    .catch(err => {
        console.error(err);
        return false;
    })
}

/**
 * 
 * @param {int} player_id 
 * @returns {Boolean}
 */
module.exports.getHousePos = async function(player_id) {
    return await database.query('SELECT house_pos FROM pg_houses WHERE player_id = ?', [player_id])
    .then(res => {
        if(res.length > 0) {
            return res[0].house_pos.split(', ');
        }
        return false;
    })
    .catch(err => {
        console.error(err);
        return false;
    })
}

/**
 * 
 * @param {string} housePos 
 * @param {object} player 
 */
module.exports.spawnPlayerIntoHouse = async function(housePos, player) {
    player.position = new mp.Vector3(Number(housePos[0]), Number(housePos[1]), Number(housePos[2]));
    player.dimension = player.getVariable('playerId');
    if(Debug){
        player.notify("Du bist in der Dimension: " + player.dimension);
    }
    
    player.setVariable('isInHouse', true);
    mp.players.call('Set:Marker:InNormieHouse', [player.dimension]);
}