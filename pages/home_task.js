var async = require("async");

module.exports = function(db) {
    return {
        get_page : function(slug, callback) {
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
                    callback(assemble(result, slug));
            });        
        }
    };
}

function assemble(data, slug) {
    if( data.page === null ) return null;
    var result = {content: data.page.content, title: data.page.title, navigation: []};
    data.navigation.forEach(function(item) { result.navigation.push({title:item.title, link: item.slug, current: item.slug == slug}); });
    return result;
}