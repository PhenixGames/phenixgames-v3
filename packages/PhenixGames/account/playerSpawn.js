const debug = require('../../../_assets/json/debug/debug.json').account;

const generellAPI = require('../allgemein/');
const MoneyApi = require('../moneyAPI/MoneyApi');

mp.events.add('Player:Spawn:airport', async (player) => {
    globlal.AccountAPI.spawnAirport(player);
    initPlayer(player);
});

mp.events.add('Player:Spawn:LastPos', async (player) => {
    const lastPos = await AccountAPI.getPos(player);
    initPlayer(player);
    globlal.AccountAPI.changePos(player, lastPos);
    return;
});

async function initPlayer(player) {
    player.call('Destroy:Login:Cam');

    const id = player.getVariable('playerId');
    globlal.AccountAPI.updateHealth(id, await globlal.AccountAPI.getHealth(id));
    globlal.AccountAPI.updateArmour(id, await globlal.AccountAPI.getArmour(id));
    globlal.AccountAPI.setHud(player);

    MoneyApi.updateHud(id);

    generellAPI.saveLocalVar(player, {
        syncPlayer: true,
    });
}

// ---------------------------------------------- //
mp.events.add('Player:Spawn:house', async (player) => {});
