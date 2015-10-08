requirejs.config({
    baseUrl:'js',
    paths: {
        'router':'lib/router/router',
        'highlighter':'lib/jquery/jquery.snippet.min',
        'base':'common/base',
        'plugin':'common/plugin',
        'controll_common':'controller/controll_common',
        'controll_normal':'controller/controll_normal',
        'controll_component':'controller/controll_component',
        'disqus':'modules/module_disqus'
    },
    shim:{
        'controll_common':{
            deps:['plugin'],
            exports:'controll_common'
        },
        'controll_normal':{
            deps:['highlighter'],
            exports:'controll_normal'
        }
        /*,
        'disqus':{
            deps:['//gsuicov.disqus.com/embed.js', '//gsuicov.disqus.com/count.js'],
            exports:'disqus'
        }*/
    }
});

require(['controll_common', 'router', 'disqus'],function(Common, Router, Sns){
    "use strict";

    var common = new Common();
    var sns = new Sns();

    Router.registerRoutes({
        normal:{path:'/home', moduleId:'controll_normal'},
        component:{path:'/component', moduleId:'controll_component'}
    }).on('routeload', function(Controller, routeArguments){
        var templete = new Controller();
        templete.init();
        console.log(routeArguments);
    }).init();

    $(window).on({
        scroll:function(){
            common.scroll($(document).scrollTop());
        }
    });

    $(window).trigger('scroll');
});