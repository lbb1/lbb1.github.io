// require.config({
// 	// baseUrl: "js/lib",
// 	paths: {
// 		"jquery": "jquery",
// 		"a": "a",
// 		"b": "b",
// 		"jquery": "http://static.ickimg.com/assets/src/js/ickey/frontbom/frontbom"
// 	}
// })
console.log('加载成功...');
require(['jquery','a','b'],function($){
	console.log(b());
	console.log(UTIL.trim('aa bb cc'))
})


