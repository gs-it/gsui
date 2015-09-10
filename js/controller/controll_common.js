define(['base'], function(Base){
	"use strict";
	
	var Common = function(){}
	Common.prototype = {
		scroll:function(){
			//console.log('scroll');
		},
		touchend:function(){
			//console.log('touchend');
		}
	}

	Common.prototype.constructor = Common;

	return Common;
});