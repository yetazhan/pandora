/**
 * @author yetazhan
 * Pandora JavaScript Library v1.0.0
 *
 *
 * Copyright 2012, Next
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://PandoraJS.org/license
 *
 * Copyright 2012, The TCR Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 *
 */

(function(window,undefined){
	var document = window.document,
	navigator = window.navigator,
	location = window.location;
	
	var Pandora = window.$ = (function() {
		var Pandora = function(selector) {
			return new Pandora.fn.init(selector);
		},
		// A simple way to check for HTML strings or ID strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
		// Keep a UserAgent string for use with jQuery.browser
		userAgent = navigator.userAgent,

		// Useragent RegExp
		rwebkit = /(webkit)[ \/]([\w.]+)/,
		ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
		rmsie = /(msie) ([\w.]+)/,
		rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

		// Save a reference to some core methods
		toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty,
		push = Array.prototype.push,
		slice = Array.prototype.slice,
		trim = String.prototype.trim,
		indexOf = Array.prototype.indexOf,
		class2type = {};
		
		Pandora.fn = Pandora.prototype = {
			constructor : Pandora,
			init : function(selector) {
				// Handle $(""), $(null), or $(undefined)
				if(!selector) {
					return this;
				}
				
				// Handle $(DOMElement)
				if(selector.nodeType) {
					this.context = this[0] = selector;
					this.length = 1;
					return this;
				}
				
				// Handle HTML strings,
				if( typeof selector === "string") {
					// Are we dealing with HTML string or an ID?
					if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
						// Assume that strings that start and end with <> are HTML and skip the regex check
						match = [ null, selector, null ];
					} else {
						match = quickExpr.exec( selector );
					}
					
					// Verify a match, and that no context was specified for #id
					if(match) {
						// HANDLE: $(html) -> $(array)
						if(match[1]) {
							//TODO
							return this;
						} else {
							// HANDLE: $("#id")
							elem = document.getElementById(match[2]);

							if(elem && elem.parentNode) {
								// Otherwise, we inject the element directly into the Pandora object
								this.length = 1;
								this[0] = elem;
							}
							return this;
						}
					} else {
						elem = document.querySelectorAll(selector);
						if(elem) {
							this.length = elem.length;
						}
						this[0] = elem;
						return this;
					}
				}
				
				if ( Pandora.isFunction( selector ) ) {
					window.addEventListener('load',selector); //FF & Chrome & Opera support
					return this;
				}
			}
		};
		
		Pandora.fn.init.prototype = Pandora.fn;
		
		Pandora.extend = Pandora.fn.extend = function() {
			var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;

			// Handle a deep copy situation
			if( typeof target === "boolean") {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if( typeof target !== "object" && !Pandora.isFunction(target)) {
				target = {};
			}

			// extend Pandora itself if only one argument is passed
			if(length === i) {
				target = this; --i;
			}

			for(; i < length; i++) {
				// Only deal with non-null/undefined values
				if(( options = arguments[i]) != null) {
					// Extend the base object
					for(name in options ) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if(target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if(deep && copy && (Pandora.isPlainObject(copy) || ( copyIsArray = Pandora.isArray(copy)) )) {
							if(copyIsArray) {
								copyIsArray = false;
								clone = src && Pandora.isArray(src) ? src : [];

							} else {
								clone = src && Pandora.isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = Pandora.extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if(copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		};
		
		Pandora.extend({
			isFunction : function(obj) {
				return Pandora.type(obj) === "function";
			},
			isArray : Array.isArray ||
			function(obj) {
				return Pandora.type(obj) === "array";
			},
			isAndroid : function(){
				return (userAgent.toLowerCase().indexOf('android') >= 0);
			},
			isIPhone : function(){
				return (userAgent.toLowerCase().indexOf('iphone') >= 0);
			},
			isIPad : function(){
				return (userAgent.toLowerCase().indexOf('ipad') >= 0);
			},
			// A crude way of determining if an object is a window
			isWindow : function(obj) {
				return obj && typeof obj === "object" && "setInterval" in obj;
			},
			type : function(obj) {
				return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
			},
			each : function(object, callback, args) {
				var name, i = 0, length = object.length, isObj = length === undefined || Pandora.isFunction(object);

				if(args) {
					if(isObj) {
						for(name in object ) {
							if(callback.apply(object[name], args) === false) {
								break;
							}
						}
					} else {
						for(; i < length; ) {
							if(callback.apply(object[i++], args) === false) {
								break;
							}
						}
					}

					// A special, fast, case for the most common use of each
				} else {
					if(isObj) {
						for(name in object ) {
							if(callback.call(object[name], name, object[name]) === false) {
								break;
							}
						}
					} else {
						for(; i < length; ) {
							if(callback.call(object[i], i, object[i++]) === false) {
								break;
							}
						}
					}
				}

				return object;
			},
			js : function(urls,fn){
				if(urls){
					urls = typeof urls === 'string' ? [urls] : urls.concat();
					
					for(var i=0;i<urls.length;i++){
						var elem = document.createElement('script');
						if(i==urls.length-1&& Pandora.isFunction(fn)) elem.onload = elem.onerror = fn;
						elem.async = false;
						elem.setAttribute('src',urls[i]);
						elem.setAttribute('type','text/javascript');
						Pandora.first('head').appendChild(elem);
					}
				}
			},
			first : function(selector){
				if(typeof selector == 'string'){
					return document.querySelector(selector);
				}
			},
			all : function(selector){
				if(typeof selector == 'string'){
					return document.querySelectorAll(selector);
				}
			}
		});

		Pandora.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		});
		
		return Pandora;
	})();
})(window,undefined);
