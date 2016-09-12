$(function() {
	//注册
	$('#reg_submit_btn').on('touchend', function() {
		var userName = $('#reg_username').val(),
			passWord = $('#reg_password').val(),
			code = $('#reg_code').val(),
			invite = $('#reg_comd_code').val();

		ajaxFn({
			type: 'POST',
			url: window.ysp_path + '/api/users/register',
			data: {
				'mobile': userName,
				'password': passWord,
				'vcode': code,
				'inviter': parseInt(invite)
			},
			success: function(data) {
				console.log('注册成功');
			},
			error: function(data) {
				console.log(data);
			}
		});
	});

	//登录
	$('#login_btn').on('touchend', function() {
		var userName = $('#username').val(),
			passWord = $('#password').val();
		ajaxFn({
			type: "post",
			url: window.ysp_path + "/api/users/login",
			data: {
				'username': userName,
				'password': passWord
			},
			success: function(data) {
				alert('登录成功');
				window.sessionStorage.setItem("ysp_uid",data.accessToken);
				window.location.replace('member.html');
			},
			error: function(data) {
				alert('登录失败');
				console.log(data);
			}
		})
	})
})