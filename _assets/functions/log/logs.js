const debug = require('../../json/debug/debug.json').global;
const callerId = require('caller-id');
const caller = callerId.getData();

const error_opts = {
    errorEventName: 'error',
    logDirectory: './_logs/error_log', // NOTE: folder must exist and be writable...
    fileNamePattern: 'error-<DATE>.log',
    dateFormat: 'DD.MM.YYYY',
};

const debug_opts = {
    errorEventName: 'error',
    logDirectory: './_logs/debug_log', // NOTE: folder must exist and be writable...
    fileNamePattern: 'debug-<DATE>.log',
    dateFormat: 'DD.MM.YYYY',
};

const database_opts = {
    errorEventName: 'error',
    logDirectory: './_logs/database_log', // NOTE: folder must exist and be writable...
    fileNamePattern: 'debug-<DATE>.log',
    dateFormat: 'DD.MM.YYYY',
};

const log = require('simple-node-logger').createRollingFileLogger(error_opts);
const debug_log = require('simple-node-logger').createRollingFileLogger(debug_opts);
const database_log = require('simple-node-logger').createRollingFileLogger(database_opts);

/**
 * Logs a specific message to specific log files.
 * @param {String} message
 * @param {Boolean} isFatal
 * @returns {undefined}
 */
module.exports.log = ({ message, isFatal, type }) => {
    const caller = callerId.getData();
    if (debug) return console.log(message, `|||||| ${caller.filePath} |||||| ${caller.lineNumber}`);

    if (type === 'db') {
        return database_log.error(message, `|||||| ${caller.filePath} |||||| ${caller.lineNumber}`);
    }

    if (isFatal) {
        return log.error(
            `${message} |||||| ${new Date()} |||||| ${caller.filePath} |||||| ${caller.lineNumber}`
        );
    }

    debug_log.info(
        `${message} |||||| ${new Date()} |||||| ${caller.filePath} |||||| ${caller.lineNumber}`
    );
};
