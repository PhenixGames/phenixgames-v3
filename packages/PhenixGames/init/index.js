const { Database } = require("../../_db/db");
const vehicleapi = require("../vehicle/index.js")
const database = new Database();


mp.events.add('playerJoin', async (player) => {
    player.name = player.socialClub;

    await database.query(`SELECT * FROM pg_users WHERE username = ?`, [player.name]).then(res => {
        if(res.length <= 0) {
            //! TO-DO übergeben an LoginScreen, dass User kein Account hat
            mp.players.call("Login:NoAccount");
            return console.log(`[SERVER]: [Not-Registered] ${player.name} has joined the server!`);
        }
        player.setVariable('playerId', res[0].id);
        player.setVariable('isTeam', res[0].isTeam);
        player.setVariable('isAdmin', res[0].isAdmin);
        player.setVariable('coins', res[0].coins);
        

        return console.log(`[SERVER]: [Registered] ${player.name} has joined the server!`);
    }).catch(err => {
        console.log(err)
    });

    var title = 'Spielt auf PhenixGames V3';
    var playing = `Spielt als ${player.name}`;

    mp.players.call("Set:Discord", [title, playing]);
});

database.query('SELECT * FROM pg_vehicles WHERE veh_state = 1').then(res => {
    if(res.length > 0) {
        for(let i in res) {
            mp.vehicles.new(mp.joaat(res[i].veh_name), JSON.parse(res[i].veh_pos),
            {
                numberPlate: res[i].veh_owner,
                //color: [prim,sec]
            });
        }
    }
})

function savevehiclepos(){
    mp.vehicles.forEach(
        async (veh) => {
           vehicleapi.updateVehicleData(veh);
        }
    );
}

setInterval(savevehiclepos, 10000);//Alle 10 sekunden