const database = require('../../_db/db');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;

class HandMoneyApi {
    constructor() {}

    async getHand(playerId) {
        return await database
            .query('SELECT hand_money FROM pg_money WHERE playerid = ?', [playerId])
            .then((res) => {
                if (res.length <= 0) {
                    return 0;
                }
                return res[0].hand_money;
            })
            .catch((err) => {
                return 0;
            });
    }

    async hasHand(playerId, money) {
        const playerMoney = await this.getHand(playerId);
        return playerMoney >= money;
    }

    async addHand(playerId, money) {
        return await database
            .query('UPDATE pg_money SET hand_money = bank_money + ? WHERE playerid = ?', [
                money,
                playerId,
            ])
            .then(() => {
                this.updateHud(playerId);
            })
            .catch((err) => {
                return false;
            });
    }

    async removeHand(playerId, money) {
        return await database
            .query('UPDATE pg_money SET hand_money = bank_money - ? WHERE playerid = ?', [
                money,
                playerId,
            ])
            .then(() => {
                this.updateHud(playerId);
            })
            .catch((err) => {
                return false;
            });
    }
}

module.exports = HandMoneyApi;
