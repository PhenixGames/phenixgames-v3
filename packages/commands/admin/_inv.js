const { InventoryApi } = require('../../PhenixGames/InventoryAPI/InventoryApi');

mp.events.addCommand('addinv', async (player, args) => {
    const invenvtory = await InventoryApi.get(player.getVariable('playerId'));

    const newItem = await InventoryApi.getItem({ name: 'Medikit' });

    invenvtory.push(newItem);

    InventoryApi.update(player.getVariable('playerId'), invenvtory);
});
