var mongoskin = require("mongoskin");
var db = require('../lib/connection');
var Repository = require('../lib/repository');
var repository = new Repository(db, "users");

exports.show = function(req, res) {
  res.render(__dirname + "/templates/index");
}

exports.insert = function(req, res) {
    var email = req.body.email;
    db.collection("users").findOne({email:email}, function(err, user) {
        if( user === null )
        {
            repository.save({email:email}, function(err, user) {
                res.send( assemble(user) );   
            });
        } else {
            res.send(400, "A user already exists with the email address");    
        }
    });
    
   
}

exports.index = function(req,res) {
    db.collection('users').find().toArray(function(err, users) {
        var results = [];
        users.forEach(function(user) {
           results.push(assemble(user)); 
        });
        
        res.send(results);
    });
}

exports.destroy = function(req, res) {
      repository.remove(req.params.user, function(err, result) {
        res.send(204);
      });
}

function assemble(user)
{
    return {email: user.email, links: {self: "/api/users/" + user._id}};
}