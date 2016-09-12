if(window.sessionStorage.getItem('ysp_uid')) {
//	window.sessionStorage.clear()
	window.ysp_token = window.sessionStorage.getItem('ysp_uid')
} else {
	location.replace('/yspApp/user/unlogin.html')
}