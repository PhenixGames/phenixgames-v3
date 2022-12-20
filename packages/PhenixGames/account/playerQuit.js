mp.events.add('playerQuit', (player) => {
    globlal.AccountAPI.updatePlayerOnline();
});
