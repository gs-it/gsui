define(['jquery', 'Base'], function($, Base){
	"use strict";

	//swipe module
	var Swipe = function(select, options){
		var _that = this;
		_that.opts = $.extend({}, defaults, options);
		_that.$container = $(select)[0] === $(_that.opts.container)[0] ? $(select) : $(select).find(_that.opts.container);
		_that.$swiperWrap = _that.$container.find(_that.opts.swipeWrap);
		_that.$swiper = _that.$swiperWrap.children();
		_that.$indicatorWrap = $(select).find(_that.opts.indicatorWrap);
		_that.$indicator = null;
		_that.swipeLen = _that.$swiper.length;
		_that.counter = 0;
		_that.globalIndex = 0;
		_that.indicatorIndex = 0;
		_that.oddIS = (_that.swipeLen%2 != 0) ? true : false; // list 총갯수 / 2 가 홀수 인지 짝수인지 판별
		_that.arrPos = [];
		_that.arrPosY = [];
		_that.returnIndex = Math.floor(_that.swipeLen / 2);
		_that.sw = 0, 
		_that.sh = 0, 
		_that.swipeWidth = 0, 
		_that.swipeHeight = 0, 
		_that.turnPoint = 0, 
		_that.autoInterval = 0, 
		_that.translate = 0;
		_that.startX = 0, 
		_that.startY = 0, 
		_that.endX = 0, 
		_that.endY = 0, 
		_that.distX = 0, 
		_that.distY = 0, 
		_that.touchPos = 0;
		_that.bubbleIS = true;
		_that.duration = 0;
		return _that;
	}
	
	var _that;
	var defaults = {
    	container : '.swiper-wrapper',
    	swipeWrap : '.swiper',
    	indicatorWrap : '.swiper-pagination',
    	indicatorIS : false,
    	indicatorDom : '<span></span>',
    	indicatorActiveClass : 'on',
    	listPerView : 1,
    	autoLoopIS : false,
    	autoLoopTime:5000,
    	duration : 500
    };
	
	Swipe.prototype = {
		init:function(){
			_that = this;
			_that.duration = Base.support.transforms3d || Base.support.transforms ? _that.opts.duration * 0.001 : opts.duration;
			if(_that.opts.indicatorIS) that.addIndicator();
			_that.setup();
			_that.autoLoop(true);
			_that.addEvent();

			return this;
		},
		setup:function(){
			_that.swipeWidth = _that.$swiperWrap.width();
			_that.$swiper.css({width:_that.swipeWidth});
			_that.swipeHeight = _that.$swiper.first().height();
			_that.$swiperWrap.css({height:_that.swipeHeight});

			_that.turnPoint = _that.swipeWidth * _that.returnIndex;

			for(var i=0; i<_that.swipeLen; i++){
				_that.arrPos[i] = _that.counter;
				if(i == _that.returnIndex){
					if(_that.oddIS) _that.counter = _that.counter + _that.swipeWidth;
					_that.counter = -_that.counter;
				}
				_that.counter += _that.swipeWidth;

				_that.setDisplay(_that.$swiper.eq(i), i);
				slideForTransition(_that.$swiper.eq(i), i, 0);
			}
		},
		addEvent:function(){
			if(Base.support.touch){
				Base.support.addEvent(_that.$container[0], 'touchstart', onTouchStart);
				Base.support.addEvent(_that.$container[0], 'touchmove', onTouchMove);
				Base.support.addEvent(_that.$container[0], 'touchend', onTouchEnd);
				Base.support.addEvent(_that.$container[0], 'touchcancel', onTouchCancel);
			}else{
				Base.support.addEvent(_that.$container[0], 'mousedown', onTouchStart);
			}
		},
		addIndicator:function(){
			var indiTxt = '';

			for(var i=0; i<_that.swipeLen; i++){
				indiTxt += _that.opts.indicatorDom;
			}

			_that.$indicatorWrap.append(indiTxt);
			_that.$indicator = _that.$indicatorWrap.children();
			_that.$indicator.eq(_that.globalIndex).addClass(_that.opts.indicatorActiveClass);

			_that.$indicator.each(function(i){
				Base.support.addEvent($(this)[0], 'click', function(e){
					if(!$(this).hasClass(_that.opts.indicatorActiveClass)){
						$(this).addClass(_that.opts.indicatorActiveClass);
						_that.globalIndex = $(this).index();
						_that.active();
						_that.setIndicatorActive(_that.globalIndex);
					}
				});
			});
		},
		active:function(){
			var posIndex;

			for(var i=0; i<_that.swipeLen; i++){
				posIndex = i - _that.globalIndex;
				if(posIndex < 0) {
					posIndex = i - _that.globalIndex + _that.swipeLen;
				}else{
					posIndex = i - _that.globalIndex;
				}

				//duration = (Math.abs(arrPos[posIndex]) == turnPoint) ? '0s':'0.5s';
				_that.setDisplay(_that.$swiper.eq(i), posIndex);
				slideForTransition(_that.$swiper.eq(i), posIndex, _that.duration);
			}

			if(_that.opts.indicatorIS) _that.setIndicatorActive(_that.globalIndex);
		},
		nextSlide:function(){
			_that.globalIndex++;
			if(_that.globalIndex >= _that.swipeLen) _that.globalIndex = 0;
			_that.active();
		},
		prevSlide:function(){
			_that.globalIndex--;
			if(_that.globalIndex < 0) _that.globalIndex = _that.swipeLen - 1;
			_that.active();
		},
		resize:function(){
			_that.$swiper.removeAttr('style');

			_that.counter = 0;
			_that.globalIndex = 0;
			_that.arrPos = [];
			
			_that.setup();
		},
		destroy:function(){
			if(Base.support.touch){
				Base.support.removeEvent(_that.$container[0], 'touchstart', onTouchStart);
				Base.support.removeEvent(_that.$container[0], 'touchmove', onTouchMove);
				Base.support.removeEvent(_that.$container[0], 'touchend', onTouchEnd);
				Base.support.removeEvent(_that.$container[0], 'touchcancel', onTouchCancel);
			}else{
				Base.support.removeEvent(_that.$container[0], 'mousedown', onTouchStart);
			}
		},
		autoLoop:function(type){
			if(_that.opts.autoLoopIS){
				if(type){
					_that.autoInterval = setInterval(function(){
						_that.nextSlide();
					}, _that.opts.autoLoopTime);
				}else{
					clearInterval(_that.autoInterval);
				}
			}
		},
		getZindex:function(index){
			return Math.abs(_that.arrPos[index]) * -1;
			//return (Math.abs(_that.arrPos[index]) == 0) ? 10 : 1;
		},
		setIndicatorActive : function(index){
			_that.$indicator.eq(_that.indicatorIndex).removeClass(_that.opts.indicatorActiveClass);
			_that.indicatorIndex = index;
			_that.$indicator.eq(_that.indicatorIndex).addClass(_that.opts.indicatorActiveClass);
		},
		setDisplay : function($target, index){
			if(index >= 0 && index <= _that.opts.listPerView || index >= _that.swipeLen-(_that.opts.listPerView+1) && index <= _that.swipeLen-1){
				$target.css({'display':'block'});
			}else{
				$target.css({'display':'none'});
			}
		}
	}

	Swipe.prototype.constructor = Swipe;

	function slideForTransition($target, index, fps){
		if(Base.support.transforms3d || Base.support.transforms){
			if(Base.support.transforms) _that.translate = 'translate(' + _that.arrPos[index] + 'px, 0)';
			if(Base.support.transforms3d) _that.translate = 'translate3d(' + _that.arrPos[index] + 'px, 0, 0)';
			$target.css({
				"zIndex":_that.getZindex(index), 
				"-moz-transition-duration": fps+'s', 
				"-moz-transform": _that.translate, 
				"-ms-transition-duration": fps+'s', 
				"-ms-transform": _that.translate, 
				"-webkit-transition-duration": fps+'s', 
				"-webkit-transform": _that.translate, 
				"transition-duration": fps+'s', 
				"transform": _that.translate
			});
		}else{
			$target.stop().animate({'left':_that.arrPos[_that.posIndex]}, fps);
		}
	}

	function onTouchStart(e){
		var touchobj = (Base.support.touch) ? e.touches[0] : e;
		_that.startX = touchobj.clientX;
		_that.startY = touchobj.clientY;

		if(!Base.support.touch){
			Base.support.addEvent(document, 'mousemove', onTouchMove);
			Base.support.addEvent(document, 'mouseup', onTouchEnd);
			e.preventDefault();
		}

		_that.autoLoop(false);
	}

	function onTouchMove(e){
		var touchobj = (Base.support.touch) ? e.touches[0] : e;
		var posIndex, translate, posX, posY, radian;

		_that.distX = _that.startX - parseInt(touchobj.clientX);
		_that.distY = _that.startY - parseInt(touchobj.clientY);
		_that.touchPos = _that.distX;

		for(var i=0; i<_that.swipeLen; i++){
			posIndex = i - _that.globalIndex;
			if(posIndex < 0) {
				posIndex = i - _that.globalIndex + _that.swipeLen;
			}else{
				posIndex = i - _that.globalIndex;
			}
			
			if(Base.support.transforms3d || Base.support.transforms){
				if(Base.support.transforms) translate = 'translate(' + (_that.arrPos[posIndex] - _that.touchPos) + 'px, 0)';
				if(Base.support.transforms3d) translate = 'translate3d(' + (_that.arrPos[posIndex] - _that.touchPos) + 'px, 0, 0)';
				
				_that.$swiper.eq(i).css({
					"-moz-transition-duration": "0s", 
					"-moz-transform": translate, 
					"-ms-transition-duration": "0s", 
					"-ms-transform": translate, 
					"-webkit-transition-duration": "0s", 
					"-webkit-transform": translate, 
					"transition-duration": "0s", "transform": translate
				});
			}else{
				_that.$swiper.eq(i).css({'left':_that.arrPos[posIndex] - _that.touchPos});
			}
		}

		if(Math.abs(_that.distX) < Math.abs(_that.distY) && _that.bubbleIS){
			if(Base.support.touch) Base.support.removeEvent(_that.$container[0], 'touchmove', onTouchMove);
		}else{
			_that.bubbleIS = false;
			e.preventDefault();
		}
	}

	function onTouchEnd(e){
		if(_that.touchPos > 20 && !_that.bubbleIS) _that.nextSlide();
		if(_that.touchPos < -20 && !_that.bubbleIS) _that.prevSlide();
		if(_that.touchPos < 20 && _that.touchPos > -20 && !_that.bubbleIS) _that.active();
		if(_that.touchPos < 5 && _that.touchPos > 5  && !_that.bubbleIS) return true;

		_that.bubbleIS = true;
		if(Base.support.touch){
			Base.support.addEvent(_that.$container[0], 'touchmove', onTouchMove);
		}else{
			Base.support.removeEvent(document, 'mousemove', onTouchMove);
			Base.support.removeEvent(document, 'mouseup', onTouchEnd);

			e.preventDefault();
		}

		_that.autoLoop(true);
	}

	function onTouchCancel(e){
		console.log('touchcancel');
	}

	return Swipe;
});