const debug = require('../../../_assets/json/debug/debug.json').admin;

const generellAPI = require('../allgemein/');
const AccountAPI = require('../account/AcountAPI');
const PermissionSystem = require('../playerAPI/PermissionSystem');

mp.events.addCommand('aduty', async (player) => {
    const isTeam = await PermissionSystem.hasPermissions(player, ['isTeam']);
    const godmode = await PermissionSystem.hasPermissions(player, ['godmode']);

    if (!isTeam || !godmode) return;

    if (player.getVariable('Aduty')) {
        generellAPI.saveLocalVar(player, {
            Aduty: false,
        });

        player.call('Client:Admin:setGod', [false]);
        player.call('Client:Admin:changeDuty', [false]);

        const user = await AccountAPI.get(player.getVariable('playerId'));
        player.name = user.firstname + ' ' + user.lastname;

        player.alpha = 255;
    } else {
        generellAPI.saveLocalVar(player, {
            Aduty: true,
        });

        player.call('Client:Admin:setGod', [true]);
        player.call('Client:Admin:changeDuty', [true]);

        player.alpha = PermissionSystem.getAdminAlpha();
        player.name = player.name;
    }

    const noClip = await PermissionSystem.hasPermissions(player, ['no_clip']);
    if (noClip) {
        player.call('Client:Admin:noClip');
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

mp.events.add('Server:Admin:drawShotLine', (player, admin, targetpos, targetEntity) => {
    admin.call('Client:Admin:drawShotLine', [player, targetpos, targetEntity]);
});
