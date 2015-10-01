define(['base', 'modules/module_gnb'], function(Base, Gnb){
        
	"use strict";

    //header
    var headerH = $('header').height();
    var titleH = $('header > .wrap').css('paddingTop').replace('px', '');

    //GNB
    var gnb = new Gnb();

    //xhrCallBack function
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


    function rtnGap(maxHeight, percent){
        return Math.ceil(percent * maxHeight * 0.01);
    }

    var Main = function(){}
    Main.prototype = {
        loadTemplete:function(hashLink){
            var objHashLink = Base.getUriSplit(hashLink);
            var params = objHashLink.params;

            console.log(objHashLink);
            var contents = Base.loader('source/'+objHashLink.hashLink[0]+'/'+objHashLink.hashLink[1]+'.html', xhrCallBack);
        },
        scroll:function(scrollTop){
            /*if(scrollTop > 0){
                $('header').stop().animate({height:rtnGap(headerH, 80)}, 300);
                $('header > .wrap').stop().animate({paddingTop:rtnGap(titleH, 20)}, 300).addClass('mini');
            }else{
                $('header').stop().animate({height:rtnGap(headerH, 130)}, 300);
                $('header > .wrap').stop().animate({paddingTop:rtnGap(titleH, 100)}, 300).removeClass('mini');
            }*/
        }
    }

    Main.prototype.constructor = Main;

    return Main;
});





