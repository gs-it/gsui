requirejs.config({
    baseUrl:'js',
    paths: {
        'highlighter':'lib/jquery/jquery.snippet.min',
        'idangerSwiper':'lib/idangerous/idangerous_2.5.5',
        'iscroll':'lib/iscroll/iscroll_5.1.1',
        'base':'common/base',
        'plugin':'common/plugin',
        'common':'controller/controll_common',
        'controll_main':'controller/controll_main'
    },
    shim:{
        'controll_main':{
            deps:['plugin', 'highlighter'],
            exports:'controll_main'
        }
    }
});

require(
    [
        'common',
        'controll_main'
    ],
    function(Common, Templete){
        "use strict";

        var common = new Common();
        var page = new Templete();

        //common Event
        $(window).on({
            resize:function(e){
                page.resize();
            },
            scroll:function(){
                common.scroll();
            }
        });

        $(window).trigger('scroll');


        $(document).on('touchend', function(e){
            common.touchend();
        });
    }
);