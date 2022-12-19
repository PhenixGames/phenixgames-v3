const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');
const pg_characters = require('./pg_characters');
const pg_money = require('./pg_money');
const pg_user_inventory = require('./pg_user_inventory');

class Pg_users extends Model {}

Pg_users.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isTeam: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER,
        },
        isMedia: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: database,
        modelName: 'pg_users',
    }
);

Pg_users.hasOne(pg_characters, {
    foreignKey: 'player_id',
    as: 'character',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Pg_users.hasOne(pg_user_inventory, {
    foreignKey: 'player_id',
    as: 'inventory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Pg_users.hasOne(pg_money, {
    foreignKey: 'player_id',
    as: 'money',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

const pg_users = Pg_users;
module.exports = pg_users;
