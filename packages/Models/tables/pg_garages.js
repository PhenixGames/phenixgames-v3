const { Model, DataTypes } = require('sequelize');

class Pg_garages extends Model {}

Pg_garages.init(
    {
        pos: {
            type: DataTypes.JSON,
        },
        npc_rot: {
            type: DataTypes.FLOAT,
        },
        type: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        sequelize: global.database,
        modelName: 'pg_garages',
    }
);

const pg_garages = Pg_garages;
module.exports = pg_garages;
