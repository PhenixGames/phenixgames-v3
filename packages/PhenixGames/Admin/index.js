const playerAPI = require("../../PhenixGames/playerAPI");

const AdminUnsichtbar = 150;

mp.events.addCommand("aduty", async (player) => {

    if(player.getVariable('isTeam')) {
        //? IF USER IS ALREADY IN GODMODE
        if(player.getVariable('Aduty')) {
            playerAPI.saveLocalPlayerVar(player, {'Aduty': false})
            player.call("Set:God", [false]);
            var name = await playerAPI.getPlayerInGame(player);
            player.name = "~r~" + name.firstname + " " + name.lastname;
            player.alpha = 255;
        }else {
            playerAPI.saveLocalPlayerVar(player, {'Aduty': true})
            player.call("Set:God", [true]); 
            player.alpha = AdminUnsichtbar;
            player.name = "~r~" + player.name;
        }
        player.call("Player:Admin:Duty:noclip");

        //!TODO Remove when own cloth system is implemented
        player.setClothes(1, 130, 0, 2)
        player.setClothes(4, 34, 0, 2)
        player.setClothes(6, 60, 0, 2)
        player.setClothes(7, 147, 0, 2)
        player.setClothes(8, 122, 0, 0)
        player.setClothes(11, 171, 0, 2)
        player.setClothes(3, 1, 0, 0)

        

        
       



        player.notify((player.getVariable('Aduty')) ? '~g~Du hast den AdminDiesnt Angetreten': '~r~Du hast den AdminDienst verlassen');
    }
});


mp.events.add("playerExitVehicle", (player, vehicle) => {
    if(player.getVariable('Aduty')){
        setTimeout(() => {
            player.alpha = AdminUnsichtbar;
        }, 500);
    }
});