const debug = require('../../../_assets/json/debug/debug.json').account;

const PermissionSystem = require('../playerAPI/PermissionSystem');
const AccountAPI = require('./AcountAPI');
const PunishmentsAPI = require('../punishments/PunishmentsAPI');

mp.events.add('Server:Login:Login', async (player, password) => {
    const user = await AccountAPI.getByUsername(player.socialClub);

    if (!user) {
        return player.call('Player:Login:Open', [false]);
    }

    const punishments = await PunishmentsAPI.getPunishment(user.id);

    if (punishments) {
        const isMuted = punishments.find((pushment) => pushment.muted === '1' && active === '1');
        const isBanned = punishments.find((pushment) => pushment.banned === '1' && active === '1');

        if (isMuted) player.setVariable('isMuted', true);

        if (isBanned) {
            PunishmentsAPI.showPunishmentScreen(player, isBanned);
            return;
        }
    }
    if (AccountAPI.checkPassword(password, user.password) === false) {
        return player.call('Player:Login:WrongPassword');
    }

    PermissionSystem.setPerms(player, user.roleId);

    const character = await user.getCharacter();
    const hasCharacter = character.firstname && character.lastname;
    if (!hasCharacter) return player.call('Client:Namechooser:CreateBrowser');

    player.call('Player:Login:Close');
    player.call('Player:Spawn:Options');
});
