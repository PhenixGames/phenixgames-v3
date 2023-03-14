const AccountAPI = require('./AcountAPI');

mp.events.add('playerQuit', (player) => {
    AccountAPI.updatePlayerOnline(); //Update var
    mp.players.forEachInRange(player.position, 200, (target) => {
        //Get all Players in range of Leaving Player
        target.call('Player:Quit:Lable', [player.position]); //Call Event on Player
    });
});
