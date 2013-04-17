var pages_controller = require('./pages_controller');
var home_controller = require('./home_controller');
var express = require('express');

module.exports = function(app)
{
    app.post("/api/pages/order", pages_controller.updateorder);
    app.get("/api/pages/:page", pages_controller.details);
    app.post("/api/pages/:page", pages_controller.update);
    app.del("/api/pages/:page",pages_controller.destroy);
    app.post("/api/pages", pages_controller.insert);
    app.get("/admin/pages/edit",  pages_controller.edit);
    app.use( "/admin/pages", express.static(__dirname + "/view", { maxAge: 1 }));
    
    // FRONT
    app.get("/", home_controller.index);
    app.get("/:slug", home_controller.index);
};