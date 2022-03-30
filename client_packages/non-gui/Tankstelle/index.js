    mp.events.add("Create:Tankstellen:Main:Marker", () => {
        //
        //-156.15350341796875
        //
        var pos = new mp.Vector3(-2096.231689453125, -320.1805114746094, 12.16186809539795);
        mp.markers.new(6, pos, 40,
            {
                direction: -156.15,
                rotation: -156.15,
                color: [255, 255, 255, 255],
                visible: true,
                dimension: 0
            });
    });