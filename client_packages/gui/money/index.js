mp.events.add("Hud:Update:Money", (money) => {//Geld aud der Hand
    
    mp.game.stats.statSetInt(mp.game.joaat("SP0_TOTAL_CASH"), money, false);//Setze Das geld was dem Spieler angezeigt wird

});
