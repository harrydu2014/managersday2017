'use strict';
var dbCredentials = {
	'dbName': 'md_users'
},
cloudant,
db;
//initialize CloudantDB
function initDBConnection() {
    if (process.env.VCAP_SERVICES) {
        var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
        for (var vcapService in vcapServices) {
            if (vcapService.match(/cloudant/i)) {
                dbCredentials.url = vcapServices[vcapService][0].credentials.url;
            }
        }
    } else {
        //dbCredentials.url = process.env.CLOUDANT_URL;
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

module.exports = function(app){
	// app.use(function(req,res,next){
	// 	app.locals.user = req.session.user;
	// });
	app.get('/', function(req, res){
		res.render('index.html', { title: 'Managers\' Day BR'});
	});
	app.post('/signin', function(req, res){
		var doc = {};
		doc.username = req.body.inputName;
		doc.email = req.body.inputEmail;
		doc.password = req.body.inputPassword;
		doc.jobtitle = req.body.inputJobtitle;
		doc.location = req.body.inputLocation;
		var query = {
			"selector": 
			{
				"email": req.body.inputEmail,
				"password": req.body.inputPassword
			}
		};
		db.find(query, function(err, result) {
		    console.log("Error:", err);
		    console.log("Data:", result);
		    if(result.docs.length >0 && !err){
		    	doc._rev = result.docs[0]._rev;
		    	db.insert(doc ,result.docs[0]._id , function(err, data) {
		    		console.log("Insert Error:", err);
		    		console.log("Insert Data:", result);
		    	});
		    	res.redirect('/list');
		    }else{
		    	res.send({msg:'Permission denied',status: 0});
		    }
		});
	});
	app.get('/list', function(req, res){
		res.render('list.html', { title: 'Managers\' Day BR - List'});
	});
}