(function(win){
	var UTIL = function(){
	};
	/**
	*  基础配置
	*/
	UTIL.prototype.config = function(){
	};

    /**
    *  初始化
    */
    UTIL.prototype.init = function(){
        //禁止iframe 嵌套
        if(window.top !== window.self){
            window.top.location = window.location;
        };

        // 图片懒加载 基于 jquery.scrollLoading.js
        if($().scrollLoading){
            $("img.lazy").scrollLoading();
        };

    };


	/**
	*  解析URL参数
	*/
	UTIL.prototype.getUrlParams = function(){
		var query = window.location.search != ""? window.location.search.slice(1) : "",getObj = {};
        (function(){
            if(query == "") return ;
            var params = query.split("&");
            for(var p in params){
                var _str = params[p];
                if(_str != ""){
                    _str = _str + "";
                    var newArr = _str.split("=");
                    if(newArr.length == 2){
                        getObj[newArr[0]] = decodeURIComponent(newArr[1])
                    }else{
                        getObj[newArr[0]] = "";
                    }
                }
            }
        })();
        return getObj;
	};

	/**
	*  动态创建script标签
	*/
	UTIL.prototype.loadScript = function(_url,callback){
		var _script = document.createElement('script');
    	_script.type = 'text/javascript';
    	if(_script.readyState){
    		_script.onreadystatechange = function(){
    			if(_script.readyState == 'loaded' || _script.readyState == 'complete'){
    				_script.onreadystatechange = null;
    				callback();
    			}
    		}
    	}else{
    		_script.onload = function(){
    			callback();
    		}
    	};
    	_script.src = _url;
    	document.getElementsByTagName('head')[0].appendChild(_script);
	};

	/**
	*  document兼容性
	*/
	UTIL.prototype.docEle = function(){
		return document.documentElement || document.body;
	};

	/**
	*  获取窗口的可视区域宽度
	*/
	UTIL.prototype.getClientWidth = function(){
		return this.docEle().clientWidth
	};

	/**
	*  获取窗口的可视区域高度
	*/
	UTIL.prototype.getClientHeight = function(){
		return this.docEle().clientHeight
	};

	/**
	*  获取元素到文档左边和顶部的距离
	*/
	UTIL.prototype.getOffset = function(obj){
		var Left = 0;
		var Top = 0;
		while(obj){
			Left += obj.offsetLeft;
			Top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {left:Left,top:Top}
	};

	/**
	*  获取元素到文档左边的距离
	*/
	UTIL.prototype.getOffsetLeft = function(obj){
		return this.getOffset(obj).left;
	};

	/**
	*  获取元素到文档顶部的距离
	*/
	UTIL.prototype.getOffsetTop = function(obj){
		return this.getOffset(obj).top;
	};

	/**
	*  获取滚动条左边滚动距离
	*/
	UTIL.prototype.getScrollLeft = function(){
		return this.docEle().scrollLeft;
	};

	/**
	*  获取滚动条顶部滚动距离
	*/
	UTIL.prototype.getScrollTop = function(){
		return this.docEle().scrollTop;
	};

	/**
	*  获取鼠标离文档左边距离
	*/
	UTIL.prototype.getMouseLeft = function(ev){
		var ev = ev || window.event;
		return this.getScrollLeft + ev.clientX;
	};

	/**
	*  获取鼠标离文档顶部距离
	*/
	UTIL.prototype.getMouseTop = function(ev){
		var ev = ev || window.event;
		return this.getScrollTop + ev.clientY;
	};

	/**
	*  阻止事件冒泡的空函数
	*/
    UTIL.prototype.stopParentHandler = function(ev) {
        if(ev){
            ev.cancelBubble = true;
            ev.stopPropagation();
        }
    };

    /**
     * 名称：指定传入值是否为指定类型
     * @param obj 待检测的数据
     * @param type 目标类型
     */
    UTIL.prototype.isType = function (obj, type) {
        return Object.prototype.toString.call(obj) == "[object " + type + "]";
    };

    /**
     * 名称：获取指定值得类型名称
     * @param obj 值
     */
    UTIL.prototype.getTypeName = function (obj) {
        return Object.prototype.toString.call(obj).replace("[object ", "").replace("]", "");
    };

    /**
     * 名称：检测传入对象是否为数组类型
     * @param obj 待检测对象
     */
    UTIL.prototype.isArray = function (obj) {
        return this.isType(obj, "Array");
    };

    /**
     * 名称：检测传入对象是否为函数类型
     * @param obj 待检测对象
     */
    UTIL.prototype.isFunction = function (obj) {
        return this.isType(obj, "Function");
    };

    /**
     * 名称：检测传入对象是否为Object类型
     * @param obj 待检测对象
     */
    UTIL.prototype.isObject = function (obj) {
        return this.isType(obj, "Object");
    };

    /**
     * 名称：检测传入对象是否为Boolean类型
     * @param obj 待检测对象
     */
    UTIL.prototype.isBoolean = function (obj) {
        return this.isType(obj, "Boolean");
    };

    /**
     * 名称：检测传入对象是否为Date类型
     * @param obj 待检测对象
     */
    UTIL.prototype.isDate = function (obj) {
        return this.isType(obj, "Date");
    };

    /**
     * 名称：检测传入对象是否为String类型
     * @param obj 待检测对象
     */
    UTIL.prototype.isString = function (obj) {
        return this.isType(obj, "String");
    };

    /**
     * 名称：检测传入对象是否为Nummber类型
     * @param obj 待检测对象
     */
    UTIL.prototype.isNumber = function (obj) {
        return this.isType(obj, "Number");
    };

    /**
     * 名称：检测传入对象是否为空
     * @param obj 待检测对象
     */
    UTIL.prototype.isEmpty = function (obj) {
        var isEmpty = ( this.isArray(obj) && !obj.length ) || ( this.isObject(obj) && !Object.keys(obj).length ) || ( this.isString(obj) && obj == '' )
        return isEmpty;
    };

    /**
     * 名称：个位数转两位数
     * @param str 字符串
     */
	UTIL.prototype.toDouble = function( str ){
        if( str < 10 && str > 0 ) {
            return '0' + str;
        } else {
            return '' + str;
        }
	};

	/**
     * 名称：去掉字符串左边空格
     * @param str 字符串
     */
    UTIL.prototype.trimLeft = function( str ) {
        if( str ) {
            return str.replace(/^\s+/g, '');
        }else{
            return '';
        }
    };

    /**
     * 名称：去掉字符串右边空格
     * @param str 字符串
     */
    UTIL.prototype.trimRight = function( str ) {
        if( str ) {
            return str.replace(/\s$/g, '');
        }else{
            return '';
        }
    };

    /**
     * 名称：去掉字符串左右两边的空格
     * @param str 字符串
     */
    UTIL.prototype.trim = function( str ) {
        if( str ) {
            return this.trimRight(this.trimLeft( str ));
        } else {
            return '';
        }
    };

    /**
     * 名称：去掉指定字符串的所有空格
     * @param str 字符串
     */
    UTIL.prototype.trimAll = function( str ) {
        if( str ) {
            return str.replace(/\s+/g, '');
        } else {
            return '';
        }
    };

    /**
     * 名称：设置localstorage
     * @param val 待检测的数据
     */
    UTIL.prototype.setItem = function (key, val) {
        return win.localStorage.setItem(key, val);
    };

    /**
     * 名称：获取指定localstorage的value值
     * @param val 待检测的数据
     */
    UTIL.prototype.getItem = function (val) {
        return win.localStorage.getItem(val) || null;
    };

    /**
     * 名称：删除指定localstorage的value值
     * @param val 待检测的数据
     */
    UTIL.prototype.removeItem = function (val) {
        return win.localStorage.removeItem(val);
    };

    /**
     * 名称：保留两位小数且不四舍五入
     * @param str 传入的字符串
     */
	UTIL.prototype.toFixed = function(str){
		var arr = str.toString().split('.');
        if( arr.length > 1 ){
            if( arr[1].length == 1 ){
                return arr[0] + '.' + arr[1] + '0';
            }else if( arr[1].length == 2 ){
                return arr[0] + '.' + arr[1];
            }else{
                return arr[0] + '.' + arr[1].substring(0, 2);
            }
        }else{
            return str + '.00';
        }
	};

	/**
     * 名称：始终返回一个数组,如果传入参数是数组则直接返回,否则将不为null的传入参数作为新数据的项进行返回
     * @param arr 数组或者非数组变量
     */
    UTIL.prototype.sureArray = function(arr) {
        if(typeTest.isArray(arr)){
            return arr;
        }else if(arr != null){
            return [arr];
        }else {
            return [];
        }
    };

	/**
     * 名称：返回某一项在数组中存在的位置
     * @param arr 数组对象
     * @param row 要查找的数组项
     */
    UTIL.prototype.indexOf = function(arr, row) {
        var index = -1;
        var arr = this.sureArray(arr);
        if(arr.indexOf){
            index = arr.indexOf(row);
        }else{
            this.each(arr, function(item, i) {
                if (item == row) {
                    index = i;
                    return false;
                }
            });
        }
        return index;
    };

    /**
     * 名称：数组中是否包含某一项
     * @param arr 数组对象
     * @param row 要查找的数组项
     */
    UTIL.prototype.contains = function(arr, row) {
        return this.indexOf( arr, row ) > -1;
    };

    /**
     * 名称：删除数组中的某一项
     * @param arr 数组对象
     * @param row 要删除的数组项
     */
    UTIL.prototype.del = function(arr, row){
        var arr = this.sureArray( arr );
        var index = this.indexOf(arr, row);
        if( index > -1 ){
            arr.splice(index, 1);
        }
        return arr;
    };

    /**
     * 名称:性能循环遍历方法
     * @param arr 数组
     * @param handler 处理函数
     */
    UTIL.prototype.each = function (arr, handler) {
        var arr = this.sureArray(arr);
        if(arr.length > 500){
            return this.blockEach(arr, handler);
        }else{
            for(var i = 0, k = arr.length; i < k; i++) {
                if(handler(arr[i], i) === false){
                    break;
                }
            }
        }
    };

    /**
     * 名称:海量数据循环遍历方法
     * @param arr 海量级数据 数组
     * @param handler 处理函数
     */
    UTIL.prototype.blockEach = function(arr, handler){
        if( !typeTest.isFunction(handler) ) return;
        var arr = this.sureArray(arr);
        var length = arr.length, it = Math.floor( length / 8), others = length % 8, i = 0;
        //余数大于0时，继续运行
        if( others > 0 ){
            do{ handler( arr[i++], i ) } while(--others > 0);
        }
        var ifBreak = false;
        var eachHandler = function (row, i) {
            if (ifBreak) { return; }
            ifBreak = handler(row, (i - 1)) === false;
        }
        while (iterations > 0) {
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            eachHandler(rows[i++], i);
            if (ifBreak) { break; }
            iterations--;
        }
        handler = null;
    };

    /**
     * 名称：手机号码检测
     * @param val 待检测的数据
     */
    UTIL.prototype.regMobile = function (val,code) {
        var mobile = /^1[3|4|5|6|7|8|9]\d{9}$/;
        /*香港*/
        if(code == "0852" || code== "852"){
            mobile = /^\d{8}$/;
        };
        /*台湾*/
        if(code == "0886" || code== "886"){
            mobile = /^\d{10}$/
        };
        /*澳门*/
        if(code == "0853" || code== "853"){
            mobile = /^\d{8}$/
        };
        return mobile.test(val);
    };

    /**
     * 名称：邮箱检测
     * @param val 待检测的数据
     */
    UTIL.prototype.regMail = function (val) {
        var mail = /^[a-zA-Z0-9._%-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;
        return mail.test(val);
    };

    /**
     * 名称：汉字检测
     * @param val 待检测的数据
     */
    UTIL.prototype.regChinese = function (val) {
        var chinese = /^[\u4E00-\u9FFF]+$/;
        return chinese.test(val);
    };

    /**
     * 名称：身份证检测
     * @param val 待检测的数据
     */
    UTIL.prototype.regIdCard = function (val) {
        var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; // 15位
        var isIDCard2 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; // 18位
        return isIDCard1.test(val) || isIDCard2.test(val);
    };

    /**
     * 名称：银行卡号检测
     * @param val 待检测的数据
     */
    UTIL.prototype.regBankCard = function (val) {
        var isbankCard =  /^(\d{16}|\d{19})$/;
        return isbankCard.test(val);
    };

    /**
     * 名称：是否纯数字
     * @param val 待检测的数据
     */
    UTIL.prototype.regNumber = function (val) {
        var reg = new RegExp("^[0-9]*$");
        if(reg.test(val)){
            return true;
        };
        return false;
    };

    /**
     * 名称：get方法
     */
    UTIL.prototype.getData = function(){
        var args = Array.prototype.slice.apply(arguments);
        args.unshift('GET');
        return this.ajax.apply(this, args);
    };

    /**
     * 名称：post方法
     */
    UTIL.prototype.postData = function(){
        var args = Array.prototype.slice.apply(arguments);
        args.unshift('POST');
        return this.ajax.apply(this, args);
    };
    UTIL.prototype.ajax = function(type, url, data, successCallback, errorCallback){
        var _this = this, arg = arguments;
            type = type || 'GET',
            data = data || {},
            successCallback = successCallback || function(){},
            errorCallback = errorCallback || function(){};
        var ajaxData = {
            url: url,
            cache: false,
            type: type,
            data: data,
            dataType: 'json',
            timeout: 20000,
            beforeSend: function(){
            },
            complete: function(){
            },
            success: function(json){
                successCallback.call(_this, json);
            },
            error: function(xhr, type, errorThrown){
                errorCallback.call(xhr)
                if( type == 'timeout' ){
                }
            }
        };
        return $.ajax(ajaxData);
    };

    /*
     *  将表单系列化后的键值对内容转为json
     *  a=1&b=2&c=3&d=4&e=5
     *  转化后=>
     *  [
     *    {name: 'firstname', value: 'Hello'},
     *    {name: 'lastname', value: 'World'},
     *    {name: 'alias'}, // 值为空
     *  ]
     */
    UTIL.prototype.serializeObject = function(id) {
        var o = {};
        this = $('#'+id);
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    /**
    *  字符串截取 替换为...
    */
    UTIL.prototype.limit = function(str, len) {
        //截取字符串，多余的部分用...代替
        var strlen = 0;
        var s = "";
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                strlen += 2;
            } else {
                strlen++;
            }
            s += str.charAt(i);
            if (strlen >= len) {
                return s + "...";
            }
        }
        return s;
    };

    // 将浮点数、整数等转化为以逗号形式的记数法
    $.parseTernary = function(val) {
        var str = val;
        if (typeof str != "number" || typeof str != "string") {
            str = str.toString();
        }
        return str.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('');
    };



	win.UTIL = new UTIL();
})(window)