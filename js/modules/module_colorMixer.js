define(function(){
	var Mixer = function(_firstHex, _lastHex, _mixGap){
		if(!_firstHex || !_lastHex) return;

		var that = this;
		var mixGap = (_mixGap) ? _mixGap : 100;
		var firstHex = _firstHex;
		var lastHex = _lastHex;
		var firstRgb = hexToRgb(firstHex).split(',');
		var lastRgb = hexToRgb(lastHex).split(',');
		var arrMixHex = [];

		//Color Mixer
		for(var i=0; i<3; i++){
			var betweenNum = (parseInt(lastRgb[i]) - parseInt(firstRgb[i])) / (mixGap - 1);
			var colorCode = parseInt(firstRgb[i]);
			var arrColorHex = new Array();

			for(var j=0; j<mixGap; j++){
				arrColorHex.push(Math.round(colorCode));
				colorCode += betweenNum;
			}
			//arrColorHex.push(parseInt(lastRgb[i]));
			arrMixHex.push(arrColorHex);
		}

		//Mix RGB TO HEX
		that.arrMixHexCode = [];
		for(var a=0; a<mixGap; a++){
			var hexCode = '#' + rgbToHex(arrMixHex[0][a]) + rgbToHex(arrMixHex[1][a]) + rgbToHex(arrMixHex[2][a]);
			that.arrMixHexCode.push(hexCode);
		}
	}

	function rgbToHex(decimal,places){

		if(places == undefined || isNaN(places))  places = 2;
		var hex = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
		var next = 0;
		var hexidecimal = "";
		decimal = Math.floor(decimal);

		while(decimal > 0){
			next = decimal % 16;
			decimal = Math.floor((decimal - next)/16);
			hexidecimal = hex[next] + hexidecimal;
		}

		while(hexidecimal.length<places){
			hexidecimal = "0"+hexidecimal;
		}

		return hexidecimal;
	}

	function hexToRgb(hex){
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16):null
	}
	

	Mixer.prototype = {
		getArrMixHex : function(){
			var that = this;
			return that.arrMixHexCode;
		}
	}
	Mixer.prototype.constructor = Mixer;

	return Mixer;
});