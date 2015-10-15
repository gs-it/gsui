define(['base'], function(Base){
	"use strict";

    var Router = function(){
        var _that = this;
        _that.routes = {};
        _that.currentController;
        _that.controllerID;
        return _that;
    }

    Router.prototype = {
    	init:function(){
            var _that = this;
    		Base.support.addEvent(window, 'hashchange', function(e){
                //var hash = e.newURL.split(root)[1];
                _that.destroy();
                _that.loadController();
                $(document).scrollTop(0);
            });

            return _that;
    	},
        registerRoutes:function(routes) {
            var _that = this;

            for (var route in routes) {
                if (routes.hasOwnProperty(route)) {
                    _that.routes[route] = routes[route];
                }
            }
            return _that;
        },
        loadController:function(){
            var _that = this;
            var hash = (window.location.hash == '') ? '#/html/convention' : window.location.hash;
            var path = window.location.hash.split('/')[1];
            _that.controllerID = (_that.routes[path]) ? _that.routes[path].controller : _that.routes['normal'].controller;

            require([_that.controllerID], function(Module){

                //templete loadTemplete 함수 확장
                Module.prototype.loadTemplete = function(hashLink){
                    var _that = this;
                    var objHashLink = Base.getUriSplit(hashLink);
                    var params = objHashLink.params;
                    Base.loader('source/'+objHashLink.hashLink[0]+'/'+objHashLink.hashLink[1]+'.html', _that.xhrCallBack);
                    return _that;
                }

                _that.currentController = new Module();
                _that.currentController.loadTemplete(hash);
            });

            return _that;
        },
        destroy:function(){
            var _that = this;
            _that.currentController.destroy();
            _that.currentController = null;
        }
    }
    Router.prototype.constructor = Router;

    return new Router();
});