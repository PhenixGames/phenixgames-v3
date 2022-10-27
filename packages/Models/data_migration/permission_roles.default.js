const pg_permission_roles = require('../tables/pg_permission_roles');
const permission_role_data = require('./json/pg_permission_roles.json');
const pg_permission_list = require('./json/pg_permission_list.json');

(async () => {
    for (let i in permission_role_data) {
        pg_permission_roles
            .create(permission_role_data[i], {
                ignoreDuplicates: true,
            })
            .then((role) => {
                const rolePerms = pg_permission_list.filter((perm) => {
                    return perm.role_id === role.role_id;
                })[0];
                if (!rolePerms) return;

                role.createPermissions(rolePerms, {
                    ignoreDuplicates: true,
                }).catch((err) => {
                    console.log(err);
                });
            })
            .catch((err) => {
                console.log('pg_permission_roles: default data not inserted');
                console.log(err);
            });
    }
    console.log('pg_permission_roles: default data inserted');
})();
