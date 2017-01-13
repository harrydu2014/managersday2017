'use strict';
var User = require('../app/controller/user.js');
module.exports = function(app){
	app.use(function(req,res,next){
		app.locals.user = req.session.user;
		next();
	});
	app.get('/', User.index);
	app.get('/signin', User.signin);
	app.get('/list', User.signinRequired, User.list);
}