var config = require("../config/dev.js");
var mongoskin = require("mongoskin");

module.exports = mongoskin.db(config.database_connection,  {safe: true, auto_reconnect: true});