requirejs.config({
    baseUrl:'js',
    paths: {
        'highlighter':'lib/jquery/jquery.snippet',
        'base':'common/base',
        'plugin':'common/plugin',
        'router':'modules/module_router',
        'controll_common':'controller/controll_common',
        'disqus':'modules/module_disqus',
        'zeroclipboard':'lib/zeroclipboard/zeroclipboard.min'
    },
    shim:{
        'controll_common':{
            deps:['plugin', 'highlighter', 'zeroclipboard'],
            exports:'controll_common'
        },
        'disqus':{
            deps:['//gsuicov.disqus.com/embed.js', '//gsuicov.disqus.com/count.js'],
            exports:'disqus'
        }
    }
});

require(['router', 'controll_common', 'disqus'], function(Route, Common, Sns){

    "use strict";

    var common = new Common();
    var sns = new Sns();
    

    Route.registerRoutes({
        normal:{path:'/', controller:'controller/controll_normal'},
        component:{path:'/component', controller:'controller/controll_normal', script:'source/component/component.js'},
        markdown:{path:'/markdown', controller:'controller/controll_markdown'}
    }).init().loadController();

    //addCommonEvent
    $(window).scroll(function(e){
        common.scroll($(window).scrollTop());
    });
    $(window).resize(function(e){
        common.resize();
    });
    $(window).trigger('scroll');
});