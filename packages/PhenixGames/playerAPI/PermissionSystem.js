const debug = require('../../../_assets/json/debug/debug.json').playerapi;

const { log } = require('../../../_assets/functions/log/logs');
const pg_permission_list = require('../../Models/tables/pg_permission_list');
const pg_permission_roles = require('../../Models/tables/pg_permission_roles');
const generellAPI = require('../allgemein');

class PermissionSystemApi {
    constructor() {}

    hasPermissions(player, permission) {
        return new Promise((resolve) => {
            const playerPermissions = JSON.parse(player.getVariable('user_permissions'));
            if (!playerPermissions) return resolve(false);

            let hasPerms = [];

            const isRoot = playerPermissions.root;
            if (isRoot) {
                return resolve(true);
            }

            for (let i in permission) {
                if (playerPermissions[permission[i]]) {
                    hasPerms.push(true);
                } else {
                    hasPerms.push(false);
                }
            }
            hasPerms = hasPerms.filter((b) => b === false);

            return resolve(hasPerms.length === 0 ? true : false);
        });
    }

    getAdminAlpha() {
        return 200;
    }

    getRole(role_id) {
        return new Promise(async (resolve) => {
            return await pg_permission_roles
                .findOne({
                    where: {
                        role_id,
                    },
                })
                .then((role) => {
                    return resolve(role);
                })
                .catch((err) => {
                    log({
                        message: err,
                        isFatal: true,
                    });
                    return resolve(false);
                });
        });
    }

    getPermissionList(roleId) {
        return new Promise(async (resolve) => {
            pg_permission_list
                .findOne({
                    where: {
                        role_id: roleId,
                    },
                })
                .then((permissions) => {
                    return resolve(permissions);
                })
                .catch((err) => {
                    log({
                        message: err,
                        isFatal: true,
                    });
                    return resolve(false);
                });
        });
    }

    setPerms(player, roleId) {
        return new Promise(async (resolve) => {
            const role = await this.getRole(roleId);
            if (!role) {
                return resolve(false);
            }
            const playerPermissions = await this.getPermissionList(role.role_id);
            generellAPI.saveLocalVar(player, {
                user_permissions: JSON.stringify(playerPermissions),
            });
            return resolve(true);
        });
    }
}

const PermissionSystem = new PermissionSystemApi();
module.exports = PermissionSystem;
