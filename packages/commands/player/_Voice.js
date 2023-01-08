mp.events.addCommand('vrange', async (player, range) => {
    player.call('Client:Voice:SetRange', range);
});
