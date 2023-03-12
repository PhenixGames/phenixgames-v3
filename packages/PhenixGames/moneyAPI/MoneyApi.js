const classes = require('extends-classes');

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
                player.call('Player:HUD:UpdateMoney', [money]);
            }
        });
    }
}

module.exports = new Api();
