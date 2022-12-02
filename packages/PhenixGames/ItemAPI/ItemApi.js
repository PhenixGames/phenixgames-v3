const pg_items = require('../../Models/tables/pg_items');

class Api {
    constructor() {
        this.init();
    }

    init() {
        return new Promise(async (resolve, reject) => {
            this.items = await pg_items.findAll().catch(err => {return []});
            resolve();
        });
    }


    get(id) {
        return new Promise(async (resolve) => {
            const item = this.items.find((item) => item.id == id);
            return resolve(item);
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
            .then((res) => {
                this.init();
                return res;
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
                this.init();
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
                this.init();
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
