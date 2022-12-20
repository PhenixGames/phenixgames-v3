const debug = require('../../../_assets/json/debug/debug.json').account;

const generellAPI = require('../allgemein/');
const PermissionSystem = require('../playerAPI/PermissionSystem');
const { InventoryApi } = require('../InventoryAPI/InventoryApi');

mp.events.add('RegisterAccount', async (player, password) => {
    await globlal.AccountAPI.save(player.socialClub, password);

    const user = await globlal.AccountAPI.getByUsername(player.socialClub);

    await generellAPI.saveLocalVar(player, {
        playerId: user.id,
        isTeam: 0,
        isAdmin: 0,
        isInHouse: false,
        isLoggedIn: true,
    });

    PermissionSystem.setPerms(player, user.roleId);

    const items = [
        {
            invPos: 1,
            img: 'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',
            count: 1,
            isTop: true,
            isStackable: true,
        },
        {
            invPos: 1,
            img: 'https://cdn-icons-png.flaticon.com/32/3075/3075977.png',
            count: 1,
            isTop: false,
            isStackable: false,
        },
    ];

    await InventoryApi.update(user.id, items);

    player.call('Player:InGameName:Choose');
    return;
});

mp.events.add('Player:Set:InGameName', async (player, firstname, lastname) => {
    const setInGameName = await globlal.AccountAPI.setInGameName(player.getVariable('playerId'), [
        firstname,
        lastname,
    ]);
    if (!setInGameName) return;

    await generellAPI.saveLocalVar(player, {
        isLoggedIn: true,
    });
    player.name = firstname + ' ' + lastname;

    player.notify(`Erfolgreich registriert!`);

    player.call('Player:InGameName:Choose:Succes:close:Windows');
    player.call('Login:Succes:close:Windows');
    player.call('Destroy:Login:Cam');

    globlal.AccountAPI.spawnAirport(player);

    generellAPI.saveLocalVar(player, {
        syncPlayer: true,
    });
});
