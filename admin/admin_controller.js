
var assemble = require('../pages/page_assembler');

module.exports = function(db) {
        
    return {
        index:  function(req, res) {
            db.collection('pages').find().toArray(function(err, pages) {
                var results = [];
                pages.sort(function(a,b) { return a.order-b.order} ).forEach(function(page) {
                    var data = assemble.no_content(page);
                    results.push(data);
                
                });
            
                res.render(__dirname + '/templates/index', {admin: {navigation: results}});
            });
        },
        
        login: function(req,res) {
           res.render(__dirname + '/templates/login', {info: req.flash("error")}); 
        }
    }
    
    
}