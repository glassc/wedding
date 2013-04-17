var fs = require('fs');
var path = require('path');
var config = require("../config");

var uploadPath = path.resolve(__dirname,"..", "uploads");

module.exports.index = function(req,res) {
	var results = [];
	fs.readdir(config.upload_dir, function(err, files) {
		files.forEach(function(file) {
			results.push("/uploads/" + file);
		});
        res.send(results);
	});
};
	
module.exports.insert = function(req, res) {
    fs.readFile(req.files.image.path, function(err, data) {
        fs.writeFile(path.resolve(config.upload_dir, req.files.image.name), data, function(err) {
            res.send({url: "/uploads/" + req.files.image.name});
        });
    });
};

module.exports.browser = function(req, res) {
  res.render(__dirname + "/templates/image_browser");
};