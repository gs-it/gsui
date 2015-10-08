requirejs.config({
    baseUrl:'js',
    paths: {
        'highlighter':'lib/jquery/jquery.snippet.min',
        'base':'common/base',
        'plugin':'common/plugin',
        'router':'modules/module_router',
        'controll_common':'controller/controll_common',
        'disqus':'modules/module_disqus'
    },
    shim:{
        'controll_common':{
            deps:['plugin', 'highlighter'],
            exports:'controll_common'
        }/*,
        'disqus':{
            deps:['//gsuicov.disqus.com/embed.js', '//gsuicov.disqus.com/count.js'],
            exports:'disqus'
        }*/
    }
});

require(['router', 'controll_common', 'disqus'], function(Route, Common, Sns){

    "use strict";

    var common = new Common();
    var sns = new Sns();

    Route.registerRoutes({
        normal:{path:'/', controller:'controller/controll_normal'},
        component:{path:'/component', controller:'controller/controll_component'}
    }).init().loadController();
});