const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');

class Pg_vehicles extends Model {}

Pg_vehicles.init(
    {
        veh_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        veh_name: {
            type: DataTypes.STRING,
        },
        veh_owner: {
            type: DataTypes.STRING,
        },
        veh_keys: {
            type: DataTypes.JSON(DataTypes.INTEGER),
            defaultValue: [],
        },
        veh_state: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        veh_pos: {
            type: DataTypes.JSON,
        },
        veh_rot: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
        },
        veh_prim: {
            type: DataTypes.INTEGER,
        },
        veh_sec: {
            type: DataTypes.INTEGER,
        },
        veh_fuel: {
            type: DataTypes.FLOAT,
        },
        veh_max: {
            type: DataTypes.FLOAT,
        },
    },
    {
        sequelize: database,
        modelName: 'pg_vehicles',
    }
);

const pg_vehicles = Pg_vehicles;
module.exports = pg_vehicles;
