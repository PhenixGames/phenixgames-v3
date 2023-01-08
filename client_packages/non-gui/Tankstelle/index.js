var Loadedmarker = [];
function Spawn_Marker_Of_Fuelstation(pos, size, id) {
    var marker = mp.markers.new(23, pos, size, {
        color: [255, 0, 0, 50],
        visible: true,
        dimension: 0,
    });
    Loadedmarker.push(marker);
}
function Remove_all_marker_of_fuelstation() {
    for (var i = 0; i < Loadedmarker.length; i++) {
        Loadedmarker[i].destroy();
    }
    Loadedmarker = [];
}

mp.events.add('Client:Fuelstation:Marker:SpawnOne', (pos, size, id) => {
    Spawn_Marker_Of_Fuelstation(pos, size, id);
});
mp.events.add('Client:Fuelstation:Marker:DestroyAll', () => {
    Remove_all_marker_of_fuelstation();
});
