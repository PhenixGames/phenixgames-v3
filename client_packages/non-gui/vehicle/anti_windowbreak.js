let abWindows = { entering: false, vehObj: null }; // entering: (boolean), vehObj: (vehicle handle)
let smashPhase = 0;

mp.events.add('render', () => {
    let tmpEntering = mp.players.local.isTryingToEnterALockedVehicle();
    if (abWindows.entering != tmpEntering) {
        abWindows.entering = tmpEntering;

        let tmpDoors = 0;

        // We get the handle of the vehicle that the client is trying to enter
        const handleVehEntering = mp.players.local.getVehicleIsTryingToEnter();
        if (handleVehEntering) {
            // If it is a different vehicle or it doesnt exist we reset smashPhase to 0
            if (abWindows.vehObj) {
                if (handleVehEntering != abWindows.vehObj) {
                    abWindows.vehObj = handleVehEntering;
                    smashPhase = 0;
                }
            } else {
                abWindows.vehObj = handleVehEntering;
                smashPhase = 0;
            }

            // We get the vehicle the client is trying to enter and then we get the state of its doors
            let vehEntering = mp.vehicles.atHandle(handleVehEntering);
            if (vehEntering) {
                tmpDoors = vehEntering.getDoorLockStatus();
            }
        }

        switch (smashPhase) {
            case 0: // Client is trying to enter a locked vehicle
                if (tmpDoors == 2 && tmpEntering) {
                    smashPhase = 1;
                }
                break;
            case 1: // The vehicle got unlocked mid-animation, here we want to stop the client from breaking the window
                if (tmpDoors == 1 && !tmpEntering) {
                    // We stop the task so that the client doesn't break the window
                    mp.players.local.clearTasksImmediately();
                    smashPhase = 0;
                }
                break;
            default:
                smashPhase = 0;
                break;
        }
    }
});
