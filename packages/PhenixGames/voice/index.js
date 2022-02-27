mp.events.addCommand('voice', (player) => {
    
    mp.players.forEach((_player) => {
        if(player == _player) return false;
        
        player.enableVoiceTo(_player);
        _player.enableVoiceTo(player)
    });
});