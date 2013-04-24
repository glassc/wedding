var assert = require("assert");
var sinon = require("sinon");
var express = require("express");
var db = require("../../lib/connection");


describe("home_controller", function() {
    var task = null;
    var sandbox = null;
    var page = null;
    var collection = null;
    
        
    beforeEach(function() {
        sandbox = sinon.sandbox.create();
       
        task = require("../../pages/home_task")(db);
        
        page = {
            content: "Some Content",
            title: "Title"
        };
        
        collection =  {
            findOne: function(slug, callback) {
                        callback(null, page);
                        
                    },
            
            find:  function() {
                return {
                    toArray: function(callback) {
                        callback(null, [{title: "abc", slug: "/abc"}]);
                        
                    }
                };
            }
                            
        };
    
    });
    
    afterEach(function() {
       sandbox.restore();
    });
    
    it('should get return null when no page is found', function(done) {

        var callback = sandbox.spy(function(results) {done()});
        collection.findOne = function(slug, callback) { callback(null,null)};
        sandbox.stub(db, "collection").withArgs("pages").returns(collection);
        task.get_page("/", callback);
        assert(callback.withArgs(null).calledOnce);
    });

    
    it('should get a page', function(done) {
        
        var callback = sandbox.spy(function(results) {done()});
        sandbox.stub(db, "collection").withArgs("pages").returns(collection);
        task.get_page("/", callback);
        assert(callback.neverCalledWith(null));
    });
});