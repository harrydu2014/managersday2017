'use strict';
require("./../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("css/home.css");
require('./../../node_modules/bootstrap/dist/js/bootstrap.min');
var $ = require('./../../node_modules/jquery/dist/jquery.min');

$('.md-form-signin').submit(function(e){
	e.preventDefault();
	console.log('HarryTest');
	return false;
});