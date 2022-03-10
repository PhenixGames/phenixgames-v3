//Var
const colour = { r: 255, g: 0, b: 0 }; // set this to the colour you want
const serverName = 'PhenixGames'; // set this to the pause menu title you want
//Der Code wird Ausgeführt wenn alle Sachen vom Client geladen wurden.
//Dann setze ich farben und alle wichtigen daten.
mp.events.add('playerReady', () => {
  mp.game.invoke('0xF314CF4F0211894E', 143, colour.r, colour.g, colour.b, 255); // Replace Michael colour
  mp.game.invoke('0xF314CF4F0211894E', 116, colour.r, colour.g, colour.b, 255); // Replace freemode colour
  mp.game.gxt.set('PM_PAUSE_HDR', serverName); // Replace map title
});
//Disable Nametag from Ragemp
mp.nametags.enabled = false;

//Godmode 
mp.events.add("Set:God", (isGod) => {
  mp.players.local.setInvincible(isGod)
});
