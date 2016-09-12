var slider = {
	index: 0,
	startPos: {
		'x': 0,
		'y': 0
	},
	elements: function() {
		this.banner = document.getElementById('banner');
		this.bannerView = $('.banner-view');
	},
	events: function() {
		var _this = this;
		this.banner.addEventListener('touchstart', function(ev) {
			_this.start(ev, _this)
		});
	},
	start: function(ev, _this) {
		clearInterval(_this.timer)
		startPos = {
			'x': ev.targetTouches[0].pageX,
			'y': ev.targetTouches[0].pageY,
			'p': _this.bannerView.position().left
		};
		disPos = {};
		_this.banner.addEventListener('touchmove', _this.moveFn = function(ev) {
			_this.move(ev);
		});
		_this.banner.addEventListener('touchend', _this.endFn = function(ev) {
			_this.end(ev);
		});
	},
	move: function(ev) {
		disPos = {
			'x': ev.targetTouches[0].pageX - startPos.x,
			'y': ev.targetTouches[0].pageY - startPos.y
		};
		if(Math.abs(disPos.x) > Math.abs(disPos.y)) this.bannerView.css('left', startPos.p + disPos.x);
	},
	end: function(ev) {
		var _this = this,
			posL = this.bannerView.position().left,
			img = this.bannerView.find('.img'),
			l = img.width() * (img.length - 1),
			targetImg = ev.target.parentNode,
			dir = disPos.x - startPos.x > 0 ? 1 : 0,
			imgL = $(targetImg).position().left,
			sliderBtn = Math.abs(startPos.p - posL) > $(window).width()/2 ? 1 : 0;

		if(dir == 1) {
			if(posL > 0) {
				_this.Animate(_this, 0);
			} else {
				if(sliderBtn) {
					_this.index -= 1;
				}
				_this.Animate(_this, -img.width() * _this.index);
				
			}
		} else {
			if(posL < -l) {
				_this.Animate(_this, -l);
			} else {
				if(sliderBtn) {
					_this.index += 1;
				}
				_this.Animate(_this, -img.width() * _this.index)
			};
		}

		this.banner.removeEventListener('touchmove', _this.moveFn);
		this.banner.removeEventListener('touchend', _this.endFn);
	},
	Animate: function(_this, target) {
		var speed = 0,
			curP = 0;

		_this.timer = setInterval(function() {
			curP = _this.bannerView.position().left
			speed = (target - curP) / 12;
			_this.bannerView.css('left', curP + speed);

			if(Math.abs(target - curP) < 1) {
				_this.bannerView.css('left', target);
				clearInterval(_this.timer)
			}
		}, 12)
	},
	init: function() {
		this.elements();
		this.events();
	}
}

$(function() {
	slider.init()
})