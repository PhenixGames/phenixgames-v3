const pg_items = require('../../Models/tables/pg_items');
const database = require('../../_db/db');

class Api {
    constructor() {}

    async get(id) {
        return await pg_items
            .findOne({
                where: {
                    id,
                },
            })
            .catch((err) => {
                return false;
            });
    }

    async add({
        img,
        isStackable,
        maxCount,
        isDropable,
        isSplitable,
        weight,
        isUsable,
        isSellable,
    }) {
        return await pg_items
            .create({
                img,
                isStackable,
                maxCount,
                isDropable,
                isSplitable,
                weight,
                isUsable,
                isSellable,
            })
            .catch((err) => {
                return false;
            });
    }

    async update({ id, img, isStackable, maxCount, isDropable, isSplitable, weight }) {
        return await pg_items
            .update(
                {
                    img,
                    isStackable,
                    maxCount,
                    isDropable,
                    isSplitable,
                    weight,
                },
                {
                    where: {
                        id,
                    },
                }
            )
            .then((res) => {
                return res.affectedRows > 0;
            })
            .catch((err) => {
                return false;
            });
    }

    async delete(id) {
        return await pg_items
            .destroy({
                where: {
                    id,
                },
            })
            .then((res) => {
                return res.affectedRows > 0;
            })
            .catch((err) => {
                return false;
            });
    }

    async isStackable(id) {
        const item = await this.get(id);
        return JSON.parse(item.isStackable);
    }

    async isDropable(id) {
        const item = await this.get(id);
        return JSON.parse(item.isDropable);
    }

    async isSplitable(id) {
        const item = await this.get(id);
        return JSON.parse(item.isSplitable);
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
