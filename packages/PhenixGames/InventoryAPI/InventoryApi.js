const database = require('../../_db/db');

class Api {
    constructor() {}

    static defaultInventory = [];

    async get(id) {
        return await database
            .query(`SELECT items FROM pg_user_inventory WHERE user_id = ? LIMIT 1`, [id])
            .then((res) => {
                return res[0].items || [];
            })
            .catch((err) => {
                return [];
            });
    }

    async update(id, items) {
        return await database
            .query(`UPDATE pg_user_inventory SET items = ? WHERE user_id = ?`, [
                JSON.stringify(items),
                id,
            ])
            .then(async (res) => {
                if (res.insertId === 0) {
                    return await this.save(id);
                }
            })
            .catch((err) => {
                return false;
            });
    }

    async save(id) {
        return await database
            .query(`INSERT IGNORE INTO pg_user_inventory (user_id, items) VALUES (?, ?)`, [
                id,
                JSON.stringify(defaultInventory),
            ])
            .catch((err) => {
                return false;
            });
    }
}

module.exports.InventoryApi = new Api();
