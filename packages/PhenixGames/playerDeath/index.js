const debug = require('../../../_assets/json/debug/debug.json').playerdeath;

const cityHospital = new mp.Vector3(342.44623, -1398.0957, 32.50924)

mp.events.add("playerDeath", (player, reason, killer) => {
    player.call("Open:Death:Browser");
});

 mp.events.add("Respawn:At:Hospital", (player) => {
    player.spawn(cityHospital);
    player.notify("~g~Du wurdest Respawnt")
    player.call('close:Death:Browser')
});