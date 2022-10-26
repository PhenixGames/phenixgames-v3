const {Model, DataTypes} = require('sequelize');
const database = require('../../_db/db');

class Pg_users extends Model {}

Pg_users.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    isTeam: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    last_pos: {
        type: DataTypes.JSON,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
    },
    isMedia: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: database,
    modelName: 'pg_users',
});

module.exports = new Pg_users();
