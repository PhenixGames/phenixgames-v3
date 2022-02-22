// const playerAPI = require("../../PhenixGames/playerAPI");

// mp.events.addCommand("god", (player) => {

//     if(player.getVariable('isTeam')) {
//         //? IF USER IS ALREADY IN GODMODE
//         if(player.getVariable('god')) {
//             playerAPI.saveLocalPlayerVar(player, {'god': false})
//             player.call("Set:God", [false]);
//         }else {
//             playerAPI.saveLocalPlayerVar(player, {'god': true})
//             player.call("Set:God", [true]);
            
//         }
//         player.call("Player:Admin:Duty:noclip");
//         player.setClothes(1, 130, 0, 2)
//         player.setClothes(4, 34, 0, 2)
//         player.setClothes(6, 60, 0, 2)
//         player.setClothes(7, 147, 0, 2)
//         player.setClothes(8, 122, 0, 0)
//         player.setClothes(11, 171, 0, 2)
//         player.setClothes(3, 1, 0, 0)


//         player.notify((player.getVariable('god')) ? '~g~Du bist im Godmode': '~r~Du hast den Godmode verlassen');
//     }
// });