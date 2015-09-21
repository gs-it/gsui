define(['base'], function(Base){
        
	"use strict";

    function xhrCallBack(data){
        var contents = data;
        var pattern = /(<pre class="(html|style|js)">)|(<\/pre>)/g;
        var prePattern = /<pre/;
        var removePattern = /^(html|js|style)$/;
        var arrCode = contents.split(pattern);
        var replaceIS = false;
        var dataTxt = '';

        for(var i=0; i<arrCode.length; i++){
            if(removePattern.test(arrCode[i]) || arrCode[i] == undefined || arrCode[i] == null) arrCode[i] = '';
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
    }

    var Main = function(){}
    Main.prototype = {
        loadTemplete:function(hashLink){
            var objHashLink = Base.getUriSplit(hashLink);
            var params = objHashLink.params;

            console.log(objHashLink);
            var contents = Base.loader('source/'+objHashLink.hashLink[0]+'/'+objHashLink.hashLink[1]+'.html', xhrCallBack);
        },
        resize:function(e){}
    }

    Main.prototype.constructor = Main;

    return Main;
});





