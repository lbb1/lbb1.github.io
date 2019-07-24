console.log('加载成功...');
require(['jquery','b','a','c'],function(a){
	console.log(b());
	$.each([1,2,3],function(index,val){
		console.log(val)
	})
})


