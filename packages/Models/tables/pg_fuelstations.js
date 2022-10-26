const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');

class Pg_fuelstations extends Model {}

Pg_fuelstations.init(
    {
        fuel_stored: {
            type: DataTypes.INTEGER,
            defaultValue: 1500,
        },
        fuel_buy_price: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        fuel_sell_price_b: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        fuel_sell_price_d: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        business_owner_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        business_profit_mp: {
            type: DataTypes.INTEGER,
            defaultValue: 1.5,
        },
        pos: {
            type: DataTypes.JSON,
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: 'Fuel Station XY',
        },
    },
    {
        sequelize: database,
        modelName: 'pg_fuelstations',
    }
);

const pg_fuelstations = Pg_fuelstations;
module.exports = pg_fuelstations;
