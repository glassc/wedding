var passport = require('passport');
var GooglePassportStrategy = require("passport-google").Strategy;
var config = require("../config");
var db = require('../lib/connection');



module.exports.enable = function(app)
{
    passport.use(CreateStrategy());
    app.use(passport.initialize());
    app.use(passport.session());
    app.get("/auth/google", passport.authenticate('google', { failureRedirect: '/admin/login', failureFlash: true}));
    app.get("/auth/authenticated", passport.authenticate('google', { successRedirect: '/admin', failureRedirect: '/admin/login', failureFlash: true }));
};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



function VerifyUser(identifier, profile, done) { 
    var email = profile.emails[0].value;
    
    db.collection("users").findOne({email:email}, function(err, user) {
        if( user === null )
        {
            return done(null, false, {message: "Not a valid user"});
        } else {
           profile.indentifier = identifier;
           return done(null, profile);    
        }
    });
  
    
}

function CreateStrategy()
{
     return new GooglePassportStrategy(
        {
            returnURL: config['DOMAIN'] + "/auth/authenticated",
            realm: config['DOMAIN'],
            profile: true
        }, VerifyUser
    );
}

module.exports.required = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/admin/login');

};