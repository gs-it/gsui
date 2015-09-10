define(['modules/module_slider', 'modules/module_colorMixer'], function(Slider, ColorMixer){
	"use strict";

	//multi colormixer
	var ColorPicker = function(selector, color, gap){

		if(!selector || typeof color != 'object') throw new Error("잘못된 parameter 입니다.");
		var _that = this;

		_that.$container = $(selector);
		_that.$tabBtn = _that.$container.find('[data-type=btn]');
		_that.$colorBox = _that.$container.find('[data-type=change]');
		_that.$track = _that.$container.find('[data-type=track]');
		_that.$slider = _that.$track.parent();

		_that.arrColor = color;
		_that.mixGap = (!gap) ? 10:gap;
		_that.totalMixGap = _that.mixGap * (_that.arrColor.length - 1);
		_that.gapWidth = (100 / _that.mixGap) / (_that.arrColor.length - 1);
		_that.arrMixColor = [];

		return _that;
	}
    
   

    ColorPicker.prototype = {
    	init:function(){
    		var _that = this;
		    for(var i=0; i<_that.arrColor.length - 1; i++){
		        var colorMixer = new ColorMixer(_that.arrColor[i], _that.arrColor[i+1], _that.mixGap);
		        for(var j=0; j<_that.mixGap; j++){
		            var dom = '<em style="width:'+ _that.gapWidth +'%; background-color:' + colorMixer.arrMixHexCode[j] + ';"></em>';
		            _that.$track.append(dom);
		            _that.arrMixColor.push(colorMixer.arrMixHexCode[j]);
		        }
		    }

		    return _that;
		},
		addSlider:function(){
			var _that = this;
			var slider = new Slider(_that.$slider, function(percent){
		        var colorIndex = Math.floor((percent * _that.totalMixGap) / 100);
		        _that.$tabBtn.css({'left':percent + '%'});
		        _that.$colorBox.css({'background':_that.arrMixColor[colorIndex]});
		    });

		    return _that;
		}
    }

	ColorPicker.prototype.constructor = ColorPicker;
	return ColorPicker;
});