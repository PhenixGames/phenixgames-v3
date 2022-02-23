const {
    Database
} = require("../../_db/db");
const database = new Database();
const playerAPI = require('./index');


// EXAMPLE permissionSystem.hasPermissions(player, ["ban_member"]);
/**
 * 
 * @param {int} playerId 
 * @param {Array} permission 
 * @returns {boolean}
 */
module.exports.hasPermissions = async function (player, permission) {
    const playerPermissions = JSON.parse(player.getVariable('user_permissions'));
    
    let hasPerms = [];
    
    for(let i in permission) {
        if(playerPermissions[permission[i]] === 1) {
            hasPerms.push(true)
        }else {
            hasPerms.push(false);
        }
    }
    hasPerms = hasPerms.filter(b => b === false);

    return (hasPerms.length === 0) ? true : false;
}

module.exports.setPlayerPermissionsLocal = async function (player) {
    const roleId = await this.getRoleIdFromUser(player.getVariable('playerId'));
    if(!roleId) {
        return false;
    }
    const playerPermissions = await this.getPermsFromUser(roleId);

    playerAPI.saveLocalPlayerVar(player, {
        'user_permissions': JSON.stringify(playerPermissions)
    });
}

/**
 * 
 * @param {int} roleid 
 * @returns {object}
 */
module.exports.getPermsFromUser = async function (roleid) {
    return await database.query('SELECT * FROM pg_permission_list WHERE roleid = ? LIMIT 1', [roleid])
    .then(res => {
        if(res.length <= 0) {
            return false;
        }
        return res[0];
    })
    .catch(err => {
        console.log(err);
        return false;
    });
}

/**
 * 
 * @param {int} playerId
 * @returns {int} roleid
 */
module.exports.getRoleIdFromUser = async function (playerId) {
    return await database.query('SELECT roleId FROM pg_users WHERE id = ? LIMIT 1', [playerId])
        .then(res => {
            if(res.length <= 0) {
                return false;
            }
            return res[0].roleId;
        })
        .catch(err => {
            console.log(err);
        });
}