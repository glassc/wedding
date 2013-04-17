var controller = require('./users_controller');
var express = require('express');

module.exports = function(app)
{
    app.post("/api/users", controller.insert);
    app.get("/api/users", controller.index);
    app.del("/api/users/:user", controller.destroy);
    app.get("/admin/users", controller.show);
    app.use("/admin/users/", express.static(__dirname + "/view", { maxAge: 1 }));
};