window.ysp_path = "http://120.26.103.65:8081"; //接口地址

$(function() {
	var winHeight = $(window).height(),
		headHeight = $('.header').height(),
		scrollHeight = winHeight - headHeight;
	$('.wrap').height(winHeight);

	document.addEventListener('touchmove', function(event) {
		event.preventDefault();
	}, false);

	//匹配需求
	$('#match_submit').on('tap', function() {
		location.href = "succuss.html";
	});

	//返回上一页，返回主页
	$('.return-page-btn').on('tap', function() {
		history.go(-1);
	});
	$('.go-home-btn').on('tap', function() {
		location.href = "/yspApp/index.html";
	})

	$(document).on('tap', '[data-href]', function() {
		location.href = $(this).data('href');
	});

	//单选
	$('.radio').on('tap', '.radio-btn', function() {
		$(this).addClass('on').siblings('.radio-btn').removeClass('on');
	})
});

//关于mui的JS
mui.ready(function() {
	mui('.mui-scroll-wrapper').scroll({
		indicators: false,
		deceleration: 0.006
	});
});

//ajax封装
function ajaxFn(jsonObj) {
	var defaults = {
		type: 'GET',
		headers: {
			'content-type': 'application/json',
			'Authorization': window.ysp_token
		}
	};
	if(jsonObj.data) jsonObj.data = JSON.stringify(jsonObj.data);
	var setting = $.extend(true, {}, defaults, jsonObj);
	console.log(setting);
	$.ajax(setting);
};