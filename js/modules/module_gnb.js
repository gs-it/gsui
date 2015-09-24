define(['base'], function(Base){

	"use strict";

	function touchCallback(per){
		console.log(per);
	}

	var Gnb = function(){
		var _that = this;
		_that.target = $('[data-type=btn]');
		_that.attrSetup = $('[data-type=btn]').attr('data-setup');
		_that.setup = eval('(' + _that.attrSetup + ')');

		_that.evtTarget = $('[data-type='+ _that.setup.evtTarget +']');
		_that.actClass = _that.setup.actClass;
		_that.init();
	}

	Gnb.prototype = {
		init:function(){
			var _that = this;

			Base.support.addEvent(_that.target[0], _that.setup.evtType, function(e){
		        if(_that.evtTarget.hasClass(_that.actClass)) _that.evtTarget.removeClass(_that.actClass);
				else _that.evtTarget.addClass(_that.actClass);
		    });
		}
	}

	Gnb.prototype.constructor = Gnb;
	return Gnb;
});