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
		_that.actClass = _that.setup.actClass;
		_that.init();
	}

	Gnb.prototype = {
		init:function(){
			var _that = this;

			Base.support.addEvent(_that.target[0], _that.setup.evtType, function(e){
		        if(_that.evtTarget.hasClass(_that.actClass)){
		        	if(Base.support.transforms){
						_that.evtTarget.css({
							"-moz-transition-duration": '0.5s', 
							"-moz-transform": 'translateX(0)', 
							"-ms-transition-duration": '0.5s', 
							"-ms-transform": 'translateX(0)', 
							"-webkit-transition-duration": '0.5s', 
							"-webkit-transform": 'translateX(0)', 
							"transition-duration": '0.5s', 
							"transform": 'translateX(0)'
						});
					}
		        }else{
		        	_that.evtTarget.css({
							"-moz-transition-duration": '0.5s', 
							"-moz-transform": 'translateX(0)', 
							"-ms-transition-duration": '0.5s', 
							"-ms-transform": 'translateX(0)', 
							"-webkit-transition-duration": '0.5s', 
							"-webkit-transform": 'translateX(0)', 
							"transition-duration": '0.5s', 
							"transform": 'translateX(0)'
						});
				}
		    });

		    _that.evtTarget.children().each(function(i){
		    	var $that = $(this);
		    	$that.on({
		    		'mouseenter':function(e){
		    			$that.find('.menu-sub').css({'display':'block'});
		    		},
		    		'mouseleave':function(e){
		    			$that.find('.menu-sub').removeAttr('style');
		    		}
		    	});
		    });

		    if(Base.support.touch){
		        Base.support.addEvent(window, 'touchstart', touchStart);
		        Base.support.addEvent(window, 'touchmove', touchMove);
		        Base.support.addEvent(window, 'touchend', touchEnd);
		    }

		    function touchStart(e){
				var touchobj = (Base.support.touch) ? e.touches[0] : e;
				if(touchobj.clientX <= 10){
					e.preventDefault();
					activeIS = true;
					startX = touchobj.clientX;
				}
			}
			function touchMove(e){
				var touchobj = (Base.support.touch) ? e.touches[0] : e;
				var percent = Math.round((touchobj.clientX - startX) / Base.agentChk.getDeviceWidth() * 100);
				var translate = 0;

				if(startX > 0){
					if(Base.support.transforms){
						var translate = 'translateX(' + (percent - 100) + '%)';
						_that.evtTarget.css({
							"-moz-transform": translate, 
							"-ms-transform": translate, 
							"-webkit-transform": translate, 
							"transform": translate
						});
					}
					$('.dim').css({opacity:(percent*0.01)/2});
				}
			}
			function touchEnd(e){
				startX = 0;
				if(Base.support.transforms && activeIS){
					activeIS = false;
					_that.evtTarget.css({
						"-moz-transition-duration": '0.5s', 
						"-moz-transform": 'translateX(0)', 
						"-ms-transition-duration": '0.5s', 
						"-ms-transform": 'translateX(0)', 
						"-webkit-transition-duration": '0.5s', 
						"-webkit-transform": 'translateX(0)', 
						"transition-duration": '0.5s', 
						"transform": 'translateX(0)'
					});
				}
			}
		}
	}

	Gnb.prototype.constructor = Gnb;
	return Gnb;
});