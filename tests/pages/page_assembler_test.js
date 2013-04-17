var uuid = require('node-uuid');
var assert = require("assert");
var assembe = require("../../pages/page_assembler");

describe("page_assember", function()
{
    var page = null;
    
    beforeEach(function()
    {
        page = {
            _id:  uuid.v4(),
            content:  "my fancy page",
            title: "my page",
            slug: "/mypage",
            order: 1
        };
    });
    
    it('should assember a page', function() {
        var actual = assembe.page(page);
        assert.equal( actual.id, page._id);
        assert.equal(actual.content,page.content);
        assert.equal(actual.title,page.title);
        assert.equal(actual.slug,page.slug);
        assert.equal(actual.order,page.order);
        assert.equal(actual.links.self, "/api/pages/" + page._id);
    });
});