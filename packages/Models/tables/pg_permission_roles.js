const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');
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
        sequelize: database,
        modelName: 'pg_permission_roles',
    }
);

const pg_permission_roles = Pg_permission_roles;
module.exports = pg_permission_roles;
