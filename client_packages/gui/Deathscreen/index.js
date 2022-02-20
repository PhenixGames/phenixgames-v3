let Deathbrowser = null;

mp.events.add('Open:Death:Browser', () => {
    mp.events.callRemote("debug");
    Deathbrowser = mp.browsers.new('package://gui/deathscreen/index.html');
    mp.gui.cursor.visible = true;
});
mp.events.add('close:Death:Browser', () => {
    Deathbrowser.destroy();
    mp.gui.cursor.visible = false;
});

mp.events.add('HTML:Call:Respawn', () => {
    mp.events.callRemote('Respawn:At:Hospital');
});

mp.events.callRemote("debug");