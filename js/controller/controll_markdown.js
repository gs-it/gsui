define(['base'], function(Base){
        
    "use strict";

    var Controller = function(){}
    Controller.prototype = {
        init:function(){
            setInterval(function(){console.log('code Fomatting');}, 1000);
        },
        destroy:function(){
            console.log('markdown destroy');
        },
        appendTemplete:function(data){
            $('.contents').html(data);
            $('.importSect > textarea').on('change', function(e){
                $('.resultSect > textarea').val(Base.codeFormatting(e.target.value));
            });
        }
    }
    Controller.prototype.constructor = Controller;

    return Controller;
});