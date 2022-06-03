const { log } = require("../../../_assets/functions/log/logs");
const database = require("../../_db/db")

/**
 * Select the right inventory for the player and return a Object will the data, or False if nothing found or it failed.
 * @param {Int} player_id 
 * @returns {Boolean || Object}
 */
module.exports.getPlayerInventory = async ({
    player_id
}) => {
    return database.query(`SELECT * FROM pg_user_inventory WHERE user_id = ? LIMIT 1`, [player_id])
        .then(res => {
            console.log('1')
            if(res.length > 0) {
                console.log('2', res)
                return res[0]
            }else return false;
        })
        .catch(err => {
            log({
                message: err,
                isFatal: true
            });
            return false;
        });
}