$.get('/ajax/category',function(d){
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
		}
	})
	// console.log(d.items[0].data.data);
},'json')