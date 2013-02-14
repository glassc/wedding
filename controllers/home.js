var async = require('async');
var db = require('../lib/connection');


module.exports.index = function(req,res) {
    var slug = req.params.slug !== null ? "/" + req.params.slug : "/"
    var template = req.params.slug !== null ? "page" : "index";

    async.parallel({
            page: function(callback) {
                db.collection("pages").findOne({slug: slug}, callback);
            },
            navigation: function(callback) {
                db.collection("pages").find().toArray(function(error, result) {
                    callback(null, result.sort( function(a,b) { return a.order - b.order }));
                })
            }        
        }, function(err, result) {
            if(result.page === null)
                res.send(404);
            else
                res.render(template, {page: assemble(result)});
        })
}
    

function assemble(data) {
    var result = {content: data.page.content, title: data.page.title, navigation: []}
    data.navigation.forEach(function(item) { return {title:item.title, link: item.slug}});
    return result;
}