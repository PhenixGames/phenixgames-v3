const debug = require('../../../_assets/json/debug/debug.json').account;

const generellAPI = require('../allgemein/');
const { log } = require('../../../_assets/functions/log/logs');
const DiscordAPI = require('../discord/DiscordAPI');
mp.events.add('playerJoin', async (player) => {
    player.call('Create:Login:Cam');
    player.position = new mp.Vector3(0, 0, -20);

    const user = await globlal.AccountAPI.getByUsername(player.socialClub);
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

    globlal.AccountAPI.updatePlayerOnline();

    log({
        message: `[SERVER]: [Registered] ${player.socialClub} has joined the server!`,
        isFatal: false,
    });

    const character = await user.getCharacter();
    if (character.firstname && character.lastname) {
        player.name = character.firstname + ' ' + character.lastname;
        DiscordAPI.set(player);
    }
});
