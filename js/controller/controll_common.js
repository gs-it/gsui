define(['base', 'modules/module_gnb'], function(Base, Gnb){
        
	"use strict";
    
    //header
    var headerH = $('header').height();
    var titleH = $('header > .wrap').css('paddingTop').replace('px', '');

    //GNB
    var gnb = new Gnb();

    function rtnGap(maxHeight, percent){
        return Math.ceil(percent * maxHeight * 0.01);
    }

    var Common = function(){}
    Common.prototype = {
        scroll:function(scrollTop){
            /*if(scrollTop > 0){
                $('header').stop().animate({height:rtnGap(headerH, 80)}, 300);
                $('header > .wrap').stop().animate({paddingTop:rtnGap(titleH, 20)}, 300).addClass('mini');
            }else{
                $('header').stop().animate({height:rtnGap(headerH, 130)}, 300);
                $('header > .wrap').stop().animate({paddingTop:rtnGap(titleH, 100)}, 300).removeClass('mini');
            }*/
        }
    }

    Common.prototype.constructor = Common;

    return Common;
});





