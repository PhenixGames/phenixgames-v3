const {Model, DataTypes} = require('sequelize');
const database = require('../../_db/db');

class Pg_houses extends Model {}

Pg_houses.init({
    house_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    player_id: {
        type: DataTypes.INTEGER,
    },
    house_pos: {
        type: DataTypes.JSON,
    }
}, {
    sequelize: database,
    modelName: 'pg_houses',
});

module.exports = new Pg_houses();
