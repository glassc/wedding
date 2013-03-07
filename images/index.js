var controller = require('./images_controller');
var express = require('express');
var path = require('path');

module.exports = function(app)
{
   app.get("/api/images", controller.index);
   app.post("/api/images", controller.insert);
   app.use("/uploads", express.static(path.resolve(__dirname,"..", "uploads"), { maxAge: 1 }));
}