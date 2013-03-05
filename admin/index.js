var controller = require('./admin_controller');
var express = require('express');
var path = require('path');

module.exports = function(app, authentication)
{

    app.get("/admin/login", controller.login);
    app.use("/admin/css", express.static(__dirname + "/view/css", { maxAge: 1 }));
    app.use("/admin/img", express.static(__dirname + "/view/img", { maxAge: 1 }));
    //app.all("/admin/*", authentication.required);
    app.get("/admin", controller.index);
    app.use("/admin/js", express.static(__dirname + "/view/js", { maxAge: 1 }));
    app.use("/admin/components",  express.static(path.resolve(__dirname, "..", "components"), { maxAge: 1 }));
}

