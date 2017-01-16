'use strict';
var User = require('../app/controller/user.js');
module.exports = function(app){
	app.use(function(req,res,next){
		app.locals.user = req.session.user;
		next();
	});
	//User routes
	app.get('/', User.index);
	app.get('/signin', User.signin);
	app.get('/list', User.signinRequired, User.list);
	//Admin routes
	app.get('/admin', User.adminRequired, User.admin);
	//app.get('/admin', User.admin);
}