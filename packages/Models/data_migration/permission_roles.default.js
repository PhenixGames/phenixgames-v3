const pg_permission_roles = require('../tables/pg_permission_roles');
const permission_role_data = require('./json/pg_permission_roles.json');

(async () => {
    for (let i in permission_role_data) {
        pg_permission_roles.create(permission_role_data[i]).catch((err) => {
            if (err.name === 'SequelizeUniqueConstraintError') return;
            console.log('pg_permission_roles: default data not inserted');
            console.log(err);
        });
    }
    console.log('pg_permission_roles: default data inserted');
})();
