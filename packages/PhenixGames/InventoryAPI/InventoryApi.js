const AccountAPI = require('../account/AcountAPI');

class Api {
    constructor() {}

    defaultInventory = [];

    async get(id) {
        const user = await AccountAPI.get(id);
        return user.getInventory();
    }

    async update(id, items) {
        const user = await AccountAPI.get(id);
        user.updateInventory({
            items: items,
        });
    }
}

module.exports.InventoryApi = new Api();
