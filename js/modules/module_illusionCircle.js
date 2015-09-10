define(['jquery', 'Base'], function($, Base){
    "use strict";
    
    //직선운동을 원운동으로 보이는 착시 효과
    //예전 circle illusion 유투브 동영상을 보고 신기해서 구연해본 착시효과

    var $circleCon, $circle, len, rw, rh;
    var arrPos = [];
    var counter = 0;

    var IllusionCircle = function(selector){
        if(!selector) throw new Error('잘못된 selector 입니다.');

        $circleCon = $(selector);
        return this;
    }

    IllusionCircle.prototype = {
        init:function(){
            // circle illusion 초기화
            $circle = $circleCon.children();
            len = $circle.length * 2;
            rw = ($circleCon.width() / 2); //원 반지름 width
            rh = ($circleCon.height() / 2); //원 반지름 height
            arrPos = [];
            counter = 0;


            //직선운동 이동 좌표
            $circle.each(function(i){
                var radian = (360 / len) * i * Math.PI/180;
                var posX = Math.round(rw * Math.cos(radian));
                var posY = Math.round(rh * Math.sin(radian));
                var array = [];
                array[0] = posX;
                array[1] = posY;
                arrPos.push(array);
            });

            animate(); //illusion 실행
        }
    }

    function animate(){
        if(counter > $circle.length - 1) counter = 0;
        active($circle.eq(counter), arrPos[counter][0], arrPos[counter][1], 4, counter);
        counter++;
        setTimeout(animate, 400);
    }

    function active($target, posX, posY, duration, index){
        var translate = null;
        var timer = null;

        if(Base.support.transforms3d || Base.support.transforms){
            if(Base.support.transforms) translate = 'translate(' + posX + 'px,' + posY + 'px)';
            if(Base.support.transforms3d) translate = 'translate3d(' + posX + 'px, ' + posY + 'px, 0)';

            $target.css({
                '-moz-transition': 'all ' + duration + 's', 
                '-moz-transform': translate, 
                '-ms-transition': 'all ' + duration + 's', 
                '-ms-transform': translate, 
                '-webkit-transition': 'all ' + duration + 's', 
                '-webkit-transform': translate, 
                'transition': 'all ' + duration + 's', 
                'transform': translate
            });
        }

        arrPos[index][0] = -posX;
        arrPos[index][1] = -posY;
    }

    IllusionCircle.prototype.constructor = IllusionCircle;

    return IllusionCircle;
});