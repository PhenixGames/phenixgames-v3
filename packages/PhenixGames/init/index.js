const { Database } = require("../../_db/db");
const database = new Database();

mp.events.add('playerJoin', async (player) => {
    player.name = player.socialClub;

    await database.query(`SELECT id FROM pg_users WHERE username = ?`, [player.name]).then(res => {
        if(res.length <= 0) {
            //! TO-DO übergeben an LoginScreen, dass User kein Account hat
            return console.log(`[SERVER]: [Not-Registered] ${player.name} has joined the server!`);
        }
        return console.log(`[SERVER]: [Registered] ${player.name} has joined the server!`);
    }).catch(err => {
        console.log(err)
    });


    var title = 'Spielt auf PhenixGames V3';
    var playing = `Spielt als ${player.name}`;

    mp.players.call("Set:Discord", [title, playing]);
});