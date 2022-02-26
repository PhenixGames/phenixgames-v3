let Ipls = [
    'bkr_biker_interior_placement_interior_3_biker_dlc_int_ware02_milo',
    
]

mp.events.add('packagesLoaded', () =>
{
    Ipls.forEach(content => {
        mp.world.requestIpl(content);
        
   });
});