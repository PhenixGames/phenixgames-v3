const {Model, DataTypes} = require('sequelize');
const database = require('../../_db/db');

class Pg_punishments extends Model {}

Pg_punishments.init({
    player_id: {
        type: DataTypes.INTEGER,
    },
    banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    muted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    till_date: {
        type: DataTypes.DATE,
    },
    admin: {
        type: DataTypes.STRING,
        defaultValue: 0
    },
    punishment_id: {
        type: DataTypes.INTEGER,
    },
    reason: {
        type: DataTypes.TEXT,
    },
    date_of_punsishment: {
        type: DataTypes.DATE,
    },
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: database,
    modelName: 'pg_punishments',
});

module.exports = new Pg_punishments();
