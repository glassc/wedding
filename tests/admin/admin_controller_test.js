var assert = require("assert");
var sinon = require("sinon");
var express = require("express");
var db = require("../../lib/connection");

describe("admin_controller", function() {
    var controller = null;
    var response = null;
    var sandbox = null;
    
    beforeEach(function() {
        sandbox = sinon.sandbox.create();
        
        
        
        
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
    
    it('should get the index page', function(done) {
        var collection =  {
            find:  function() {
                return {
                    toArray: function(callback) {
                        callback(null, []);
                        done();
                    }
                }
            }
        }
        sandbox.stub(db, "collection").returns(collection)
        controller.index(null, response);
        assert(response.render.calledOnce);
    });
});