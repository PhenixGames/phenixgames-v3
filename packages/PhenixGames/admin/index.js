const debug = require('../../../_assets/json/debug/debug.json').admin;

const generellAPI = require('../allgemein/');
const AccountAPI = require('../account/AcountAPI');
const PermissionSystem = require('../playerAPI/PermissionSystem');

mp.events.addCommand('aduty', async (player) => {
    const isTeam = await PermissionSystem.hasPermissions(player, ['isTeam']);
    const godmode = await PermissionSystem.hasPermissions(player, ['godmode']);

    if (!isTeam || !godmode) return;

    generellAPI.saveLocalVar(player, {
        Aduty: !!player.getVariable('Aduty'),
    });

    player.call('Set:God', [!!player.getVariable('Aduty')]);
    player.call('Player:Admin:ChangeDuty', [!!player.getVariable('Aduty')]);

    if (player.getVariable('Aduty')) {
        const user = await AccountAPI.get(player.getVariable('playerId'));
        player.name = user.firstname + ' ' + user.lastname;

        player.alpha = 255;
    } else {
        player.alpha = PermissionSystem.getAdminAlpha();
        player.name = player.name;
    }

    const noClip = await PermissionSystem.hasPermissions(player, ['no_clip']);
    if (noClip) {
        player.call('Player:Admin:NoClip');
    }

    const userRole = await AccountAPI.getRole(player.getVariable('playerId'));
    const role = await PermissionSystem.getRole(userRole);

    player.notify(
        player.getVariable('Aduty')
            ? '~g~Du hast den Admindienst als ~r~' + role.rolename + '~g~ angetreten'
            : '~r~Du hast den AdminDienst verlassen'
    );
});

mp.events.add('playerExitVehicle', (player, vehicle) => {
    if (player.getVariable('Aduty')) {
        setTimeout(() => {
            player.alpha = PermissionSystem.getAdminAlpha();
        }, 1000);
    }
});

mp.events.add('Server:Admin:ShotInfo', (player, admin, targetpos, targetEntity) => {
    admin.call('Player:Admin:DrawShotLine', [player, targetpos, targetEntity]);
});
