let use3dVoice = true;
let useAutoVolume = false;
let maxRange = 50.0;

const g_voiceMgr = {
    listeners: [],

    add: function (player) {
        this.listeners.push(player);

        player.isListening = true;
        mp.events.callRemote('add_voice_listener', player);

        if (useAutoVolume) {
            player.voiceAutoVolume = true;
        } else {
            player.voiceVolume = 1.0;
        }

        if (use3dVoice) {
            player.voice3d = true;
        }
    },

    remove: function (player, notify) {
        const idx = this.listeners.indexOf(player);

        if (idx !== -1) this.listeners.splice(idx, 1);

        player.isListening = false;

        if (notify) {
            mp.events.callRemote('remove_voice_listener', player);
        }
    },
};

mp.events.add('playerQuit', (player) => {
    if (player.isListening) {
        g_voiceMgr.remove(player, false);
    }
});

mp.events.add('Client:Voice:SetRange', (range) => {
    maxRange = range;
});

setInterval(() => {
    const localPlayer = mp.players.local;
    const localPos = localPlayer.position;

    mp.players.forEachInStreamRange((player) => {
        if (player != localPlayer) {
            if (!player.isListening) {
                const playerPos = player.position;
                const dist = mp.game.system.vdist(
                    playerPos.x,
                    playerPos.y,
                    playerPos.z,
                    localPos.x,
                    localPos.y,
                    localPos.z
                );

                if (dist <= maxRange) {
                    g_voiceMgr.add(player);
                }
            }
        }
    });

    g_voiceMgr.listeners.forEach((player) => {
        if (player.handle !== 0) {
            const playerPos = player.position;
            const dist = mp.game.system.vdist(
                playerPos.x,
                playerPos.y,
                playerPos.z,
                localPos.x,
                localPos.y,
                localPos.z
            );

            if (dist > maxRange) {
                g_voiceMgr.remove(player, true);
            } else if (!useAutoVolume) {
                player.voiceVolume = 1 - dist / maxRange;
            }
        } else {
            g_voiceMgr.remove(player, true);
        }
    });
}, 500);
