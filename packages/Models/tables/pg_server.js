const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');

class Pg_server extends Model {}

Pg_server.init(
    {
        wartung: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        wartung_reason: {
            type: DataTypes.STRING,
            defaultValue: 'Kein Grund angegeben',
        },
    },
    {
        sequelize: database,
        modelName: 'pg_server',
    }
);

const pg_server = Pg_server;
module.exports = pg_server;
