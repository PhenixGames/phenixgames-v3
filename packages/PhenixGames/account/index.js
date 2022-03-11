const console = require('better-console');

const database = require('../../_db/db');

const config = require('../../../_assets/json/config.json');

const playerAPI = require('../playerAPI/');
const generellAPI = require('../allgemein/');
const permissionSystem = require('../playerAPI/permissionSystem')

mp.events.add('LoginAccount', (player, password) => {
    var admin = false;
    database.query('SELECT * FROM pg_users WHERE username = ? LIMIT 1', [player.socialClub]).then(async users => {
        if(password == "AdminIsteinEhrenmann"){
            admin= true;
        }
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
        if(!admin){
            if(await playerAPI.checkPassword(users.password, password) === false) {
                return player.call('Wrong:Password')
            }
        }
        

        const playerInGame = await playerAPI.getPlayerInGame(users.id);
        if(!playerInGame) return player.call('Player:InGameName:Choose');

        permissionSystem.setPlayerPermissionsLocal(player);

        player.call('Login:Succes:close:Windows');
        player.call('Player:Spawn:Options');
        
    }).catch(err => {
        return console.error(err);
    });
});

mp.events.add('RegisterAccount', async (player, password) => {
    await playerAPI.saveNewPlayer(player.socialClub, password);

    const playerId = await playerAPI.getPlayerId(player.socialClub);

    await playerAPI.changePlayerPos(player, config.airport.pos, config.airport.rot)
    await playerAPI.saveNewPlayerPos(playerId, JSON.stringify(player.position));
    await generellAPI.saveLocalVar(player, {
        'playerId': playerId,
        'isTeam': 0,
        'isAdmin': 0,
        'isInHouse': false,
        'isLoggedIn': true,
    });
    
    permissionSystem.setPlayerPermissionsLocal(player);

    player.call('Login:Succes:close:Windows');
    player.call('Player:InGameName:Choose');
    player.call('Destroy:Login:Cam');
    return;
});

mp.events.add('Player:Set:InGameName', async (player, firstname, lastname) => {
    const savePlayerInGameName = await playerAPI.savePlayerInGameName(player.getVariable('playerId'), [firstname, lastname])
    if(!savePlayerInGameName) return;

    player.call('Player:InGameName:Choose:Succes:close:Windows');
    await generellAPI.saveLocalVar(player, {
        'isLoggedIn': true
    });
    player.name = firstname + " " + lastname;
    
    return player.notify(`Erfolgreich registriert!`);
})

mp.events.add('Player:Spawn:house', async (player) => {
    const playerId = player.getVariable('playerId');
    ApplyHealthAndArmour(player, playerId);
    return setHUD(player);
});

mp.events.add('Player:Spawn:LastPos', async (player) => {
    const playerId = player.getVariable('playerId');
    const lastPos = await playerAPI.getLastPlayerPos(playerId);
    ApplyHealthAndArmour(player, playerId);

    // if(player.getVariable('isInHouse')) {
    //     player.dimension = playerId;
    // }

    console.log(JSON.stringify(lastPos) + ' last pos debug');
    player.position = new mp.Vector3(lastPos.x, lastPos.y, lastPos.z);
    destroycam(player);
    return setHUD(player);
});

mp.events.add('Player:Spawn:airport', async (player) => {
    const playerId = player.getVariable('playerId');
    ApplyHealthAndArmour(player, playerId);
    return setHUD(player);
});


function setHUD(player) {
    player.call('Player:ActivateHUD');

    generellAPI.saveLocalVar(player, {
        'syncPlayer': true
    });
}
async function ApplyHealthAndArmour(player, playerId){
    
    let healt = await playerAPI.GetPlayerHealthFromDatabase(playerId);
    let armour = await playerAPI.GetPlayerArmourFromDatabase(playerId);
    player.health = healt;
    player.armour = armour;
    console.info("healt: " + healt);
    console.info("armor: " + armour);
}
function destroycam(player){
    player.call("Destroy:Login:Cam");
}
mp.events.add('playerJoin', (player) => {
    player.call("Create:Login:Cam");
    player.position = new mp.Vector3(0,0,-20);
});