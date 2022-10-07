const MoneyAPI = require('.');
const database = require('../../_db/db');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;

class HandMoneyApi{

    constructor() {}
    async get(playerId) {
        return await database.query('SELECT hand_money FROM pg_money WHERE playerid = ?', [playerId])
            .then(res => {
                if(res.length <= 0) {
                    return 0;
                }
                return res[0].hand_money;
            })
            .catch(err => {
                return 0;
            })
    }

    async has(playerId, money) {
        const playerMoney = await this.get(playerId);
        return playerMoney >= money;
    }

    async add(playerId, money) {
        return await database.query('UPDATE pg_money SET hand_money = bank_money + ? WHERE playerid = ?', [money, playerId])
            .then(() => {MoneyAPI.updateHud(playerId); return true})
            .catch(err => {
                return false;
            })
    }

    async remove(playerId, money) {
        return await database.query('UPDATE pg_money SET hand_money = bank_money - ? WHERE playerid = ?', [money, playerId])
            .then(() => {MoneyAPI.updateHud(playerId); return true})
            .catch(err => {
                return false;
            })
    }
   
}

const HandMoneyAPI = new HandMoneyApi();
module.exports = HandMoneyAPI;