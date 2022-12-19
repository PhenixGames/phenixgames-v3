const pg_fuelstations = require('../tables/pg_fuelstations');
const fuelstation_data = require('./json/pg_fuelstations.json');
const fuelstation_marker_data = require('./json/pg_fuelstations_marker.json');

(async () => {
    for (let i in fuelstation_data) {
        await pg_fuelstations
            .create(fuelstation_data[i], {
                ignoreDuplicates: true,
            })
            .then((fuelstation) => {
                const allMarkers = fuelstation_marker_data.filter((marker) => {
                    return marker.fuelstation_id === fuelstation.id;
                });

                for (let m in allMarkers) {
                    fuelstation
                        .createMarker(allMarkers[m], {
                            ignoreDuplicates: true,
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                console.log('pg_fuelstations: default data not inserted');
                console.log(err);
            });
    }
    console.log('pg_fuelstations: default data inserted');
})();
