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
}

module.exports = new Api();
