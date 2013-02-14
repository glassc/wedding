var fs = require('fs');
var path = require('path');

var uploadPath = path.resolve(__dirname,"..", "content", "uploads");

module.exports.index = function(req,res) {
	var results = [];
	fs.readdir(uploadPath, function(err, files) {
		files.forEach(function(file) {
			results.push "/uploads/" + file;
		});
        res.send(results);
	});
}
	
module.exports.insert = function(req, res) {
    fs.readFile(req.files.image.path, function(err, data) {
        fs.writeFile(path.resolve(uploadPath, req.files.image.name), data, function(err) {
            res.send({url: "/uploads/" + req.files.image.name});
        });
    });
}