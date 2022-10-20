mp.events.addCommand('vrange', async (player, range) => {
    player.call('Player:set:Rage:Voice', range);
});
