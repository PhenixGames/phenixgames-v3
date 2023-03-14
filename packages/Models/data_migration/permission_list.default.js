const pg_permission_list = require('../tables/pg_permission_list');
const Pg_permission_listJSON = require('./json/pg_permission_list.json');

(async () => {
    for (let i in Pg_permission_listJSON) {
        if (!Pg_permission_listJSON[i].role_id) continue;

        pg_permission_list.create(Pg_permission_listJSON[i]).catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') return;
            console.log('pg_permission_list: default data not inserted');
            console.log(err);
        });
    }

    console.log('pg_permission_list: default data inserted');
})();
