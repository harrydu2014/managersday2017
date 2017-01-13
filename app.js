'use strict';

var express = require('express'),
    session = require('express-session'),
    path = require('path'),
	cfenv = require('cfenv'),
	CloudantStore = require('connect-cloudant')(session),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	logger = require('morgan'),
	errorHandler = require('errorhandler'),
	//multipart = require('connect-multiparty'),
	//multipartMiddleware = multipart(),
	config = require('./config.json'),
	app = express();

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorHandler());
    app.locals.pretty = true;
}

//initialize express session
var cloudantStore = new CloudantStore({
	url: config.cloudantURL,
	databaseName: 'sessions'
});
app.use(session({
	secret: 'cloudant',
	resave: false,
	saveUninitialized: true,
    store: cloudantStore,
    cookie: {maxAge:24*60*60*1000}
}));

require('./routes/router')(app);
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
