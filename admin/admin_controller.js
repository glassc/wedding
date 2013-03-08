exports.index = function(req, res) {
    res.render(__dirname + '/templates/index');
}

exports.login = function(req,res) {
    res.render(__dirname + '/templates/login', {info: req.flash("error")});
}
