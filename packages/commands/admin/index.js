require('./_perms');
require('./_inv');

mp.events.addCommand('model', (player, arg, model) => {
    player.model = mp.joaat(model);
});
