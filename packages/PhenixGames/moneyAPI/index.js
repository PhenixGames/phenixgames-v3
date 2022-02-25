const {
    Database
} = require("../../_db/db");
const database = new Database();


//! ******* GET ALL INFO OF PLAYER - MONEY *******

/**
 * Get all Money data in Database of specific player
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
 * 
 * @param {object} player 
 * @param {int} newMoney 
 * @returns {boolean}
 */
module.exports.updateHandMoney = async function (player, newMoney) {
    return await database.query('UPDATE pg_money SET hand_money = ? WHERE playerid = ?', [newMoney, player.getVariable('playerId')])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}

/**
 * 
 * @param {object} player 
 * @param {int} newMoney 
 * @returns {boolean}
 */
module.exports.updateBankMoney = async function (player, newMoney) {
    return await database.query('UPDATE pg_money SET bank_money = ? WHERE playerid = ?', [newMoney, player.getVariable('playerId')])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}

//! ******* TRANSFER MONEY *******

/**
 * ? Transfer Hand-Money between two Players
 * @param {object} player 
 * @param {int} targetId 
 * @param {int} newPlayerMoney 
 * @param {int} newTargetMoney 
 * @returns 
 */
module.exports.transferHandMoneyToPlayer = async function(player, targetId, newPlayerMoney, newTargetMoney) {
    return await database.query('UPDATE pg_money SET hand_money = ? WHERE playerid = ?; UPDATE pg_money SET hand_money = ? WHERE playerid = ?', [newPlayerMoney, player.getVariable('playerId'), newTargetMoney, targetId])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}

/**
 * ? Transfer Bank-Money between two Player Bank
 * @param {object} player 
 * @param {int} targetId 
 * @param {int} newPlayerMoney 
 * @param {int} newTargetMoney 
 * @returns 
 */
 module.exports.transferBankMoneyToPlayer = async function(player, targetId, newPlayerMoney, newTargetMoney) {
    return await database.query('UPDATE pg_money SET bank_money = ? WHERE playerid = ?; UPDATE pg_money SET bank_money = ? WHERE playerid = ?', [newPlayerMoney, player.getVariable('playerId'), newTargetMoney, targetId])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}