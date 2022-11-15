const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');

class Pg_characters extends Model {}

Pg_characters.init(
    {
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
            defaultValue: 100,
        },
        armour: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        last_pos: {
            type: DataTypes.JSON,
        },
    },
    {
        sequelize: database,
        modelName: 'pg_characters',
    }
);

const pg_characters = Pg_characters;
module.exports = pg_characters;
