const ServerApi = require('../../PhenixGames/Server/ServerApi');
const { playerJoin } = require('../../PhenixGames/account/playerJoin');
const PermissionSystem = require('../../PhenixGames/playerAPI/PermissionSystem');

mp.events.addCommand('wartung', async (player, args) => {
    const isAdmin = await PermissionSystem.hasPermissions(player, ['serverConfigChange']);
    if (!isAdmin) return player.notify('Du hast keine Rechte für diesen Befehl!');

    const serverapi = new ServerApi()
    const isServerInWartung = await serverapi.isWartung();
    if (isServerInWartung.is) {
        player.notify('Der Server ist in Wartung. Wartung wird beendet!');
        await serverapi
            .setWartung(false)
            .then(() => {
                player.notify('Wartung beendet!');
            })
            .catch((err) => {
                player.notify('Es ist ein Fehler aufgetreten, bei dem Beginnen der Wartung!');
            });
        await playerJoin(player);
        return;
    } else {
        const reason = args;
        await serverapi
            .setWartung(true, reason)
            .then(() => {
                player.notify('Erfolgreich! Der Server ist in Wartung!');
            })
            .catch((err) => {
                player.notify('Es ist ein Fehler aufgetreten, bei dem Beginnen der Wartung!');
            });

        mp.players.forEach((player) => {
            player.call('Player:Wartung:Show', [reason])
        });
    }

    return true;
});
