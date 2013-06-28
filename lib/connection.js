var config = require("../config");
var mongoskin = require("mongoskin");

module.exports = mongoskin.db(config["DATABASE_CONNECTION"],  {safe: true, auto_reconnect: true});