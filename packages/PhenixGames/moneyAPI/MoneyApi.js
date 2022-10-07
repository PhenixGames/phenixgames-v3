const database = require('../../_db/db');
const BankAPI = require('./bank');
const HandMoneyAPI = require('./handmoney');

class Api {
    
    constructor() {}

    async updateHud(playerid) {
        const money = await HandMoneyAPI.get(playerid);
        console.log('money', money);
        mp.players.forEach(player => {
            if(player.id == playerid) {
                player.call('updateMoney', [money]);
            }
        });
    }

    async add(playerid, handmoney, bankmoney) {
        return await database.query('INSERT IGNORE INTO pg_money (playerid, hand_money, bank_money) VALUES (?, ?, ?)', [playerid, handmoney, bankmoney])
        .catch(err => {
            return false;
        });
    }
}
const MoneyAPI = new Api();
module.exports = MoneyAPI