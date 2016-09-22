/**
 * @author yetazhan
 */
(function(Pandora){
	Pandora.fn.slide = function(option){
		option = option || {};
		
		var elem = this[0],type = option.type,position = option.position,positionArray = option.positionArray || {
			left:'translateX(-100%)',
			right:'translateX(100%)',
			top:'translateY(-100%)',
			bottom:'translateY(100%)'
		};
		
		if(!type || !position || !elem){
			return;
		}
		type = type.toLowerCase();
		position = position.toLowerCase();
		
		if(elem){
			if(Pandora.isArray(elem)){
				for(var i=0;i<elem.length;i++){
					Pandora(elem[i]).slide(option);
				}
			}else{
				if(type=='in'){
					elem.style.webkitTransform = positionArray[position];
					elem.style.display = 'block';
					elem.style.webkitTransition = '-webkit-transform 0.3s ease-in-out';
					setTimeout(function(){
						elem.style.webkitTransform = (position=='left'||position=='right')?'translateX(0px)':'translateY(0px)';
					},100);
				}else if(type=='out'){
					elem.style.webkitTransform = (position=='left'||position=='right')?'translateX(0px)':'translateY(0px)';
					elem.style.webkitTransition = '-webkit-transform 0.3s ease-in-out';
					setTimeout(function(){
						elem.style.webkitTransform = positionArray[position];
					},100);
				}
			}
		}
	};
	
	Pandora.fn.fade = function(option){
		option = option || {};
		var elem = this[0],type = option.type, opacity = option.opacity || 1.0;
		if(!type || !elem){
			return;
		}
		type = type.toLowerCase();
		if(elem){
			if(Pandora.isArray(elem)){
				for(var i=0;i<elem.length;i++){
					Pandora(elem[i]).fade(option);
				}
			}else{
				if(type=='in'){
					elem.style.opacity = 0;
					elem.style.display = 'block';
					elem.style.webkitTransition = 'opacity 0.4s ease-in-out';
					setTimeout(function(){
						elem.style.opacity = opacity;
					},100);
				}else if(type=='out'){
					elem.style.opacity = opacity;
					elem.style.webkitTransition = 'opacity 0.4s ease-in-out';
					setTimeout(function(){
						elem.style.opacity = 0;
					},100);
				}
			}
		}
	};
	
	Pandora.fn.pop = function(option){
		option = option || {};
		var elem = this[0],type = option.type,scale = option.scale || 1.0;
		if(!type || !elem){
			return;
		}
		type = type.toLowerCase();
		if(elem){
			if(Pandora.isArray(elem)){
				for(var i=0;i<elem.length;i++){
					Pandora(elem[i]).pop(option);
				}
			}else{
				if(type=='in'){
					elem.style.webkitTransform = 'scale(0)';
					elem.style.display = 'block';
					elem.style.webkitTransition = '-webkit-transform 0.4s ease-in-out';
					setTimeout(function(){
						elem.style.webkitTransform = 'scale('+scale+')';
					},100);
				}else if(type=='out'){
					elem.style.webkitTransform = 'scale('+scale+')';
					elem.style.webkitTransition = '-webkit-transform 0.4s ease-in-out';
					setTimeout(function(){
						elem.style.webkitTransform = 'scale(0)';
					},100);
				}
			}
		}
	};
})($);
