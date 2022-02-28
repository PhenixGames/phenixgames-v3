mp.events.addCommand("pos", (player) => {
    console.log('POSITION: ' + player.position.x + ', ' + player.position.y + ', ' + (player.position.z - 1));
    console.log('ROTATION: ' + player.heading);
    console.log(player.dimension)
});

mp.events.addCommand('callfunc', ( player, arg, name ) => {
   mp.events.call(name);
});