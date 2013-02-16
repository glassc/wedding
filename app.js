var express = require('express');
var app = express();
var admin = require('./controllers/admin');

var authentication = require('./lib/authentication');

app.set('views', __dirname + '/views');
app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: "la la la"}));
app.use(express.static('./content/', { maxAge: 1 }));

//authentication.enable(app);

require("./pages")(app);
require('./users')(app);
require("./images")(app);

// API
//app.all("/api/*", authentication.required);




// ADMIN
app.get("/admin/login", admin.login);
//app.all("/admin/*", authentication.required);
app.get("/admin", admin.index);


app.listen(process.env.PORT);