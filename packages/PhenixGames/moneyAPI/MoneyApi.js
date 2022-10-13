const classes = require('extends-classes');

const database = require('../../_db/db');
const BankApi = require('./BankApi');
const HandMoneyApi = require('./HandMoneyApi');

class Api extends classes(BankApi, HandMoneyApi) {
    constructor() {
        super();
    }

    async updateHud(playerid) {
        const money = await this.getHand(playerid);
        mp.players.forEach((player) => {
            if (player.getVariable('playerId') == playerid) {
                player.call('Player:HUD:Update:Money', [money]);
            }
        });
    }

    async add(playerid, handmoney, bankmoney) {
        return await database
            .query(
                'INSERT IGNORE INTO pg_money (playerid, hand_money, bank_money) VALUES (?, ?, ?)',
                [playerid, handmoney, bankmoney]
            )
            .catch((err) => {
                return false;
            });
    }
}

module.exports = new Api();
