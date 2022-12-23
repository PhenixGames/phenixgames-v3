const pg_user_inventory = require('../../Models/tables/pg_user_inventory');
const AccountAPI = require('../account/AcountAPI');
const { ItemApi } = require('../ItemAPI/ItemApi');

class Api {
    constructor() {}

    defaultInventory = [];

    get(id) {
        return new Promise(async (resolve) => {
            const user = await AccountAPI.get(id);
            const inventory = await user.getInventory();
            for (let i in inventory.items) {
                const item = await ItemApi.get({ id: 1 });
                inventory[i].img = item.img;
            }
            return resolve(inventory);
        });
    }

    async update(id, userInventory) {
        pg_user_inventory.update(
            {
                items: userInventory,
            },
            {
                where: {
                    player_id: id,
                },
            }
        );
    }

    async addItem({ itemId, playerId, amount = null, userInventory }) {
        return new Promise(async (resolve) => {
            const item = userInventory.find((item) => item.id === itemId);
            if (item && item.isStackable && item.amount + amount > max) {
                item.amount += amount;
            } else {
                userInventory.push({
                    id: itemId,
                    amount: amount,
                });
            }
            await this.update(playerId, userInventory);
            return resolve(userInventory);
        });
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

    getKeyLength(player_id) {
        return new Promise(async (resolve) => {
            const inventory = await this.get(player_id);
            if (!inventory) return resolve(999);
            const keys = inventory.items.filter((item) => item.type === 'veh_key');
            return resolve(keys.length);
        });
    }
}

module.exports.InventoryApi = new Api();
