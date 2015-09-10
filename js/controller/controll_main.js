define(['base'], function(Base){
        
	"use strict";

    var contents = Base.loader('templete/default.html');
    $('.contents').append(contents);

    $('pre').snippet('html', {style:'ide-codewarrior'});
    

    //PC & MOBILE
    if(Base.agentChk.getDevice() == 'MOBILE'){
        
    }else if(Base.agentChk.getDevice() == 'PC'){
        
    }


    var Main = function(){}
    Main.prototype = {
        resize:function(e){}
    }

    Main.prototype.constructor = Main;

    return Main;
});





