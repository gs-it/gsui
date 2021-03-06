define(['base'], function(Base){
	"use strict";

    var Router = function(){
        var _that = this;
        _that.routes = {};
        _that.controllerID;
        _that.currentController;
        _that.script;
        _that.css;
        return _that;
    }

    Router.prototype = {
    	init:function(){
            var _that = this;
    		Base.support.addEvent(window, 'hashchange', function(e){
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
            var ID = (_that.routes[path]) ? path : 'normal';

            _that.controllerID = _that.routes[ID].controller;
            _that.script = _that.routes[ID].script;
            _that.css = _that.routes[ID].css;

            require([_that.controllerID], function(Module){

                //templete loadTemplete 함수 확장
                Module.prototype.loadTemplete = function(hashLink){
                    var objHashLink = Base.getUriSplit(hashLink);
                    var params = objHashLink.params;
                    if(_that.controllerID) Base.loader('source/'+objHashLink.hashLink[0]+'/'+objHashLink.hashLink[1]+'.html', this.appendTemplete);
                    if(_that.script) Base.loader(_that.script, this.appendScript);
                    if(_that.css) Base.loader(_that.css, this.appendStyle);
                    return this;
                }

                _that.currentController = new Module();
                _that.currentController.loadTemplete(hash);
            });

            //google analytics page hash
            ga('send', hash);

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