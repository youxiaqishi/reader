var koa = require('koa');
var controller = require('koa-route');
// var router = controller();
var app = koa();
var views = require('co-views');
var render = views('./view',{
	map:{html:'ejs'}
});
var koa_static = require('koa-static-server');
var service = require('./service/webAppService.js');
app.use(koa_static({
	rootDir:'./static',
	rootPath:'/static/',
	maxage:0
}))

app.use(controller.get('/router_test', function*(){  
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = 'Hello koa!';
}));

app.use(controller.get('/ejs_test', function*(){   //渲染模板
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = yield render('test',{title:'title_test'});
}));


app.use(controller.get('/api_test', function*(){   //渲染模板
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = service.get_test_data();
}));

app.use(controller.get('/', function*(){   //模板主页面
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = yield render('index',{title:'书城首页'});
}));

app.use(controller.get('/book', function*(){   //书籍模板
	// await next();
	this.set('Cache-Control','no-cache');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book',{nav:'数据详情',bookId:bookId});
}));

app.use(controller.get('/search', function*(){   //搜索面板
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = yield render('search');
}));

app.use(controller.get('/reader', function*(){   //搜索面板
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = yield render('reader');
}));

app.use(controller.get('/male', function*(){   //男生面板
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = yield render('male',{nav:'男生频道'});
}));

app.use(controller.get('/female', function*(){   //女生面板
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = yield render('female',{nav:'女生频道'});
}));

app.use(controller.get('/rank', function*(){   //排行面板
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = yield render('rank',{nav:'排行'});
}));

app.use(controller.get('/category', function*(){   //分类面板
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = yield render('category',{nav:'分类频道'});
}));



app.use(controller.get('/ajax/index', function*(){   //主页路由
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = service.get_index_data();
}));

app.use(controller.get('/ajax/rank', function*(){   //排序接口
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = service.get_rank_data();
}));

app.use(controller.get('/ajax/bookbacket', function*(){   //书架接口
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = service.get_bookbacket_data();
}));

app.use(controller.get('/ajax/category', function*(){   //分类接口
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = service.get_category_data();
}));

app.use(controller.get('/ajax/female', function*(){   //女频接口
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = service.get_female_data();
}));

app.use(controller.get('/ajax/male', function*(){   //男频接口
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = service.get_male_data();
}));

app.use(controller.get('/ajax/book', function*(){   //书籍接口
	// await next();
	this.set('Cache-Control','no-cache');
	this.set('Access-Control-Allow-Origin', '*');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
    // console.log(id)
	// var id = window.location.href.split('?id=').pop();
	if(!id){
		id='';
	}	
	this.body = yield service.get_book_data(id);
}));
app.use(controller.get('/ajax/chapter_data', function*(){   //文章接口
	// await next();
	this.set('Cache-Control','no-cache');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
		id='';
	}
	this.body = service.get_chapter_content_data(id);
}));

app.use(controller.get('/ajax/chapter', function*(){   //书籍接口
	// await next();
	this.set('Cache-Control','no-cache');
	this.body = service.get_chapter_data();
}));

app.use(controller.get('/ajax/search', function*(){   //搜索接口
	// await next();
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var start = params.start;
	var count = params.count;
	var s = params.s;
	this.set('Cache-Control','no-cache');
	this.set('Access-Control-Allow-Origin', '*');
	this.body = yield service.get_search_data(start, count, s);
}));

app.listen(3001);
console.log('koa server is started');

