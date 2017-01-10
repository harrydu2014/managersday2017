'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('list.html', { title: 'Managers\' Day BR - List'});
});

module.exports = router;