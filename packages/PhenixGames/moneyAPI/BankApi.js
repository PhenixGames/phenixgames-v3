const { Sequelize } = require('sequelize');
const AccountAPI = require('../account/AcountAPI');
const debug = require('../../../_assets/json/debug/debug.json').moneyapi;

class BankApi {
    constructor() {}

    async getBank(playerId) {
        const user = AccountAPI.get(playerId);

        const { bank_money } = await user.getMoney();
        return bank_money;
    }

    async hasBank(playerId, money) {
        current = await this.getBank(playerId);
        return current >= money;
    }

    async addBank(playerId, money) {
        const user = AccountAPI.get(playerId);

        return await user
            .updateMoney({
                bank_money: Sequelize.literal(bank_money + money),
            })
            .then(() => {
                this.updateHud(playerId);
            })
            .catch((err) => {
                return false;
            });
    }

    async removeBank(playerId, money) {
        const user = AccountAPI.get(playerId);
        
        return await user
            .updateMoney({
                bank_money: Sequelize.literal(bank_money - money),
            })
            .then(() => {
                this.updateHud(playerId);
            })
            .catch((err) => {
                return false;
            });
    }
}
module.exports = BankApi;
