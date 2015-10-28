define(['base'], function(Base){
        
	"use strict";

    var Controller = function(){}
    Controller.prototype = {
        init:function(){
            console.log('controll_narmal');
        },
        appendTemplete:function(data){
            var clipBoard = true;
            //chrome에서 copy 버튼을 display:(none|block)으로 제어 할때 swf파일을 다시 로드하는 버그 발생
            //if(Base.agentChk.getDevice() == 'PC') clipBoard = 'js/lib/zeroclipboard/zeroClipboard.swf';

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