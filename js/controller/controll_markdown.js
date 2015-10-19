define(['base'], function(Base){
        
    "use strict";

    var Controller = function(){}
    Controller.prototype = {
        destroy:function(){
            console.log('markdown destroy');
        },
        xhrCallBack:function(data){
            $('.contents').html(data);
            $('.importSect > textarea').on('change', function(e){
                $('.resultSect > textarea').val(Base.codeCleaning(e.target.value));
            });
        }
    }
    Controller.prototype.constructor = Controller;

    return Controller;
});