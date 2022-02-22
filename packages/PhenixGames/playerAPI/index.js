const {
    Database
} = require("../../_db/db");
const database = new Database();

const config = require('../../../_assets/json/config.json');

const validator = require('validator');

/**
 * 
 * @param {string} username 
 * @returns 
 */
module.exports.getPlayerId = async function (username) {
    return await database.query('SELECT id FROM pg_users WHERE username = ? LIMIT 1', [username])
        .then(res => {
            if (res.length > 0) {
                return res[0].id
            }
            return false;
        }).catch(err => {
            console.log(err);
            return false;
        })
}


/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @returns 
 */
module.exports.saveNewPlayer = async function (username, password) {
    return await database.query('INSERT INTO pg_users (username, password) VALUES (?, ?)', [username, password])
        .then(() => {
            return true
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}

/**
 * 
 * @param {int} player_id 
 * @param {string} player_pos 
 * @returns 
 */
module.exports.saveNewPlayerPos = async function (player_id, player_pos) {
    return await database.query('UPDATE pg_users SET last_pos = ? WHERE id = ?', [player_pos, player_id])
        .then(() => {
            return true
        })
        .catch(err => {
            console.log(err);
            return false;
        })
}

/**
 * 
 * @param {int} player_id 
 * @returns 
 */
module.exports.getLastPlayerPos = async function (player_id) {
    return await database.query('SELECT last_pos FROM pg_users WHERE id = ?', [player_id])
        .then(res => {
            if (res.length > 0 && res[0].pos != '{"x":"0","y":"0","z":"0"}') {
                return JSON.parse(res[0].last_pos)
            } else {
                return this.changePlayerPos(player, config.defaultSpawn.pos, config.defaultSpawn.rot)
            }
        });
}

/**
 * 
 * @param {object} player @requires
 * @param {string} new_pos @requires
 * @param {string} new_rot @optional
 * @param {string} new_dim @optional
 * @returns /
 */
module.exports.changePlayerPos = async function (player, new_pos, new_rot, new_dim) {
    try {
        new_pos = new_pos.split(', ');
        console.log(new_pos)
        player.position = new mp.Vector3(Number(new_pos[0]), Number(new_pos[1]), Number(new_pos[2]));

        if (new_rot) player.heading = Number(new_rot);
        if (new_dim) player.dimension = Number(new_dim)
    } catch (err) {
        console.log(err);
        return false;
    }
    return true;
}

/**
 * 
 * @param {object} player 
 * @param {object} data 
 * @returns /
 */
module.exports.saveLocalPlayerVar = async function (player, data) {

    for (const [index, [key, value]] of Object.entries(Object.entries(data))) {
        //console.log(`${index}: ${key} = ${value}`);
        player.setVariable(key, value);
    }
    return;
}

/**
 * 
 * @param {object} player 
 * @param {array} name 
 */
module.exports.savePlayerInGameName = async function (player, name) {
    const firstname = validator.trim(name[0]);
    const lastname = validator.trim(name[1]);

    const playerId = player.getVariable('playerId');
    if(!playerId) return false;

    return await database.query('UPDATE pg_users SET firstname = ?, lastname = ? WHERE id = ?', [firstname, lastname, playerId])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        });
}

/**
 * 
 * @param {object} player 
 * @returns {object}
 */
module.exports.getPlayerInGame = async function (player) {
    const playerId = player.getVariable('playerId');
    if(!playerId) return false;

    return await database.query('SELECT firstname, lastname FROM pg_users WHERE id = ?', [playerId])
        .then(res => {
            return res[0];
        })
        .catch(err => {
            console.log(err);
            return false;
        })
}