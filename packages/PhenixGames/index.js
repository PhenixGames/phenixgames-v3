require('dotenv').config();

const fs = require('fs');
let modules = fs.readdirSync(__dirname);
modules.forEach((module) => {
    require(`${__dirname}/${module}`);
});
