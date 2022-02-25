const {
    Database
} = require("../../_db/db");
const database = new Database();


//! ******* GET ALL INFO OF PLAYER - MONEY *******

/**
 * Get all Money data in Database of specific player.
 * @param {object} player 
 * @returns {boolean | object}
 */
module.exports.getPlayerMoneyInfo = async function (player) {
    return await database.query('SELECT * FROM pg_money WHERE playerid = ?', [player.getVariable('playerId')])
        .then(res => {
            if(res.length <= 0) {
                return false;
            }
            return res[0];
        })
        .catch(err => {
            console.log(err);
            return false;
        })
}

//! ******* UPDATE MONEY *******
/**
 * Update Hand or Bank Money from player.
 * @param {object} player 
 * @param {int} newMoney 
 * @param {boolean} isBank 
 * @returns {boolean}
 */
module.exports.updateMoney = async function (player, newMoney, isBank) {
    return await database.query(`UPDATE pg_money SET ${(isBank) ? 'bank' : 'hand'}_money = ? WHERE playerid = ?`, [newMoney, player.getVariable('playerId')])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}

//! ******* TRANSFER MONEY *******

/**
 * ? Transfer Hand-Money between two Players.
 * @param {object} player 
 * @param {int} targetId 
 * @param {int} newPlayerMoney 
 * @param {int} newTargetMoney 
 * @param {boolean} isBank 
 * @returns 
 */
module.exports.transferMoneyToPlayer = async function(player, targetId, newPlayerMoney, newTargetMoney, isBank) {
    return await database.query(`UPDATE pg_money SET ${(isBank) ? 'bank' : 'hand'}_money = ? WHERE playerid = ?; UPDATE pg_money SET ${(isBank) ? 'bank' : 'hand'}_money = ? WHERE playerid = ?`, [newPlayerMoney, player.getVariable('playerId'), newTargetMoney, targetId])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}