/*给jQuery对象绑定一个新方法是通过扩展$.fn对象实现的。
 * 最终，我们得出编写一个jQuery插件的原则：

给$.fn绑定函数，实现插件的代码逻辑；
插件函数最后要return this;以支持链式调用；
插件函数要有默认值，绑定在$.fn.<pluginName>.defaults上；
用户在调用时可传入设定值以便覆盖默认值
 * */
$.fn.highlight1 = function() {
	// this已绑定为当前jQuery对象:
	this.css('backgroundColor', '#fffceb').css('color', '#d85030');
	return this;
}

/*我们可以给方法1加个参数，让用户自己把参数用对象传进去。于是我们有了第二个版本的highlight2()：*/
$.fn.highlight2 = function(options){
	// 要考虑到各种情况:
    // options为undefined
    // options只有部分key
    //对于默认值的处理，我们用了一个简单的&&和||短路操作符，总能得到一个有效的值。
    
    /*
     *另一种方法是使用jQuery提供的辅助方法$.extend(target, obj1, obj2, ...)，
     * 它把多个object对象的属性合并到第一个target对象中，遇到同名属性，总是使用靠后的对象的值，也就是越往后优先级越高：
     * */
    var bgcolor = options && options.backgroundColor || '#fffceb';
    var color = options && options.color || '#d85030';
    this.css('backgroundColor', bgcolor).css('color', color);
    return this;
	
}

	/*
     *另一种方法是使用jQuery提供的辅助方法$.extend(target, obj1, obj2, ...)，
     * 它把多个object对象的属性合并到第一个target对象中，遇到同名属性，总是使用靠后的对象的值，也就是越往后优先级越高：
     * */
$.fn.highlight3 = function(options){
    // 把默认值和用户传入的options合并到对象{}中并返回:
	var opts = $.extend({}, {
	    backgroundColor: '#fffceb',
	    color: '#d85030'
	}, options);
    this.css('backgroundColor', opts.backgroundColor).css('color', opts.color);
    return this;
	
}


/*
 * 最终版的
 */

$.fn.highlight = function (options) {
    // 合并默认值和用户设定值:
    var opts = $.extend({}, $.fn.highlight.defaults, options);
    this.css('backgroundColor', opts.backgroundColor).css('color', opts.color);
    return this;
}
// 设定默认值:
$.fn.highlight.defaults = {
    color: '#d85030',
    backgroundColor: '#fff8de'
}

$.fn.external = function(){
	this.filter('a').each(function(){
		var $a = $(this);
		var url = $a.attr('href');
		if(url && (url.indexOf('http://')===0 || url.indexOf('https://')===0)){
			$a.attr('href','#0').removeAttr('target').click(
				function(){
					if(confirm('确认要前往'+url+'?')){
						window.open(url);
					}
				}
			);
		}
	});
}

/**
 * 直接将方法用extend()扩展到$.fn中
 */
$.fn.extend({
	turnRed:function(){
		return $(this).css("color","red");
	},
	turnGreen:function(){
		return $(this).css("color","green");
	}
});

