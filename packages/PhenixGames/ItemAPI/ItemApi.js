const database = require('../../_db/db');

class Api {
    constructor() {}

    async get(id) {
        return await database
            .query(`SELECT * FROM items WHERE id = ?`, [id])
            .then((res) => {
                return res[0] || [];
            })
            .catch((err) => {
                return [];
            });
    }

    async add({ img, isStackable, maxCount, isDropable, isSplitable, weight }) {
        return await database
            .query(
                `INSERT INTO items (img, isStackable, maxCount, isDropable, isSplitable, weight) VALUES (?, ?, ?, ?, ?, ?)`,
                [img, isStackable, maxCount, isDropable, isSplitable, weight]
            )
            .then((res) => {
                return res.insertId;
            })
            .catch((err) => {
                return null;
            });
    }

    async update({ id, img, isStackable, maxCount, isDropable, isSplitable, weight }) {
        return await database
            .query(
                `UPDATE items SET img = ?, isStackable = ?, maxCount = ?, isDropable = ?, isSplitable = ?, weight = ? WHERE id = ?`,
                [img, isStackable, maxCount, isDropable, isSplitable, weight, id]
            )
            .then((res) => {
                return res.affectedRows > 0;
            })
            .catch((err) => {
                return false;
            });
    }

    async delete(id) {
        return await database
            .query(`DELETE FROM items WHERE id = ?`, [id])
            .then((res) => {
                return res.affectedRows > 0;
            })
            .catch((err) => {
                return false;
            });
    }

    async isStackable(id) {
        const item = await this.get(id);
        return item.isStackable;
    }

    async isDropable(id) {
        const item = await this.get(id);
        return item.isDropable;
    }

    async isSplitable(id) {
        const item = await this.get(id);
        return item.isSplitable;
    }

    async getMaxCount(id) {
        const item = await this.get(id);
        return item.maxCount;
    }

    async getWeight(id) {
        const item = await this.get(id);
        return item.weight;
    }

    async getImg(id) {
        const item = await this.get(id);
        return item.img;
    }
}

module.exports.ItemApi = new Api();
