define(['base'], function(Base){

	"use strict";

	var startX = 0;
	var posX = 0;
	var activeIS = false;

	var Gnb = function(){
		var _that = this;
		_that.target = $('[data-type=btn]');
		_that.attrSetup = $('[data-type=btn]').attr('data-setup');
		_that.setup = eval('(' + _that.attrSetup + ')');

		_that.evtTarget = $('[data-type='+ _that.setup.evtTarget +']');
		_that.closeTarget = $('[data-type='+ _that.setup.closeTarget +']');
		_that.actClass = _that.setup.actClass;
		_that.init();
	}

	Gnb.prototype = {
		init:function(){
			var _that = this;

			Base.support.addEvent(_that.target[0], _that.setup.evtType, function(e){
		        if(_that.evtTarget.hasClass(_that.actClass)){
		        	_that.setGnbStatus(false);
		        }else{
		        	_that.setGnbStatus(true);
				}
		    });

		    _that.evtTarget.children().find('a').each(function(i){
		    	var $that = $(this);
		    	$that.on({
		    		'click':function(e){
		    			if(Base.agentChk.getDeviceWidth() < 767){
		    				_that.setGnbStatus(false);
		    			}
		    		}
		    	});
		    });

		    _that.closeTarget.on({
		    	click:function(e){
		    		e.preventDefault();
		    		_that.setGnbStatus(false);
		    	}
		    });

		    if(Base.support.touch){
		        Base.support.addEvent(window, 'touchstart', touchStart);
		    }

		    function touchStart(e){
				var touchobj = (Base.support.touch) ? e.touches[0] : e;
				if(touchobj.clientX <= 10){
					e.preventDefault();
					startX = touchobj.clientX;

					if(Base.support.touch){
				        Base.support.addEvent(window, 'touchmove', touchMove);
				        Base.support.addEvent(window, 'touchend', touchEnd);
				    }
				}
			}
			function touchMove(e){
				var touchobj = (Base.support.touch) ? e.touches[0] : e;
				var percent = Math.round((touchobj.clientX - startX) / Base.agentChk.getDeviceWidth() * 100);

				if(startX > 0){
					if(percent < 10) activeIS = false;
					else activeIS = true;

					_that.setTransition(percent - 100, 0);
					_that.closeTarget.css({display:'block', opacity:(percent*0.01)/2});
				}
			}
			function touchEnd(e){
				startX = 0;
				if(activeIS){
					activeIS = false;
					_that.setGnbStatus(true);
				}else{
					_that.setGnbStatus(false);
				}

				if(Base.support.touch){
			        Base.support.removeEvent(window, 'touchmove', touchMove);
			        Base.support.removeEvent(window, 'touchend', touchEnd);
			    }
			}
		},
		setGnbStatus:function($param){
			var _that = this;
			if($param){
				_that.setTransition(0, 0.5);
	        	_that.setDimTransition(true);
	        	$('header').addClass('ov-menu');
			}else{
				_that.setTransition(-100, 0.5);
	        	_that.setDimTransition(false);
	        	$('header').removeClass('ov-menu');
			}
		},
		setTransition:function(posX, fps){
			var _that = this;
			_that.evtTarget.css({
				'-moz-transition-duration': fps + 's', 
				'-moz-transform': 'translateX(' + posX + '%)', 
				'-ms-transition-duration': fps + 's', 
				'-ms-transform': 'translateX(' + posX + '%)', 
				'-webkit-transition-duration': fps + 's', 
				'-webkit-transform': 'translateX(' + posX + '%)', 
				'transition-duration': fps + 's', 
				'transform': 'translateX(' + posX + '%)'
			});
		},
		setDimTransition:function(IS){
			var _that = this;
			var fps = 0;

			if(IS){
				_that.closeTarget.css({display:'block'}).stop().animate({opacity:0.5}, fps);
				$('body').css('overflow', 'hidden');
			}else{
				_that.closeTarget.stop().animate({opacity:0}, fps, function(){
					$(this).removeAttr('style');
					$('body').removeAttr('style');
				});
			}
		},
		destroy:function(){
			var _that = this;
			if(_that.evtTarget.attr('style')){
				_that.evtTarget.removeAttr('style');
				_that.setDimTransition(false);
				$('header').removeClass('ov-menu');
			}
		}
	}

	Gnb.prototype.constructor = Gnb;
	return Gnb;
});