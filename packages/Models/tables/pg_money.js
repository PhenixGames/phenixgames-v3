const { Model, DataTypes } = require('sequelize');

class Pg_money extends Model {}

Pg_money.init(
    {
        player_id: {
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
        sequelize: global.database,
        modelName: 'pg_money',
    }
);

const pg_money = Pg_money;
module.exports = pg_money;
