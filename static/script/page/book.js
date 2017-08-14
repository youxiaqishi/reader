var id = location.href.split('?id=').pop();
$.get('/ajax/book?id='+id,function(d){
    var windowWidth = $(window).width();
	if(windowWidth<320){
		windowWidth=320;
	}
	new Vue({
		el:'#app',
		data:{
			d:d,
            screenWidth:windowWidth
		},
		methods:{
           readBook:function(){
           	location.href = "/reader"
           }
		}
	})
},'json')