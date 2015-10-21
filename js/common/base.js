define(function(){
	"use strict";

	//String 가격(,) 추가 함수
	String.prototype.price = function(){
		var txt='';
		var str = this;
		var totalNum = str.length;

		for(var i=totalNum; i>0; i--){
			if(i % 3 == 0 && totalNum-i > 0){
				txt += ",";
			}
			txt += str.charAt(totalNum-i);
		}
		return txt;
	}


	//String 공백제거 함수
	String.prototype.trim = function(){
    	return this.replace(/(^\s+)|(\s+$)/g, "");
	}

	//userAgent Module
	var UserAgentChk = (function(){
		"use strict";

		var browser = '';
		var device = '';
		var version = '';
		var Agent = function(){
			var that = this;
			that.init();
		}

		Agent.prototype = {
			init:function(){
				var devicePattern = "win16|win32|win64|mac";
				var agentInfo = navigator.userAgent.toLowerCase();
				if (agentInfo.indexOf("chrome") != -1){
					browser = 'Chrome';
				}else if(agentInfo.indexOf("opera") != -1){
					browser = 'Opera';
				}else if(agentInfo.indexOf("firefox") != -1){
					browser = 'Firefox';
				}else if(agentInfo.indexOf("safari") != -1){
					browser = 'Safari';
				}else if(agentInfo.indexOf("msie") != -1){
					browser = 'IE';
					/*var re = new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");
					if (re.exec(agentInfo) != null){
						version = parseFloat(RegExp.$1);
					}*/
				}else{
					browser = 'IE';
				}

				if(navigator.platform){
				    if(devicePattern.indexOf(navigator.platform.toLowerCase())<0){
				    	device = 'MOBILE';
				    }else{
				    	device = 'PC';
				    }
				}

				version = $.browser.version;
			},
			getBrowser:function(){
				return {
					browser:browser,
					version:version
				}
			},
			getDevice:function(){
				return device;
			},
			getDeviceWidth:function(){
				return $(document).width();
			}
		}

		return new Agent();
	})();




	//static Base support
	var Support = {
		addEvent:function($target, evt, func){
			if(window.addEventListener || document.addEventListener){
				$target.addEventListener(evt, func);
			}else{
				$target.attachEvent('on'+ evt, func);
			}
		},
		removeEvent:function($target, evt, func){
			if(window.addEventListener){
				$target.removeEventListener(evt, func);
			}else{
				$target.detachEvent('on'+ evt, func);
			}
		},
	    touch : (window.Modernizr && Modernizr.touch === true) || (function () {
	        'use strict';
	        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
	    })(),
	    transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
        })(),
        transforms : (window.Modernizr && Modernizr.csstransforms === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
        })(),
        transitions : (window.Modernizr && Modernizr.csstransitions === true) || (function () {
            'use strict';
            var div = document.createElement('div').style;
            return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
        })()
	}

	//hashlink return Array;
	//params Object 형태로 주소뒤에 ?{ ... } 추가
	var GetUriSplit = function(uri){
        var pattern = /[#\/]/g;
        var linkSplit = uri.split('?');
        var arrHashLink = linkSplit[0].split(pattern);
        var splitHashLink = [];

        for(var i=0; i<arrHashLink.length; i++){
            if(arrHashLink[i] != '') splitHashLink.push(arrHashLink[i]);
        }

        return {
        	hashLink : splitHashLink,
        	params : linkSplit[1]
        };
	}


	//html 파일 로드
	var XhrLoader = function(url, callback){
		var xmlhttp = null;
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}else{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}

		xmlhttp.onreadystatechange=function(){
			if(this.readyState==4 && this.status == 200){
				callback(this.responseText);
			}else if(this.readyState==4 && this.status == 404){
				callback('page not found');
			}
		}

		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}


	//pre 태그 내에 있는 요소들의 (<>) 추출하여 &lt; &gt; 면환
	var CodeMarkdown = function(data){
		var contents = data;
	    var pattern = /(<pre class="(html|style|js)">)|(<\/pre>)/g;
	    var prePattern = /<pre/;
	    var removePattern = /^(html|js|style)$/;
	    var arrCode = contents.split(pattern);
	    var replaceIS = false;
	    var dataTxt = '';

	    for(var i=0; i<arrCode.length; i++){
	        if(removePattern.test(arrCode[i]) || arrCode[i] == undefined || arrCode[i] == null) arrCode[i] = '';
	        if(arrCode[i] == '<pre class="html">'|| arrCode[i] == '<pre class="js">' || arrCode[i] == '<pre class="style">') replaceIS = true;
	        if(arrCode[i] == '</pre>') replaceIS = false;

	        if(replaceIS){
	            if(!prePattern.test(arrCode[i])){
	                arrCode[i] = arrCode[i].replace(/</g, '&lt;').replace(/>/g, '&gt;');
	            }
	        }

	        dataTxt += arrCode[i];
	    }

	    return dataTxt;
	}



	var CodeFormatting = function(data){
		var val = data;
	    var element = /(<|<\/){1}(meta|title|link|script|noscript|style|embed|button|iframe|html|head|body|div|h1|h2|h3|h4|h5|ul|ol|li|dl|dt|dd|b|big|i|img|input|span|a|i|small|strong|em|section|nav|header|footer|p|form|fieldset|label|legend|table|tr|thead|tbody|td|tfoot|area|map)/g;
	    var depthPatt = /<\//;
	    var singleEle = /(<|<\/){1}(meta|link|img|input|br|hr|area|embed)/;	    
	    var trans = val.replace(/[\t\n]/g, '').replace(/</g, '\n<').replace(/>/g, '>\n').split('\n');
	    var result = '';
	    var depth = 0;
	    var currentTag = '';
	    var tagIS = true;

	    for(var i in trans){                
	        currentTag = element.test(trans[i]);
	        if(currentTag){
	            if(depthPatt.test(trans[i])){
	                depth--;
	                result += '\n' + space(depth) + trans[i];
	            }else{
	                result += '\n' + space(depth) + trans[i];
	                if(!singleEle.test(trans[i])){
	                    depth++;
	                }
	            }
	        }else{
	            if(trans[i]) result += '\n' + space(depth) + trans[i];
	        }
	    }

	    function space(len){
		    var depth = '';
		    for(var i=0; i<len; i++){
		        depth += '\t';
		    }
		    return depth;
		}

		return result;
	}
	

	return {
		agentChk:UserAgentChk,
		support:Support,
		loader:XhrLoader,
		getUriSplit:GetUriSplit,
		codeMarkDown:CodeMarkdown,
		codeFormatting:CodeFormatting
	};
});