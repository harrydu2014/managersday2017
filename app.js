'use strict';

var express = require('express'),
    routes = require('./routes/index'),
    list = require('./routes/list'),
    session = require('express-session'),
    path = require('path'),
	cfenv = require('cfenv'),
	CloudantStore = require('connect-cloudant')(session),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	logger = require('morgan'),
	errorHandler = require('errorhandler'),
	multipart = require('connect-multiparty'),
	multipartMiddleware = multipart();
	app = express(),
	db,
	cloudant,
	fileToUpload,
	dbCredentials = {
    	dbName: 'md_users'
	};


app.set('views', __dirname + '/views');
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
}
// initialize CloudantDB
function initDBConnection() {
    if (process.env.VCAP_SERVICES) {
        var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
        for (var vcapService in vcapServices) {
            if (vcapService.match(/cloudant/i)) {
                dbCredentials.url = vcapServices[vcapService][0].credentials.url;
            }
        }
    } else {
        dbCredentials.url = "https://cedcfb63-fa41-4162-94b2-b24503eea99f-bluemix:a04392a3f712b7a501845c1e03eb802f8a2949466d81e31533af99b29970e24e@cedcfb63-fa41-4162-94b2-b24503eea99f-bluemix.cloudant.com";
    }
    cloudant = require('cloudant')(dbCredentials.url);
    cloudant.db.create(dbCredentials.dbName, function(err, res) {
        if (err) {
            console.log('Could not create new db: ' + dbCredentials.dbName + ', it might already exist.');
        }
    });
    db = cloudant.use(dbCredentials.dbName);
}

initDBConnection();

// initialize express session
var cloudantStore = new CloudantStore({
	url: dbCredentials.url,
	databaseName: dbCredentials.dbName
});
app.use(session({
	secret: 'managersdayBR',
	resave: false,
	saveUninitialized: true,
    store: cloudantStore,
    cookie: {maxAge:24*60*60*1000}
}));

app.use('/', routes);
app.use('/list', list);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
