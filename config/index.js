var env = process.env.NODE_ENV == null ? "dev" : "production";

module.exports = require("./" + env +  ".config.js");