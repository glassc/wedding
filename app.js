var flash = require('connect-flash');
var express = require('express');
var app = express();
var authentication = require('./lib/authentication');
var config = require("./config");


app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: "la la la"}));
app.use(flash());


authentication.enable(app);

app.all("/api/*", authentication.required);

require("./admin")(app, authentication);
require("./pages")(app);
require('./users')(app);
require("./images")(app);
console.log(config);
app.listen(config.PORT);