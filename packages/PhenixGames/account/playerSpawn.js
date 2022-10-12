const debug = require('../../../_assets/json/debug/debug.json').account;

const generellAPI = require('../allgemein/');
const MoneyApi = require('../moneyAPI/MoneyApi');
const AccountAPI = require('./AcountAPI');

mp.events.add('Player:Spawn:airport', async (player) => {
    AccountAPI.spawnAirport(player);
    initPlayer(player);
});


mp.events.add('Player:Spawn:LastPos', async (player) => {
    const lastPos = await AccountAPI.getPos(player);
    
    initPlayer(player);
    AccountAPI.changePos(player, lastPos);
    return ;
});


async function initPlayer(player) {
    player.call("Destroy:Login:Cam");

    const id = player.getVariable('playerId');
    AccountAPI.updateHealth(id, await AccountAPI.getHealth(id));
    AccountAPI.updateArmour(id, await AccountAPI.getArmour(id));
    AccountAPI.setHud(player)

    MoneyApi.updateHud(id);

    generellAPI.saveLocalVar(player, {
        'syncPlayer': true
    });
}



// ---------------------------------------------- //
mp.events.add('Player:Spawn:house', async (player) => {
    // TODO This Code needs to be Fixed when adding Homes. 
    const playerId = player.getVariable('playerId');
    ApplyHealthAndArmour(player, playerId);
    return setHUD(player);
});

