var assert = require("assert");
var sinon = require("sinon");
var express = require("express");


describe("home_controller", function() {
    var controller = null;
    var response = null;
    var sandbox = null;
    var request = null;
    var page = null;
    var task = {};
    
    
        
    beforeEach(function() {
        sandbox = sinon.sandbox.create();
        controller = require("../../pages/home_controller")(task);
        response = {render: sandbox.spy(), send: sandbox.spy(), callback: null};
        request = {params: {}};
        page = {
            content: "Some Content",
            title: "Title"
        };
        
       
    
    });
    
    afterEach(function() {
       sandbox.restore();
    });
    
    it('should get a 404 response when the page is not found', function(done) {
        response.callback = done;
        task.get_page = sandbox.spy(function(slug, callback) { callback(null); });
        controller.index(request, response);
        assert(response.send.withArgs(404).calledOnce);
    });

    
    it('should get the index page', function(done) {
        response.callback = done;
        task.get_page = sandbox.spy(function(slug, callback) { callback(page); });
        controller.index(request, response);
        assert(response.render.calledOnce);
        assert(task.get_page.withArgs("/"));
    });
    
    it('should get a page at a url', function(done) {
        response.callback = done;
        request.params.slug = "/about";
        task.get_page = sandbox.spy(function(slug, callback) { callback(page); });
        controller.index(request, response);
        assert(response.render.calledOnce);
        assert(task.get_page.withArgs("/about"));
    });
});