const debug = require('../../../_assets/json/debug/debug.json').account;

const PermissionSystem = require('../playerAPI/PermissionSystem');
const PunishmentsAPI = require('../punishments/PunishmentsAPI');

mp.events.add('LoginAccount', async (player, password) => {
    const user = await globlal.AccountAPI.getByUsername(player.socialClub);

    if (!user) {
        return player.call('Open:Login:Browser', [false]);
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
    if (globlal.AccountAPI.checkPassword(password, user.password) === false) {
        return player.call('Wrong:Password');
    }

    PermissionSystem.setPerms(player, user.roleId);

    const character = await user.getCharacter();
    const hasCharacter = character.firstname && character.lastname;
    if (!hasCharacter) return player.call('Player:InGameName:Choose');

    player.call('Login:Succes:close:Windows');
    player.call('Player:Spawn:Options');
});
