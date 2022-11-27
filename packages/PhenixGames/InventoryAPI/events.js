const { log } = require('../../../_assets/functions/log/logs');
const { InventoryApi } = require('./InventoryApi');

mp.events.add('Server:Item:Drop', (itemid) => {});

mp.events.add('Server:Item:Use', (itemid) => {});

mp.events.add('Server:Item:Split', (itemid, amount) => {});

mp.events.add('Server:Use:Medikit', async (player) => {
    await useMedikit_Weste(player, 'Medikit')
        .then(() => {
            player.heal = 100;
        })
        .catch(() => {});
});

mp.events.add('Server:Use:Weste', async (player) => {
    await useMedikit_Weste(player, 'Weste')
        .then(() => {
            player.armour = 100;
        })
        .catch(() => {});
});

function useMedikit_Weste(player, type) {
    return new Promise(async (resolve, reject) => {
        const item = InventoryApi.getItem({ name: type });

        if (!item || item.length === 0) {
            log({
                message: `${type} Item not found`,
                isFatal: true,
            });
            return reject(false);
        }

        const userInventory = JSON.parse(await InventoryApi.get(player.id));

        const userHasItem = userInventory.find((userItem) => userItem.id === item.id);

        if (!userHasItem || userHasItem.length === 0) {
            player.notify("You don't have this item");
            return reject(false);
        }

        await InventoryApi.removeItem({
            itemId: item.id,
            playerId: player.id,
            amount: 1,
            userInventory,
        }).then(() => {
            return resolve(true);
        });
    });
}
