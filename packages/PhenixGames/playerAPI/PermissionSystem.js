const debug = require('../../../_assets/json/debug/debug.json').playerapi;

const pg_permission_roles = require('../../Models/tables/pg_permission_roles');
const generellAPI = require('../allgemein');

class PermissionSystemApi {
    constructor() {}

    async hasPermissions(player, permission) {
        const playerPermissions = JSON.parse(player.getVariable('user_permissions'));
        if (!playerPermissions) return false;

        let hasPerms = [];

        const isRoot = playerPermissions.root;
        if (isRoot) {
            return true;
        }

        for (let i in permission) {
            if (playerPermissions[permission[i]]) {
                hasPerms.push(true);
            } else {
                hasPerms.push(false);
            }
        }
        hasPerms = hasPerms.filter((b) => b === false);

        return hasPerms.length === 0 ? true : false;
    }

    getAdminAlpha() {
        return 200;
    }

    async getRole(role_id) {
        return await pg_permission_roles
            .findOne({
                where: {
                    role_id,
                },
            })
            .then((role) => {
                return role;
            })
            .catch((err) => {
                return false;
            });
    }

    async getPermissionList(roleId) {
        const role = await this.getRole(roleId);
        if (!role) {
            return false;
        }
        return role.getPermissions();
    }

    async setPerms(player, roleId) {
        const role = await this.getRole(roleId);
        if (!role) {
            return false;
        }
        const playerPermissions = await this.getPermissionList(role.role_id);
        generellAPI.saveLocalVar(player, {
            user_permissions: JSON.stringify(playerPermissions),
        });
    }
}

const PermissionSystem = new PermissionSystemApi();
module.exports = PermissionSystem;
