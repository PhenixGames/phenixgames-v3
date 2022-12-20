const { Sequelize } = require('sequelize');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;

class BankApi {
    constructor() {}

    async getBank(playerId) {
        const user = global.AccountAPI.get(playerId);

        const { bank_money } = await user.getMoney();
        return bank_money;
    }

    async hasBank(playerId, money) {
        current = await this.getBank(playerId);
        return current >= money;
    }

    async addBank(playerId, money) {
        pg_money
            .update(
                {
                    hand_money: Sequelize.literal(`bank_money + ${money}`),
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

    async removeBank(playerId, money) {
        pg_money
            .update(
                {
                    hand_money: Sequelize.literal(`bank_money - ${money}`),
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
module.exports = BankApi;
