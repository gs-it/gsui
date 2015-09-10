define(function(){
	"use strict";
	
	var PagiNation = function(select, param){
		var params = {
			totalList:1000,
			pagePerView:30,
			pagePerBlock:10,
			onPageChangeStart:null
		}	

		var opts = $.extend({}, params, param);
		var _that = this;
		var $container = $(select);

		_that.totalListView = 0;
		_that.totalListBlock = 0;
		_that.currentPage = 1;
		_that.currentBlock = 0;
		_that.totalList = opts.totalList;
		_that.pagePerView = opts.pagePerView;
		_that.pagePerBlock = opts.pagePerBlock;
		_that.pageHalf = 0;

		_that.setPaging = function(){
			var numbering = '';
			var prevBlockPage = (_that.currentPage - _that.pagePerBlock > 0) ? _that.currentPage - _that.pagePerBlock : 1;
			var nextBlockPage = (_that.currentPage + _that.pagePerBlock < _that.totalListView) ? _that.currentPage + _that.pagePerBlock : _that.totalListView;
			var startNum = (_that.currentPage > _that.pageHalf) ? ((_that.currentPage < _that.totalListView - _that.pageHalf) ? _that.currentPage - _that.pageHalf : _that.totalListView - (_that.pagePerBlock - 1)) : 1;
			var loopPageNum = (_that.totalListBlock > 1) ? startNum + _that.pagePerBlock : _that.totalListView + 1;
			_that.currentBlock = Math.floor(_that.currentPage / _that.pagePerBlock);
			$container.empty();

			if(startNum <= 0) startNum = 1;
			if(_that.totalListBlock > 1 && _that.currentPage > _that.pageHalf + 1) numbering += '<a href="1" class="btn go-first"></a><a href="'+prevBlockPage+'" class="btn go-prev"></a>';
			for(var i=startNum; i<loopPageNum; i++){
				if(i == _that.currentPage) numbering += '<strong>'+i+'</strong>';
				else numbering += '<a href="'+i+'">'+i+'</a>';
			}
			if(_that.totalListBlock > 1 && _that.currentPage < _that.totalListView - _that.pageHalf) numbering += '<a href="'+nextBlockPage+'" class="btn go-next"></a><a href="'+_that.totalListView+'" class="btn go-last"></a>';

			$container.html(numbering);
			_that.addEvent();
		}
		_that.addEvent = function(){
			var $btn = $container.find('a');
			$btn.on('click', function(e){
				e.preventDefault();
				var getCode = parseInt($(this).attr('href'));
				if(_that.currentPage != getCode){
					$(this).blur();
					_that.currentPage = getCode;
					if(typeof opts.onPageChangeStart == 'function') opts.onPageChangeStart(_that);
				}else{
					console.log('같은거');
				}
			});
		}
	}

	PagiNation.prototype = {
		init:function(){
			var _that = this;
			_that.totalListView = Math.ceil(_that.totalList / _that.pagePerView);
			_that.totalListBlock = Math.ceil(_that.totalListView / _that.pagePerBlock);
			_that.pageHalf = Math.floor(_that.pagePerBlock/2);
			_that.setPaging();

			return _that;
		},
		reInit:function(){
			var _that = this;
			_that.currentPage = 1;
			_that.currentBlock = 1;
			_that.init();
		},
		setCurrentPage:function(_param){
			var _that = this;
			_that.currentPage = _param;
			_that.setPaging();
		},
		getCurrentPage:function(){
			var _that = this;
			return _that.currentPage;
		},
		setCurrentBlock:function(_param){
			var _that = this;
			_that.currentBlock = _param;
			_that.setPaging();
		},
		getCurrentBlock:function(){
			var _that = this;
			return _that.currentBlock;
		}
	}

	PagiNation.prototype.constructor = PagiNation;
	return PagiNation;
});


//Getting Started With Ajax PagiNation
/*

var pagiNation = new PagiNation('.paging', {
	totalList:1000,
	onPageChangeStart:function(pagiNation){
		pagiNation.setPaging();
	}
}).init();*/


/*
<p class="paging typeA">
	<a href="#" class="btn go-first"></a>
	<a href="#" class="btn go-prev"></a>
	<a href="#" class="on">1</a>
	<a href="#" class="on">2</a>
	<a href="#" class="on">3</a>
	<a href="#" class="on">4</a>
	<a href="#" class="on">5</a>
	<a href="#" class="on">6</a>
	<a href="#" class="on">7</a>
	<a href="#" class="on">8</a>
	<a href="#" class="on">9</a>
	<a href="#" class="on">10</a>
	<a href="#" class="btn go-next"></a>
	<a href="#" class="btn go-last"></a>
</p>

var paging = new Paging('.paging', {
	totalList:1000,
	pagePerView:30,
	pagePerBlock:5,
	pageCallBack:function(){}
});
*/