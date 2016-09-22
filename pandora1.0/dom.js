/**
 * @author yetazhan
 */
(function(Pandora) {
	Pandora.fn.show = function() {
		if(!this[0]) {
			return;
		}
		if(Pandora.isArray(this[0])) {
			var elems = this[0];
			for(var i = 0; i < elems.length; i++) {
				Pandora(elems[i]).show();
			}
		} else {
			this[0].style.display = 'block';
		}
	};
	Pandora.fn.hide = function() {
		if(!this[0]) {
			return;
		}
		if(Pandora.isArray(this[0])) {
			var elems = this[0];
			for(var i = 0; i < elems.length; i++) {
				Pandora(elems[i]).hide();
			}
		} else {
			this[0].style.display = 'none';
		}
	};

	Pandora.fn.css = function(name, value) {
		if(name && value && this[0]) {
			if(Pandora.isArray(this[0])) {
				var elems = this[0];
				for(var i = 0; i < elems.length; i++) {
					Pandora(elems[i]).css(name, value);
				}
			} else {
				this[0].style[name] = value;
			}
		}
	};

	Pandora.fn.addClass = function(name) {
		if(!this[0]) {
			return;
		}

		if(Pandora.isArray(this[0])) {
			var elems = this[0];
			for(var i = 0; i < elems.length; i++) {
				Pandora(elems[i]).addClass(name);
			}
		} else {
			var el = this[0].classList;
			el.add(name);
		}
	};

	Pandora.fn.removeClass = function(name) {
		if(!this[0]) {
			return;
		}

		if(Pandora.isArray(this[0])) {
			var elems = this[0];
			for(var i = 0; i < elems.length; i++) {
				Pandora(elems[i]).removeClass(name);
			}
		} else {
			var el = this[0].classList;
			el.remove(name);
		}
	};

	Pandora.fn.toggleClass = function(name) {
		if(!this[0]) {
			return;
		}

		if(Pandora.isArray(this[0])) {
			var elems = this[0];
			for(var i = 0; i < elems.length; i++) {
				Pandora(elems[i]).toggleClass(name);
			}
		} else {
			var el = this[0].classList;
			el.toggle(name);
		}
	};

	Pandora.fn.hasClass = function(name, value) {
		if(!this[0]) {
			return;
		}
		if(!Pandora.isArray(this[0])) {
			var el = this[0].classList;
			return el.contains(name);
		}
	};
	
	Pandora.fn.html = function() {
		if(!this[0]) {
			return;
		}
		var value = arguments[0];
		if(!Pandora.isArray(this[0])) {
			if(value!=undefined){
				this[0].innerHTML = value;
			}else{
				return 	this[0].innerHTML;
			}			
		}
	};
	
	Pandora.fn.append = function(html){
		if(!this[0] || !html) {
			return;
		}
		
		if(typeof html == 'string'){
			var node = document.createElement("div");
			node.innerHTML = html;
			var childs = node.childNodes;
			for(var i=0;i<childs.length;i++){
				this.append(childs[i]);
			}
		}else{
			this[0].appendChild(html);
		}
	};
	
	Pandora.fn.remove = function(){
		if(!this[0]){
			return;
		}
		
		this[0].parentNode.removeChild(this[0]);
	}
})($);
