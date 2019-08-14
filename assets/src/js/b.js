function b(){
	alert(a);
	return 'b'
}
var UTIL = {
	trim: function(val){
		if(!val){
			return val
		};
		val = val.replace(/\s/g,'');
		return val
	}
}