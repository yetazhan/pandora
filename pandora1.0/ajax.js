/**
 * @author yetazhan
 */
$.extend({
	ajax : function(options) {
		// Force options to be an object
		options = options || {};

		var xhr = new XMLHttpRequest(), 
		url = options.url, 
		data = options.data, 
		method = options.method || "GET", 
		type = options.type? options.type.toLowerCase() : "text", 
		success = options.success ||function() {}, 
		error = options.error ||function(msg) {
			throw msg;
		},
		status = 0,
		timeout = options.timeout || 15000;

		var parameters = "";

		if(data) {
			for(var m in data) {
				var param = data[m];
				if($.isArray(param)) {
					for(var i = 0; i < param.length; i++) {
						parameters += m + '=' + param[i] + "&";
					}
				} else {
					parameters += m + '=' + param + "&";
				}
			}
		}

		if(method === "GET" && parameters)
			url += '?' + parameters;

		xhr.open(method, url, true);

		var timeoutHandler = setTimeout(function(){
			if(status == 0)
			xhr.abort();
		},timeout);
		
		if(method == "POST") {
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("Content-length", parameters.length);
			xhr.setRequestHeader("Connection", "close");
		}

		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				status = 4;
				clearTimeout(timeoutHandler);
				if(xhr.status == 200) {
					try {
						var result = xhr.responseText;
						if(result) {
							if(type === 'json') {
								success(JSON.parse(result));
							}else if(type === 'xml'){
								var xml, tmp;
								if ( window.DOMParser ) {
									tmp = new DOMParser();
									xml = tmp.parseFromString( data , "text/xml" );
								}else{
									error('can not parse xml');
								}
								if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
									error( "Invalid XML: " + result );
								}
								success(xml);
							}else{
								success(result);
							}
						}
					} catch (e) {
						error(e);
					}
				} else {
					error(xhr.status)
				}
			}
		};
		try {
			xhr.send(parameters);
		} catch (e) {
			error(e);
		}
	},
});
