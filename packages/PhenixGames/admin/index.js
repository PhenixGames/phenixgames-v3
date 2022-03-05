const playerAPI = require("../playerAPI");
const Perms = require('../playerAPI/permissionSystem')
const generellAPI = require('../allgemein/');

const AdminUnsichtbar = 200;

mp.events.addCommand("aduty", async (player) => {

    if(await Perms.hasPermissions(player, ["isTeam"])) {
        //? IF USER IS ALREADY IN GODMODE
        if(await Perms.hasPermissions(player, ["godmode"])){
            if(player.getVariable('Aduty')) {
                generellAPI.saveLocalVar(player, {'Aduty': false})

                player.call("Set:God", [false]);
                player.call("Change:Admin:Duty:Value:On:Client", [false]);

                var name = await playerAPI.getPlayerInGame(player.getVariable('playerId'));
                player.name = name.firstname + " " + name.lastname;

                player.alpha = 255;
            }else {
                generellAPI.saveLocalVar(player, {'Aduty': true})
                player.call("Set:God", [true]); 
                player.call("Change:Admin:Duty:Value:On:Client", [true]);
                player.alpha = AdminUnsichtbar;
                player.name = player.name;
            }
        }
        if(await Perms.hasPermissions(player, ["no_clip"])){
            player.call("Player:Admin:Duty:noclip");
        }

        
        

        var rolename = await Perms.getRoleInfo(player);

        player.notify((player.getVariable('Aduty')) ? '~g~Du hast den Admindienst als ~r~'+ rolename.rolename + '~g~ angetreten': '~r~Du hast den AdminDienst verlassen');
    }
});


mp.events.add("playerExitVehicle", (player, vehicle) => {
    if(player.getVariable('Aduty')){
        setTimeout(() => {
            player.alpha = AdminUnsichtbar;
        }, 1000);//Falls Probleme sind, Zeit hoch Setzen.
    }
});
//Hier werden die Daten vom schießenden spieler an den Admin weitergeleitet.
mp.events.add('Get:Shot:Info:to:Admin', (player, admin, targetpos, targetEntity) => {
   admin.call("Admin:draw:shot:line", [player, targetpos, targetEntity]);
});
//
mp.game.controls.disableControlAction(0, 140, true);

