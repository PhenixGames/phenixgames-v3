const config = require('_config/config').config;

exports.mainBrowser = mp.browsers.new(`http://${config.domain}:8080/`);