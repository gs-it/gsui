requirejs.config({
    baseUrl:'js',
    paths: {
        'highlighter':'lib/jquery/jquery.snippet.min',
        'base':'common/base',
        'plugin':'common/plugin',
        'controller':'controller/controller',
        'disqus':'modules/module_disqus'
    },
    shim:{
        'controller':{
            deps:['plugin', 'highlighter'],
            exports:'controller'
        }/*,
        'disqus':{
            deps:['//gsuicov.disqus.com/embed.js', '//gsuicov.disqus.com/count.js'],
            exports:'disqus'
        }*/
    }
});

require(['base', 'controller', 'disqus'],function(Base, Templete, Sns){

        "use strict";

        var root = window.location.origin + window.location.pathname;
        var page = new Templete();
        var sns = new Sns();
        var initUrl = window.location.href.replace(root, '');

        page.loadTemplete((initUrl=='')?'#html/convention':initUrl);
        //sns.reset(initUrl, (root+initUrl));

        //common Event
        Base.support.addEvent(window, 'hashchange', function(e){
            var hash = e.newURL.split(root)[1];
            page.loadTemplete(hash);
            //sns.reset(hash, e.newURL);
        });

        $(window).on({
            scroll:function(){
                page.scroll($(document).scrollTop());
            }
        });

        $(window).trigger('scroll');
    }
);