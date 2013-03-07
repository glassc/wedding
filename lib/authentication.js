var passport = require('passport');
var GooglePassportStrategy = require("passport-google").Strategy;
var config = require("../config");



module.exports.enable = function(app)
{
    passport.use(CreateStrategy());
    app.use(passport.initialize());
    app.use(passport.session());
    app.get("/auth/google", passport.authenticate('google', { failureRedirect: '/admin/login'}));
    app.get("/auth/authenticated", passport.authenticate('google', { successRedirect: '/admin', failureRedirect: '/login' }));
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});



function VerifyUser(identifier, profile, done) {
     profile.indentifier = identifier;
     done(null, profile);
}

function CreateStrategy()
{
     return new GooglePassportStrategy(
        {
            returnURL: config.domain + "/auth/authenticated",
            realm: config.domain,
            profile: true
        }, VerifyUser
    );
}

module.exports.required = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/admin/login')
}