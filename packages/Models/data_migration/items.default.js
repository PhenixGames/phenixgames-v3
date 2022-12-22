const pg_items = require('../tables/pg_items');
const items_data = require('./json/pg_items.json');

(async () => {
    for (let i in items_data) {
        await pg_items
            .create(items_data[i], {
                ignoreDuplicates: true,
            })
            .catch((err) => {
                console.log('pg_items: default data not inserted');
                console.log(err);
            });
    }
    console.log('pg_items: default data inserted');
})();
