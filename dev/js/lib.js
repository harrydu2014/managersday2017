'use strict';
require("./../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("css/style.css");
require('./../../node_modules/bootstrap/dist/js/bootstrap.min');
var $ = require('./../../node_modules/jquery/dist/jquery.min');
$(function() {
	var signObject = {
		signIn: function(obj){
			console.log($(obj).serialize());
			$.ajax({
				url: '/signin',
				method: 'GET',
				data:{
					'user': $(obj).serialize()
				}
			}).done(function(results) {
				console.log(results.data);
				if(results.data == 3) window.location.href = '/list';
				switch (results.data){
					case 0:
						$('#myModal').modal('show');
						break;
					case 1:
						$('#myModal').modal('show');
						break;
					case 2:
						$('#myModal').modal('show');
						break;
					case 3: 
						window.location.href = '/list';
						break;
				}
			});
		},
		setValue: function(obj, value){
			$(obj).prop('value',value);
		}
	};
	$('.mdBR-home-YesBtn').bind('click',function(e){
		e.preventDefault();
		signObject.setValue('#inputConfirm','Y');
		signObject.signIn('#SigninForm');
		return false;
	});
	$('.mdBR-home-NoBtn').bind('click',function(e){
		e.preventDefault();
		signObject.setValue('#inputConfirm','N');
		$('#inputConfirm').setAttribute('value','N');
		signObject.signIn('#SigninForm');
		return false;
	});
});