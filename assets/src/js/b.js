define(['a'],function(){
	function bb(){
		alert(a);
		return 'b'
	};
	return {
		bb: bb
	}
})
var UTIL = {
	trim: function(val){
		if(!val){
			return val
		};
		val = val.replace(/\s/g,'');
		return val
	}
}