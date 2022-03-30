    mp.events.add("Create:Tankstellen:Main:Marker", () => {
        var pos = new mp.Vector3(-2096.231689453125, -320.1805114746094, 12.16186809539795);
        mp.markers.new(20, pos, 20,
            {
                color: [0, 0, 0, 255],
                visible: true,
                dimension: 0
            });
    });