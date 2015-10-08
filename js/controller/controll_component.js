define(['base'], function(Base){
        
	"use strict";

    var Controller = function(){}

    function xhrCallBack(data){
        $('.contents').html(data);
    }

    Controller.prototype = {
        init:function(){
            console.log('controll_narmal');
        },
        loadTemplete:function(hashLink){
            var objHashLink = Base.getUriSplit(hashLink);
            var params = objHashLink.params;
            Base.loader('source/'+objHashLink.hashLink[0]+'/'+objHashLink.hashLink[1]+'.html', xhrCallBack);
        },
        destroy:function(){
            console.log('component destroy');
        }
    }
    Controller.prototype.constructor = Controller;

    return Controller;
});





