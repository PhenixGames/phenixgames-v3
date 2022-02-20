const { Database } = require("../../_db/db");
const database = new Database();

const vehicleAPI = require("../vehicle/index.js")
const playerAPI = require('../playerAPI/');

mp.events.add('playerJoin', async (player) => {
    player.call('Open:Login:Browser');
    player.name = player.socialClub;

    await database.query(`SELECT * FROM pg_users WHERE username = ?`, [player.name]).then(res => {
        if(res.length <= 0) {
            //! TO-DO übergeben an LoginScreen, dass User kein Account hat
            player.call("Login:NoAccount");
            return console.log(`[SERVER]: [Not-Registered] ${player.name} has joined the server!`);
        }

        playerAPI.saveLocalPlayerVar(player, {
            'playerId': res[0].id,
            'isTeam': res[0].isTeam,
            'isAdmin': res[0].isAdmin
        });

        return console.log(`[SERVER]: [Registered] ${player.name} has joined the server!`);
    }).catch(err => {
        console.log(err)
    });

    var title = 'Spielt auf PhenixGames V3';
    var playing = `Spielt als ${player.name}`;

    mp.players.call("Set:Discord", [title, playing]);
});

async function handleAllVehicles() {
    await database.query('SELECT * FROM pg_vehicles WHERE veh_state = 1').then(res => {
        if(res.length > 0) {
            for(let i in res) {
                const newVeh = mp.vehicles.new(mp.joaat(res[i].veh_name), JSON.parse(res[i].veh_pos),
                {
                    numberPlate: res[i].veh_owner,
                    //color: [prim,sec]
                });
                newVeh.rotation = JSON.parse(res[i].veh_rot);
                vehicleAPI.setLocalData(newVeh, res[i]);
            }
        }
    });
    setInterval(() => {
        mp.vehicles.forEach((vehicle) => {
                vehicleAPI.updateVehiclePosition(vehicle.getVariable('veh_id'), vehicle.position, vehicle.rotation);
            }
        );
       // console.log('ALL VEHICLES SYNCED! ' + mp.vehicles.length)

        mp.players.forEach((player) => {
            if(!player.getVariable('isInEvent') && player.getVariable('isLoggedIn')) {
                playerAPI.saveNewPlayerPos(player.getVariable('playerId'), JSON.stringify(player.position));
            }
        });
        //console.log('ALL PLAYERS SYNCED!')
    }, 10000);
}
handleAllVehicles();