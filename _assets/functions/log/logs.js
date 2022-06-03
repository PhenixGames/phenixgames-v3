const debug = require('../../json/debug/debug.json').global

const error_opts = {
    errorEventName: 'error',
    logDirectory: './_logs/error_log', // NOTE: folder must exist and be writable...
    fileNamePattern: 'error-<DATE>.log',
    dateFormat: 'DD.MM.YYYY'
};

const debug_opts = {
    errorEventName: 'error',
    logDirectory: './_logs/debug_log', // NOTE: folder must exist and be writable...
    fileNamePattern: 'debug-<DATE>.log',
    dateFormat: 'DD.MM.YYYY'
};

const log = require('simple-node-logger').createRollingFileLogger(error_opts);
const debug_log = require('simple-node-logger').createRollingFileLogger(debug_opts);


/**
 * Logs a specific message to specific log files.
 * @param {String} message
 * @param {Boolean} isFatal
 * @returns {undefined}
 */
module.exports.log = ({message, isFatal}) => {
    if(debug) return console.log(message);

    if (isFatal) {
        log.error(`${message} |||||| ${new Date()}`);
    } else {
        debug_log.info(`${message} |||||| ${new Date()}`);
    }
}