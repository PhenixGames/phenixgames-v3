const console = require('better-console');

const { Database } = require("../../_db/db");
const database = new Database();

const vehicleAPI = require("../vehicle/")
const playerAPI = require('../playerAPI/');
const generellAPI = require('../allgemein/');
const weatherAPI = require('../weatherAPI');

mp.events.add('playerJoin', async (player) => {
    player.call('Open:Login:Browser');
    await database.query(`SELECT * FROM pg_users WHERE username = ?`, [player.socialClub]).then(res => {
        if(res.length <= 0) {
            //! TO-DO übergeben an LoginScreen, dass User kein Account hat
            player.call("Login:NoAccount");
            return console.info(`[SERVER]: [Not-Registered] ${player.socialClub} has joined the server!`);
        }

        generellAPI.saveLocalVar(player, {
            'playerId': res[0].id,
            'isTeam': res[0].isTeam,
            'isAdmin': res[0].isAdmin,
            'isMedia': res[0].isMedia
        });

        return console.info(`[SERVER]: [Registered] ${player.socialClub} has joined the server!`);
    }).catch(err => {
        console.error(err)
    });
    var name = await playerAPI.getPlayerInGame(player.getVariable('playerId'));
    player.name = name.firstname + " " + name.lastname;
    var title = 'Spielt auf PhenixGames V3';
    var playing = `Spielt als ${player.name}`;

    mp.players.call("Set:Discord", [title, playing]);
    
});

mp.events.add('packagesLoaded', async() =>
{
    await vehicleAPI.spawnAllVehicles();

    weatherAPI.setWeather();

    setInterval(() => {
        vehicleAPI.syncAllVehciles();
        playerAPI.syncAllPlayers();
    }, 10000);
});