/**
 * @author yetazhan
 */
 
(function(Pandora) {
	Pandora.fn.list = function(option) {
		option = option || {};

		var dom = this[0], flag = option.flag || 0, height = option.height, items = option.items,startTop = 0/*,startTimestamp = 0,endTimestamp = 0*/;

		if(!height) {
			return;
		}

		if(!dom) {
			return;
		}

		dom.addEventListener('webkitTransitionEnd', function() {
			dom.style.webkitTransition = '';
		});
		
		if(Pandora.isArray(dom)) {
			for(var i = 0; i < dom.length; i++) {
				Pandora(dom[i]).list(option);
			}
		} else {
			this.draggable({
				direct : 'y',
				start : function(event, position){
					event.stopPropagation();
					startTop = position.endY;
				},
				drag : function(event, position){
					event.stopPropagation();
				},
				end : function(event, position) {
					event.stopPropagation();
					if(position.endY > 0) {
						position.endY = 0;
						dom.style.webkitTransition = 'top 0.3s ease-in-out';

						setTimeout(function() {
							dom.style.top = flag + 'px';
						}, 100);
					} else if(position.endY < -height) {
						position.endY = -height;
						dom.style.webkitTransition = 'top 0.3s ease-in-out';
						setTimeout(function() {
							dom.style.top = '-' + height + 'px';
						}, 100);
					} /*else if(position.endY - startTop > 0) {
						position.endY = (position.endY + 200 > flag) ? flag : (position.endY + 200);

						dom.style.webkitTransition = 'top 0.3s ease-in-out';
						setTimeout(function() {
							dom.style.top = position.endY + 'px';
						}, 50);
					} else if(position.endY - startTop < 0) {
						position.endY = (position.endY - 200 < -height) ? -height : (position.endY - 200);

						dom.style.webkitTransition = 'top 0.3s ease-in-out';

						setTimeout(function() {
							dom.style.top = position.endY + 'px';
						}, 50);
					}*/
				}
			});

			if(items && Pandora.isFunction(option.ontap)) {
				items = dom.querySelectorAll(items);
				for(var i = 0; i < items.length; i++) {
					Pandora(items[i]).bind('tap', option.ontap);
				}
			}
		}
	}
})($);
