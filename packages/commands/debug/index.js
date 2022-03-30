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
     getRandomInt(min, max);
    });
 //Erstelle eine Funkton welche eine random nummer returnt
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
