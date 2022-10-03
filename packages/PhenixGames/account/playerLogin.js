const debug = require('../../../_assets/json/debug/debug.json').account;

const PermissionSystem = require('../playerAPI/PermissionSystem');
const AccountAPI = require('./AcountAPI');
const PunishmentsAPI = require('../punishments/PunishmentsAPI');

mp.events.add('LoginAccount', async (player, password) => {
    const user = await AccountAPI.getByUsername(player.socialClub);

    if(!user) {
        return player.call('Open:Login:Browser', [false]);
    }

    const punishments = await PunishmentsAPI.getPunishment(user.id);

    if(punishments) {
        const isMuted = punishments.find(pushment => pushment.muted === '1' && active === '1');
        const isBanned = punishments.find(pushment => pushment.banned === '1' && active === '1');

        if(isMuted) player.setVariable('isMuted', true);

        if(isBanned) {
            PunishmentsAPI.showPunishmentScreen(player, isBanned);
            return;
        }
    }
    if (AccountAPI.checkPassword(password, user.password) === false) {
        return player.call('Wrong:Password')
    }

    
    PermissionSystem.setPerms(player, user.roleId);

    const hasCharacter = user.firstname && user.lastname;
    if (!hasCharacter) return player.call('Player:InGameName:Choose');

    player.call('Login:Succes:close:Windows');
    player.call('Player:Spawn:Options');
});