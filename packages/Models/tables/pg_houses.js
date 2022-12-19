const { Model, DataTypes } = require('sequelize');

class Pg_houses extends Model {}

Pg_houses.init(
    {
        house_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        player_id: {
            type: DataTypes.INTEGER,
        },
        house_pos: {
            type: DataTypes.JSON,
        },
    },
    {
        sequelize: global.database,
        modelName: 'pg_houses',
    }
);

const pg_houses = Pg_houses;
module.exports = pg_houses;
