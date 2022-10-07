const database = require('../../_db/db');
const MoneyAPI = require('./MoneyApi');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;


class BankApi {

    constructor() {}

    async getBank(playerId) {
        return await database.query('SELECT bank_money FROM pg_money WHERE playerid = ?', [playerId])
            .then(res => {
                if(res.length <= 0) {
                    return 0;
                }
                return res[0].bank_money;
            })
            .catch(err => {
                return 0;
            })
    }

    async hasBank(playerId, money) {
        current = await this.get(playerId);
        return current >= money;
    }

    async addBank(playerId, money) {
        return await database.query('UPDATE pg_money SET bank_money = bank_money + ? WHERE playerid = ?', [money, playerId])
            .then(() => {
                MoneyAPI.updateHud(player);
            })
            .catch(err => {
                return false;
            })
    }

    async removeBank(playerId, money) {
        return await database.query('UPDATE pg_money SET bank_money = bank_money - ? WHERE playerid = ?', [money, playerId])
            .then(() => {
                MoneyAPI.updateHud(player);
            })
            .catch(err => {
                return false;
            })
    }
   
}
module.exports = BankApi;