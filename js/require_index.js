requirejs.config({
    baseUrl:'js',
    paths: {
        'highlighter':'lib/jquery/jquery.snippet.min',
        'idangerSwiper':'lib/idangerous/idangerous_2.5.5',
        'iscroll':'lib/iscroll/iscroll_5.1.1',
        'base':'common/base',
        'plugin':'common/plugin',
        'common':'controller/controll_common',
        'controller':'controller/controller'
    },
    shim:{
        'controller':{
            deps:['plugin', 'highlighter'],
            exports:'controller'
        }
    }
});

require(['base', 'controller'],function(Base, Templete){
        "use strict";

        var root = window.location.origin + '/convention/';
        var page = new Templete();
        page.loadTemplete(window.location.href.split(root)[1]);

        //common Event
        Base.support.addEvent(window, 'hashchange', function(e){
            page.loadTemplete(e.newURL.split(root)[1]);
        });

        /*$(window).on({
            resize:function(e){
                page.resize();
            },
            scroll:function(){
                page.scroll();
            }
        });

        $(window).trigger('scroll');


        $(document).on('touchend', function(e){
            common.touchend();
        });*/
    }
);