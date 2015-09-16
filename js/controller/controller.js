define(['base'], function(Base){
        
	"use strict";

    var Main = function(){}
    Main.prototype = {
        init:function(){
            var _that = this;
            _that.templete();
        },
        templete:function(){
            var arrHashLink = Base.getUriSplit(window.location.hash);
            var contents = Base.loader('source/'+arrHashLink[0]+'/'+arrHashLink[1]+'.html');
            var pattern = /(<pre class="(?:html|style|js)">)|(<\/pre>)/g;
            var prePattern = /<pre/;
            var arrCode = contents.split(pattern);
            var replaceIS = false;
            var dataTxt = '';

            for(var i=0; i<arrCode.length; i++){         
                if(arrCode[i] == undefined || arrCode[i] == null) arrCode[i] = '';
                if(arrCode[i] == '<pre class="html">'|| arrCode[i] == '<pre class="js">' || arrCode[i] == '<pre class="style">') replaceIS = true;
                if(arrCode[i] == '</pre>') replaceIS = false;

                if(replaceIS){
                    if(!prePattern.test(arrCode[i])){
                        arrCode[i] = arrCode[i].replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    }
                }

                dataTxt += arrCode[i];
            }

            $('.contents').html(dataTxt);
            $('pre.html').snippet('html', {style:'ide-codewarrior'});
            $('pre.style').snippet('css', {style:'ide-codewarrior'});
            $('pre.js').snippet('javascript', {style:'ide-codewarrior'});
        },
        resize:function(e){}
    }

    Main.prototype.constructor = Main;

    return Main;
});





