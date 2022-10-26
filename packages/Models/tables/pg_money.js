const {Model, DataTypes} = require('sequelize');
const database = require('../../_db/db');

class Pg_money extends Model {}

Pg_money.init({
    playerid: {
        type: DataTypes.INTEGER,
    },
    hand_money: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    bank_pin: {
        type: DataTypes.NUMBER,
    },
    bank_money: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    sequelize: database,
    modelName: 'pg_money',
});

module.exports = new Pg_money();
