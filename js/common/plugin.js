define(function(){
    "use strict";

    $.fn.fe_tmpSelect = function(opt){
        return this.each(function(){
            var opts = $.extend({}, $.fn.fe_tmpSelect.defaults, opt);
            var $this = $(this);
            var $container = (opts.container == 'this') ? $this : $(opts.container);
            var $activeBtn = $container.find(opts.activeBtn);
            var $activeCon = $container.find(opts.activeCon);
            var activeClass = opts.activeClass;

            init();
            function init(){
                $activeBtn.on({
                    'click.select':function(e){
                        e.preventDefault();
                        if($container.hasClass('on')){
                            $container.removeClass('on');
                        }else{
                            $container.addClass('on');
                        }
                    },
                    'focusout.select':function(e){
                        setTimeout(function(){
                            $container.removeClass('on');
                        }, 100);
                    }  
                });
            }
        });
    }

    $.fn.fe_tmpSelect.defaults = {
        container:'this',
        activeBtn:' > a',
        activeCon:' > ul',
        activeClass:'.on'
    }







    $.fn.fe_toggleSwitch = function(option){
        var opts = $.extend({}, $.fn.fe_toggleSwitch.defaults, option);
        return this.each(function(){
            var $container = (opts.container == 'this') ? $(this) : $(opts.container);
            var $evtDom = (opts.eventDom == 'this') ? $(this) : $container.find(' > ' + opts.eventDom);
            var $actDom = $container.find(opts.activeDom);
            var eventType = opts.eventType;
            var actClass = opts.activeClass;
            var clickIS = true;

            addEvent();
            function addEvent(){
                switch(eventType){
                    case 'over':
                        $evtDom.on({
                            'mouseenter.toggleSwitch' : function(e){
                                active(true);
                            },
                            'mouseleave.toggleSwitch' : function(e){
                                active(false);
                            }
                        });
                    break;
                    case 'click' :
                        $evtDom.on('click.toggleSwitch', function(e){
                            e.preventDefault();
                            //$(this).focus();
                            if(clickIS){
                                active(true);
                            }else{
                                active(false);
                            }
                        });
                    break;
                }


                $evtDom.focusout(function(e){
                    active(false);
                });
            }

            function active($param){
                clickIS = ($param) ? false : true;
                if($param){
                    $actDom.css({'display':'block'});
                    //$actDom.addClass(activeClass);
                }else{
                    $actDom.css({'display':'none'});
                    //$actDom.removeClass(activeClass);
                }
            }
        });
    }

    $.fn.fe_toggleSwitch.defaults = {
        container : 'this',
        eventDom : 'a',
        activeDom : 'ul',
        eventType : 'over',
        activeClass : 'on'
    }












    $.fn.fe_inputSetup = function(option){
        var opts = $.extend({}, $.fn.fe_inputSetup.defaults, option);
        var agent = userAgentChk.getBrowser();
        return $(this).each(function(i){
            var $that = $(this);
            var placeholder = $(this).attr('placeholder');
            var inEvent = opts.inputIn;
            var outEvent = opts.inputOut;

            init();
            function init(){
                if(agent == 9 || agent == 8 || agent == 7){
                    $that.attr('value', placeholder);
                }

                $that.on({
                    'focusin':function(e){
                        if(agent == 9 || agent == 8 || agent == 7){
                            $that.val('');
                        }

                        if(typeof inEvent == 'function'){                           
                            inEvent();
                        }
                    },
                    'focusout':function(e){
                        if(agent == 9 || agent == 8 || agent == 7){
                            var value = $that.val();
                            if(value == ''){
                                $that.val(placeholder);
                            }
                        }

                        if(typeof outEvent == 'function'){
                            outEvent();
                        }
                    }
                });
            }
        });
    }

    $.fn.fe_inputSetup.defaults = {
        inputIn:null,
        inputOut:null
    }











    $.fn.fe_iDanSwiper = function(option){
        var opts = $.extend({}, $.fn.fe_iDanSwiper.defaults, option);
        return $(this).each(function(){
            var $that = $(this);
            var $wrap = $that.parent();
            var $prev = (typeof opts.directiveCon == 'object') ? opts.directiveCon.find('a.prev') : $that.find('a.prev');
            var $next = (typeof opts.directiveCon == 'object') ? opts.directiveCon.find('a.next') : $that.find('a.next');
            var $page = (typeof opts.directiveCon == 'object') ? opts.directiveCon.find('.pagination') : $that.find('.pagination');
            var $indiContainer = $that.parent().find(opts.indicatorCon);
            var currentIndex = 0;
            var activeClass = opts.activeClass;
            var autoPlay = opts.autoplay;
            var slidesPerView = opts.slidesPerView;
            var slidesPerGroup = opts.slidesPerGroup;
            var resizeIS = opts.resizeIS;
            var mainSwiper, slidesListNum, loopedSlides, totalSlideNum;
            var docWidth = $(document).width();
            var mediaIS = (slidesPerView == 3) ? true : false;

            function init(){
                mainSwiper = new Swiper($that[0], $.extend({}, opts, { onInit:onInit, onSlideChangeStart:onSlideChangeStart }));
                addDirective();
                addEvent();
            }

            function addEvent(){
                $(window).resize(function(){
                    docWidth = $(document).width();
                    if(docWidth<=1200){
                        if(!mediaIS){                  
                           reSwipe(3);
                        }
                        mediaIS = true;
                    }else{
                        if(mediaIS){
                           reSwipe(4);
                        }
                        mediaIS = false;
                    }
                });

                $wrap.on({
                    'mouseenter':function(e){
                        if(opts.autoplay) mainSwiper.stopAutoplay();
                    },
                    'mouseleave':function(e){
                        if(opts.autoplay) mainSwiper.startAutoplay();
                    }
                });
            }

            function onInit($swipe){
                loopedSlides = $swipe.loopedSlides;
                slidesListNum = $swipe.slides.length;
                totalSlideNum = Math.ceil((slidesListNum - (loopedSlides*2)) / loopedSlides);
                $page.html("<strong>" + (currentIndex+1) + "</strong>" + '/' + totalSlideNum);
                if($indiContainer.length > 0) addIndicator();
            }

            function onSlideChangeStart($swipe){
                $indiContainer.children().removeClass('on');
                currentIndex = Math.round($swipe.activeLoopIndex / loopedSlides);
                $page.html("<strong>" + (currentIndex+1) + "</strong>" + '/' + totalSlideNum);
                if($indiContainer.length > 0) $indiContainer.children().eq(currentIndex).addClass('on');
            }

            function addIndicator(){
                var paginationHTML = '';
                $indiContainer.empty();

                for (var i = 0; i < totalSlideNum; i++) {
                    if(currentIndex == i) paginationHTML += '<a class="on"><span>'+i+'</span></a>';
                    else paginationHTML += '<a><span>'+i+'</span></a>';
                }
                $indiContainer.append(paginationHTML);

                $indiContainer.children().each(function(){
                    var $that = $(this);
                    $that.on({
                        'click':function(e){
                            e.preventDefault();
                            mainSwiper.swipeTo($(this).index() * loopedSlides);    
                        }
                    });
                });
            }

            function addDirective(){
                $prev.on('click', function(){
                    mainSwiper.swipePrev();
                });

                $next.on('click', function(){
                    mainSwiper.swipeNext();
                });
            }

            function reSwipe(lineNum){
                if(resizeIS){
                    mainSwiper.params.slidesPerGroup = lineNum;
                    mainSwiper.params.slidesPerView = lineNum;
                }
                mainSwiper.reSet();
            }
            
            init();
        });
    }

    $.fn.fe_iDanSwiper.defaults = {
        speed:500,
        loop:true,
        slidesPerView:1,
        slidesPerGroup:1,
        slideIS:true,
        widthIS:true,
        autoplay:false, //초당 1000
        resizeIS:false,
        autoResize:false,
        activeClass:'on',
        simulateTouch : false,
        directiveCon:'this',
        indicatorCon:'.Navi',
        onInit:function(){},
        onSlideChangeStart:function(){}
    }
});