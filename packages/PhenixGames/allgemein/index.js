const console = require('better-console');
const debug = require('../../../_assets/json/debug/debug.json').allgemein;

mp.events.add('debug', (player) => {
    console.info('Player ' + player.name + ' has called Debug');
});

/**
 * Save Local Variable to target
 * @param {object} target
 * @param {object} data
 * @returns /
 */
module.exports.saveLocalVar = async function (target, data) {
    for (const [index, [key, value]] of Object.entries(Object.entries(data))) {
        //console.log(`${index}: ${key} = ${value}`);
        target.setVariable(key, value);
    }
    return;
};
