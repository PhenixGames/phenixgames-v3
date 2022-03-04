require('./_perms');


mp.events.addCommand('model', ( player, arg, model ) => {
    player.model = mp.joaat(model);
 });
