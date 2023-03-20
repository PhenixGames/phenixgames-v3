require('./_perms');
require('./_inv');
require('./_wartung');

mp.events.addCommand('model', (player, arg, model) => {
    player.model = mp.joaat(model);
});
