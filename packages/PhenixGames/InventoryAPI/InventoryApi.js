const pg_user_inventory = require('../../Models/tables/pg_user_inventory');
const AccountAPI = require('../account/AcountAPI');

class Api {
    constructor() {}

    defaultInventory = [];

    async get(id) {
        const user = await AccountAPI.get(id);
        return await user.getInventory();
    }

    async update(id, items) {
        pg_user_inventory.update(
            {
                items: items,
            },
            {
                where: {
                    user_id: id,
                },
            }
        );
    }
}

module.exports.InventoryApi = new Api();
