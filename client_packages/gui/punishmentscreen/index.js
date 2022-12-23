const config = require('_config/config').config;

var psBrowser;
var isBrowserOpen = false;

function openBrowser() {
    isBrowserOpen = true;
    psBrowser = mp.browsers.new(`http://${config.domain}:8080/#/punishmentscreen`);
    mp.gui.cursor.show(false, false);
}

function closeBrowser() {
    isBrowserOpen = false;
    psBrowser.destroy();
    mp.gui.cursor.show(true, true);
}

mp.events.add('Player:Init:Punishmentscreen', (punishment_infos) => {
    if (!isBrowserOpen) openBrowser();
    psBrowser.execute(`gui.punishmentscreen.initPunishmentscreen({
        adminname: '${punishment_infos.adminname}',
        reason: '${punishment_infos.reason}',
        time_left: '${punishment_infos.end_of_punishement}',
        date_of_punishment: '${punishment_infos.date_of_punishment}',
        punishment_id: '${punishment_infos.punishment_id}',
    })`);
});

mp.events.add('Player:Punishmentscreen:Close', () => {
    closeBrowser();
    return;
});
