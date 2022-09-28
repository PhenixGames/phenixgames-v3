const console = require('better-console');
const moment = require('moment')

const database = require('../../_db/db');

const config = require('../../../_assets/json/config.json');
const debug = require('../../../_assets/json/debug/debug.json').account;

const playerAPI = require('../playerAPI/');
const generellAPI = require('../allgemein/');
const permissionSystem = require('../playerAPI/permissionSystem');
const { log } = require('../../../_assets/functions/log/logs');
const { UpdateMoneyHud } = require('../moneyAPI');

mp.events.add('playerJoin', async (player) => {
    await database.query(`SELECT * FROM pg_users WHERE username = ?`, [player.socialClub]).then(res => {
        if(res.length <= 0) {
            //! TO-DO übergeben an LoginScreen, dass User kein Account hat
            player.call('Open:Login:Browser',([false]));
            return log({
                message: `[SERVER]: [Not-Registered] ${player.socialClub} has joined the server!`,
                isFatal: false
            });
        }
        player.call('Open:Login:Browser', ([true]));

        generellAPI.saveLocalVar(player, {
            'playerId': res[0].id,
            'isTeam': res[0].isTeam,
            'isAdmin': res[0].isAdmin,
            'isMedia': res[0].isMedia
        });

        const items = [{invPos:1,img:"https://cdn-icons-png.flaticon.com/32/3075/3075977.png",count:1,isTop:true,isStackable:true},{invPos:1,img:"https://cdn-icons-png.flaticon.com/32/3075/3075977.png",count:1,isTop:false,isStackable:false}]
        database.query(`UPDATE pg_user_inventory SET items = ? WHERE user_id = ?`, [JSON.stringify(items), res[0].id])
        .catch(err => {
            console.log(err);
        })

        playerAPI.playerOnline = playerAPI.playerOnline + 1;

        return log({
            message: `[SERVER]: [Registered] ${player.socialClub} has joined the server!`,
            isFatal: false
        });
    }).catch(err => {
        log({
            message: err,
            isFatal: true
        });
    });

    var name = await playerAPI.getPlayerInGame(player.getVariable('playerId'));
    if(name) {
        player.name = name.firstname + " " + name.lastname;
        var title = 'Spielt auf PhenixGames V3';
        var playing = `Spielt als ${player.name}`;
        mp.players.call("Set:Discord", [title, playing]);
    }
});


mp.events.add('LoginAccount', (player, password) => {
    database.query('SELECT * FROM pg_users WHERE username = ? LIMIT 1', [player.socialClub]).then(async users => {
        users = await users[0];

        var isPunish = await database.query('SELECT * FROM pg_punishments WHERE id = ? LIMIT 1', [users.id]).then(async pm => {
            if(pm.length <= 0) return false;
            pm = await pm[0];
            if(pm.muted) {
                player.setVariable('isMuted', true);
                return false;
            }
            if(pm.banned) {
                const date = pm.till_date.split(',');
                const days = date[0].split('.');
                moment.locale('de')
                var end_of_punishement = moment([days[2], days[1], days[0]]).fromNow() + ` (${days[2]}.${days[1]}.${days[0]} ${date[1]})`;

                showPunishmentscreen(player, {
                    adminname: pm.admin,
                    reason: pm.reason,
                    end_of_punishement,
                    date_of_punishment: pm.date_of_punishment,
                    punishment_id: pm.punishment_id
                })
                return true;
            }

        }).catch(err => {
            log({
                message: err,
                isFatal: true
            });
            return true;
        });

        if(isPunish) return;

        if(await playerAPI.checkPassword(users.password, password) === false) {
            return player.call('Wrong:Password')
        }
        

        const playerInGame = await playerAPI.getPlayerInGame(users.id);
        if(!playerInGame) return player.call('Player:InGameName:Choose');

        permissionSystem.setPlayerPermissionsLocal(player);

        player.call('Login:Succes:close:Windows');
        player.call('Player:Spawn:Options');
        
    }).catch(err => {
        log({
            message: err,
            isFatal: true
        });
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
    // TODO This Code needs to be Fixed when adding Homes. 
    const playerId = player.getVariable('playerId');
    ApplyHealthAndArmour(player, playerId);
    return setHUD(player);
});

mp.events.add('Player:Spawn:LastPos', async (player) => {
    const playerId = player.getVariable('playerId');
    const lastPos = await playerAPI.getLastPlayerPos(playerId);
    ApplyHealthAndArmour(player, playerId);
    // TODO This Code needs to be Fixed when adding Homes. 
    // It needs to be added so the player spawns in the right dimension of the House
    // The Code Below is Bullshit XD
    // if(player.getVariable('isInHouse')) {
    //     player.dimension = playerId;
    // }

    if(debug)console.log(JSON.stringify(lastPos) + ' last pos debug');
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
    ApplyHudValues(player);
    generellAPI.saveLocalVar(player, {
        'syncPlayer': true
    });
}
function ApplyHudValues(player){
    UpdateMoneyHud(player);
}
async function ApplyHealthAndArmour(player, playerId){
    player.health = await playerAPI.GetPlayerHealthFromDatabase(playerId);
    player.armour = await playerAPI.GetPlayerArmourFromDatabase(playerId);
}

function destroycam(player){
    player.call("Destroy:Login:Cam");
}

function showPunishmentscreen(player, punishment_infos) {
    player.call('Player:Init:Punishmentscreen', [punishment_infos]);
}