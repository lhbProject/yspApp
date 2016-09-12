//个人中心
var member = {
	init: function() {
		this.elements();
		this.events();
	},
	elements: function() {
		this.nickname = $('#nickName');
	},
	events: function() {
		var _this = this
		ajaxFn({
			url: window.ysp_path + '/api/users/current',
			success: function(data) {
				_this.nickname.text(data.nickname);
			},
			error: function(data) {
				console.log(data)
			}
		});
	}
};
//修改头像
var edit_photo = {
	init: function() {
		this.elements();
		this.editEvent();
		this.changeEvent();
	},
	elements: function() {
		this.nickName = $('#nickName');
		this.photo = $('#user_photo_img');
		this.btn = $('#edit_photo_btn');
		this.user_photo_img = document.getElementById('user_photo_img');
		this.user_photo_path = document.getElementById('user_photo_path');
	},
	editEvent: function() {
		var _this = this;
		ajaxFn({
			url: window.ysp_path + '/api/users/current',
			success: function(data) {
				_this.nickName.text(data.nickname);
				_this.photo.val(data.avatar);
			},
			error: function(data) {
				console.log(data)
			}
		});

		_this.btn.on('singleTap', function() {
			ajaxFn({
				type: "put",
				url: window.ysp_path + '/api/users/current',
				data: {
					'avatar': _this.photo.val(),
					'nickname': _this.nickName.val()
				},
				success: function(data) {
					alert('修改用户昵称成功')
					console.log(data);
				},
				error: function(data) {
					console.log(data)
				}
			});
		})
	},
	changeEvent: function() {
		var _this = this,
			img_path = null;

		_this.user_photo_img.addEventListener('touchend', function() {
			_this.user_photo_path.click();
		});
		_this.user_photo_path.addEventListener('change', function() {
			_this.user_photo_img.src = _this.value;
		});
	}
};
//修改昵称
var edit_nickname = {
	init: function() {
		this.elements();
		this.editEvent();
	},
	elements: function() {
		this.nickName = $('#nickName');
		this.photo = $('#userPhoto');
		this.btn = $('#edit_name_btn');
	},
	editEvent: function() {
		var _this = this
		ajaxFn({
			url: window.ysp_path + '/api/users/current',
			success: function(data) {
				_this.nickName.val(data.nickname);
				_this.photo.val(data.avatar);
			},
			error: function(data) {
				console.log(data)
			}
		});

		_this.btn.on('singleTap', function() {
			ajaxFn({
				type: "put",
				url: window.ysp_path + '/api/users/current',
				data: {
					'avatar': _this.photo.val(),
					'nickname': _this.nickName.val()
				},
				success: function(data) {
					alert('修改用户昵称成功')
					console.log(data);
				},
				error: function(data) {
					console.log(data)
				}
			});
		})
	}
};
//修改密码
var edit_password = {
	init: function() {
		this.elements();
		this.editEvent();
	},
	elements: function() {
		this.oldPwd = $('#old_password');
		this.newPwd = $('#new_password');
		this.newPwd1 = $('#new_password_1');
		this.btn = $('#edit_pwd_btn');
	},
	editEvent: function() {
		var _this = this;
		this.btn.on('singleTap', function() {
			var old_val = _this.oldPwd.val(),
				new_val = _this.newPwd.val(),
				new_val1 = _this.newPwd1.val();
			if(old_val == "") {
				alert("请输入原密码");
				_this.oldPwd.focus();
			} else if(new_val == "") {
				alert("请输入新密码");
				_this.newPwd.focus();
			} else {
				if(old_val != new_val) {
//					console.log(new_val + ',' + new_val1);
					if(new_val == new_val1) {
						ajaxFn({
							type: 'PUT',
							url: window.ysp_path + "/api/users/current/password",
							data: {
								'old': old_val,
								'new': new_val
							},
							success: function(data) {
								console.log(data);
							},
							error: function(data) {
								console.log(data);
							}
						})

					} else {
						alert("新密码2次输入不一致");
					}

				} else {
					alert("新密码不能与原密码一致");
				}
			}

		})
	}
};
//找回密码
var forgot_password = {
	init: function() {
		this.elements();
		this.events();
		this.getCode();
	},
	elements: function() {
		this.mobile = $('#forget_mobile');
		this.password = $('#forget_password');
		this.vcode = $('#forget_vcode');
		this.codeBtn = $('#get_code');
	},
	events: function() {
		var _this = this;
		$('#forget_save_btn').on('singleTap', function() {
			ajaxFn({
				type: "PUT",
				url: window.ysp_path + "/api/users/forget",
				data: {
					"mobile": _this.mobile.val(),
					"vcode": _this.vcode.val(),
					"password": _this.password.val()
				},
				success: function(data) {
					console.log(data)
				},
				error: function(data) {
					console.log(data)
				}
			})
		})
	},
	getCode: function() {
		var _this = this;
		this.codeBtn.on('singleTap', function() {
			vcodeFn(_this.mobile.val())
		})
	}
};
//获取短信验证码
function vcodeFn(mobileVal) {
	alert(1)
	$.ajax({
		type: "POST",
		url: window.ysp_path + "/api/sms",
		contentType: 'application/json',
		data: JSON.stringify({
			"mobile": mobileVal
		}),
		success: function(data) {
			console.log(data)
		},
		error: function(data) {
			console.log(data)
		}
	});
};