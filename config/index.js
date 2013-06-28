var nconf = require('nconf');

nconf.file('./config/config.json').env();

module.exports = nconf.get();