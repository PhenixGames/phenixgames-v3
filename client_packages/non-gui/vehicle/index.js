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
mp.events.add('Apply:SeatBelt', () => {
    this.ApplySeatbelt();
});

mp.events.add('playerLeaveVehicle', ()  => {
   if(seatbelt){
    mp.game.graphics.notify('Du hast dich beim aussteigen abgeschnallt');
    seatbelt = false;
   }
});
mp.events.add("Vehicle:Remove:Dirt:Level", (args) =>{
    mp.console.logError("" + JSON.stringify(args), true, true);
    if (args[0].type !== 'vehicle') return;
    args.setDirtLevel(0);

});


exports.ApplySeatbelt =  function () {
    mp.players.local.setConfigFlag(32, !seatbelt);
    seatbelt = !seatbelt;
}

setInterval(() => {
    if(mp.players.local.vehicle){
        mp.game.audio.setRadioToStationName("OFF");
    }
}, 1000);
