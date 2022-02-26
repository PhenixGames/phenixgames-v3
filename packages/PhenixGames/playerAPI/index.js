const {
    Database
} = require("../../_db/db");
const database = new Database();

const config = require('../../../_assets/json/config.json');

const validator = require('validator');
const console = require('better-console');

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
            console.error(err);
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
            console.error(err);
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
            console.error(err);
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
            if (res.length > 0 && res[0].pos != '{"x":"0","y":"0"}') {
                return JSON.parse(res[0].last_pos)
            } else {
                this.changePlayerPos(player, config.defaultSpawn.pos, config.defaultSpawn.rot)

                let newPos = config.defaultSpawn.pos.split(', ');
                return JSON.parse(`{"x": "${newPos[0]}", "y": "${newPos[1]}", "z": "${newPos[2]}"}`)
            }
        })
        .catch(err => {
            console.error(err);
            return false;
        })
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
        player.position = new mp.Vector3(Number(new_pos[0]), Number(new_pos[1]), Number(new_pos[2]));

        if (new_rot) player.heading = Number(new_rot);
        if (new_dim) player.dimension = Number(new_dim)
    } catch (err) {
        console.error(err);
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
module.exports.saveLocalVar = async function (player, data) {

    for (const [index, [key, value]] of Object.entries(Object.entries(data))) {
        //console.log(`${index}: ${key} = ${value}`);
        player.setVariable(key, value);
    }
    return;
}

/**
 * 
 * @param {int} playerId 
 * @param {array} name 
 */
module.exports.savePlayerInGameName = async function (playerId, name) {
    const firstname = validator.trim(name[0]);
    const lastname = validator.trim(name[1]);

    return await database.query('UPDATE pg_users SET firstname = ?, lastname = ? WHERE id = ?', [firstname, lastname, playerId])
        .then(() => {
            return true
        })
        .catch(err => {
            console.error(err);
            return false;
        });
}

/**
 * 
 * @param {int} playerId 
 * @returns {object}
 */
module.exports.getPlayerInGame = async function (playerId) {
    return await database.query('SELECT firstname, lastname FROM pg_users WHERE id = ?', [playerId])
        .then(res => {
            return res[0];
        })
        .catch(err => {
            console.error(err);
            return false;
        })
}

/**
 * Check if Player is Media or not.
 * @param {int} player_id 
 * @returns {boolean}
 */
module.exports.isMedia = async function (player_id) {
    return await database.query('SELECT isMedia FROM pg_users WHERE id = ?', [player_id])
        .then(res => {
            if(res[0].isMedia === 1) {
                return true;
            }else {
                return false;
            }
        })
}

/**
 * Sync All Players
 */
module.exports.syncAllPlayers = async function () {
    mp.players.forEach((player) => {
        if(!player.getVariable('isInEvent') && player.getVariable('isLoggedIn')) {
            this.saveNewPlayerPos(player.getVariable('playerId'), JSON.stringify(player.position));
        }
    });
    //console.log('ALL PLAYERS SYNCED!')
}


require('./permissionSystem');