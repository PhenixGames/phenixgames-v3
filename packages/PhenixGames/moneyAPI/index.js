const {
    Database
} = require("../../_db/db");
const database = new Database();


//! ******* GET ALL INFO OF PLAYER - MONEY *******

/**
 * Get all Money data in Database of specific player.
 * @param {int} playerId 
 * @returns {boolean | object}
 */
module.exports.getPlayerMoneyInfo = async function (playerId) {
    return await database.query('SELECT * FROM pg_money WHERE playerid = ?', [playerId])
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
 * @param {int} playerId 
 * @param {int} newMoney 
 * @param {boolean} isBank 
 * @returns {boolean}
 */
module.exports.updateMoney = async function (playerId, newMoney, isBank) {
    return await database.query(`UPDATE pg_money SET ${(isBank) ? 'bank' : 'hand'}_money = ? WHERE playerid = ?`, [newMoney, playerId])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}

//! ******* TRANSFER MONEY *******

/**
 * ? Transfer Hand-Money between two Players.
 * @param {int} playerId 
 * @param {int} targetId 
 * @param {int} newPlayerMoney 
 * @param {int} newTargetMoney 
 * @param {boolean} isBank 
 * @returns 
 */
module.exports.transferMoneyToPlayer = async function(playerId, targetId, newPlayerMoney, newTargetMoney, isBank) {
    return await database.query(`UPDATE pg_money SET ${(isBank) ? 'bank' : 'hand'}_money = ? WHERE playerid = ?; UPDATE pg_money SET ${(isBank) ? 'bank' : 'hand'}_money = ? WHERE playerid = ?`, [newPlayerMoney, playerId, newTargetMoney, targetId])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}