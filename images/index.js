var controller = require('./images_controller');
var express = require('express');
var path = require('path');
var config = require("../config");

module.exports = function(app)
{
   app.get("/api/images", controller.index);
   app.post("/api/images", controller.insert);
   app.use("/uploads", express.static(config.upload_dir, { maxAge: 1 }));
}