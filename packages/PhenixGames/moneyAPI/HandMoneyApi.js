const debug = require('../../../_assets/json/debug/debug.json').moneyapi;
const { Sequelize } = require('sequelize');
const pg_money = require('../../Models/tables/pg_money');

class HandMoneyApi {
    constructor() {}

    async getHand(playerId) {
        const user = await global.AccountAPI.get(playerId);

        const { hand_money } = await user.getMoney();
        return hand_money;
    }

    async hasHand(playerId, money) {
        const playerMoney = await this.getHand(playerId);
        return playerMoney >= money;
    }

    async addHand(playerId, money) {
        pg_money
            .update(
                {
                    hand_money: Sequelize.literal(`hand_money + ${money}`),
                },
                {
                    where: {
                        player_id: playerId,
                    },
                }
            )
            .then(() => {
                this.updateHud(playerId);
            })
            .catch((err) => {
                return false;
            });
    }

    async removeHand(playerId, money) {
        pg_money
            .update(
                {
                    hand_money: Sequelize.literal(`hand_money - ${money}`),
                },
                {
                    where: {
                        player_id: playerId,
                    },
                }
            )
            .then(() => {
                this.updateHud(playerId);
            })
            .catch((err) => {
                return false;
            });
    }
}

module.exports = HandMoneyApi;
