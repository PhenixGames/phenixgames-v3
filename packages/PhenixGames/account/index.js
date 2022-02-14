const { Database } = require("../../_db/db");
const database = new Database();

mp.events.add("LoginAccount", (player, password) => {
    database.query('SELECT * FROM pg_users WHERE username = ? LIMIT 1', [player.socialClub]).then(async users => {
        users = await users[0];

        var reason;
        var isPunish = await database.query('SELECT * FROM pg_punishments WHERE id = ? LIMIT 1', [users.id]).then(async pm => {
            if(pm.length <= 0) return false;
            pm = await pm[0];

            if(pm.muted) return false;
            if(pm.banned) {
                reason = pm.reason;
                return true;
            }

        }).catch(err => {
            return console.log(err);
        })
        if(isPunish) return player.kick(reason);

        if(users.password !== password) return;

        mp.players.call("Login:Succes:close:Windows");
        
    }).catch(err => {
        return console.log(err);
    });
});

mp.events.add("RegisterAccount", (player, password) => {
    database.query('SELECT id FROM pg_users WHERE username = ?', [player.socialClub]).then(async res => {
        if(res.length <= 0) {
            await database.query('INSERT INTO pg_users (username, password) VALUES (?, ?)', [player.socialClub, password]).catch(err => {
                console.log(err)
            });
        }
    }).catch(err => {
        console.log(err)
    })
});