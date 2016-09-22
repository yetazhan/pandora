/**
 * @author yetazhan
 */

(function(Pandora) {
	var _touchstart = (Pandora.isAndroid() ? 'touchstart' : 'mousedown'), _touchmove = (Pandora.isAndroid() ? 'touchmove' : 'mousemove'), _touchend = (Pandora.isAndroid() ? 'touchend' : 'mouseup'), _bindEvent = function(elem, e, fn) {
		if(e == 'tap') {
			var point = {
				startX : 0,
				startY : 0,
				x : 0,
				y : 0,
			};

			elem.addEventListener(_touchstart, function(event) {
				var target = Pandora.isAndroid() ? event.changedTouches[0] : event;
				point.startX = target.pageX;
				point.startY = target.pageY;
				point.x = point.startX;
				point.y = point.startY;
			});

			elem.addEventListener(_touchmove, function(event) {
				event.preventDefault();
				var target = Pandora.isAndroid() ? event.targetTouches[0] : event;
				point.x = target.pageX;
				point.y = target.pageY;
			});

			elem.addEventListener(_touchend, function(event) {
				if(point.startX == point.x && point.startY == point.y) {
					fn(event, elem);
				}
			});
		} else if(e == 'longtap') {
			var point = {
				startX : 0,
				startY : 0,
				x : 0,
				y : 0,
			}, isEnd = false;

			elem.addEventListener(_touchstart, function(event) {
				isEnd = false;
				var target = Pandora.isAndroid() ? event.changedTouches[0] : event;
				point.startX = target.pageX;
				point.startY = target.pageY;
				point.x = point.startX;
				point.y = point.startY;

				setTimeout(function(event) {
					if(isEnd) {
						return;
					}
					if(point.startX == point.x && point.startY == point.y) {
						fn(event, elem);
					}
				}, 500);
			});
			elem.addEventListener(_touchmove, function(event) {
				event.preventDefault();
				var target = Pandora.isAndroid() ? event.targetTouches[0] : event;
				point.x = target.pageX;
				point.y = target.pageY;
			});
			elem.addEventListener(_touchend, function(event) {
				isEnd = true;
			});
		} else {
			elem.addEventListener(e, fn, false);
		}
	};
	Pandora.fn.bind = function(e, fn) {
		var elem = this[0];
		if(elem) {
			if(Pandora.isArray(elem)) {
				for(var i = 0; i < elem.length; i++) {
					_bindEvent(elem, e, fn);
				}
			} else {
				_bindEvent(elem, e, fn);
			}
		}
	}
})($);
