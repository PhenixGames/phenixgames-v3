const database = require('../../_db/db');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;
const HandMoneyApi = require('./handmoney');
const BankAPI = require('./bankapi');


module.exports.UpdateMoneyHud = async function (player){
    const playerid = player.getVariable('playerid')
    const money = await HandMoneyApi.get(playerid);
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