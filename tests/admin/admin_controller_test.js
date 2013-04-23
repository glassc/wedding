var assert = require("assert");
var sinon = require("sinon");
var express = require("express");

describe("admin_controller", function() {
    var controller = null;
    var db = null;
    var response = null;
    var sandbox = null;
    
    beforeEach(function() {
        sandbox = sinon.sandbox.create()
        db = sandbox.stub(require("../../lib/connection"));
        controller = require("../../admin/admin_controller")(db);
        response = {render: sandbox.spy()}
    
    });
    
    afterEach(function() {
       sandbox.restore();
    });
    
    it("should get the login page", function() {
        
        var request = {flash: function() {}};
        sandbox.stub({flash: function() {}}, "flash").returns("");
        controller.login(request, response);
        assert(response.render.calledOnce);
    });
});