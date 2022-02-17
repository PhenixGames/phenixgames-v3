const { Database } = require("../../_db/db");
const database = new Database();

module.exports.getPlayerId = async function (username) {
    return await database.query('SELECT id FROM pg_users WHERE username = ? LIMIT 1', [username])
        .then(res => {
            if(res.length > 0) {
                return res[0].id
            }
            return false;
        }).catch(err => {
            console.log(err);
            return false;
        })
}


module.exports.saveNewPlayer = async function (username, password) {
    return await database.query('INSERT INTO pg_users (username, password) VALUES (?, ?)', [username, password])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        });
}

module.exports.saveNewPlayerPos = async function (player_id, player_pos) {
    return await database.query('UPDATE pg_users SET last_pos = ? WHERE id = ?', [player_pos, player_id])
        .then(() => {return true})
        .catch(err => {
            console.log(err);
            return false;
        })
}

module.exports.getLastPlayerPos = async function (player_id) {
    return await database.query('SELECT last_pos FROM pg_users WHERE id = ?', [player_id])
        .then(res => {
            if(res.length > 0) {
                return JSON.parse(res[0].last_pos)
            }else {
                //!STANDARD LOCATION
            }
        });
}