const playerAPI = require("../playerAPI");
const Perms = require('../playerAPI/permissionSystem.js')
const AdminUnsichtbar = 150;

mp.events.addCommand("aduty", async (player) => {

    if(Perms.hasPermissions(player, ["isTeam"])) {
        //? IF USER IS ALREADY IN GODMODE
        if(Perms.hasPermissions(player, ["godmode"])){
            if(player.getVariable('Aduty')) {
                playerAPI.saveLocalPlayerVar(player, {'Aduty': false})
                player.call("Set:God", [false]);
                player.call("Change:Admin:Duty:Value:On:Client", [false]);
                var name = await playerAPI.getPlayerInGame(player);
                player.name = name.firstname + " " + name.lastname;
                player.alpha = 255;
            }else {
                playerAPI.saveLocalPlayerVar(player, {'Aduty': true})
                player.call("Set:God", [true]); 
                player.call("Change:Admin:Duty:Value:On:Client", [true]);
                player.alpha = AdminUnsichtbar;
                player.name = "~r~" + player.name;
            }
        }
        if(Perms.hasPermissions(player, ["no_clip"])){
            player.call("Player:Admin:Duty:noclip");
        }

        
        
        //!TODO Remove when own cloth system is implemented
        player.setClothes(1, 130, 0, 2)
        player.setClothes(4, 34, 0, 2)
        player.setClothes(6, 60, 0, 2)
        player.setClothes(7, 147, 0, 2)
        player.setClothes(8, 122, 0, 0)
        player.setClothes(11, 171, 0, 2)
        player.setClothes(3, 1, 0, 0)

        var rolename = await Perms.getRoleInfo(player);

        player.notify((player.getVariable('Aduty')) ? '~g~Du hast den Admindienst als '+ rolename.rolename + ' Angetreten': '~r~Du hast den AdminDienst verlassen');
    }
});


mp.events.add("playerExitVehicle", (player, vehicle) => {
    if(player.getVariable('Aduty')){
        setTimeout(() => {
            player.alpha = AdminUnsichtbar;
        }, 1000);//Falls Probleme sind, Zeit hoch Setzen.
    }
});
//