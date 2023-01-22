//thats a debug cmd

mp.events.addCommand('cloth', (player, id) => {
    if (player.getVariable('isTeam')) {
        if (id == undefined) {
            let i = 0;
            setInterval(() => {
                player.setClothes(11, i, 0, 0);
                console.log(player.getClothes(11));
                console.log('^ ' + i);
                i++;
            }, 2000);
            return;
        }
        id = id.split(' ');

        player.setClothes(Number(id[0]), Number(id[1]), Number(id[2]), Number(id[3]));
    }
});
