const database = require('../../_db/db');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;
const {moneyapi} = require('moneyapi');
const {bankapi} = require('bankapi');


module.exports.UpdateMoneyHud = async function (player){
    playerid = player.getVariable('playerid')
    money = await moneyapi.get(playerid);
    player.call("Player:HUD:Update:Money", money);
}

module.exports.CreateNewMoneyEntry = async function (playerid, StartMoneyOnHand, StartMoneyOnBank) {
    return await database.query('INSERT INTO pg_money (playerid, hand_money, bank_money) VALUES (?, ?, ?)', [playerid, StartMoneyOnHand, StartMoneyOnBank])
        .then(() => {
            return true
        })
        .catch(err => {
            return false;
        });
}