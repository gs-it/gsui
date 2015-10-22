define(['base'], function(Base){
        
	"use strict";

    var Controller = function(){}
    Controller.prototype = {
        init:function(){
            console.log('controll_narmal');
        },
        appendTemplete:function(data){
            var clipBoard = '';
            if(Base.agentChk.getDevice() == 'PC') clipBoard = 'js/lib/zeroclipboard/ZeroClipboard.swf'
            $('.contents').html(Base.codeMarkDown(data));
            $('pre.html').snippet('html', {style:'ide-codewarrior', clipboard:clipBoard});
            $('pre.style').snippet('css', {style:'ide-codewarrior', clipboard:clipBoard});
            $('pre.js').snippet('javascript', {style:'ide-codewarrior', clipboard:clipBoard});
        },
        appendScript:function(data){
            var script = document.createElement('script');
            script.id = 'page-script';
            script.type = 'text/javascript';
            script.innerHTML = data;
            document.body.appendChild(script);
        },
        appendStyle:function(data){
            var styleSheet = document.createElement('style');
            styleSheet.id = 'page-style';
            styleSheet.type = 'text/css';
            styleSheet.rel = 'stylesheet';
            styleSheet.innerHTML = data;
            document.body.appendChild(styleSheet);
        },
        destroy:function(){
            $('#page-script').remove();
            $('#page-style').remove();
        }
    }
    Controller.prototype.constructor = Controller;

    return Controller;
});