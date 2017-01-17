'use strict';
var db = require('../db/cloudantDB.js')();
exports.index = function(req, res){
	res.render('index.html', { title: 'Managers\' Day BR'});
};
exports.signin = function(req, res){
	var user = req.query.user || '',
	_user = {},
	doc = {};
	user = user.split('&');
	for(var i = 0; i < user.length; i++) {
		var p = user[i].indexOf('='),
			name = user[i].substring(0,p),
			value = user[i].substring(p+1);
			_user[name] = value;
	}
	var query = {
		"selector": 
		{
			"email": decodeURIComponent(_user.inputEmail),
			"password": decodeURIComponent(_user.inputPassword)
		}
	};
	db.find(query, function(err, result) {
	    if(err) return res.json({data:0});
	    if(!err){
	    	console.log(result);
	    	if(result.docs.length >0){
	    		req.session.user = _user;
	    		if(result.docs[0].type == 'admin'){
	    			req.session.user.type = 'admin';
	    			return res.json({data:4});
	    		}else{
		    		doc._rev = result.docs[0]._rev;
			    	doc.username = _user.inputName;
			    	doc.email = decodeURIComponent(_user.inputEmail);
			    	doc.password = decodeURIComponent(_user.inputPassword);
			    	doc.jobtitle = _user.inputJobtitle;
			    	doc.location = _user.inputLocation;
			    	doc.confirm = _user.inputConfirm;
			    	doc.date = Date.now();
			    	db.insert(doc ,result.docs[0]._id , function(err, data) {
			    		if(err) return res.json({data:1});
			    		if(!err) return res.json({data:3});
			    	});
		    	}
		    }else{
		    	return res.json({data:2});
		    }
	    }
	});
};
exports.list = function(req, res){
	res.render('list.html', { title: 'Managers\' Day BR - List'});
}
exports.signinRequired = function(req,res,next) {
	var _user = req.session.user;
	if(!_user) {
		return res.redirect('/');
	}
	next();
};
exports.admin = function(req, res){
	var query = {
		"selector": 
		{
			"type": "user"
		}
	};
	db.find(query, function(err, result) {
		console.log(typeof(result.docs));
		if(!err){
			var list = [];
	    	list = result.docs;
	    	console.log(list.length);
	    	res.render('admin.html', { title: 'Managers\' Day BR Admin', list: list});
	    }
	});
};
exports.adminRequired = function(req,res,next) {
	var _user = req.session.user;
	if(!_user || _user.type !== 'admin') {
		return res.redirect('/');
	}
	next();
};