/*
* @Author: Administrator
* @Date:   2017-08-13 10:04:06
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-13 17:19:32
*/
// http://dushu.xiaomi.com/store/v0/lib/query/onebox?start=0&count=10&s=123&source=2%2C5
//   var getUrlParam = function(name){
//      var reg = new RegExp('(^|&)' + name +'=([^&]*)(&|$)');
//      var result = window.location.search.substr(1).match(reg);
//      return result ? decodeURIComponent(result[2]) : null;
//   }

//   var page = {

//     	data : {
//            keyword : getUrlParam('s') || '小',
//            start   : getUrlParam('start') || 0,
//            count   : getUrlParam('count') || 10
//     	},

// 	    init: function(){
// 	    	this.bindEvent();
// 	    	this.onLoad();
// 	    },
// 	    bindEvent : function(){
// 	    	var _this = this;
// 	        $('.search-input__btn').click(function(){
// 	            _this.data.keyword = $.trim($('#keyword').val());
// 	            _this.onLoad();
// 	        });   
// 	    },
// 	    onLoad: function(){
// 	    	var _this = this;
// 			$.get('/ajax/search?s='+(_this.data.keyword),function(d){
// 				var windowWidth = $(window).width();
// 				if(windowWidth<320){
// 					windowWidth = 320;
// 				}
// 				new Vue({
// 					el:'#search',
// 					data:{
// 						d:d,
// 			            screenWidth:windowWidth
// 					},

// 				})
// 				debugger
// 			},'json');
// 	    }
//   };
// $(function(){
// 	page.init();
// })
var windowWidth = $(window).width();
   if(windowWidth<320){
	windowWidth = 320;
	}
new Vue({
	el: '#search',
	data : {
		search:[],
		condition:true,
		empty: false,
		screenWidth:windowWidth
	},
	methods: {
		doSearch: function(e){
			var keyword = $.trim($('#keyword').val());
			var _this = this;
			$.get('/ajax/search',{
				s : keyword 
			},function(d){
				_this.condition = false;
				_this.search = d.items;
				if(_this.search.length === 0){
					_this.empty = true;
				}else{
					_this.empty = false;
				}
			}, 'json');
		}
	}
})
