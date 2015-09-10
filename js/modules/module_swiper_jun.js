define(['gsBase'], function(Base){
	var SwiperBanner = function(select, params){
		var defaults = {
			slideWrapper : 'ul',
			prevBtn : '.prev a',
			nextBtn : '.next a',
			slidePerView : 1,
			slidePerGroup : 1,
			slidePerBetween : 0,
			fps : 0.5,
			resizeIS : false
		}

		var opts = $.extend({}, defaults, params);
		var $that = $(select);
		var $slideWrapper = $that.find(opts.slideWrapper);
		var $slide = $slideWrapper.children();
		var $prevBtn = $that.find(opts.prevBtn);
		var $nextBtn = $that.find(opts.nextBtn);
		var totalSlideNum = $slide.length;
		var fps = ( Base.agentChk.getBrowser().version > 9 ) ? opts.fps : 300;
		var pos = 0;
		var sWidth, sHeight;
		var currentIndex = 0;
		var slidePerBlock = 0;

		var Swiper = function(){
			init();
			addEvent();
		}

		function init(){
			sWidth = $slide.first().outerWidth(true);
			sHeight = $slide.first().outerHeight(true);
			$slideWrapper.css({ width:(sWidth + opts.slidePerBetween) * totalSlideNum });
			slidePerBlock = (totalSlideNum - opts.slidePerView) / opts.slidePerGroup;
			pos = -(sWidth + opts.slidePerBetween) * opts.slidePerGroup;
		}

		function addEvent(){
			$prevBtn.on({
				'click':function(e){
					e.preventDefault();
					currentIndex--;
					if(currentIndex < 0) currentIndex = 0;

					slideForTransition(currentIndex, fps);
				}
			});

			$nextBtn.on({
				'click':function(e){
					e.preventDefault();
					currentIndex++;
					if(currentIndex > slidePerBlock) currentIndex = slidePerBlock;

					slideForTransition(currentIndex, fps);
				}
			});
		}

		function slideForTransition(index, fps){
			if( Base.support.transforms3d || Base.support.transforms && $.browser.version>9 ){
				if(Base.support.transforms3d) translate = "translate3d(" + ( pos*index ) + "px,0,0)";
				if(Base.support.transforms) translate = "translate(" + ( pos*index ) + "px,0)";
				$slideWrapper.css({
					"-moz-transition-duration": fps+'s', 
					"-moz-transform": translate, 
					"-ms-transition-duration": fps+'s', 
					"-ms-transform": translate, 
					"-webkit-transition-duration": fps+'s', 
					"-webkit-transform": translate, 
					"transition-duration": fps+'s', 
					"transform": translate
				});
			}else{
				$slideWrapper.stop().animate({'left':pos*index}, fps);
			}
		}

		Swiper.prototype = {
			reInit : function(between){
				if(opts.resizeIS){
					opts.slidePerBetween = between;
					console.log(opts.slidePerBetween);
					currentIndex = 0;
					$slideWrapper.removeAttr('style');
					init();
				}
			}
		}
		Swiper.prototype.constructor = Swiper;
		return new Swiper();
	}

	//get Used
	/*var currentSwipeWidth = $('.rolling-car-insu').width();
	var boardSwiper = new SwiperBanner('.rolling-car-insu', {
		prevBtn : '.car-insu-prev a',
		nextBtn : '.car-insu-next a',
		slidePerView : 3,
		slidePerGroup : 1,
		slidePerBetween : currentSwipeWidth >= 1000 ? 23 : 11,
		resizeIS : $.browser.version>8 ? true : false
	});*/
});