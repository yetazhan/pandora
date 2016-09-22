/**
 * @author yetazhan
 */

(function(Pandora) {
	var _touchstart = (Pandora.isAndroid() ? 'touchstart' : 'mousedown'), 
	_touchmove = (Pandora.isAndroid() ? 'touchmove' : 'mousemove'), 
	_touchend = (Pandora.isAndroid() ? 'touchend' : 'mouseup');
	
	Pandora.fn.draggable = function(option) {
		option = option || {};
		
		var t = this[0];
		
		if(!t) {
			return;
		}

		var h = t.querySelectorAll('.handler'), isdrag = false, position = {
			startX : 0,
			startY : 0,
			endX : 0,
			endY : 0,
		}, dragstart = function(event) {
			isdrag = true;
			var touch = Pandora.isAndroid() ? event.changedTouches[0] : event;
			position.startX = touch.pageX;
			position.startY = touch.pageY;
			if(t.style.top) {
				position.endY = parseInt(t.style.top);
			}

			if(t.style.left) {
				position.endX = parseInt(t.style.left);
			}

			if(Pandora.isFunction(option.start)) {
				option.start(event, position,t);
			}
		}, drag = function(event) {
			event.preventDefault();
			if(!isdrag) {
				return;
			}
			var touch = Pandora.isAndroid() ? event.targetTouches[0] : event;

			var x = touch.pageX - position.startX + position.endX, y = touch.pageY - position.startY + position.endY;

			if(option.direct == 'y') {
				x = position.endX;
			}
			if(option.direct == 'x') {
				y = position.endY;
			}

			t.style.top = y + 'px';
			t.style.left = x + 'px';

			if(Pandora.isFunction(option.drag)) {
				option.drag(event, position,t);
			}
		}, dragend = function(event) {
			isdrag = false;
			if(option.resume == true) {
				t.style.top = position.endY + 'px';
				t.style.left = position.endX + 'px';
			} else {
				if(t.style.top) {
					position.endY = parseInt(t.style.top);
				}

				if(t.style.left) {
					position.endX = parseInt(t.style.left);
				}
			}

			if(Pandora.isFunction(option.end)) {
				option.end(event, position,t);
			}
		};
		if(!h || h.length == 0) {
			h = t;
		}

		if(Pandora.isArray(h)) {
			for(var i = 0; i < h.length; i++) {
				var elem = h[i];
				elem.addEventListener(_touchstart, dragstart, false);
				elem.addEventListener(_touchmove, drag, false);
				elem.addEventListener(_touchend, dragend, false);
			}
		} else {
			h.addEventListener(_touchstart, dragstart, false);
			h.addEventListener(_touchmove, drag, false);
			h.addEventListener(_touchend, dragend, false);
		}
	}
})($);
