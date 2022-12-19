const { Model, DataTypes } = require('sequelize');

class Pg_user_inventory extends Model {}

Pg_user_inventory.init(
    {
        player_id: {
            type: DataTypes.INTEGER,
        },
        items: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
    },
    {
        sequelize: global.database,
        modelName: 'pg_user_inventory',
    }
);

const pg_user_inventory = Pg_user_inventory;
module.exports = pg_user_inventory;
