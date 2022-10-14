const debug = require('../../../_assets/json/debug/debug.json').ipls;

class IplsApi {
    ipls;
    constructor() {
        this.ipls = ['vw_dlc_casino_door', 'hei_dlc_casino_door', 'hei_dlc_windows_casino'];
    }

    load() {
        this.ipls.forEach((content) => {
            mp.world.requestIpl(content);
        });
    }
}

const IplsAPI = new IplsApi();
module.exports = IplsAPI;
