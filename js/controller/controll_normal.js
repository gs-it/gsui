define(['base'], function(Base){
        
	"use strict";

    var Controller = function(){}
    Controller.prototype = {
        init:function(){
            console.log('controll_narmal');
        },
        destroy:function(){
            console.log('normal destroy');
        },
        xhrCallBack:function(data){
            $('.contents').html(Base.codeConversion(data));
            $('pre.html').snippet('html', {style:'ide-codewarrior'});
            $('pre.style').snippet('css', {style:'ide-codewarrior'});
            $('pre.js').snippet('javascript', {style:'ide-codewarrior'});

            $('.snippet-copy').removeAttr('style');
            $('.snippet-copy').click(function(e){
                e.preventDefault();
                
                var targetTxt = $(this).parent().parent().siblings('.snippet-textonly').text();
                if(window.clipboardData){  
                    window.clipboardData.setData('text', targetTxt);
                }else{                     
                    window.prompt("Copy to clipboard: Ctrl+C, Enter", targetTxt);
                }
            });
        }
    }
    Controller.prototype.constructor = Controller;

    return Controller;
});    