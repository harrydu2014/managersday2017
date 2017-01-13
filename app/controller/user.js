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
			"password": _user.inputPassword
		}
	};
	db.find(query, function(err, result) {
	    if(err) return res.json({data:0});
	    if(!err){
	    	if(result.docs.length >0){
	    		req.session.user = _user;
	    		console.log(req.session.user);
	    		doc._rev = result.docs[0]._rev;
		    	doc.username = _user.inputName;
		    	doc.email = decodeURIComponent(_user.inputEmail);
		    	doc.password = _user.inputPassword;
		    	doc.jobtitle = _user.inputJobtitle;
		    	doc.location = _user.inputLocation;
		    	doc.confirm = _user.inputConfirm;
		    	doc.date = Date.now();
		    	db.insert(doc ,result.docs[0]._id , function(err, data) {
		    		if(err) return res.json({data:1});
		    		if(!err) return res.json({data:3});
		    	});
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
	console.log(req.session);
	if(!_user) {
		return res.redirect('/');
	}
	next();
};