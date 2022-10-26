const {Model, DataTypes} = require('sequelize');
const database = require('../../_db/db');

class Pg_fuelstations_marker extends Model {}

Pg_fuelstations_marker.init({
    marker_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fuelstation_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    pos: {
        type: DataTypes.STRING,
    },
    size: {
        type: DataTypes.FLOAT,
        defaultValue: 5
    }
}, {
    sequelize: database,
    modelName: 'pg_fuelstations_marker',
});

module.exports = new Pg_fuelstations_marker();