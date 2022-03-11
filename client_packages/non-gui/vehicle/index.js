mp.events.add('Vehicle:Engine:state', (state) => {
    if(mp.players.local.vehicle){
        mp.game.vehicle.defaultEngineBehaviour = false;
        setTimeout(() => {
            mp.players.local.vehicle.engine = state; // setzen der Engin
            
        }, 1000)
    }

});
//ConfigFlag, dass der Motor ausbleibt beim einsteigen.
mp.players.local.setConfigFlag(429, true);


mp.events.add("playerEnterVehicle", (player, vehicle, seat) => {    
    mp.game.vehicle.defaultEngineBehaviour = false;//enginBehabior, dass der Motor ausbleibt beim einsteigen.
});

let seatbelt = false;
mp.events.add('Apply:SeatBelt', (player) => {
    player.setConfigFlag(32, !seatbelt);
    seatbelt = !seatbelt;
});

mp.events.add('playerLeaveVehicle', ()  => {
   if(seatbelt){
    mp.game.graphics.notify('Du hast dich beim aussteigen abgeschnallt');
    seatbelt = false;
   }
});