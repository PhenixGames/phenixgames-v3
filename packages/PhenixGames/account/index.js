const console = require('better-console');

const { Database } = require('../../_db/db');
const database = new Database();

const config = require('../../../_assets/json/config.json');

const playerAPI = require('../playerAPI/');
const generellAPI = require('../allgemein/');
const permissionSystem = require('../playerAPI/permissionSystem')

mp.events.add('LoginAccount', (player, password) => {
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
            return console.error(err);
        })
        if(isPunish) return player.kick(reason);

        if(!playerAPI.checkPassword(users.password, password)) return;

        permissionSystem.setPlayerPermissionsLocal(player);

        player.call('Login:Succes:close:Windows');
        player.call('Player:Spawn:Options');
        generellAPI.saveLocalVar(player, {
            'isLoggedIn': true
        });
        
    }).catch(err => {
        return console.error(err);
    });
});

mp.events.add('RegisterAccount', async (player, password) => {
    await playerAPI.saveNewPlayer(player.socialClub, password);

    const playerId = await playerAPI.getPlayerId(player.socialClub);

    await playerAPI.changePlayerPos(player, config.defaultSpawn.pos, config.defaultSpawn.rot)
    await playerAPI.saveNewPlayerPos(playerId, JSON.stringify(player.position));
    await generellAPI.saveLocalVar(player, {
        'playerId': playerId,
        'isTeam': 0,
        'isAdmin': 0,
        'isInHouse': false
    });
    
    permissionSystem.setPlayerPermissionsLocal(player);

    player.call('Login:Succes:close:Windows');
    return player.call('Player:InGameName:Choose');
});

mp.events.add('Player:Set:InGameName', async (player, firstname, lastname) => {
    const savePlayerInGameName = await playerAPI.savePlayerInGameName(player.getVariable('playerId'), [firstname, lastname])
    if(!savePlayerInGameName) return;

    player.call('Player:InGameName:Choose:Succes:close:Windows');
    await generellAPI.saveLocalVar(player, {
        'isLoggedIn': true
    });
    
    return player.notify(`Erfolgreich registriert!`);
})

mp.events.add('Player:Spawn:house', async (player) => {
    const playerId = player.getVariable('playerId');

    return setHUD(player);
});

mp.events.add('Player:Spawn:LastPos', async (player) => {
    const playerId = player.getVariable('playerId');
    const lastPos = await playerAPI.getLastPlayerPos(playerId);

    // if(player.getVariable('isInHouse')) {
    //     player.dimension = playerId;
    // }

    console.log(JSON.stringify(lastPos) + ' last pos debug');
    player.position = new mp.Vector3(lastPos.x, lastPos.y, lastPos.z);
    
    return setHUD(player);
});

mp.events.add('Player:Spawn:airport', async (player) => {
    const playerId = player.getVariable('playerId');

    return setHUD(player);
});


function setHUD(player) {
    player.call('Player:ActivateHUD');
}