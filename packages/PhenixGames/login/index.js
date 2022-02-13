const { Database } = require("../../_db/db");


const database = new Database();

function userLogin(player, password) {

    database.query('SELECT * FROM pg_users WHERE username = ? LIMIT 1', [player.socialClub]).then(async users => {
        users = await users[0];

        console.log('1')
        var isPunish = await database.query('SELECT * FROM pg_punishments WHERE id = ? LIMIT 1', [users.id]).then(pm => {
            if(pm.length <= 0) return false;
            console.log('2')
            pm = await pm[0];

            if(pm.muted) return false;
            if(pm.banned) return true;

        }).catch(err => {
            return console.log(err);
        })

        console.log('3')
        if(isPunish) return;

        if(users.password !== password) return;

        console.log('4')
        mp.players.call("Login:Succes:close:Windows");
        
    }).catch(err => {
        return console.log(err);
    });
}

mp.events.add('LoginAccount', userLogin)