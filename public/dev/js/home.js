'use strict';
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
						$('#md-Modal').modal('show');
						$('#md-Modal .modal-body').html('Sorry, there\'re something wrong :-(<br/>Please try again.');
						break;
					case 1:
						$('#md-Modal').modal('show');
						$('#md-Modal .modal-body').html('Sorry, can\' update your profile in the list. :-(<br/>Please try again.');
						break;
					case 2:
						$('#md-Modal').modal('show');
						$('#md-Modal .modal-body').html('Sorry, you\'re not in the list. :-(<br/>Please check your email and password.');
						break;
					case 3: 
						window.location.href = '/list';
						break;
					case 4: 
						debugger;window.location.href = '/admin';
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