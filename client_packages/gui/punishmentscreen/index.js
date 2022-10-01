const config = require('_config/config').config;

var psBrowser;
var isBrowserOpen = false;


mp.events.add('Player:Init:Punishmentscreen', (punishment_infos) => {
    isBrowserOpen = true;
    psBrowser = mp.browsers.new(`http://${config.domain}:8080/#/punishmentscreen`);
    mp.gui.cursor.show(false, false);

    psBrowser.execute(`gui.punishmentscreen.initPunishmentscreen({
        adminname: '${punishment_infos.adminname}',
        reason: '${punishment_infos.reason}',
        time_left: '${punishment_infos.end_of_punishement}',
        date_of_punishment: '${punishment_infos.date_of_punishment}',
        punishment_id: '${punishment_infos.punishment_id}',
    })`)
});