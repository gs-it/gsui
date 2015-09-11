define(['base'], function(Base){
        
	"use strict";


    var contents = Base.loader('source/layout.html');
    //var pattern = /(^\t+<pre>)|(^\t+<\/pre>$)/gim;
    var pattern = /(<pre>)|(<\/pre>)/gim;
    var arrCode = contents.split(pattern);
    var replaceIS = false;
    var dataTxt = '';

    for(var i=0; i<arrCode.length; i++){
        if(arrCode[i] == undefined || arrCode[i] == null) arrCode[i] = '';
        if(arrCode[i] == '<pre>') replaceIS = true;
        if(arrCode[i] == '</pre>') replaceIS = false;
        if(replaceIS && arrCode[i] != '<pre>') arrCode[i] = arrCode[i].replace(/</g, '&lt;').replace(/>/g, '&gt;');

        dataTxt += arrCode[i];
    }

    $('.contents').html(dataTxt);
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





