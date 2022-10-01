const debug = require('../../../_assets/json/debug/debug.json').ipls;

let Ipls = [
    'vw_dlc_casino_door',
    'hei_dlc_casino_door',
    'hei_dlc_windows_casino'
    
]

mp.events.add('packagesLoaded', () =>
{
    Ipls.forEach(content => {
        mp.world.requestIpl(content);
        
   });
});