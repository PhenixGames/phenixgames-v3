const database = require('../../_db/db');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;
const HandMoneyApi = require('./handmoney');
const BankAPI = require('./bank');

class MoneyApi {
    constructor() {}

    async updateHud(player) {
        const playerid = player.getVariable('playerid');
        const money = await HandMoneyApi.get(playerid);
        console.log(playerid, money);
        player.call("Player:HUD:Update:Money", money);
    }

    async add(playerid, handmoney, bankmoney) {
        return await database.query('INSERT IGNORE INTO pg_money (playerid, hand_money, bank_money) VALUES (?, ?, ?)', [playerid, handmoney, bankmoney])
        .catch(err => {
            return false;
        });
    }
}

const MoneyAPI = new MoneyApi();

module.exports = MoneyAPI;