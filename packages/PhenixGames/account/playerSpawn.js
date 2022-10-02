const debug = require('../../../_assets/json/debug/debug.json').account;

const generellAPI = require('../allgemein/');
const AccountAPI = require('./AcountAPI');

mp.events.add('Player:Spawn:airport', async (player) => {
    AccountAPI.spawnAirport(player);
    player.call("Destroy:Login:Cam");
    generellAPI.saveLocalVar(player, {
        'syncPlayer': true
    });
});


mp.events.add('Player:Spawn:LastPos', async (player) => {
    const id = player.getVariable('playerId');
    const lastPos = await AccountAPI.getPos(player);

    AccountAPI.updateHealth(id, await AccountAPI.getHealth(id));
    AccountAPI.updateArmour(id, await AccountAPI.getArmour(id));

    player.call("Destroy:Login:Cam");

    AccountAPI.changePos(player, lastPos);
    generellAPI.saveLocalVar(player, {
        'syncPlayer': true
    });

    return AccountAPI.setHud(player);
});



// ---------------------------------------------- //
mp.events.add('Player:Spawn:house', async (player) => {
    // TODO This Code needs to be Fixed when adding Homes. 
    const playerId = player.getVariable('playerId');
    ApplyHealthAndArmour(player, playerId);
    return setHUD(player);
});

