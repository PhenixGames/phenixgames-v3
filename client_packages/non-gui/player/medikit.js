mp.events.add('player:use:medikit', (player) => {
    player.callRemote('server:use:medikit');
});