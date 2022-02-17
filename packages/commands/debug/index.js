mp.events.addCommand("pos", (player) => {
    console.log(player.position.x + ', ' + player.position.y + ', ' + (player.position.z - 1));
    console.log(player.dimension)
});