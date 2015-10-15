define(['base', 'modules/module_gnb'], function(Base, Gnb){
        
	"use strict";
    
    //header
    var $title = $('.container .contents');
    var headerH = $('header').height();

    //GNB
    var gnb = new Gnb();

    function rtnGap(maxHeight, percent){
        return Math.ceil(percent * maxHeight * 0.01);
    }

    var Common = function(){}
    Common.prototype = {
        scroll:function(scrollTop){
            if(scrollTop > 10) $title.find('h1').addClass('small');
            else $title.find('h1').removeClass('small');
        },
        resize:function(){
            if(Base.agentChk.getDeviceWidth() < 767) gnb.destroy();
        }
    }

    Common.prototype.constructor = Common;

    return Common;
});