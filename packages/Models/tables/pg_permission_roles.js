const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');
const pg_permission_list = require('./pg_permission_list');

class Pg_permission_roles extends Model {}

Pg_permission_roles.init(
    {
        rolename: {
            type: DataTypes.STRING,
            unique: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            unique: true,
        },
    },
    {
        sequelize: database,
        modelName: 'pg_permission_roles',
    }
);

Pg_permission_roles.hasOne(pg_permission_list, {
    foreignKey: 'role_id',
    as: 'permissions',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

const pg_permission_roles = Pg_permission_roles;
module.exports = pg_permission_roles;
