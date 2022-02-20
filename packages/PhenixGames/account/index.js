const { Database } = require("../../_db/db");
const database = new Database();

const housesAPI = require('../houseAPI/index');
const playerAPI = require('../playerAPI/');

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

        player.call('Login:Succes:close:Windows');
        player.call('Player:Spawn:Options');
        
    }).catch(err => {
        return console.log(err);
    });
});

mp.events.add("RegisterAccount", async (player, password) => {
    await playerAPI.saveNewPlayer(player.socialClub, password);

    await playerAPI.getPlayerId(player.socialClub)

    player.call("Login:Succes:close:Windows");
    
});

mp.events.add('Player:Spawn:LastPos', async (player) => {
    const playerId = player.getVariable('playerId');
    const lastPos = await playerAPI.getLastPlayerPos(playerId);

    if(player.getVariable('isInHouse')) {
        player.dimension = playerId;
    }
    player.position = new mp.Vector3(lastPos.x, lastPos.y, lastPos.z)
})