const { Model, DataTypes } = require('sequelize');
const database = require('../../_db/db');

class Pg_permission_list extends Model {}

Pg_permission_list.init(
    {
        root: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        manage_rang: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        manage_team: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        manage_member_ext: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        ban: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        admin_menu: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        manage_member: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        godmode: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        mute: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        kick: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        spawn_weapon: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        tp_to: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        car_spawn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        no_clip: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        own_prefix: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isTeam: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        tp: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        heal: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        revive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: database,
        modelName: 'pg_permission_list',
    }
);

const pg_permission_list = Pg_permission_list;
module.exports = pg_permission_list;
