mp.events.add('player:use:weste', (player) => {
    player.callRemote('server:use:weste');
});