const debug = require('../../../_assets/json/debug/debug.json').afk;

class AfkApi {
    defaultAfkMaxTick = 100;

    constructor() {
        console.log('[PhenixGames] AfkApi initialized');
    }

    async check() {
        mp.players.forEach(async (player) => {
            if (!player) return;

            const playerPos = await globlal.AccountAPI.getPos(player);
            const isAfk = player.getVariable('isAfk');
            if (!player.getVariable('isInEvent') && player.getVariable('syncPlayer')) {
                const isPositionSame =
                    JSON.stringify(player.position) === JSON.stringify(playerPos);
                if (!isPositionSame) {
                    player.setVariable('afkTick', 0);

                    player.setVariable('isAfk', false);
                    isAfk ? player.notify(`Du bist nicht mehr AFK`) : null;
                    return;
                }

                const playerAfkTick = player.getVariable('afkTick') || 0;
                if (playerAfkTick >= this.defaultAfkMaxTick && !isAfk) {
                    player.setVariable('isAfk', true);
                    player.notify(`Du bist nun AFK!.`);
                    return;
                }

                player.setVariable('afkTick', playerAfkTick + 1);
            }
        });
    }
}

global.AfkApi = new AfkApi();
