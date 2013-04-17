var assert = require("assert");
var sinon = require("sinon");

describe("admin_controller", function() {
    var controller = null;
    var db = null;
    
    beforeEach(function() {
       db = sinon.stub(require("../../lib/db"));
       controller = require("../../admin/admin_controller");
    });
    
    it("should get the login page", function() {
        var res = sinon.spy({}, "render");
    });
});