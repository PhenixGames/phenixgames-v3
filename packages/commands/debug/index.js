mp.events.addCommand("pos", (player) => {
    console.log('POSITION: ' + player.position.x + ', ' + player.position.y + ', ' + (player.position.z - 1));
    console.log('ROTATION: ' + player.heading);
    console.log(player.dimension)
});

mp.events.addCommand('callfunc', ( player, arg, name ) => {
   player.call(name);
});


mp.events.addCommand('spawnped', ( player, arg, ped ) => {
    let dynamicPed = mp.peds.new(mp.joaat(ped), mp.players.at(0).position, {dynamic:true});
dynamicPed.controller = mp.players.at(0);
 });

 mp.events.addCommand('testtest', (player, args, min, max) => {
     player.notify(getRandomInt(min, max));
    });
//Funktion die eine zufallszahl wiedergibt in einem bestimmten bereich
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

mp.events.addCommand('inv', (player) => {
    player.call('Player:ActivateInventory');
});

