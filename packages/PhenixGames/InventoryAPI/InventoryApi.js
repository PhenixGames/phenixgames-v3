const pg_items = require('../../Models/tables/pg_items');
const pg_user_inventory = require('../../Models/tables/pg_user_inventory');
const AccountAPI = require('../account/AcountAPI');

class Api {
    constructor() {}

    defaultInventory = [];

    get(id) {
        return new Promise(async (resolve, reject) => {
            const user = await AccountAPI.get(id);
            return resolve(await user.getInventory());
        });
    }

    getItem({ id, name }) {
        return new Promise(async (resolve, reject) => {
            await pg_items
                .findOne({
                    $or: [
                        {
                            id: id,
                        },
                        {
                            name: name,
                        },
                    ],
                })
                .then((item) => {
                    return item ? resolve(item) : resolve([]);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    async update(id, userInventory) {
        pg_user_inventory.update(
            {
                items: userInventory,
            },
            {
                where: {
                    user_id: id,
                },
            }
        );
    }

    removeItem({ itemId, playerId, amount = null, userInventory }) {
        return new Promise(async (resolve) => {
            const item = userInventory.find((item) => item.id === itemId);
            if (amount) {
                if (item.amount - amount <= 0) {
                    userInventory.splice(userInventory.indexOf(item), 1);
                } else {
                    item.amount -= amount;
                }
            }
            await this.update(playerId, userInventory);
            return resolve(userInventory);
        });
    }
}

module.exports.InventoryApi = new Api();
