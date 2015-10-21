
var win = $(window);
var doc = $(document);
var body = $('body');

// 인풋 숫자 체크
$.fn.inputNumberCheck = function(type){
    return this.each(function(){
        var _this = $(this);
        _this.keydown(function(event){ // Tip : 파이어폭스의 경우 입력값이 한글일때 키코드가 제대로 들어가지 않음 (해결책 : ime-mode:disabled 셋팅)
            var e = event.which || event.charCode || event.keyCode;
            return (e==8 || e==9 || e==46 || (event.ctrlKey && e==65) || (event.ctrlKey && e==67) || (event.ctrlKey && e==86) || (event.ctrlKey && e==88) || (e>=37 && e<=40) || (e>=48 && e<=57) || (e>=96 && e<= 105));
        });
        // 가격일 경우 3자리 단위
        if(type === 'price'){   
            _this.val(_this.val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")).on({
                focusin : function(){$(this).val($(this).val().replace(/\,/g, ''))},
                focusout : function(){$(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"))}
            });
        }
    });
};

// 인풋 수량 박스
$.fn.inputCountBox =function(option){
    var option = $.extend({}, $.fn.inputCountBox.option, option); 
    return this.each(function(){
        var _this = $(this),
            _input = _this.find('input'),
            currentCnt = _input.val(), 
            btnPlus = _this.find('.'+option.plusClass),
            btnMinus = _this.find('.'+option.minusClass),
            tipMsg = '';

        function cautionAlert(msg){
            var tipMsg = '';
            tipMsg += '<div class="tip-wrap">\n';
            tipMsg += ' <span class="tip-arr"></span>\n';
            tipMsg += ' <div class="tip-layer">\n';
            tipMsg += '     <p class="infoMessage">'+msg+'</p>\n';
            tipMsg += '     <button class="tip-close btn-close10"><span>닫기</span></button>\n';
            tipMsg += ' </div>';
            tipMsg += '</div>';
            return tipMsg;
        }

        function upCount(){
            var topPos = $(this).outerHeight();
            var leftPos = $(this).position().left;

            var reCnt = parseInt(_input.val());
            if(reCnt >= option.max) return alert(option.cautionMax); 
            else return _input.val(reCnt +=1);

            _input.val(reCnt);
        }
        
        function downCount(){
            var reCnt = parseInt(_input.val());
            
            if(reCnt <= option.min) {
                var tiplayer = $('.tip-layer');
                var topPos = $(this).outerHeight();
                var leftPos = $(this).position().left + $(this).outerWidth()/2;
                cautionAlert(option.cautionMin, topPos, leftPos);
                
                if(_this.find('.tip-layer').length===0) _this.append(tipMsg).addClass('alert');
                _this.find('.tip-arr').css({display:'block',top:topPos,left:leftPos})
                _this.find('.tip-layer').css({display:'block',top:topPos+9,left:$(this).position().left });


            } else  {
                return _input.val(reCnt -=1);
            }
        }
        
        btnPlus.on({
            click : upCount,
//          keydown: upCount
        });

        btnMinus.on({
            click : downCount,
//          keydown: downCount
        });
    });
};
$.fn.inputCountBox.option = {
    plusClass       : 'plus',
    minusClass  : 'minus',
    min         : 0,
    max         : 100,
    cautionMin  : '1개 이상부터 구매하실 수 있습니다!',
    cautionMax  : '100개 이하로 구매하실 수 있습니다!'
};

$('.tmp-cnt-box').inputCountBox();




// Checkbox & Radio 
var checkWrapper = '.tmp-check label, .tmp-radio label';
var checkBoxTemp = '.tmp-check input, .tmp-radio input';

var addClassCheckBox = function(_input){
    $.each(_input,function(){
        var _this = $(this);
        var wrapper =_this.parent();
        if (_this.prop('checked')){
            if (_this.attr('type') === 'radio'){
                var radioName = _this.attr('name');
                $('input[name='+radioName+']').attr('checked', false).parent().removeClass('checked');
            }
            wrapper.addClass('checked');
            _this.attr('checked', true);
        } else {
            wrapper.removeClass('checked');
            _this.attr('checked', false);
        }
    });
};
doc.on('change', checkBoxTemp, function(){addClassCheckBox($(this));})
.on('mouseover focusin', checkBoxTemp, function(){$(this).parent().addClass('over')})
.on('mouseleave focusout', checkBoxTemp, function(){$(this).parent().removeClass('over')})
.on('mouseover', checkWrapper, function(){$(this).parent().addClass('over')})
.on('mouseleave', checkWrapper, function(){$(this).parent().removeClass('over')});

$.fn.placeHolder = function(option){}

// Selector & Combo
$.fn.gsSelect = function(option){
    var option = $.extend({}, $.fn.gsSelect.option, option); 
    return this.each(function(){

    var _this = $(this),
        seleCurrent = _this.find('.'+option.currentClass),
        seleCurrentA = _this.find('a.'+option.currentClass),
        seleOpenner = _this.find('.'+option.openClass),
        seleSelect = _this.find('select'),
        seleListBox = _this.find('ul'),
        seleOn = seleListBox.find('.'+option.onClass),
        seleList = seleListBox.find('li'),
        seleA = seleList.find('a'),
        seleLabel = seleList.find('label'),
        seleInput = seleList.find('input'),
        multiCheck = option.multiCheck === true ? true : (_this.hasClass('multi')) ? true : false,
        clicked = option.clicked === true ? true : (_this.hasClass('clicked')) ? true : false,
        docH = doc.height();
        
        
        // 현재값 세팅
        if(multiCheck != true && !_this.hasClass('img-type')){
            var listText = seleOn.length> 0 ? seleOn.text() : seleList.eq(0).text();
            var currentReset = seleListBox.length>0 ? $.trim(listText) : seleSelect.find(':selected').text();
            seleCurrent.text(currentReset);
        }
        // input on 체크
        seleInput.is(function(){
            if($(this).parent().hasClass(option.onClass)) $(this).prop('checked', true);
        });
        // 이미지 타입 clicked 설정
        if(_this.hasClass('img-type')) clicked = true;

        function seleFocusIn(){
            _this.addClass(option.focusClass);
        }
        function selefocusOut(){
            _this.removeClass(option.focusClass);   
        }
        function overOpt(){
            $(this).parent('li').addClass(option.overClass);
        }
        function outOpt(){
            $(this).parent('li').removeClass(option.overClass);
        }
        // 옵션 열기
        function showOpt(){
            $('.tmp-select.'+option.onClass).not(_this).removeClass(option.onClass);
            _this.toggleClass(option.onClass);
            selefocusOut();
            var currH = seleCurrent.height();
            var rePos = Math.floor(_this.offset().top + seleListBox.outerHeight(true)+seleCurrent.height());
            
            if(docH < rePos) seleListBox.addClass('up-mode');                                                                                                                                                                                                                                                                                                   
            if(_this.hasClass('img-type')){ // 이미지 타입일때 current 박스 사이즈의 변함에 따라 포지션 조정
                if(docH < rePos) seleListBox.css({top:'auto',bottom:currH});
                else seleListBox.css({top:currH});
            }
            // List on position 
            var onList = seleListBox.find('li.'+option.onClass);
            if(onList.length>0){
                seleListBox.scrollTop(0);
                var blank = parseInt(seleListBox.css('padding-top').split('px')[0]);
                var scrollMove = onList.position().top;
                seleListBox.scrollTop(scrollMove);
            }
            return false;
        }
        // 옵션 닫기
        function hideOpt(){
            if(multiCheck != true && clicked != true){
                _this.removeClass(option.onClass);
            }
            _this.removeClass(option.focusClass);
        }
        // 옵션 선택
        function selectOpt(){
            if(option.currChage === true){
                var seleOptTxt = _this.hasClass('img-type') ? _this.hasClass('only-txt') ? $(this).find('.opt-txt').text() : $(this).html() : seleLabel.length>0 ? $(this).parent().text() : $(this).text();
                
                if(!$(this).hasClass(option.disableClass) && !$(this).parent().hasClass(option.disableClass)){ 
                    if(multiCheck != true || seleLabel.length==0) {
                        seleCurrent.html($.trim(seleOptTxt)).removeClass(option.focusClass);
                        seleList.removeClass(option.onClass);
                        $(this).parent().addClass(option.onClass);
                    }
                }else{
                    //alert('해당 옵션은 선택할 수 없습니다!');
                    return false;
                }
            }
        }
        // 기본 셀렉터 체인지
        function selectChange(){
            var changeValue = $.trim($(this).find(':selected').text());
            seleCurrent.text(changeValue);
            seleFocusIn();
        }
        // 기본 셀렉터
        seleSelect.on({
            change : selectChange,
            keyup : selectChange,
            click : function(event){
                event.stopPropagation();
                showOpt();
                selefocusOut();
            },
            focusin : seleFocusIn,
            focusout : selefocusOut,
            mouseenter : function(){seleCurrent.addClass(option.overClass)},
            mouseleave : function(){seleCurrent.removeClass(option.overClass)}
        });
        // 옵션 OnOff
        seleCurrent.on({click:showOpt,focusin:seleFocusIn,focusout:selefocusOut});
        seleOpenner.on({click:showOpt});
        _this.on({mouseleave:function(){if(seleSelect.length == 0) hideOpt();}});
        
        // 키보드 tab
        seleList.last().on('focusout', function(){
            $(this).keydown(function(event){
                if(event.shiftKey==false && event.keyCode == 9){
                    _this.removeClass(option.onClass);
                }
            });
        });
        seleCurrentA.on('focusout', function(){
            $(this).keydown(function(event){
                if(event.shiftKey && event.keyCode == 9){
                    _this.removeClass(option.onClass);
                }
            });
        });
        seleList.click(function(event){
            if(multiCheck === true || $(this).hasClass(option.disableClass)) event.stopPropagation(); 
        });
        // Link 셀렉터
         seleA.on({click:selectOpt,focusin:overOpt,focusout:outOpt,mouseenter:overOpt,mouseleave:outOpt});
        // Form 셀렉터
        seleInput.on({change:selectOpt,focusin:seleFocusIn,focusout:selefocusOut});
        seleCurrentA.trigger('focusout');
        seleList.last().trigger('focusout');
        doc.on('click', function(){
            if(_this.hasClass(option.onClass)) _this.removeClass(option.onClass);
        });
    });
};
$.fn.gsSelect.option = {
    currentClass    : 'current', // 현재값
    openClass   : 'btn-opt', // 화살표 옵션버튼
    onClass     : 'on', 
    overClass       : 'over', 
    focusClass  : 'focus',
    disableClass    : 'disabled', // 비활성 리스트
    currChage   : true, // 선택값 변경 
    clicked     : false, // 클릭시 옵션 레이어 유지 
    multiCheck  : false // 여러 옵션 선택
};

// Tab On
$.fn.tabAddOn = function(){
    return this.each(function(){
        var _this = $(this);
        var tabList = _this.find('ul').length>0 ? _this.find('li') : _this.children();
        tabList.on('click', function(){
            if($(this).find('.blank').length==0){
                tabList.removeClass('on');
                $(this).addClass('on');
            }
            return false;
        });
    });
};

// Tip Layer
$('.zoom-tip').click(function(){
    var _this = $(this),
        topPos = _this.offset().top,
        leftPos = _this.offset().left,
        tipH = _this.outerHeight(),
        layerArr = $('.tip-arr'),
        zoomLayer = _this.find('.zoom-layer'),
        addLayerArr = '<span class="tip-arr" />';
    
    if(layerArr.length === 0) body.append(addLayerArr);

    if(_this.hasClass('on')) {
        $('.outModal').css({display:'none'}).removeClass('outModal').appendTo('.tabIndex-storage');
        layerArr.css({display:'none'});
        _this.removeClass('on');
    }
    else {
        $('.tip-arr').css({display:'block',top:topPos+tipH,left:leftPos+9});
        _this.addClass('on').addClass('tabIndex-storage');
        zoomLayer.addClass('outModal').appendTo('body').css({display:'block',top:topPos+tipH+9,left:leftPos-50});
    }
        
    /*
    if(layerArr.length === 0)_this.append(addLayerArr);
    if(_this.hasClass('on')) _this.removeClass('on');
    else _this.addClass('on');
    */
    
}); 


// 실행 펑션
$('.only-num').inputNumberCheck(); // Input Number
$('.only-price').inputNumberCheck('price'); // Input Price
$(checkBoxTemp).trigger('change'); // Checkbox & Radio
$('.tmp-select').gsSelect(); // Select
$('.tmp-tab').tabAddOn(); // Tab



    //  $('body').append('<input type="text" id="ddd" style="position:fixed;top:340px;left:30%;width:500px;height:50px;font-size:20px;border:2px solid red;z-index:10000">');

var ele = $('section .tmp-input, section .tmp-check, section .tmp-radio, section .tmp-select, section .tmp-btn, section .tmp-tab');
function ele_reset(){ele.removeClass('red green lime khaki gray light-gray');}
$('#change-reset').on('click', ele_reset);
$('#change-red').on('click', function(){ele_reset();ele.addClass('red');});
$('#change-green').on('click', function(){ele_reset();ele.addClass('green');});
$('#change-lime').on('click', function(){ele_reset();ele.addClass('lime');});
$('#change-khaki').on('click', function(){ele_reset();ele.addClass('khaki');});
$('#change-gray').on('click', function(){ele_reset();ele.addClass('gray');});
$('#change-lightgary').on('click', function(){ele_reset();ele.addClass('light-gray');});

var btn = $('#ico-box .tmp-btn'), b=0, c=0;

$('#icons').click(function(){
    var ico = $('#ico-box').find('.tmp-ico');
    ico.each(function(){
        var classN = $(this).attr('class');
        var aa = classN.split(' ')[1];
        var bb = aa.split('v')[1]>50 ? 0 : aa.split('v')[1];
        var cc = parseInt(bb)+1;
        var dd = classN.split(' ')[2] != null? classN.split(' ')[2] :"";
        
        chageClass = classN.split(' ')[0] +' v'+cc+' '+dd;
        $(this).attr('class', chageClass);
    });
});
    
$('#round').click(function(){
    var roundClass = ['round', 'round2', 'round3', 'round4', 'round5'];
    var deleteClass = 'round round2 round3 round4 round5';
    var cnt = b >= roundClass.length ? b=0 : b++;
    btn.removeClass(deleteClass);
    if(b !=0) btn.addClass(roundClass[cnt]);
});
$('#color').click(function(){
    var colorClass = ['red', 'green', 'lime', 'khaki', 'gray', 'light-gray'];
    var deleteClass = 'red green lime khaki gray light-gray';
    var cnt = c >= colorClass.length ? c=0 : c++;

    //console.log(c+" : "+colorClass.length+" = "+cnt);
    
    btn.removeClass(deleteClass);
    if(c !=0) btn.addClass(colorClass[cnt]);
});
$('#txt-bold').click(function(){
    btn.find('a, input, button').toggleClass('bold');
});

$('#gradient').click(function(){
    btn.toggleClass('gradient');
});

var btnClassNew = $('.tmp-btn *');

btnClassNew.on({
    mousedown : function(){$(this).parent().addClass('active')},
    mouseup : function(){$(this).parent().removeClass('active')},
    focusin : function(){$(this).parent().addClass('over')},
    focusout : function(){$(this).parent().removeClass('over')},
    mouseleave : function(){$(this).parent().removeClass('over')}
});