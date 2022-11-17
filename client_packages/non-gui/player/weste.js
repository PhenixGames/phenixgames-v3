mp.events.add('player:use:weste', (player) => {
    player.callRemote('Server:Use:Medikit');
});