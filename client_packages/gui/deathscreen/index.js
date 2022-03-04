let Deathbrowser = null;

mp.events.add('Open:Death:Browser', () => {
    Deathbrowser = mp.browsers.new('package://gui/deathscreen/index.html');
    mp.gui.cursor.visible = true;
});
mp.events.add('close:Death:Browser', () => {
    if(Deathbrowser){
        Deathbrowser.destroy();
        mp.gui.cursor.visible = false;
    }else {
        setTimeout(() => {
            if(Deathbrowser){
                Deathbrowser.destroy();
                mp.gui.cursor.visible = false;
            } 
            else {return};
        }, 1000);
    }
});

mp.events.add('HTML:Call:Respawn', () => {
    mp.events.callRemote('Respawn:At:Hospital');
});