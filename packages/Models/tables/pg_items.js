const { Model, DataTypes } = require('sequelize');

class Pg_items extends Model {}

Pg_items.init(
    {
        name: {
            type: DataTypes.STRING,
            unique: 'name',
        },
        isStackable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        maxCount: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        isDropable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isSplitable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isUsable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isSellable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        weight: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize: global.database,
        modelName: 'pg_items',
    }
);

const pg_items = Pg_items;
module.exports = pg_items;
