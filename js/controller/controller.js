define(['base'], function(Base){
        
	"use strict";

    window.addEventListener('hashchange', function(e){
        templete();
    });

    function templete(){
        var arrHashLink = Base.getUriSplit(window.location.hash);
        var contents = Base.loader('source/'+arrHashLink[0]+'/'+arrHashLink[1]+'.html');
        var pattern = /(<pre class="html">)|(<\/pre>)/gim;
        var arrCode = contents.split(pattern);
        var replaceIS = false;
        var dataTxt = '';

        var ttt = contents.trim().split(/<pre?>/);
        console.log(ttt);


        for(var i=0; i<arrCode.length; i++){
            if(arrCode[i] == undefined || arrCode[i] == null) arrCode[i] = '';
            if(arrCode[i] == '<pre class="html">') replaceIS = true;
            if(arrCode[i] == '<\/pre>') replaceIS = false;
            if(replaceIS && arrCode[i] != '<pre class="html">') arrCode[i] = arrCode[i].replace(/</g, '&lt;').replace(/>/g, '&gt;');

            dataTxt += arrCode[i];
        }

        $('.contents').html(dataTxt);
        $('pre.html').snippet('html', {style:'ide-codewarrior'});
        $('pre.style').snippet('css', {style:'ide-codewarrior'});
        $('pre.js').snippet('javascript', {style:'ide-codewarrior'});
    }

    templete();

    var Main = function(){}
    Main.prototype = {
        resize:function(e){}
    }

    Main.prototype.constructor = Main;

    return Main;
});





