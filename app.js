var express = require('express');
var app = express();
var home = require('./controllers/home');
var images = require('./controllers/images');
var admin = require('./controllers/admin');

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
var users = require('./users')(app);

// API
//app.all("/api/*", authentication.required);
app.get("/api/images", images.index);
app.post("/api/images", images.insert);



// ADMIN
app.get("/admin/login", admin.login);
//app.all("/admin/*", authentication.required);
app.get("/admin", admin.index);

// FRONT
app.get("/", home.index);
app.get("/:slug", home.index);

app.listen(process.env.PORT)