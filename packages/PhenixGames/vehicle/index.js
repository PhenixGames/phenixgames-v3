const { Database } = require("../../_db/db");

const database = new Database();

/**
 * Get Vehicle Data from specified Vehicle
 * @param {int} veh_id 
 * @returns {boolean | object}
 */
module.exports.getVehicleData = async function (veh_id) {
    return await database.query('SELECT * FROM pg_vehicles WHERE veh_id = ? LIMIT 1', [veh_id]).then(res => {
        return res[0];
    }).catch(err => {
        console.log(err);
        return false;
    })
}

/**
 * Save New Vehicle Data into Database
 * @param {object} veh
 * @returns {boolean}
 */
module.exports.saveVehicleData = async function (veh) {
    const veh_name = veh.veh_name;
    const veh_owner = veh.veh_owner;
    const veh_keys = veh.veh_keys;
    const veh_state = veh.veh_state;
    const veh_pos = veh.veh_pos;

    return await database.query(`INSERT INTO pg_vehicles (veh_name, veh_owner, veh_keys, veh_state, veh_pos) VALUES (?, ?, ?, ?, ?)`, [veh_name, veh_owner, veh_keys, veh_state, veh_pos])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
        });
}

/**
 * Update old Vehicle Data in Database
 * @param {object} veh
 * @returns {boolean}
 */
module.exports.updateVehicleData = async function (veh) {
    const veh_id = veh.veh_id
    const veh_name = veh.veh_name;
    const veh_owner = veh.veh_owner;
    const veh_keys = veh.veh_keys;
    const veh_state = veh.veh_state;

    return await database.query(`UPDATE pg_vehicles SET veh_name = ?, veh_owner = ?, veh_keys = ?, veh_state = ? WHERE veh_id = ?`, [veh_name, veh_owner, veh_keys, veh_state, veh_id])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}

/**
 * Delete Vehicle Data from Databse
 * @param {int} veh_id 
 * @returns {boolean}
 */
module.exports.deleteVehicleData = async function (veh_id) {
    return await database.query('DELETE * FROM pg_vehicles WHERE veh_id = ?', [veh_id])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}

/**
 * Parse Vehicle Keys into an array
 * @param {string} veh_keys 
 * @returns {array} veh_keys
 */
module.exports.getVehicleKeyOwner = function (veh_keys) {
    return JSON.parse(veh_keys)
}

/**
 * 
 * @param {string} veh_pos 
 * @returns {array} veh_pos
 */
module.exports.getVehiclePos = function (veh_pos) {
    return JSON.parse(veh_pos)
}


/**
 * Check if Player is Owner of Vehicle or not
 * @param {int} veh_owner 
 * @returns {boolean}
 */
module.exports.isPlayerVehicleOwner = function (veh_owner) {
    return player.getVariable('playerId') === veh_owner;
}

/**
 * Check if Player is Owner of Vehicle key or not
 * @param {int} playerId 
 * @param {array} veh_keys 
 * @returns {boolean}
 */
module.exports.isPlayerKeyOwner = function (playerId, veh_keys) {
    return (veh_keys.indexOf(playerId) !== -1) ? true : false;
}


/**
 * 
 * @param {Vehicle} veh 
 * @param {object} veh_data 
 * @returns {boolean}
 */
module.exports.setLocalData = function (veh, veh_data) {
    try {
        veh.setVariable('veh_id', veh_data.veh_id);
        veh.setVariable('veh_name', veh_data.veh_name);
        veh.setVariable('veh_owner', veh_data.veh_owner);
        veh.setVariable('veh_keys', veh_data.veh_keys);
        veh.setVariable('veh_state', veh_data.veh_state);
        return true;
    }catch(err) {
        console.log(err);
        return false;
    }
}