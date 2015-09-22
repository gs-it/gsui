define(function(){

	"use strict";

	var Disqus = function(){}
	Disqus.prototype = {
		reset:function(identifier, hashUrl){
			DISQUS.reset({
		        reload: true,
		        config: function () {  
		            this.page.identifier = initUrl;
		            this.page.url = root + initUrl;
		        }
		    });
		}
	}

	Disqus.prototype.constructor = Disqus;

	return Disqus;
});