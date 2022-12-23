const { InventoryApi } = require('../InventoryAPI/InventoryApi');
const debug = require('../../../_assets/json/debug/debug.json').playerapi;

//? Get the player inventory
mp.events.add('Server:Init:Inventory', async (player) => {
    const items = await InventoryApi.get(player.getVariable('playerId'));
    player.call('Player:Init:Inventory', [items]);
});

//? Save the player inventory
mp.events.add('Server:Save:Inventory', async (player, items) => {
    await InventoryApi.update(player.getVariable('playerId'), items);
});

//? Heal the player with a medikit
mp.events.add('Server:Activate:Medikit', (player) => {
    player.health = 100;
});

//? Heal the player with a weste
mp.events.add('Server:Activate:Weste', (player) => {
    player.armour = 100;
});

mp.events.add('Server:Player:interacteBrowser', (player, hasOpen) => {
    player.setVariable('hasBrowserOpen', hasOpen);
});
