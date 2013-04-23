var path = require('path');
var async = require("async");

var template_dir = path.resolve(__dirname, "templates");

module.exports = function(db) {
    
    return {
        index:  function(req,res) {
                    var is_home = typeof(req.params.slug) == 'undefined';
                    var slug = !is_home ? "/" + req.params.slug : "/";
                    var template = !is_home ? "page" : "index";

                    async.parallel({
                            page: function(callback) {
                                db.collection("pages").findOne({slug: slug}, callback);
                            },
                            navigation: function(callback) {
                                db.collection("pages").find().toArray(function(error, result) {
                                    callback(null, result.sort( function(a,b) { return a.order - b.order; }));
                                });
                            }        
                        }, function(err, result) {
                            
                            if(result.page === null)
                                res.send(404);
                            else
                                res.render(path.resolve(template_dir, template), {page: assemble(result, slug)});
                                
                            if( res.callback !== null) res.callback();
                        });
                }
    };
   
};
    

function assemble(data, slug) {
    var result = {content: data.page.content, title: data.page.title, navigation: []};
    data.navigation.forEach(function(item) { result.navigation.push({title:item.title, link: item.slug, current: item.slug == slug}); });
    return result;
}