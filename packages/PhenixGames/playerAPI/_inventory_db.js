const database = require('../../_db/db');

/**
 * Save a new item into the inventory of the player.
 * @param {Int} player_id
 * @param {Object} items
 * @returns {Object} {error, message}
 */
module.exports.updatePlayerInventoryToDatabase = async ({ player_id, items }) => {
    return new Promise(async (resolve, reject) => {
        await database
            .query(`UPDATE pg_user_inventory SET items = ? WHERE user_id = ?`, [
                JSON.stringify(items),
                player_id,
            ])
            .then(() => {
                return resolve({
                    error: false,
                    message: 'Inventory saved',
                });
            })
            .catch((err) => {
                return reject({
                    error: true,
                    message: 'Failed to save inventory',
                });
            });
    });
};

/**
 * Select the right inventory for the player and return a Object will the data, or False if nothing found or it failed.
 * @param {Int} player_id
 * @returns {Boolean || Object}
 */
module.exports.getPlayerInventory = async ({ player_id }) => {
    return await database
        .query(`SELECT * FROM pg_user_inventory WHERE user_id = ? LIMIT 1`, [player_id])
        .then((res) => {
            if (res.length > 0) {
                return {
                    error: false,
                    items: res[0].items,
                };
            } else
                return {
                    error: false,
                    message: 'No inventory found for this player',
                };
        })
        .catch((err) => {
            return false;
        });
};

/**
 * Select the given Config for one Object and return it. If nothing found or it failed, return false.
 * @param {Int} item_id
 * @returns {Object} {error, item, code, message}
 */
module.exports.getItemConfig = async ({ item_id }) => {
    return await database
        .query('SELECT * FROM pg_item_config WHERE item_id = ?', [item_id])
        .then((res) => {
            if (res.length > 0) {
                return {
                    error: false,
                    item: res[0],
                };
            } else {
                return {
                    error: true,
                    code: 404,
                    message: 'No item config found for this item',
                };
            }
        })
        .catch((err) => {
            return {
                error: true,
                message: 'Failed to get item config',
            };
        });
};
