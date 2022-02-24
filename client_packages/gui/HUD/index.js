var Admin = false;

mp.events.add("Change:Admin:Duty:Value:On:Client", (state) => {
   Admin = state;
   mp.gui.chat.push("state: " + Admin);
});
//Render For Car
mp.events.add("render", () => {

    if(Admin)
    {
        mp.vehicles.forEachInStreamRange((vehicle) => { 
            if(mp.players.local.position.subtract(vehicle.position).length() < 10)
            {
                const drawPosition = [vehicle.position.x, vehicle.position.y, vehicle.position.z + 0.3];
                mp.game.graphics.drawText(`~b~Id: ~w~${vehicle.remoteId}\n~b~Model: ~w~${mp.game.ui.getLabelText(mp.game.vehicle.getDisplayNameFromVehicleModel(vehicle.model))}\n~b~Position: ~w~${vehicle.position.x.toFixed(2)}, ${vehicle.position.y.toFixed(2)}, ${vehicle.position.z.toFixed(2)}\n`, drawPosition, { 
                    font: 0, 
                    color: [255, 255, 255, 185], 
                    scale: [0.25, 0.25], 
                    outline: true,
                    centre: false
                });
                mp.game.graphics.drawText(`\n\n\n~b~Heading: ~w~${vehicle.getHeading().toFixed(2)}\n~b~Health: ~w~${vehicle.getHealth()}`, drawPosition, { 
                    font: 0, 
                    color: [255, 255, 255, 185], 
                    scale: [0.25, 0.25], 
                    outline: true,
                    centre: false
                });
            }
        }); 
    }
});