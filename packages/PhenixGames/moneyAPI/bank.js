const database = require('../../_db/db');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;
const MoneyAPI = require('./MoneyApi');
class BankApi{

    constructor() {}
    async get(playerId) {
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

    async has(playerId, money) {
        current = await this.get(playerId);
        return current >= money;
    }

    async add(playerId, money) {
        return await database.query('UPDATE pg_money SET bank_money = bank_money + ? WHERE playerid = ?', [money, playerId])
            .then(() => {
                MoneyAPI.updateHud(player);
            })
            .catch(err => {
                return false;
            })
    }

    async remove(playerId, money) {
        return await database.query('UPDATE pg_money SET bank_money = bank_money - ? WHERE playerid = ?', [money, playerId])
            .then(() => {
                MoneyAPI.updateHud(player);
            })
            .catch(err => {
                return false;
            })
    }
   
}

const BankAPI = new BankApi();
module.exports = BankAPI;