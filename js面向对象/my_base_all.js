/*基础类型扩展*/
(function($) {

	/**
	 * String 原型方法的扩展
	 */
	$.extend(String.prototype, {
		ltrim: function() {
			return this.replace(/(^\s*)/g, "");
		},
		format: function() {
			var args = $.makeArray(arguments),
				temp = this,
				need = false,
				font;
			if(args[0] === true) {
				font = '<font style="color:red;font-weight:bold">';
				need = true;
				args.shift(1);
			} else if(args[0] === false) {
				font = '<font style="color:green;font-weight:bold">';
				need = true;
				args.shift(1);
			}
			if(args.length === 0 || (args.length === 1 && (args[0] === null || args[0] === undefined))) {
				return temp.replace(/\{(\w+)\}/g, "");
			} else if(args.length !== 1 || typeof args[0] !== "object") {
				return temp.replace(/\{(\w+)\}/g, function(m, i) {
					var tempstr = args[i];
					if(tempstr === null || tempstr === undefined) tempstr = "";
					return tempstr !== "" && need === true ? (font + tempstr + '</font>') : tempstr;
				});
			}

		},
		/**
		 *替换全部s1 为s2
		 */
		replaceAll: function(s1, s2) {
			return this.replace(new RegExp(s1, "gm"), s2);
		},
		startWith: function(str) {
			return new RegExp("^" + str).test(this);
		}
	});

	/**
	 * Number 原型方法扩展
	 */
	$.extend(Number.prototype, {
		round: function(len, fouce) {
			debugger;
			if(len === undefined) {
				len = 0;
			}

			if(fouce !== true) {
				return Math.round(this * Math.pow(10, len)) / Math.pow(10, len);
			} else {
				var re = ("" + Math.round(this * Math.pow(10, len)) / Math.pow(10, len)).split("."),
					r = re[1] ? re[1] : "",
					l = r.length;
				for(var i = len; i > l; i--) {
					r += "0";
				}
				return re[0] + "." + r;
			}
		},
		/*转换为人名币大写字符串*/
		toUpperCase: function() {
			var n = this + "00",
				unit = "千百拾亿千百拾万千百拾元角分",
				str = "";
			var p = n.indexOf('.');
			if(p >= 0)
				n = n.substring(0, p) + n.substr(p + 1, 2);
			unit = unit.substr(unit.length - n.length);
			for(var i = 0; i < n.length; i++)
				str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
			return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
		}
	});

})(jQuery);