var express = require('express');
var app = express();

var authentication = require('./lib/authentication');


app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret: "la la la"}));


//authentication.enable(app);
require("./admin")(app);
require("./pages")(app);
require('./users')(app);
require("./images")(app);

// API
//app.all("/api/*", authentication.required);




// ADMIN



app.listen(process.env.PORT);