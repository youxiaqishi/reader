$.get('/ajax/male',function(d){
	var windowWidth = $(window).width();
	if(windowWidth<320){
		windowWidth=320;
	}
	new Vue({
		el:'#app',
		data:{
			screenWidth:windowWidth,
			hot:d.items[0].data.data,
			recommend:d.items[1].data.data,
			new:d.items[2].data.data,
			over:d.items[3].data.data
		},
		methods:{
           }
	})
	// console.log(d.items[0].data.data);
},'json')