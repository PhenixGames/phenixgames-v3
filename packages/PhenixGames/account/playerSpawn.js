const config = require('../../../_assets/json/config.json');
const debug = require('../../../_assets/json/debug/debug.json').account;

const generellAPI = require('../allgemein/');
const PermissionSystem = require('../playerAPI/PermissionSystem');
const MoneyAPI = require('../moneyAPI/')
const {
    log
} = require('../../../_assets/functions/log/logs');
const AccountAPI = require('./AcountAPI');
const DiscordAPI = require('../discord/DiscordAPI');
const PunishmentsAPI = require('../punishments/PunishmentsAPI');

mp.events.add('Player:Spawn:airport', async (player) => {
    AccountAPI.spawnAirport(player);
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