define(['Base'], function(Base){
	var Slider = function(selector, callback){
		if(!selector) throw new Error("잘못된 selector 입니다.");

		var that = this;
		var $container = (typeof selector == 'object') ? selector : $(selector);
		var currentPer = 0;
		var startX = 0;

		if(Base.support.touch){
			Base.support.addEvent($container[0], 'touchstart', onStart);
			Base.support.addEvent($container[0], 'touchmove', onMove);
			Base.support.addEvent($container[0], 'touchend', onEnd);
		}else{
			Base.support.addEvent($container[0], 'mousedown', onStart);
		}


		function onStart(e){
			var touchobj = (Base.support.touch) ? e.touches[0] : e;
			startX = touchobj.clientX;
			currentPer = Math.round(((startX - $container.offset().left) / $container.width()) * 100);

			if(typeof callback == 'function') callback(currentPer);

			if(!Base.support.touch){
				Base.support.addEvent(document, 'mousemove', onMove);
				Base.support.addEvent(document, 'mouseup', onEnd);
			}

			e.preventDefault();
		}

		function onMove(e){
			var touchobj = (Base.support.touch) ? e.touches[0] : e;
			var percent = Math.round(((touchobj.clientX - startX) / $container.width()) * 100) + currentPer;

			if(percent < 0) percent = 0;
			else if(percent > 100) percent = 100;

			if(typeof callback == 'function') callback(percent);
		}

		function onEnd(e){
			if(!Base.support.touch){
				Base.support.removeEvent(document, 'mousemove', onMove);
				Base.support.removeEvent(document, 'mouseup', onEnd);
			}
		}

		return that;
	};

	Slider.prototype.constructor = Slider;
	return Slider;
});