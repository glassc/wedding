var controller = require('./images_controller');
var express = require('express');
var path = require('path');
var config = require("../config");

module.exports = function(app)
{
   app.get("/api/images", controller.index);
   app.get("/admin/images/browser", controller.browser);
   app.post("/api/images", controller.insert);
   //app.use("/uploads", express.static(config.upload_dir, { maxAge: 1 }));
   app.use( "/admin/images", express.static(__dirname + "/view", { maxAge: 1 }));
};