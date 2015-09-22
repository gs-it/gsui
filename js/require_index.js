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

        var root = window.location.origin + window.location.pathname;
        var page = new Templete();
        var initUrl = window.location.href.replace(root, '');
        page.loadTemplete((initUrl=='')?'#html/convention':initUrl);


        //common Event
        Base.support.addEvent(window, 'hashchange', function(e){
            page.loadTemplete(e.newURL.split(root)[1]);
        });

        $(window).on({
            scroll:function(){
                page.scroll($(document).scrollTop());
            }
        });

        $(window).trigger('scroll');
    }
);