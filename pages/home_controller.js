var path = require('path');
var async = require("async");

var template_dir = path.resolve(__dirname, "templates");

module.exports = function(task) {
    return {
        index:  function(req,res) {
            var template = typeof(req.params.slug) ? "index" : "page";
            task.get_page(typeof(req.params.slug) ? "/" : req.params.slug, function(result) {
                
                if(result === null)
                    res.send(404);
                else
                    res.render(path.resolve(template_dir, template), result);
                    
                if( res.callback !== null ) res.callback();
            });
        }
    };
   
};