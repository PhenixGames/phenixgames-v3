const database = require('../../_db/db');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;

class BankAPI{

    constructor() {}
    async get(playerId) {
        return await database.query('SELECT * FROM pg_money WHERE playerid = ?', [playerId])
            .then(res => {
                if(res.length <= 0) {
                    return false;
                }
                return res[0];
            })
            .catch(err => {
                return false;
            })
    }

    async has(playerId, money) {
        current = await this.get(playerId);
        return current >= money;
    }

    async add(playerId, money) {
        return await database.query('UPDATE pg_money SET bank_money = bank_money + ? WHERE playerid = ?', [money, playerId])
            .then(() => {return true})
            .catch(err => {
                return false;
            })
    }

    async remove(playerId, money) {
        return await database.query('UPDATE pg_money SET bank_money = bank_money - ? WHERE playerid = ?', [money, playerId])
            .then(() => {return true})
            .catch(err => {
                return false;
            })
    }
   
}

const bankAPI = new BankAPI();
module.exports = bankAPI;