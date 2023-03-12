const AccountAPI = require('./AcountAPI');

mp.events.add('playerQuit', (player) => {
    AccountAPI.updatePlayerOnline();

    mp.players.forEachInRange(player.position, 200, (target) => {
        target.call('Player:Quit:Lable', [player.position]);
    });
});
