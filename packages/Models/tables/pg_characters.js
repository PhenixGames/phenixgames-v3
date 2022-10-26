const {Model, DataTypes} = require('sequelize');
const database = require('../../_db/db');

class Pg_characters extends Model {}

Pg_characters.init({
    player_id: {
        type: DataTypes.INTEGER,
    },
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    health: {
        type: DataTypes.INTEGER,
        defaultValue: 100
    },
    armour: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: database,
    modelName: 'pg_characters',
});

module.exports = new Pg_characters();
