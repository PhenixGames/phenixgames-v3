let Ipls = [
    'vw_casino_main',
    'vw_casino_penthouse'
]

mp.events.add("World:load:IPL", (player) => {
   Ipls.forEach(content => {
        mp.console.logInfo(content, true, true);
        mp.world.requestIpl(content);
        
   });
   mp.console.logInfo("FINISHED", true, true);
});

mp.console.logInfo("loaded", true, true);