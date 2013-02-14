var passport = require('passport');
var GooglePassportStrategy = require("passport-google").Strategy;



module.exports.enable = function(app)
{
    passport.use(CreateStrategy());
    app.get("/auth/google", passport.authenticate('google', { failureRedirect: '/admin/login', session: false }));
    app.get("/auth/authenticated", passport.authenticate('google', { failureRedirect: '/login', session: false  }));
    app.use(passport.initialize());
    app.use(passport.session());
}

function VerifyUser(identifier, profile, done) {
     profile.indentifier = identifier;
     done(null, profile);
}

function CreateStrategy()
{
     return new GooglePassportStrategy(
        {
            returnURL: "http://wedding.glassc.c9.io/auth/authenticated",
            realm: "http://wedding.glassc.c9.io",
            profile: true
        }, VerifyUser
    );
}

module.exports.required = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/admin/login')
}