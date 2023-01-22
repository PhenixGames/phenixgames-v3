const debug = require('../../../_assets/json/debug/debug.json').playerdeath;

const cityHospital = new mp.Vector3(342.44623, -1398.0957, 32.50924);

mp.events.add('playerDeath', (player, reason, killer) => {
    player.call('Client:DeathBrowser:Open');
    //Ab hier kommen Browser die ggf geschlossen werden müssen.
    player.call('Player:Fuelstation:BrowserClose');
    player.call('Player:Browser:Inventory:close');
});

mp.events.add('Client:Respawn:Hospital', (player) => {
    player.spawn(cityHospital);
    player.notify('~g~Du wurdest Respawnt');
    player.call('Client:DeathBrowser:Close');
});
