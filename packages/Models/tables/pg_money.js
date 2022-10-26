const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');

class Pg_money extends Model {}

Pg_money.init(
    {
        playerid: {
            type: DataTypes.INTEGER,
        },
        hand_money: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        bank_pin: {
            type: DataTypes.INTEGER,
        },
        bank_money: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
    },
    {
        sequelize: database,
        modelName: 'pg_money',
    }
);

const pg_money = Pg_money;
module.exports = pg_money;
