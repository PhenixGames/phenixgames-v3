const { InventoryApi } = require('../../PhenixGames/InventoryAPI/InventoryApi');
const { ItemApi } = require('../../PhenixGames/ItemAPI/ItemApi');

mp.events.addCommand('addinv', async (player, args) => {
    const invenvtory = await InventoryApi.get(player.getVariable('playerId'));

    const newItem = await ItemApi.getItem({ name: 'Medikit' });

    invenvtory.push(newItem);

    InventoryApi.update(player.getVariable('playerId'), invenvtory);
});
