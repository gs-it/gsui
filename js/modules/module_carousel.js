define(['Base'], function(Base){
	"use strict";

	//swipe module
	var Carousel = function(select, options){
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
		_that.arrPosX = [];
		_that.arrPosY = [];
		_that.arrPosZ = [];
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
		_that.zIndex = 0;
		_that.arrCurrentPos = [];
		_that.arrRadian = [];

		_that.swipeType = 'default';
		_that.startPos = 90; //top:270; down:90; left:180; right:0px;
		_that.rw = 350;
		_that.rh = 100;
		_that.rz = 100;

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
	
	Carousel.prototype = {
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
			
			for(var i=0; i<_that.swipeLen; i++){
				var radian = ((360 / _that.swipeLen) * i + _that.startPos) * (Math.PI/180);
				var posX = Math.round(_that.rw * Math.cos(radian));
				var posY = Math.round(_that.rh * Math.sin(radian));
				var posZ = Math.round(_that.rz * Math.atan2(posX, posY));

				_that.arrRadian[i] = radian;
				_that.arrPosX[i] = posX;
				_that.arrPosY[i] = posY;

				if(posZ > 0) _that.arrPosZ[i] = -posZ;
				else _that.arrPosZ[i] = posZ;

				//_that.setDisplay(_that.$swiper.eq(i), i);
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
			for(var i=0; i<_that.swipeLen; i++){
				//duration = (Math.abs(arrPos[posIndex]) == turnPoint) ? '0s':'0.5s';
				//_that.setDisplay(_that.$swiper.eq(i), posIndex);
				slideForTransition(_that.$swiper.eq(i), _that.rtnCurrentIndex(i), _that.duration);
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
			_that.arrPosX = [];
			
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
			return Math.abs(_that.arrPosX[index]) * -1;
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
		},
		rtnCurrentPos : function(){
			//list x, y 좌표
			var regx = /[(),]/;
			_that.arrCurrentPos = [];

			for(var i=0; i<_that.swipeLen; i++){
				var currentPosX = _that.$swiper.eq(i)[0].style.transform.split(regx)[1].replace('px', '');
				var currentPosY = _that.$swiper.eq(i)[0].style.transform.split(regx)[2].replace('px', '');
				var arrPos = [];
				arrPos.push(currentPosX);
				arrPos.push(currentPosY);
				_that.arrCurrentPos.push(arrPos);
			}
		},
		rtnCurrentIndex:function(index){
			var posIndex = index - _that.globalIndex;
			if(posIndex < 0) {
				posIndex = index - _that.globalIndex + _that.swipeLen;
			}else{
				posIndex = index - _that.globalIndex;
			}

			return posIndex;
		}
	}

	Carousel.prototype.constructor = Carousel;

	function slideForTransition($target, index, fps){
		if(Base.support.transforms3d || Base.support.transforms){
			if(Base.support.transforms) _that.translate = 'translate(' + _that.arrPosX[index] + 'px,' + _that.arrPosY[index] + 'px)';
			if(Base.support.transforms3d) _that.translate = 'translate3d(' + _that.arrPosX[index] + 'px, ' + _that.arrPosY[index] + 'px, 0)';
			$target.css({
				"zIndex":_that.arrPosZ[index], 
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
			$target.stop().animate({'left':_that.arrPosX[index], 'top':_that.arrPosY[index], 'zIndex':_that.arrPosZ[index]}, fps);
			//$target.stop().animate({'left':_that.arrPosX[_that.posIndex]}, fps);
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


	var zzz = 0;
	function onTouchMove(e){
		var touchobj = (Base.support.touch) ? e.touches[0] : e;
		var translate;

		_that.distX = _that.startX - parseInt(touchobj.clientX);
		_that.distY = _that.startY - parseInt(touchobj.clientY);
		_that.touchPos = _that.distX;

		for(var i=0; i<_that.swipeLen; i++){
			var radian = _that.touchPos * Math.PI/180;
			var posX = Math.round(_that.rw * Math.cos(radian + _that.arrRadian[_that.rtnCurrentIndex(i)]));
			var posY = Math.round(_that.rh * Math.sin(radian + _that.arrRadian[_that.rtnCurrentIndex(i)]));
			var posZ = Math.round(_that.rz * Math.atan2(posX, posY));

			if(Base.support.transforms3d || Base.support.transforms){
				if(Base.support.transforms) translate = 'translate(' + posX + 'px,' + posY + 'px)';
				if(Base.support.transforms3d) translate = 'translate3d(' + posX + 'px, ' + posY + 'px, 0)';

				_that.$swiper.eq(i).css({
					"zIndex":(posZ > 0) ? -posZ:posZ, 
					"-moz-transition-duration": "0s", 
					"-moz-transform": translate, 
					"-ms-transition-duration": "0s", 
					"-ms-transform": translate, 
					"-webkit-transition-duration": "0s", 
					"-webkit-transform": translate, 
					"transition-duration": "0s", "transform": translate
				});
			}else{
				_that.$swiper.eq(i).css({'left':posX, 'top':posY});
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
		if(_that.touchPos > 20 && !_that.bubbleIS) _that.prevSlide();
		if(_that.touchPos < -20 && !_that.bubbleIS) _that.nextSlide();
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

	return Carousel;
});