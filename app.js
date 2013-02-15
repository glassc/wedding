var express = require('express');
var app = express();
var home = require('./controllers/home');
var images = require('./controllers/images');
var admin = require('./controllers/admin');
var users = require('./controllers/users');
var authentication = require('./lib/authentication');

app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: "la la la"}));
app.use(express.static(__dirname + '/content', { maxAge: 1 }));
//authentication.enable(app);

var pages = require("./pages")(app);

// API
//app.all("/api/*", authentication.required);
app.get("/api/images", images.index);
app.post("/api/images", images.insert);
app.post("/api/users", users.insert);
app.get("/api/users", users.index);
app.delete("/api/users/:user", users.destroy);


// ADMIN
app.get("/admin/login", admin.login);
//app.all("/admin/*", authentication.required);
app.get("/admin", admin.index);
app.get("/admin/users", users.show);

// FRONT
app.get("/", home.index);
app.get("/:slug", home.index);

app.listen(process.env.PORT)