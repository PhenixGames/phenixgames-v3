const { Model, DataTypes } = require('sequelize');
const pg_permission_list = require('./pg_permission_list');

class Pg_permission_roles extends Model {}

Pg_permission_roles.init(
    {
        rolename: {
            type: DataTypes.STRING,
        },
        role_id: {
            type: DataTypes.INTEGER,
            unique: 'role_id',
        },
    },
    {
        sequelize: global.database,
        modelName: 'pg_permission_roles',
    }
);

Pg_permission_roles.hasOne(pg_permission_list, {
    as: 'permissions',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

const pg_permission_roles = Pg_permission_roles;
module.exports = pg_permission_roles;
