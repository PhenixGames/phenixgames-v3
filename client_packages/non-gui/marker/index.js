var housemarker;

mp.events.add('Set:Marker:InNormieHouse', (dim) => {
    housemarker = mp.markers.new(27, new mp.Vector3(265.9962158203125, -1007.3060302734375, -102.00233892822266), 1, {
        direction: null,
        rotation: null,
        color: null,
        visible: true,
        dimension: dim
    });
    mp.gui.chat.push(JSON.stringify(dim));
});

function removeMarker() {
    if(housemarker === null) return;
    housemarker.destroy();
    housemarker = null;
}

function normieHouseMarkerDistanceToPlayerPosition(player) {
    var dx = 266.0528259277344 - player.position.x;
    var dy = -1007.1455078125 - player.position.y;
    var dz = -101.98682403564453 - player.position.z;
    mp.gui.chat.push(Math.sqrt( dx * dx + dy * dy + dz * dz ))
    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}