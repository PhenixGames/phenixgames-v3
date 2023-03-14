const debug = require('../../../_assets/json/debug/debug.json').account;

const generellAPI = require('../allgemein/');
const { log } = require('../../../_assets/functions/log/logs');
const AccountAPI = require('./AcountAPI');
const DiscordAPI = require('../discord/DiscordAPI');
const ServerApi = require('../Server/ServerApi');

mp.events.add('playerJoin', async (player) => {
    await this.playerJoin(player);
});

module.exports.playerJoin = async (player) => {
    player.call('Player:Login:CreateCam');
    player.position = new mp.Vector3(0, 0, -20);

    const isServerInWartung = await new ServerApi().isWartung();
    if (isServerInWartung.is) {
        player.call('Player:Wartung:Show', [isServerInWartung.reason]);
        return;
    }

    const user = await AccountAPI.getByUsername(player.socialClub);
    if (!user) {
        player.call('Player:Login:Open', [false]);
        return log({
            message: `[SERVER]: [Not-Registered] ${player.socialClub} has joined the server!`,
            isFatal: false,
        });
    }
    player.call('Player:Login:Open', [true]);

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

    const character = await user.getCharacter();
    if (character.firstname && character.lastname) {
        player.name = character.firstname + ' ' + character.lastname;
        DiscordAPI.set(player);
    }
};
