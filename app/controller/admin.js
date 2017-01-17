'use strict';
var db = require('../db/cloudantDB.js')();
exports.index = function(req, res){
	res.render('admin.html', { title: 'Managers\' Day BR Admin'});
};