const debug = require('../../../_assets/json/debug/debug.json').playerapi;

const database = require("../../_db/db");
const generellAPI = require('../allgemein');


class PermissionSystemApi {
    constructor() {}

    async hasPermissions(player, permission) {
        const playerPermissions = JSON.parse(player.getVariable('user_permissions'));
        if(!playerPermissions) return false;
        
        let hasPerms = [];

        for (let i in permission) {
            if (playerPermissions[permission[i]] === 'root') {
                return hasPerms.push(true);
            }
            if (playerPermissions[permission[i]] === 1) {
                hasPerms.push(true)
            } else {
                hasPerms.push(false);
            }
        }
        hasPerms = hasPerms.filter(b => b === false);

        return (hasPerms.length === 0) ? true : false;
    }

    getAdminAlpha() {
        return 200;
    }

    async getRole(roleId) {
        return await database.query('SELECT * FROM pg_permission_roles WHERE roleid = ? LIMIT 1', [roleId])
            .then(res => {
                if (res.length <= 0) {
                    return false;
                }
                return res[0];
            })
            .catch(err => {
                return false;
            });
    }

    async getPermissionList(roleId) {
        return await database.query('SELECT * FROM pg_permission_list WHERE roleid = ? LIMIT 1', [roleId])
        .then(res => {
            if (res.length <= 0) {
                return false;
            }
            return res[0];
        })
        .catch(err => {
            return false;
        });
    }

    async setPerms(player, roleId) {
        const role = await this.getRole(roleId);
        if (!role) {
            return false;
        }
        const playerPermissions = await this.getPermissionList(role.roleid);
        generellAPI.saveLocalVar(player, {
            'user_permissions': JSON.stringify(playerPermissions)
        });
    }
}

const PermissionSystem = new PermissionSystemApi();
module.exports = PermissionSystem;