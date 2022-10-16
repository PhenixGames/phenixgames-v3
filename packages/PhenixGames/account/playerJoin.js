const debug = require('../../../_assets/json/debug/debug.json').account;

const generellAPI = require('../allgemein/');
const { log } = require('../../../_assets/functions/log/logs');
const AccountAPI = require('./AcountAPI');
const DiscordAPI = require('../discord/DiscordAPI');
mp.events.add('playerJoin', async (player) => {
    player.call('Create:Login:Cam');
    player.position = new mp.Vector3(0, 0, -20);

    const user = await AccountAPI.getByUsername(player.socialClub);
    if (!user) {
        player.call('Open:Login:Browser', [false]);
        return log({
            message: `[SERVER]: [Not-Registered] ${player.socialClub} has joined the server!`,
            isFatal: false,
        });
    }

    player.call('Open:Login:Browser', [true]);

    generellAPI.saveLocalVar(player, {
        playerId: user.id,
        isTeam: user.isTeam,
        isAdmin: user.isAdmin,
        isMedia: user.isMedia,
    });

    AccountAPI.updatePlayerOnline();

    log({
        message: `[SERVER]: [Registered] ${player.socialClub} has joined the server!`,
        isFatal: false,
    });

    if (user.firstname && user.lastname) {
        player.name = user.firstname + ' ' + user.lastname;
        DiscordAPI.set(player);
    }
});
