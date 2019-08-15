// require.config({
// 	paths: {
// 		"jquery": "jquery",
// 		"a": "a",
// 		"b": "b",
// 		"jquery": "http://static.ickimg.com/assets/src/js/ickey/frontbom/frontbom"
// 	}
// })
require(['jquery','a','b'],function($,a,b){
	console.log(b.bb());
	console.log(UTIL.trim('aa bb cc'))
})


