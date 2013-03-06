var controller = require('./images_controller');
var express = require('express');

module.exports = function(app)
{
   app.get("/api/images", controller.index);
   app.post("/api/images", controller.insert);
   app.use(express.static(__dirname + '../content/uploads', { maxAge: 1 }));
}