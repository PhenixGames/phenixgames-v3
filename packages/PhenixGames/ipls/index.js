let Ipls = [
    'vw_casino_main',
    'vw_casino_penthouse',
    'vw_casino_carpark',
    'vw_casino_garage'
]

mp.events.add('packagesLoaded', () =>
{
    Ipls.forEach(content => {
        mp.world.requestIpl(content);
        
   });
});