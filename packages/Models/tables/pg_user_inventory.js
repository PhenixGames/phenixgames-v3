const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');

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
        sequelize: database,
        modelName: 'pg_user_inventory',
    }
);

const pg_user_inventory = Pg_user_inventory;
module.exports = pg_user_inventory;
