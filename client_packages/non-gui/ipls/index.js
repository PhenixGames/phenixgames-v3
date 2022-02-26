let Ipls = [
    'vw_casino_main',
    'vw_casino_penthouse'
]

mp.events.add("World:load:IPL", ( ) => {
   Ipls.forEach(content => {
        mp.world.requestIpl(Ipls[content]);
   });
});