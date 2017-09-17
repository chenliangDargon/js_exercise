
/**
 *  oxhide基础库     更新于2013.07.26
 *
 *  该js必须在jquery之后,其他js之前
 *  -------------------------------------------------------------------------------------------------------------------------------
 *  |对window、String、Array、jQuery、jqGrid、lhgdialog、jquery ui、下拉框进行扩展,初始化页面元素、加载页面必须css资源、定义页面最高级别变量|
 *  ----------------------------------------------------------------------------------------------------------------------------------
 * 方法、属性名开头是_的,表示不建议外部使用的方法、属性
 * 
 * 这里仅列出方法概述，具体用法需要定位到方法定义处，看详细注释
 *
 * 一：页面最高级别变量初始化
 *  -------------------------------------------------
 *  window.dg ;                     弹出框中使用,表示弹出框本身,可以调用弹出框方法： dg.addBtn dg.disableBtn 等方法
 *  window.father = api.opener;     弹出框中使用,表示父窗体的window对象
 *  window.basePath;   相当于jsp中的${basePath}
 *  window.dwrObject;  本页面dwr对象的名称,默认"DWRBaseClass",可以重写
 *
 *  二：window 基础类型扩展
 *  -----------------------
 *  String.lengthEx(true|false); //返回字符串的长度,汉字算两个
 *  String.replaceAll("value");
 *  String.trim();
 *  String.ltrim();
 *  String.rtrim();
 *  String.endWith();
 *  String.startWith();
 *  String.guid(); 将字符串中的汉字转为转义序列对应的数字
 *  String.format(data0,data1..);格式化字符串
 *  String.htmlDecode(); //html转义还原
 *  String.htmlEncode(); //html转义
 *  String.encode();    //加码
 *  String.decode();    //加码还原
 *  
 *  number.round(num,[len]); 将num四舍五入,len是小数点位数,默认1位
 *  number.toUpperCase();    将数字转换为人民币大写字符串
 *
 *  Array.each(fn); 循环数组
 *  Array.indexOf([true|false],value,[pro]);
 *  Array.indexOfEx([true|false],value,[pro]);
 *  Array.joinEx(value,pro); join扩展
 *  Array.find([true|false],value,pro);数组查找,返回匹配的元素
 *  Array.findEx([true|false],value,pro);数组查找,返回匹配的元素
 *  Array.format(value,pro);改变数组的每个元素的值,并返回新数组
 *  Array.convert(pro); 数组转换为另一个数组,新数组存放原数组中的元素的某个属性或者下标
 *  Array.pushEx(value,pro,ex);数组增加数据,存在则覆盖
 *  Array.unshiftEx(value,pro,ex);数组增加数据,存在则覆盖
 *  Array.compare(array,pro,pro1,ex);数组比较
 *  Array.calc(type,pro); 数组值计算
 *  Array.unique(true,pro);数组去重
 *
 *  window.$MT.oxhideTime({format:""}); jquery-ui-datetime补丁类工具
 *  window.$MT.get(obj,pro); //获取obj对象的属性
 *  window.$MT.set(obj,pro,value); //设置obj对象的属性
 *  window.$MT.getArgs("xx","name");获取引用该脚本时所传参数
 *  window.$MT.getParam("url"); 解析出url地址中的参数键值对
 *  window.$MT.importCss("css文件完全路径",window,[id]);
 *  window.$MT.guid();      返回一个随机字符串
 *  window.$MT.dwr(str); dwr执行,str是dwr的执行字符串
 *  window.$MT.revise(obj);将{"posts.postid":"8a8a80153b8846da013b884d02700013"}改为{"posts":{"posti":"8a8a80153b8846da013b884d02700013"}}
 *  window.$MT.appendParam(url,param); 为url追加参数,自动生成&和?,url 原始地址,param 参数们例如$MT.appendParam(url,{key1:value1,key2:value2});
 *  window.$MT.obj2str(object);把object转换为一个字符串:{xx:xx...},把array转换为一个字符串:["","",""..]
 *  window.$MT.exist("service","id");封装 if (!$MT.dwr('DWRBaseClass.checkObjcect('+service+','+id+')')) {info({message:"记录已经被删除，请刷新页面！"});return; }
 *  window.$MT.query(opt); 异步查询sqlquery中定义的语句
 *  window.$MT.buildPager();创建分页按钮
 *  window.$MT.showList(); 调用后台通用showList
 *  window.$MT.dictionary(opt); 异步获取数据字典
 *  window.$MT.ajax("url","param",fn,fnError); 异步请求
 *  window.$MT.formatDate(dateobj);时间格式化
 *  window.$MT.each(obj,fn);循环对象或者数组
 *  window.$MT.makePY(param);获得汉字拼音
 *  window.$MT.dataRevise(object);转换json数组为一维多维数组
 *  window.$MT.exist(service,id);验证service管理的实体类中主键id是否存在
 *  window.$MT.url(url,[appPath],[{param1:value1}]);编译url为先跳到load.jsp再跳转并加上sessionid的地址
	window.$MT.saveMark(employeeid,itemid,type,remark);保存标记
 *  window.$MT.removeMark(employeeid,itemid);移除标记
 *  window.$MT.getMark(employeeid,itemid,callback);获取标记
 *  window.$MT.getMarkInfo(employeeid,itemid,callback);获取标记备注
 *  window.$MT.getMarkState(employeeid,itemid,callback);获取标记状态
 *  
 *  三：jquery扩展
 *  -----------------------
 *  $(xx).refresh([opt]);  万能方法,详细看下面
 *
 *  $(xx).pageClick(fn,[hasChild]); 为页面绑定单击事件,忽略xxx,fn 是执行函数 hasChild 是否也忽略选择器的子元素
 *  $(xx).pageClick("unbind");解除为xxx绑定的页面的单击事件
 *
 *  $(xx).tip({});  在xx上显示提示消息
 *  $(xx).tip("close",id); 关闭xx上的提示消息
 *  $(xx).tip("zz",zindex);在xx上打开或关闭遮罩
 *
 *  $(xx).bind("resize",function)为xx绑定resize事件
 *
 *  $.xls();导出操作
 *  $("xx").xls();导出操作
 *
 *  $("xx").imper();导入渲染
 *
 *  $.scrollTo();     滚动
 *  $(xx).scrollTo(); 滚动
 *  
 *  $(frame选择器).forward(url);  跳转
 *  $.forward(frame的name/frame的id/window对象,url); 跳转
 *  
 *  $(xx).mvvm(); 简易mvvm，将json与form控件互转
 *
 * 四：dialog扩展
 *  -----------------------
 * closeWin(); 关闭当前活动窗体
 * info("message",[callback]);  info({message:"",fn:xx});
 * error("message",[callback]);  info({message:"",fn:xx});
 * right("message",[callback]);  info({message:"",fn:xx});
 * ask({message:"",fn:function(data){ if(data=="yes"){}else{}  }})
 * win(opt);
 * addWin(opt);
 * updateWin(opt);
 * htmlWin(opt);
 * XqTipOpen("message");
 * XqTipClose();
 * tip("message");或者 tip(opt)
 * prompts("您的名字?",function(value){alert(value);},"这是一个弹窗!","默认是不知道");
 * closeWin();关闭当前活动窗体
 *
 * 五：jqgrid扩展
 *  -----------------------
 * $(x).jqGrid("button",...); 操作在该grid的toolbar上的按钮,增加、删除、显示、隐藏、可用、不可用
 * $(x).jqGrid("go",url,page,param); grid异步提交数据到url,并刷新grid
 * $(x).jqGrid("id",true|false); 获取grid选中的id或者全部id
 * $(x).jqGrid("ajax");获取或设置grid异步提交的参数
 * $(x).jqGrid("removeAjax");移除grid异步提交的参数
 * $(x).jqGrid("param");获取或设置grid对象的属性
 * $(x).jqGrid("removeParam");移除grid对象的属性
 * $(x).jqGrid("footer")获取或设置表格底部统计数据
 * $(x).jqGrid("form")表格常规数据操作,如add、update、view、delete、choose、search、history、xls
 * $(x).jqGrid("load")刷新表格
 * $(x).jqGrid("row");表格行操作,add、edit、delete、save,select,unselect
 * $(x).jqGrid("data");获取或设置表格的数据,一行的、单元格的、一列的,
 * $(x).jqGrid("cell");列操作,显示或隐藏
 * $(x).jqGrid("save"，form);将编辑模式下的表格数据保存到一个表单中或者将表格数据追加到form中或者获取将要保存的数据
 * $(x).jqGrid("checkUnSave");返回编辑模式下表格数据是否有未保存的变化
 * $(x).jqGrid("subGrid");子表相关
 * $(x).jqGrid("flow");表格与工作流相关
 * $(x).jqGrid("check");调用表格标签中定义的函数（TableNavigat的check属性）验证id是否有效
 * $(x).jqGrid("element")表格导航栏上的非按钮控件操作
 * $(x).jqGrid("search");表格外置查询操作
 * $(x).jqGrid("clearSearch");表格外置查询清空操作
 * 
 * 六：一般元素初始化、复杂元素初始化、页面必须css引入(已由标签实现，无需关注)
 *  -------------------------------------------------
 *  .tableStyle //基础表格样式
 *  .box-showClose //盒子模型收缩功能
 *  button,input,select,textarea,body //页面基本元素渲染
 *  本页面和父页面引入以下css：theme/base/style.css public/style/icon.css public/style/ui.jqgrid.css
 *
 * 七：jquery ui 扩展
 *  -------------------------------------------------
 * ui.autocomplete中增加了返回数据的分组/最大高度,否则出现滚动/点击按钮触发自动完成效果
 * $(xx).tabs("add")增加选项卡
 * $(xx).tabs("indexOf")获取选项卡下标
 * $(xx).tabs("remove")删除某个选项卡
 * $(xx).tabs("update")更新某个选项卡
 * $(xx).tabs("show")获取当前显示的下标或者显示哪个选项卡
 * $(xx).tabs("getTitle")获取某个选项卡的标题
 * $(xx).tabs("getContent")获取某个选项卡的内容
 * $(xx).tabs("max") 最大化某个选项卡
 * $(xx).tabs("refresh_self") 刷新某个选项卡
 *
 * jqueryUiTool.selectCreate(selectObj,value,label,group); 将json对象数组转换为可以追加到下拉框中的html字符串
 *
 *
 * 八：桌面UI扩展
 * ui("app");返回所有可访问的系统列表
 * ui("resource");返回所有课访问的资源列表
 * ui("open");打开一个选项卡在UI上
 * ui("show");切换到已经UI中打开的选项卡上
 * ui("win");获取已经打开的选项卡的window对象
 * ui("dwr");获取已经打开的选项卡的dwr sessionid
 * ui("close");关闭已经打开的选项卡
 * ui("find");获取对应的资源对象
 * ui("findApp",appcode);返回appcode对应的系统对象
 * ui("height"); 获取当前body高度
 * ui("data",name,value);设置或获取全局参数
 * ui("refresh") //刷新某个选项卡
 *
 *
 * 九：工作流扩展
 * flow.create("流程编码","页面标题"); 打开创建流程页面
 * flow.open(instanceId,title); 打开流程实例
 * flow.openByBiz(bizId,code,title); 打开流程实例
 * flow.doAction(code,data); 触发流程操作按钮点击(处于工作流frame中可用)
 * flow.doActionAjax(bizId,flowCode,actionCode,comment,fn,fnError); 触发流程操作按钮点击(任意地方调用,但仅限于不提交业务表单的操作)
 * flow.doActionWithOutFrame(flowCode,bizId,actionCode,actionParam,actionIndex) 触发流程操作按钮点击(任意地方调用操作,但仅限触发子流程且不提交业务表单的操作使用)
 * flow.constants提供com.sxsihe.flow.core.FlowConstants一样的常量
 * flow.showPic(id); 显示流程图示
 * flow.showHis(id); 显示流转历史
 *
 *
 * 十: 版本兼容修正(已删除)
 * window.add();  表格增加记录方法,调用时 add.call(table对象)
 * window.update();表格增加记录方法,调用时 update.call(table对象)
 * window.view(); 表格查看记录方法，调用时 view.call(table对象)
 * window.batchDelete(); 表格删除记录方法,调用时 batchDelete.call(table对象)
 * window.clearConditionSelect(); 表单方式查询时,表格清除查询条件方法,调用时 clearConditionSelect.call(table对象)
 * window.conditionSelect();     表单方式查询时,表格查询方法,调用时 conditionSelect.call(table对象)
 * window.formhistory();        表格历史记录查看方法
 * window.refresh();          表格刷新
 * window.search();  表格搜索对话框弹出
 * window.columnChooser(); 表格选择列对话框弹出
 * window.saveRow();        行内编辑,表格保存行
 * window.cancelRow();       行内编辑,取消编辑
 * $(表格).getId([onlyOne]);         获取表格选择的行的id,可选onlyOne，是否是取一个,默认false
 * .box2    //盒子模型
 * button[createBy=struts]      //列表页面操作按钮初始化
 * input[onclick*=WdatePicker]  //my97日期函数转换为jquery日期控件
 */

//TODO 页面最高级别变量初始化开始
(function(){
    var api = frameElement && frameElement.api;
    if(api){
        window.dg = api;
        window.father = api.opener;
    }
    
	/**
	 * 表单提交时,dg的按钮和formnavite的按钮全部禁用掉,并记忆可还原的按钮,以便异常时还原
	 */
	window.disabled_for_no_repeat_submit = function(){
		if(window.dg){
			dg.disableBtnWithRember();
		}
		if(window.formNavigate_plug){
			window.disabled_for_no_repeat_submit_for_enabled = []; 
			$("input,button",formNavigate_plug).each(function(){
				var that = $(this);
	        	if(!that.attr("disabled")){
	        		disabled_for_no_repeat_submit_for_enabled.push(that);
	        		that.attr("disabled",true).refresh();
	        	}
			});
		}
	};
	
	/**
	 * 还原防止重复提交而不可用的按钮
	 */
	window.un_disabled_for_no_repeat_submit = function(){
		if(window.dg){
				if(dg.disabled_for_no_repeat_submit_for_enabled){
					$.each(dg.disabled_for_no_repeat_submit_for_enabled,function(){
						this.removeAttr("disabled").refresh();
					});
				}
		}
		if(window.formNavigate_plug){
	    	if(window.disabled_for_no_repeat_submit_for_enabled){
				$.each(window.disabled_for_no_repeat_submit_for_enabled,function(){
					this.removeAttr("disabled").refresh();
				});
	    	}
		}
	}
	
	$(window).load(function(){
		if(window.location.href.indexOf("/core/tool/load.jsp") === -1) un_disabled_for_no_repeat_submit();
	});
	
	/**
	 * 重写所有form的submit,submit之前.把按钮全部禁用
	 */
	$(window).load(function(){
		$("form").each(function(){
			var that = $(this);
			if(that.attr("name") === "loadForm" || that.attr("name") === "oxhide_forward" || (that.attr("name") === "fileUploadForm_oxhide_plug" && $("form").length > 1)) return;
			that.data("submit_disabled_for_no_repeat_submit",that.prop("submit"))[0].submit = function(){
				if(!that.data("submit_disabled_for_no_repeat_submit_called")) disabled_for_no_repeat_submit();
				that.data("submit_disabled_for_no_repeat_submit_called",true);
				that.data("submit_disabled_for_no_repeat_submit").call(that[0]);
			}
		});
	});
	
    /**
     * basepath
     */
    window.basePath || (window.basePath = (function(){
        var jss = $("script");
        var src = !!document.querySelector ? jss.attr("src") : jss[0].getAttribute('src',4);
        var t = src.split("/"),u=[],k=0;
        for(var h = 0,j = t.length;h < j;h++){
            if(t[h].indexOf("resource") > -1) break;
			if(t[h]){u.push(t[h]);}
        }
		u[0] += "/";
		u[u.length - 1] += "/";
        return u.join("/");
    })());
    window.dwrObject  || (window.dwrObject = "DWRBaseClass");
    
})();
/*页面最高级别变量初始化结束*/

//TODO window 基础类型扩展开始
(function(){
    if(!String.prototype.replaceAll){

        $.extend(String.prototype,{
            /**
             * 格式化
             * "aaa{0}ssssssss{1}".format("参数0","参数1") =  aaa参数0sssssssss参数1
             * "aaa{0}ssssssss{1}".format(["参数0","参数1"]) =  aaa参数0sssssssss参数1
             *  aaa{name}sss{name}bbb{age}bbb.format({name:"1111",age:"222"})=aaa1111sss1111bbb222bbb
             *  "aaa{0}ssssssss{1}".format(true,["参数0","参数1"]) =  aaa参数0sssssssss参数1,关键字标红
             *  "aaa{0}ssssssss{1}".format(false,["参数0","参数1"]) =  aaa参数0sssssssss参数1,关键字标绿
             */
            format : function(){
                var args = $.makeArray(arguments),temp = this,need = false,font;
                if(args[0] === true) {
                	font = '<font style="color:red;font-weight:bold">';
                	need = true;
                	args.shift(1);
                }else if(args[0] === false){
                	font = '<font style="color:green;font-weight:bold">';
                	need = true;
                	args.shift(1);
                }
                if(args.length === 0 || (args.length === 1 && (args[0] === null || args[0] === undefined))) return temp.replace(/\{(\w+)\}/g,"");
                else if(args.length !== 1 || typeof args[0] !== "object")  return temp.replace(/\{(\w+)\}/g, function(m, i){
                	var tempstr = args[i];
                	if(tempstr === null || tempstr === undefined) tempstr = "";
                    return tempstr !== "" && need === true ? (font + tempstr + '</font>') : tempstr;
                });
                else return temp.replace(/\{([^}]+)\}/g, function(m, i){
	                	var tempstr = $MT.get(args[0],i);
	                	if(tempstr === null || tempstr === undefined) tempstr = "";
	                    return tempstr !== "" && need === true ? (font +  tempstr + '</font>') : tempstr;
                });
            },
            /**
             * html转义符还原
             */
            htmlDecode : function(){
                var value = this;
                if(value && (value==='&nbsp;' || value==='&#160;' || (value.length===1 && value.charCodeAt(0)===160))) { return "";}
                return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
            },
            /**
             * html转义
             */
            htmlEncode : function(){
                var value = this;
                return !value ? value : String(value).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            },
            /**
             * 加码,可用后台方法CharsetSwitch.decode解码
             */
            encode : function(){
                var strIn = this,intLen = strIn.length ,strOut = [] ,strTemp;
                for ( var i = 0 ; i < intLen; i++) {
                    strTemp = strIn.charCodeAt(i);
                    if (strTemp > 255) {
                        tmp = strTemp.toString(16);
                        for ( var j = tmp.length; j < 4; j++) tmp = "0" + tmp;
                        strOut.push("^" + tmp);
                    } else {
                        if (strTemp < 48 || (strTemp > 57 && strTemp < 65) || (strTemp > 90 && strTemp < 97) || strTemp > 122) {
                            tmp = strTemp.toString(16);
                            for ( var j = tmp.length; j < 2; j++) tmp = "0" + tmp;
                            strOut.push("~" + tmp);
                        } else  strOut.push(strIn.charAt(i));
                    }
                }
                return strOut.join("");
            },
            /**
             *解码 ,可解后台方法CharsetSwitch.encode加码的字符串
             */
            decode : function(){
                var strIn = this,intLen = strIn.length ,strOut = [],strTemp;
                for ( var i = 0; i < intLen; i++) {
                    strTemp = strIn.charAt(i);
                    switch (strTemp) {
                        case "~":
                            strTemp = strIn.substring(i + 1, i + 3);
                            strTemp = parseInt(strTemp, 16);
                            strTemp = String.fromCharCode(strTemp);
                            strOut.push(strTemp);
                            i += 2;
                        break;
                        case "^":
                            strTemp = strIn.substring(i + 1, i + 5);
                            strTemp = parseInt(strTemp, 16);
                            strTemp = String.fromCharCode(strTemp);
                            strOut.push(strTemp);
                            i += 4;
                        break;
                        default:
                            strOut.push(strTemp);
                        break;
                    }

                }
                return strOut.join("");
            },
            /**
             *获取字符串长度,汉字算两个
             *@param two 汉字是否算两个字符?默认true
             */
            lengthEx : function(two){
                two === undefined || (two = true);
                if(two){
	                var lengthSelf = 0,value = this;
	                for (var i = 0,j = value.length; i < j; i++) {
	                    if (value.charCodeAt(i) < 27 || value.charCodeAt(i) > 126) lengthSelf += 2;
	                    else lengthSelf++;
	                }
	                return lengthSelf;
                }else
                	return this.length;
            },
            /**
             *替换全部s1 为s2
             */
            replaceAll : function(s1, s2) {
                return this.replace(new RegExp(s1, "gm"), s2);
            },
            /**
             *去除字符串的左、右空格
             */
            trim : function() {
                return this.replace(/(^\s*)|(\s*$)/g, "");
            },
            /**
             *去除字符串的左空格
             */
            ltrim : function() {
                return this.replace(/(^\s*)/g, "");
            },
            /**
             *去除字符串的右空格
             */
            rtrim : function() {
                return this.replace(/(\s*$)/g, "");
            },
            /**
             *将字符串中的汉字转为转义序列对应的数字,汉字和返回结果是一一对应的
             * 例如
             *  "我靠aa".guid() 返回 "62119760aa"
             */
            guid : function() {
                return escape(this).split(/(?:%u|%)/).join("");
            },
            endWith : function(str){
				return new RegExp(str + "$").test(this);
            },
            startWith : function(str){
				return new RegExp("^" + str).test(this);
            }
        });

        $.extend(Number.prototype,{
           /**
            * 小数四舍五入
            * len 小数点位数,默认0位
            * 例如
            * alert(1.256.round(2)) ;弹出 1.26
            * alert(1.round(2,true)); 弹出1.00
            */
            round : function(len,fouce){
            	if(len === undefined) len = 0;
            	if(fouce !== true) return Math.round(this * Math.pow(10,len))/Math.pow(10,len);
            	else{
            		var re = ("" + Math.round(this * Math.pow(10,len))/Math.pow(10,len)).split("."),
            		r = re[1] ? re[1] : "",
            		l = r.length;
            		for(var i = len; i > l; i --){
            			r += "0";
            		}
            		return re[0] + "." + r;
            	}
            },
            /*转换为人名币大写字符串*/
            toUpperCase : function(){
				var n = this + "00",unit = "千百拾亿千百拾万千百拾元角分", str = "";
				var p = n.indexOf('.');
				if (p >= 0)
				n = n.substring(0, p) + n.substr(p+1, 2);
				unit = unit.substr(unit.length - n.length);
				for (var i=0; i < n.length; i++)
				str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
				return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
            }
        });

        Array.prototype.reduce || (Array.prototype.reduce = function(fn){
			if(this.length === 0) return;
			var t = this[0];
			for(var i = 1 ; i < this.length ; i++){
				t = fn(t,this[i]);
			}
			return t;
        });

        $.extend(Array.prototype,{
            /**
             * 数组循环 ,fn中this表示当前数组元素,第一个参数表示当前下标.第二个参数表示当前元素
             * 例如:
             * ["aa","bb","cc"].each(function(i,v){
             *      alert(v); //aa-cc
             *      alert(i); //0-2
             * });
             * 方法返回false,表示break..
             * [{name:"cc",age:20}].each(function(i,v){
             *      alert(this.age);
             * });
             */
            each : function(fn){
                for(var i = 0,j = this.length;i < j; i ++){
                    var result = fn.call(this[i],i,this[i]);
                    if(result === false) break;
                }
            },
            /**
             *  数组的indexof,找不到匹配返回-1，判断是否相等时,使用了 == 符而不是 ===
             *  参数1：[布尔值]可选,默认false,是否返回全部匹配的下标,如果true,返回下标数组,如果false,返回第一个匹配的下标
             *  参数2: [任意]匹配的值,值如果是function,则function中this指向当前元素,v指向当前元素,i指向当前下标: function(i,v){},返回true表示选中,false表示不选中;
             *  参数3: [任意]数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选
             *  注意：如果第一个参数是boolean,但它的含义是要比对的值而不是表示是否返回全部匹配的下标时,需要在这个参数前再加上是否返回全部匹配的下标的参数!
             *  例如:
             *  ["aa","cc"].indexOf("cc") = 1;
             *  ["aa","cc"].indexOf(true,"cc") = [1];
             *  [{name:"aa"},{name:"bb"}].indexOf("aa","name") = 0;
             *  [{name:"aa"},{name:"bb"}].indexOf(true,"aa","name") = [0];
             *  [["111","3333333"],["222","444444"]].indexOf("222",0) = 0
             *  [["111","3333333"],["222","444444"]].indexOf(true,"222",0) = [0]
             */
            indexOf : function() {
                 var args = $.makeArray(arguments);
                 switch(args.length){
                    case 0:
                    return -1;
                    case 1:
                        args.unshift(false);
                    break;
                    case 2:
                        if(typeof args[0] !== "boolean") args.unshift(false);
                    break;
                 }
                 var all = args[0],value = args[1],pro = args[2],
                      result = [],
                      valueTemp,
                      isequal;
                 for(var i = 0,j = this.length;i < j; i++){
                    if(typeof value === "function") isequal = value.call(this[i],i,this[i]);
                    else{
                    	valueTemp = pro !== undefined ? $MT.get(this[i],pro) : this[i];
                    	isequal = value == valueTemp;
                    }
                    if(isequal){
                        if(!all) return i;
                        result.push(i);
                    }
                }
                return all ? result : -1;
            },
            /**
             * 数组去重，返回无重复数据的数组
             * 参数1：【布尔值】仅返回匹配的值还是完整对象？默认true，即完整对象,可选
             * 参数2：【任意】数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选
             * */
            unique : function(){
            	 var args = $.makeArray(arguments);
                 switch(args.length){
                    case 0:
                    	args.unshift(true);
                    case 1:
                        if(typeof args[0] !== "boolean") args.unshift(true);
                    break;
                 }
                 var all = args[0],pro = args[1],
                      result = [],
                      valueTemp,
                      hash = {};
                 for(var i = 0,j = this.length;i < j; i++){
                 	valueTemp = pro !== undefined ? $MT.get(this[i],pro) : this[i];
                    if(hash[valueTemp] === undefined){
                    	hash[valueTemp] = true;
                    	result.push(all === true ? this[i] : valueTemp);
                    }
                }
                return result;
            },
            /**
             *  数组的indexof,找不到匹配返回-1，判断是否相等时,使用了 === 符而不是 ==
             *  参数1：[布尔值]可选,默认false,是否返回全部匹配的下标,如果true,返回下标数组,如果false,返回第一个匹配的下标
             *  参数2: [任意]匹配的值,值如果是function,则function中this指向当前元素,v指向当前元素,i指向当前下标: function(i,v){},返回true表示选中,false表示不选中;
             *  参数3: [任意]数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选
             *  注意：如果第一个参数是boolean,但它的含义是要比对的值而不是表示是否返回全部匹配的下标时,需要在这个参数前再加上是否返回全部匹配的下标的参数!
             *  例如:
             *  ["aa","cc"].indexOfSober("cc") = 1;
             *  ["aa","cc"].indexOfSober(true,"cc") = [1];
             *  [{name:"aa"},{name:"bb"}].indexOfSober("aa","name") = 0;
             *  [{name:"aa"},{name:"bb"}].indexOfSober(true,"aa","name") = [0];
             *  [["111","3333333"],["222","444444"]].indexOfSober("222",0) = 0
             *  [["111","3333333"],["222","444444"]].indexOfSober(true,"222",0) = [0]
             */
            indexOfEx : function(){
                 var args = $.makeArray(arguments);
                 switch(args.length){
                    case 0:
                    return -1;
                    case 1:
                        args.unshift(false);
                    break;
                    case 2:
                        if(typeof args[0] !== "boolean") args.unshift(false);
                    break;
                 }
                 var all = args[0],value = args[1],pro = args[2],
                      result = [],
                      valueTemp,
                      isequal;
                 for(var i = 0,j = this.length;i < j; i++){
                    if(typeof value === "function") isequal = value.call(this[i],i,this[i]);
                    else{
                    	valueTemp = pro !== undefined ? $MT.get(this[i],pro) : this[i];
                    	isequal = value === valueTemp;
                    }
                    if(isequal){
                        if(!all) return i;
                        result.push(i);
                    }
                }
                return all ? result : -1;
            },
            /**
             * join扩展
             * 参数1 join的字符
             * 参数2 join数组中json对象或者json数组的哪个属性或者下标
             * 例如:
             * [{name:"cc",age:"20"},{name:"ww",age:"19"}].joinEx(",","name") = cc,ww
             * [["aa","11"],["bb","22"]].joinEx(1) = 11,22
             */
            joinEx : function(value,pro) {
              var temp = [];
               for(var i = 0,j = this.length;i < j; i++) temp.push($MT.get(this[i],pro));
               return temp.join(value)
           },
           /**
             * 数组元素查找,返回匹配的元素,判断是否相等 用 == 而不是 ===
             *  参数1：[布尔值]可选,默认false,是否返回全部匹配的元素,如果true,返回匹配的数组,如果false,返回第一个匹配的元素
             *  参数2: [任意]匹配的值,值如果是function,则function中this指向当前元素,v指向当前元素,i指向当前下标: function(i,v){},返回true表示选中,false表示不选中;
             *  参数3: [任意]数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选
             *  注意：如果第一个参数是boolean,但它的含义是要比对的值而不是表示是否返回全部匹配的下标时,需要在这个参数前再加上是否返回全部匹配的下标的参数!
             *  例如:
             *  ["aa","cc"].find("cc") = "cc";
             *  ["aa","cc"].find(true,"cc") = ["cc"];
             *  [{name:"aa"},{name:"bb"}].find("aa","name") = {name:"aa"}
             *  [{name:"aa"},{name:"bb"}].find(true,"aa","name") = [{name:"aa"}];
             *  [["111","3333333"],["222","444444"]].find("222",0) = ["111","3333333"]
             *  [["111","3333333"],["222","444444"]].find(true,"222",0) = [["111","3333333"]]
            */
            find : function() {
                 var args = $.makeArray(arguments);
                 switch(args.length){
                    case 0:
                    return -1;
                    case 1:
                        args.unshift(false);
                    break;
                    case 2:
                        if(typeof args[0] !== "boolean") args.unshift(false);
                    break;
                 }
                 var all = args[0],value = args[1],pro = args[2],
                      result = [],
                      valueTemp,
                      isequal;
                 for(var i = 0,j = this.length;i < j; i++){
                    if(typeof value === "function") isequal = value.call(this[i],i,this[i]);
                    else{
                    	valueTemp = pro !== undefined ? $MT.get(this[i],pro) : this[i];
                    	isequal = value == valueTemp;
                    }
                    if(isequal === true){
                        if(!all) return this[i];
                        result.push(this[i]);
                    }
                }
                return all ? result : undefined;
            },
           /**
             * 数组元素查找,返回匹配的元素,判断是否相等 用 === 而不是 ==
             *  参数1：[布尔值]可选,默认false,是否返回全部匹配的元素,如果true,返回匹配的数组,如果false,返回第一个匹配的元素
             *  参数2: [任意]匹配的值,值如果是function,则function中this指向当前元素,v指向当前元素,i指向当前下标: function(i,v){},返回true表示选中,false表示不选中;
             *  参数3: [任意]数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选
             *  注意：如果第一个参数是boolean,但它的含义是要比对的值而不是表示是否返回全部匹配的下标时,需要在这个参数前再加上是否返回全部匹配的下标的参数!
             *  例如:
             *  ["aa","cc"].find("cc") = "cc";
             *  ["aa","cc"].find(true,"cc") = ["cc"];
             *  [{name:"aa"},{name:"bb"}].find("aa","name") = {name:"aa"}
             *  [{name:"aa"},{name:"bb"}].find(true,"aa","name") = [{name:"aa"}];
             *  [["111","3333333"],["222","444444"]].find("222",0) = ["111","3333333"]
             *  [["111","3333333"],["222","444444"]].find(true,"222",0) = [["111","3333333"]]
            */
            findEx : function() {
                 var args = $.makeArray(arguments);
                 switch(args.length){
                    case 0:
                    return -1;
                    case 1:
                        args.unshift(false);
                    break;
                    case 2:
                        if(typeof args[0] !== "boolean") args.unshift(false);
                    break;
                 }
                 var all = args[0],value = args[1],pro = args[2],
                      result = [],
                      valueTemp,
                      isequal;
                 for(var i = 0,j = this.length;i < j; i++){
                    if(typeof value === "function") isequal = value.call(this[i],i,this[i]);
                    else{
                    	valueTemp = pro !== undefined ? $MT.get(this[i],pro) : this[i];
                    	isequal = value === valueTemp;
                    }
                    if(isequal){
                        if(!all) return this[i];
                        result.push(this[i]);
                    }
                }
                return all ? result : undefined;
            },
            /**
             *为数组中每个元素追加值并返回新的数组,原来的数组不受印象
             * 参数1: 要追加的字符串:例如 参数1=xxx{0}yyy,数组中有元素值为 "bbbb",那么追加后变为 xxxbbbbyyy,即与String.format一致
             * 参数2: 数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选
             * 例如:
             * ["aa","bb","cc"].format("我的名字是:{0}") = ["我的名字是:aa","我的名字是:bb","我的名字是:cc"]
             * [["boy",2],["girl",3]].format("性别是{0},一共有:{1}个人") = ["性别是boy,一共有:2个人","性别是girl,一共有:3个人"]
             * [{name:"cc",age:"20"},{name:"ww",age:"15"}].format("名字叫{name},年龄是{age},怎么样?") = ["名字叫cc,年龄是20,怎么样?","名字叫ww,年龄是15,怎么样?"]
             * [{name:"cc"},{name:"ww"}].format("我的名字是:{0}","name") = [{name:"我的名字是:cc"},{name:"我的名字是:ww"}]
             */
            format : function(red,value,pro) {
            	if(typeof red == "string"){
            		pro = value;
            		value = red;
            		red = -1;
            	}
				var temp = [];
				for(var i = 0,j = this.length;i < j; i++){
					var t = this[i];
					if(pro !== undefined) {
						if(red === -1) $MT.set(t,pro,value.format($MT.get(this[i],pro)));
						else $MT.set(t,pro,value.format(red,$MT.get(this[i],pro)));
					}else{
						if(red === -1) t = value.format(t);
						else t = value.format(red,t);
					}
					temp.push(t);
				}
				return temp;
            },
            /**
             *array中存放的是对象、二维数组,此方法将array中每个元素的某个属性单独提到一个新的数组中
             *例如:
             * [{name:"cc",age:"20"},{name:"ww",age:"15"}].conver("name") = ["cc","ww"]
             * [["aa","11"],["bb","22"]].conver(1) = ["11","22"];
             */
            convert : function(pro){
               var temp = [];
               for(var i = 0,j = this.length;i < j; i++) temp.push($MT.get(this[i],pro));
               return temp;
            },
            /**
             *向数组中push数据, 并判断是否存在,如果存在则覆盖
             * 参数1：要添加的数据
             * 参数2：数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选;
             * 参数3：匹配是否相等时,是否使用严格匹配方式,默认false
             * ["1","2"].pushEx("3") == ["1","2","3"]
             * ["1","2"].pushEx("2") == ["1","2"]
             * [{name:"cc",age:"19"},{name:"cc2",age:"20"}].pushEx({name:"cc2",age:"25"}) =  [{name:"cc",age:"19"},{name:"cc2",age:"25"}];
             * [{name:"cc",age:"19"},{name:"cc2",age:"20"}].pushEx({name:"cc3",age:"25"}) =  [{name:"cc",age:"19"},{name:"cc2",age:"20"},{name:"cc3",age:"25"}];
             */
            pushEx : function(value,pro,ex){
            	if(this === undefined) return;
            	if(typeof pro === "boolean") {ex = pro;pro = null;}
            	if(ex === undefined ) ex = false;
            	var valueTemp = pro !== undefined ? $MT.get(value,pro) : value;
                var index = this[ex ? "indexOfEx" : "indexOf"];
                if(index === undefined) return;
                index = index.call(this,valueTemp,pro);
                if(index == -1) this.push(value);
                else this[index] = value;
            },
            /**
             *向数组中unshift数据, 并判断是否存在,如果存在则覆盖
             * 参数1：要添加的数据
             * 参数2：数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选;
             * 参数3：匹配是否相等时,是否使用严格匹配方式,默认false
             * ["1","2"].unshiftEx("3") == ["3","1","2"]
             * ["1","2"].unshiftEx("2") == ["1","2"]
             * [{name:"cc",age:"19"},{name:"cc2",age:"20"}].unshiftEx({name:"cc2",age:"25"}) =  [{name:"cc",age:"19"},{name:"cc2",age:"25"}];
             * [{name:"cc",age:"19"},{name:"cc2",age:"20"}].unshiftEx({name:"cc3",age:"25"}) =  [{name:"cc3",age:"25"},{name:"cc",age:"19"},{name:"cc2",age:"20"}];
             */
            unshiftEx : function(value,pro,ex){
            	if(typeof pro === "boolean") {ex = pro;pro = null;}
            	if(ex === undefined ) ex = false;
                var index = this[ex ? "indexOfEx" : "indexOf"](value,pro);
                if(index == -1) this.unshift(value);
                else this[index] = value;
            },
            /**
             * 比较两个数组,返回json对象
             * {
	         * 		shareIndex1:[], //相同部分在数组1中的下标
	         * 		share1:[],		//数组1中的相同部分
	         * 		shareIndex2:[], //相同部分在数组2中的下标
	         * 		share2:[],		//数组2中的相同部分
	         * 		uniqueIndex1:[],//不同部分在数组1中的下标
	         * 		unique1:[],		//数组1中的不同部分
	         * 		uniqueIndex2:[],//不同部分在数组2中的下标
	         * 		unique2:[],		//数组2中的不同部分
             * }
             * 参数1：要比较的数组
             * 参数2：本数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选
             * 参数3：参数数组中放的是json对象时,匹配的值对应的属性;当数组中放的是数组时,匹配值对应的下标,可选
             * 参数3：匹配是否相等时,是否使用严格匹配方式,默认false
             * */
            compare : function(array,pro,pro1,ex){
            	if(typeof pro === "boolean") {ex = pro;pro = null;}
            	if(ex === undefined ) ex = false;
            	var result = {shareIndex1:[],share1:[],shareIndex2:[],share2:[],uniqueIndex1:[],unique1:[],uniqueIndex2:[],unique2:[]},method = ex ? "indexOfEx" : "indexOf";
            	if(array === undefined || array === null) return result;
            	for(var i = 0,j = this.length;i < j;i++){
            		var index = array[ex ? "indexOfEx" : "indexOf"]((pro === undefined || pro === null) ? this[i] : $MT.get(this[i],pro),pro1);
            		if(index === -1){
            			result.unique1.push(this[i]);
            			result.uniqueIndex1.push(i);
            		}else{
            			result.share1.push(this[i]);
            			result.shareIndex1.push(i);
            			result.share2.push(array[index]);
            			result.shareIndex2.push(index);
            		}
            	}

            	for(var i = 0,j = array.length;i < j;i++){
            		var index = this[ex ? "indexOfEx" : "indexOf"]((pro === undefined || pro === null) ? array[i] : $MT.get(array[i],pro1),pro);
            		if(index === -1){
            			result.unique2.push(array[i]);
            			result.uniqueIndex2.push(i);
            		}
            	}
            	return result;
            },
            /**
             * 数组计算
             * 参数1:计算方式,支持 sum|avg|max|min
             * 参数2:哪个属性或者哪个下标
             */
            calc : function(type,pro){
            	if(this.length === 0) return;
            	var fn = function(a,b){
            		if(isNaN(a) || isNaN(b)){
	            		switch(type){
	            			case "sum":
	            				return 0;
	            			break;
	            			case "avg":
	            				return 0;
	            			break;
	            			case "max":
	            				return Number.MIN_VALUE;
	            			break;
	            			case "min":
	            				return Number.MAX_VALUE;
	            			break;
	            		}
            		}
            		switch(type){
            			case "sum":
            				return (+a) + (+b);
            			break;
            			case "avg":
            				return (+a) + (+b);
            			break;
            			case "max":
            				return Math.max(+a,+b);
            			break;
            			case "min":
            				return Math.min(+a,+b);
            			break;
            		}
            	}
            	var temp ;
            	if(pro !== undefined){
            		temp= this.convert(pro);
            		temp = temp.reduce(fn);
            		$.map(this,fn);
            	}else temp = this.reduce(fn);
            	if(type === "avg") temp = temp/this.length;
				return temp;
            }
        });

    }
    //工具类
    window.$MT || (window.$MT = {
    	/*MD5*/
    	md5 : function(str){
			var hex_chr = "0123456789abcdef";
			function rhex(num) {
				str = "";
				for (j = 0; j <= 3; j++) str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((num >> (j * 8)) & 0x0F);
				return str;
			}
			function str2blks_MD5(str) {
				nblk = ((str.length + 8) >> 6) + 1;
				blks = new Array(nblk * 16);
				for (i = 0; i < nblk * 16; i++) blks[i] = 0;
				for (i = 0; i < str.length; i++) blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
				blks[i >> 2] |= 0x80 << ((i % 4) * 8);
				blks[nblk * 16 - 2] = str.length * 8;
				return blks;
			}
			function add(x, y) {
				var lsw = (x & 0xFFFF) + (y & 0xFFFF);
				var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
				return (msw << 16) | (lsw & 0xFFFF);
			}
			function rol(num, cnt) {
				return (num << cnt) | (num >>> (32 - cnt));
			}
			function cmn(q, a, b, x, s, t) {
				return add(rol(add(add(a, q), add(x, t)), s), b);
			}
			function ff(a, b, c, d, x, s, t) {
				return cmn((b & c) | ((~b) & d), a, b, x, s, t);
			}
			function gg(a, b, c, d, x, s, t) {
				return cmn((b & d) | (c & (~d)), a, b, x, s, t);
			}
			function hh(a, b, c, d, x, s, t) {
				return cmn(b ^ c ^ d, a, b, x, s, t);
			}
			function ii(a, b, c, d, x, s, t) {
				return cmn(c ^ (b | (~d)), a, b, x, s, t);
			}
		    x = str2blks_MD5(str);
		    var a = 1732584193;
		    var b = -271733879;
		    var c = -1732584194;
		    var d = 271733878;
		    for (i = 0; i < x.length; i += 16) {
		        var olda = a;
		        var oldb = b;
		        var oldc = c;
		        var oldd = d;
		        a = ff(a, b, c, d, x[i + 0], 7, -680876936);
		        d = ff(d, a, b, c, x[i + 1], 12, -389564586);
		        c = ff(c, d, a, b, x[i + 2], 17, 606105819);
		        b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
		        a = ff(a, b, c, d, x[i + 4], 7, -176418897);
		        d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
		        c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
		        b = ff(b, c, d, a, x[i + 7], 22, -45705983);
		        a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
		        d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
		        c = ff(c, d, a, b, x[i + 10], 17, -42063);
		        b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
		        a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
		        d = ff(d, a, b, c, x[i + 13], 12, -40341101);
		        c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
		        b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
		        a = gg(a, b, c, d, x[i + 1], 5, -165796510);
		        d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
		        c = gg(c, d, a, b, x[i + 11], 14, 643717713);
		        b = gg(b, c, d, a, x[i + 0], 20, -373897302);
		        a = gg(a, b, c, d, x[i + 5], 5, -701558691);
		        d = gg(d, a, b, c, x[i + 10], 9, 38016083);
		        c = gg(c, d, a, b, x[i + 15], 14, -660478335);
		        b = gg(b, c, d, a, x[i + 4], 20, -405537848);
		        a = gg(a, b, c, d, x[i + 9], 5, 568446438);
		        d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
		        c = gg(c, d, a, b, x[i + 3], 14, -187363961);
		        b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
		        a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
		        d = gg(d, a, b, c, x[i + 2], 9, -51403784);
		        c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
		        b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
		        a = hh(a, b, c, d, x[i + 5], 4, -378558);
		        d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
		        c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
		        b = hh(b, c, d, a, x[i + 14], 23, -35309556);
		        a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
		        d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
		        c = hh(c, d, a, b, x[i + 7], 16, -155497632);
		        b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
		        a = hh(a, b, c, d, x[i + 13], 4, 681279174);
		        d = hh(d, a, b, c, x[i + 0], 11, -358537222);
		        c = hh(c, d, a, b, x[i + 3], 16, -722521979);
		        b = hh(b, c, d, a, x[i + 6], 23, 76029189);
		        a = hh(a, b, c, d, x[i + 9], 4, -640364487);
		        d = hh(d, a, b, c, x[i + 12], 11, -421815835);
		        c = hh(c, d, a, b, x[i + 15], 16, 530742520);
		        b = hh(b, c, d, a, x[i + 2], 23, -995338651);
		        a = ii(a, b, c, d, x[i + 0], 6, -198630844);
		        d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
		        c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
		        b = ii(b, c, d, a, x[i + 5], 21, -57434055);
		        a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
		        d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
		        c = ii(c, d, a, b, x[i + 10], 15, -1051523);
		        b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
		        a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
		        d = ii(d, a, b, c, x[i + 15], 10, -30611744);
		        c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
		        b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
		        a = ii(a, b, c, d, x[i + 4], 6, -145523070);
		        d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
		        c = ii(c, d, a, b, x[i + 2], 15, 718787259);
		        b = ii(b, c, d, a, x[i + 9], 21, -343485551);
		        a = add(a, olda);
		        b = add(b, oldb);
		        c = add(c, oldc);
		        d = add(d, oldd);
		    }
		    return rhex(a) + rhex(b) + rhex(c) + rhex(d);
    	},
    	/**
    	 * 将多个jqGrid的xls合并为一个xls文件导出
    	 * 例如：$MT.xls([$("#table1"),$("#table2")],"要导出的文件名",true);
    	 * 其中第三个参数是布尔值时,表示是否压缩为zip导出,该参数不传表示不压缩 
    	 * 当第三个参数是函数时,表示导出文件后,保存在服务器上,不提供下载，此时
    	 * 第二个参数就表示存放的路径,写的是相对路径,例如参数="/bb/table.xls"服务器上会保存为bb目录下的table.xls文件,
    	 * 第三个参数表示回调,即服务器保存完毕后的回调,回调一个参数,是json对象,属性含义如下
    	 * result表示是否成功;path是文件路径(相对,需要加basePath),viewPath是预览文件的地址(相对路径, 需要加basePath,附件action的一个方法);
    	 */
    	xls : function(tables,fileName,zip){
    		var form = $("#all_oxhide_jqgrid_xls_form"),appendDoc = [];
    		if(form.length === 0){
				$("body").prepend($("<form />",{
					id : "all_oxhide_jqgrid_xls_form",
					name:"all_oxhide_jqgrid_xls_form",
					method:"post",
					target:"_blank",
					action:basePath + "/ajax.do?action=xlsall"
				}));
				form = $("#all_oxhide_jqgrid_xls_form");
    		}
    		form.empty();
    		for(var i = 0 ; i < tables.length;i ++){
    			var input = $('<input type="hidden" name="data"/>');
    			form.append(input);
    			input.val(tables[i].jqGrid("param","xlsOptionUpdate",true).jqGrid("form","xls",true));
    		}
    		form.append('<input type="hidden" name="fileName" value="{0}"/>'.format(fileName));
    		form.append('<input type="hidden" name="zip" value="'+(zip===true)+'"/>');
    		if(typeof zip === "function"){
    			form.mvvm({});
    			var data = form.mvvm("submit",false);
    			data.serverFile = true;
    			$MT.ajax(basePath + "/ajax.do?action=xlsall",data,function(d){
    				zip(d);
    			},function(){
    				zip(false);
    			});
    		}else{
    			form.submit();
    		}
    	},
		/**
    	 * 字符串是否为空，忽略空格
    	 */
    	isBlank : function(str){
    		return str === null || str === undefined || str == 0;
    	},
    	/**
    	 * 将输入数据：num转换为钱格式,千分位,分割,可以加前缀哦
    	 * @param num 数据,可以是字符串、数字 必填
    	 * @fix 前缀, 默认￥,可以是空字符串
    	 */
    	money : function(num,fix){
			fix = fix === undefined ? '￥' : new String();
			var settings = {
				name: "formatCurrency",
				colorize: false,
				region: '',
				global: true,
				roundToDecimalPlace: 2,
				eventOnDecimalsEntered: false,
				symbol: fix,
				positiveFormat: '%s%n',
				negativeFormat: '(%s%n)',
				decimalSymbol: '.',
				digitGroupSymbol: ',',
				groupDigits: true
			};
			settings.regex = settings.symbol === '' ? new RegExp("[^\\d" + settings.decimalSymbol + "-]", "g") : new RegExp(settings.symbol.replace('$', '\\$').replace('.', '\\.') + "|[^\\d" + settings.decimalSymbol + "-]", "g");

			num = String(num);
			if (num.search('\\(') >= 0) num = '-' + num;
			if (num === '') return;
			if (isNaN(num)) {
				num = num.replace(settings.regex, '');
				if (num === '') return;
				if (settings.decimalSymbol != '.')  num = num.replace(settings.decimalSymbol, '.');
				if (isNaN(num)) num = '0';
			}

			var numParts = String(num).split('.'),
				isPositive = (num == Math.abs(num)),
				hasDecimals = (numParts.length > 1),
				decimals = (hasDecimals ? numParts[1].toString() : '0'),
				originalDecimals = decimals;
			num = Math.abs(numParts[0]);
			num = isNaN(num) ? 0 : num;
			if (settings.roundToDecimalPlace >= 0) {
				decimals = parseFloat('1.' + decimals);
				decimals = decimals.toFixed(settings.roundToDecimalPlace);
				if (decimals.substring(0, 1) == '2') num = Number(num) + 1;
				decimals = decimals.substring(2);
			}
			num = String(num);
			if (settings.groupDigits) {
				for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
					num = num.substring(0, num.length - (4 * i + 3)) + settings.digitGroupSymbol + num.substring(num.length - (4 * i + 3));
				}
			}
			if ((hasDecimals && settings.roundToDecimalPlace == -1) || settings.roundToDecimalPlace > 0) {
				num += settings.decimalSymbol + decimals;
			}
			var format = isPositive ? settings.positiveFormat : settings.negativeFormat,
				money = format.replace(/%s/g, settings.symbol);
			money = money.replace(/%n/g, num);
			return money;
    	},
		/**
    	 * 防止一个按钮重复提交
    	 * 调用方式：
    	 * if($MT.norepeat(target) === true){
    	 * 	//进行提交操作
    	 * }
    	 * @param target 触发提交的按钮、链接的dom对象或者一个唯一标识，标识本页面的一个唯一操作
    	 * @param time 触发提交的间隔（毫秒），小于等于这个值认为是重复提交，默认1000
    	 */
    	norepeat : function(target,time){
    		var get = function(){
    			if(typeof target === "object"){
    				return $(target).data("clickDate");
    			}else{
    				$.clickDate = $.clickDate || {};
    				return $.clickDate[target];
    			}
    		},set = function(d){
    			if(typeof target === "object"){
    				$(target).data("clickDate",d);
    			}else{
    				$.clickDate = $.clickDate || {};
    				$.clickDate[target] = d;
    			}
    		},date = get();
    		if(time === undefined) time = 1000;
    		if(date === undefined){
    			set(new Date());
    			return true;
    		}else{
    			var date2 = new Date();
    			set(date2);
    			if(date2.getTime() - date.getTime() <= 1000){
    				return false;
    			}
    			return true;
    		}
    	},
    	/**
    	 * 关闭当前页面
    	 */
    	close : function(){
		    if (navigator.userAgent.indexOf("MSIE") > 0) {
		        if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
		            window.opener = null;
		            window.close();
		        } else {
		            window.open('', '_top');
		            window.top.close();
		        }
		    } else if (navigator.userAgent.indexOf("Firefox") > 0) {
		        window.location.href = 'about:blank ';
		    } else {
		        window.opener = null;
		        window.open('', '_self', '');
		        window.close();
		    }
    	},
        /**
         * 将[{self:"xx"},{self:"xx"}]变为["xx","xx"]
         * 将[{self_0:"xx",self_1:"xx"}，{self_0:"xx",self_1:"xx"}]变为[[xx,xx],[xx,xx]]
         * 将[{name:"xx"},{name1:"xx"}]变为["xx","xx"]
         * 将[{name1:"xx",name2:"xx"}，{name1:"xx",name2:"xx"}]变为[[xx,xx],[xx,xx]]
         */
        dataRevise : function(data){
            var result = [],element;
            data.each(function(i,v){
                element = [];
                for(var i in v)
                    element.push(v[i]);

                if(element.length === 1) result.push(element[0]);
                else result.push(element);
            });
            return result;
        },
        /**
         * formatDate(); 返回 2010-08-12(格式化当前日期,默认格式:yyyy-MM-dd)
         * formatDate("yyyy-MM");返回2010-08(格式化当前日期)
         * formatDate(new Date(xxx),"yyyy-MM");返回2013-07
         * 格式化选项:
         * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
         * 年(y)可以用 1-4 个占位符， 毫秒(S)只能用 1 个占位符(是 1-3 位的数字)如：
         * yyyy-MM-dd hh:mm:ss.S ==> 2006-07-02 08:09:04.423
         * yyyy-MM-dd E HH:mm:ss ==> 2009-03-10 二 20:09:04
         * yyyy-MM-dd EE hh:mm:ss ==> 2009-03-10 周二 08:09:04
         * yyyy-MM-dd EEE hh:mm:ss ==> 2009-03-10 星期二 08:09:04
         * yyyy-M-d h:m:s.S ==> 2006-7-2 8:9:4.18
         */
        formatDate : function(p,f){
            var date,fmt = "yyyy-MM-dd";
            switch(typeof p){
                case "string":
                date = new Date();
                fmt = p;
                break;
                case "object":
                date = p || new Date();
                f && (fmt = f);
                break;
                case "undefined":
                date = new Date();
                break;
            }
            var o = {
               "M+": date.getMonth() + 1,
                // 月份
                "d+": date.getDate(),
                // 日
                "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
                // 小时
                "H+": date.getHours(),
                // 小时
                "m+": date.getMinutes(),
                // 分
                "s+": date.getSeconds(),
                // 秒
                "q+": Math.floor((date.getMonth() + 3) / 3),
                // 季度
                "S": date.getMilliseconds() // 毫秒
            };
            var week = {
                "0": "\u65e5",
                "1": "\u4e00",
                "2": "\u4e8c",
                "3": "\u4e09",
                "4": "\u56db",
                "5": "\u4e94",
                "6": "\u516d"
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            if (/(E+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f": "\u5468") : "") + week[date.getDay() + ""]);
            for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        /*
            时间控件格式自动调整
            opt.format = "yyyy-mm-dd hh:mm:ss yy-mm-dd"等解析为datetimepick格式
            例如:
            oxhideTime({format : "yyyy-mm-dd hh:mm:ss" })
            返回{format:"yy-mm-dd hh:mm:ss"}即将老版本的格式化选项转换为新的格式化选项
        */
        oxhideTime : function(opt){
            opt.format || (opt.format = "yy-mm-dd");
            opt.format = opt.format.replace("yyyy","yy").replace("YYYY","yy").replace("MM","mm");
            var t = opt.format.split(" ") ,t1 = t[0].toLowerCase();
            if(t1.indexOf("y")  > -1 || t1.indexOf("d") > -1){
                opt.dateFormat = t[0];
                if(t.length == 1){
                    opt.showTimepicker = false;
                }else{
                    opt.timeFormat = opt.format.substr(t[0].length).trim();
                    opt.addSliderAccess = false;
                    opt.sliderAccessArgs = {touchonly: false};
                }
            }else{
                opt.timeFormat = opt.format;
                opt.timeOnly = true;
                opt.addSliderAccess = true;
                opt.sliderAccessArgs = {touchonly: false};
            }
            return opt;
        },
        /**
         *获取obj的expr属性 ,expr支持函数、"a.b.c.d"、"name"、数组下标
         * 例如get(obj,"organ.name");将获取到子属性organ的name属性;get(obj,function(){return this.name});this指向obj
         */
        get : function(obj,expr){
            if(expr === undefined) return obj;
            var ret,p,prm = [], i;
            if( typeof expr === "function") { return expr.call(obj); }
            ret = obj[expr];
            if(ret===undefined) {
                try {
                    typeof expr === "string"  && (prm = expr.split('.')) ;
                    if( (i = prm.length) ) {
                        ret = obj;
                        while (ret && i--) {
                            p = prm.shift();
                            ret = ret[p];
                        }
                    }
                } catch (e) {}
            }
            return ret;
        },
        /**
         * 为obj的 expr属性 赋值,expr支持函数、"a.b.c.d"、"name"、数组下标
         * override 表示是否覆盖原有值,true=智能模式,即null、undefined时覆盖,false=不覆盖,不传=覆盖
         * 例如set(obj,"organ.name","cc");将设置子属性organ的name属性;set(obj,"organ.name",function(){return this.name});this指向obj
         */
        set : function(obj,expr,value,override){
            var ret,p,prm = [], i;
            if(typeof value === "function") value = value.call(obj);
            if(expr in obj) {
            	if(override === false){
            		if(!obj.hasOwnProperty(expr)){
            			obj[expr] = value;
            		}
            	}else if(override === true){
            		if( value !== undefined && value !== null && value !== "" && (obj[expr] === undefined || obj[expr] === null || obj[expr] === "")){
            			obj[expr] = value;
            		}
            	}else{
            		obj[expr] = value;
            	}
            }
            else {
                try {
                    typeof expr === "string"  && (prm = expr.split('.')) ;
                    if( (i = prm.length) ) {
                        ret = obj;
                        while (i--) {
                            p = prm.shift();
                            if(i) ret[p] || (ret[p] = isNaN(p) ? {} : []);
                            else {
				            	if(override === false){
                            		if(!ret.hasOwnProperty(p)){
				            			ret[p] = value;
				            		}
				            	}else if(override === true){
				            		if(value !== undefined && value !== null && value !== "" && (ret[p] === undefined || ret[p] === null || ret[p] === "")){
				            			ret[p] = value;
				            		}
				            	}else{
				            		ret[p] = value;
				            	}
                            	break;
                            }
                            ret = ret[p];
                        }
                    }
                } catch (e) {}
            }
            return obj;
        },
        /**
         *将{"posts.postid":"8a8a80153b8846da013b884d02700013"}改为{"posts":{"posti":"8a8a80153b8846da013b884d02700013"}}
         */
        revise : function(obj){
            var oo = {};
            for(var i in obj) $MT.set(oo,i,obj[i]);
            return oo;
        },
        /**
         * 获取引用script脚本时所传参数,即script.js后面的name参数
         */
        getArgs : function(script,name) {
            var _args = ($MT.args && $MT.args[script]) || ( ($MT.args = {}) && null);
            if(!_args){
                var jss = $("script"), l = jss.length,i = 0,me;
                for(;i < l; i++ ){
                    me = !!document.querySelector ? jss[i].src : jss[i].getAttribute('src',4);
                    if( me.substr(me.lastIndexOf('/')).indexOf(script) !== -1 )  break;
                }
                me = me.split('?');
                if(me.length > 1){
                	me = me[1].split('&');
                	_args = {};
	                var i = 0, l = me.length, a;
	                for( ; i < l; i++ ){
	                    a = me[i].split('=');
	                    _args[a[0]] = a[1];
	                }
                	$MT.args[script] = _args;
                }else{
                	$MT.args[script] = _args = {};
                }
            }
            return _args[name];
        },
        /**
         * 解析url的参数为json对象
         * 返回: {url : "初始的url地址" , paran : {参数键值对}}
         * */
        getParam : function(url){
            url = url.split('?');
            if(url.length === 1){
            	return {url : url[0]};
            }else{
            	var u = url [0];
            	url = url[1];
                var p = url.split('&'), i = 0, l = p.length, a , result = {};
                for( ; i < l; i++ ){
                    a = p[i].split('=');
                    result[a[0]] = a[1];
                }
                return {url : u , param : result};
            }
        },
        /*
         * 导入css
         * path 路径
         * css css名
         * win 要导入的目标window对象
         * fn 加载完毕执行的方法
         * id 用来验证是否已经导入过,不会重复导入哦！
         * */
        importCss : function(cssPath,win,fn,id){
            win || (win = window);
            if(win.$("#" + id).length) return;
            id || (id = $MT.guid());
            var link = $("<link rel=\"stylesheet\" href=\""+cssPath+"\"  id=\""+ id +"\" />");

            win.$("head").before(link);
            fn && link.bind("load",fn);
            return id;
        },
        /**
         *返回随机字符
         *每个随机数长度为16
         *@param time 方法运行几次?默认1次,运行2次得到随机数长度为32,3次为48;即返回结果长度为运行次数 X 16
         */
        guid : function(time){
        	var result = "";
        	time || (time = 1);
        	for(var i = 0; i < time;i ++){
        		result += (function(){
		            var c = new Date(),
		            	b = c.getSeconds() + "",
		            	d = c.getMinutes() + "",
		            	e = c.getMilliseconds() + "";
		            for(var i = b.length,j = 2;i < j;i++){
		            	b = "0" + b;
		            }
		            for(var i = d.length,j = 2;i < j;i++){
		            	d = "0" + d;
		            }
		            for(var i = e.length,j = 3;i < j;i++){
		            	e = "0" + e;
		            }
		            return b+d+e+(((1+Math.random())*0x10000)|0).toString(16).substring(1)+(((1+Math.random())*0x10000)|0).toString(16);
        		})();
        	}
			return result.toUpperCase();
        },
        /**
         * 为url追加参数,自动生成&和?,参数格式
         *  url 原始地址
         *  参数键值对
         * 例如  $MT.appendParam(url,{key1:value1,key2:value2});
         */
        appendParam : function(url,params){
            var has = url.indexOf("?") === -1,result = [url];
            for(var i in params){
                if(has){
                    result.push("?{0}={1}".format(i,params[i]));
                    has = false;
                }else{
                    result.push("&{0}={1}".format(i,params[i]));
                }
            }
            return result.join("");
        },
        /**
         * 把object转换为一个字符串:{xx:xx...}
         * 把array转换为一个字符串:["","",""..]
         *
         * null和undefined是不同的处理结果,如果是null那么转换后为 name:null,   undefined转换后为 name:""
         *
         * 参数1：对象
         * 参数2: 一个数组,里面放的是要忽略的属性值,例如 [null,false,undefined]那么当值=null、false、undefined时,该属性都不会出现在转换后的字符串中
         * 参数3: 一个数组,里面放的是要忽略的属性名,例如 ["name","age"],那么属性 name、age都不会出现在转换后的字符串中
         * 参数4: 一个数组,里面放的是要忽略的属性类型,例如 ["function","boolean","array"],那么属性类型是"function","boolean","array"都不会出现在转换后的字符串中,支持"function","boolean","array","number","string","date","regexp","object"
         * 参数5: 字符串 属性为null时,值替换为什么?默认是null
         * 参数6: 字符串 属性为undefined时,值替换为什么?默认是空字符串
         * 参数7: 字符串 属性为空字符串时,值替换为什么?默认是空字符串
         * 注意:
         *  忽略的属性值、属性名使用严格匹配方式判断是否相等
         *
         * 例如:
         *      obj2str(object,null,["name","age"]);
         *      obj2str(object,[null,false,undefined]);
         *      obj2str(object,[null,false,undefined],["name","age"]);
         *      obj2str(object,null,null,["function","array"]);
         *      obj2str(object,[null,false,undefined],["name","age"],["function","array"]);
         *      obj2str(object,[null,false,undefined],["name","age"],["function","array"],"null","null");
         */
        obj2str:function(o,ignoreValue,ignoreName,ignoreType,nullString,undefinedString,emptyString){
            var r = [];
            if (typeof o === "string")  {
            	if(o.trim().length == 0 && emptyString !== null && emptyString !== undefined && emptyString !== false) return emptyString;
            	return "\""+o+"\"";
            }
            if (typeof o === "number")  return o;
            if (o === null)  return ((nullString === undefined || nullString === null) ? "null" : nullString);
            if (o === undefined)  return ((undefinedString === undefined || undefinedString === null)? "\"\"" : undefinedString);
            if (typeof o == "object") {
                if(!$.isArray(o)){
                    r[0] = "{";
                    var temp = false;
                    for (var i in o) {
                        if(ignoreName && ignoreName.indexOfEx(i) > -1) continue;
                        if(ignoreValue && ignoreValue.indexOfEx(o[i]) > -1) continue;
                        if(ignoreType && ignoreType.indexOfEx($.type(o[i])) > -1) continue;
                        r[r.length] = "\""+i+"\"";
                        r[r.length] = ":";
                        r[r.length] = $MT.obj2str(o[i],ignoreValue,ignoreName,ignoreType,nullString,undefinedString,emptyString);
                        r[r.length] = ",";
                        temp = true;
                    }
                    r[temp ? r.length - 1 : r.length] = "}";
                } else {
                    r[0] = "[";
                    var temp = false;
                    for (var i = 0; i < o.length; i++) {
                        if(ignoreName && ignoreName.indexOfEx(i) > -1) continue;
                        if(ignoreValue && ignoreValue.indexOfEx(o[i]) > -1) continue;
                        if(ignoreType && ignoreType.indexOfEx($.type(o[i])) > -1) continue;
                        r[r.length] = $MT.obj2str(o[i],ignoreValue,ignoreName,ignoreType,nullString,undefinedString,emptyString);
                        r[r.length] = ",";
                        temp = true;
                    }
                    r[temp ? r.length - 1 : r.length] = "]";
                }
                return r.join("");
            }
            return o.toString();
        },
        /**
         *汉字转拼音,只传字符串时,将字符串转为拼音首字母
         * 传详细参数:
         * {
         *    word:"",
         *    all:true|false, 是否全拼,默认否
         *    upper:true|false,是否大写,默认是
         *    array:true|false 是否返回多音字数组,默认否,
         *    fn:function(data){}回调函数,如果不传回调, 表示同步获取数据,此时页面会有等待
         * }
         *
         * 例如:
         * $MT.makePY("高级") == $MT.makePY({word:"高级",all:false,upper:true,array:false,fn:null})
         * 如果不传fn表示同步执行
         */
        makePY:function(param){
            var def = {
                all : false,
                upper:true,
                array:false
            };
            if(typeof param == "string"){
                param = $.extend(def,{
                    word : param
                });
            }else{
                $.extend(def,param);
            }
            var fn = param.fn;
            delete param.fn;
            if(fn)
                $MT.ajax(basePath + "/ajax.do?action=pinyin",param,fn);
            else{
                var result;
                $MT.ajax(basePath + "/ajax.do?action=pinyin",param,function(data){
                    result = data;
                },null,false);
                return result;
            }
        },
        /**
         * dwr执行方法
         * str表示执行的字符串,例如
         * $MT.dwr("DWRBaseClass.checkObjcect('dictionaryService','" + id + "')");
         * $MT.dwr("DWRBaseClass.checkObjcect('dictionaryService','abdje')");  abdje是一个字符串,这个方法中字符串不用用引号扩起来
         * $MT.dwr("DWRBaseClass.checkObjcect('dictionaryService','#username')");  ^username表示取id或者name是username的控件的值
         */
        dwr: function(param) {
         if(!window.dwr) return true;
         var result,mather = /\{[^}]+\}/g,els = param.match(mather),realData,resultFn = "_"+$MT.guid();
         window[resultFn] = function(data) {result = data;};
         els && els.each(function(i,v){
            realData = $(v.substring(1,v.length-1)).val();
              param = param.replace(v,realData);
          });
          param = param.substring(0,param.indexOf(")"));
          param += ","+resultFn+");";
          dwr.engine.setAsync(false);
          try{
            new Function(param)();
         }catch(e){
            alert(param + ">>执行失败!!");
         }

         dwr.engine.setAsync(true);
          return result;
       },
        /**
        *封装
        * if (!$MT.dwr('DWRBaseClass.checkObjcect('+service+','+id+')')) {
            info({message:"记录已经被删除，请刷新页面！"});
            return;
          }
          的方法,返回true表示存在,false表示不存在
        */
        exist : function(service,id){
         if (!$MT.dwr('DWRBaseClass.checkObjcect("'+service+'","'+id+'")')) {
            info({message:"记录已经被删除，请刷新页面！"});
            return false;
         }
         return true;
       },
        /**
         * 拼接分页组件
         * pageSize 每页多少条
         * count 总共多少条
         * pageTeml 
         * nowTeml 当前页
         * {
         * 		pageSize 【*】每页多少条
         * 		count    【*】共多少条记录
         * 		pageNow  当前第几页,默认1
         * 		pageTeml 【*】页码模版,必须有{0}表示变化的页码数字
         * 		pageTemlNow 【*】当前页码的模版(字符串),必须有{0}表示变化的页码数字
         * 		pageInfoTeml 页面信息的模版(字符串),需要有{0}{1}{2}分别表示第几{0}到第几{1},共{2}条
         * 		info 页面信息的容器
         * 		page 【*】页码的容器
         * 		pageMax 最多展示多少个页码,默认5,最小都得是5;且必须是奇数
         * 		pageForword(page) 函数,page可能是true,表示当前页+1,page可能是false表示当前页-1,也可能是页码,直接跳就行
         * 		select 【*】页码中可点击的元素的选择器
         * }
         * 
         * */
        buildPager : function(param){
        	var result = {};
        	param.pageSize = +param.pageSize;
        	param.count = +param.count;
        	param.pageNow = +param.pageNow;
        	if(param.pageInfoTeml && param.info){
        		if(param.count > 0) param.info.html(param.pageInfoTeml.format(param.pageSize * (param.pageNow - 1) + 1,param.count > 10 * param.pageNow ? 10 * param.pageNow : param.count,param.count));
        		else param.info.html("没有找到记录!");
        	}
        	param.pageCount = parseInt((param.count + param.pageSize - 1) / param.pageSize);
        	if(param.pageMax < 5 || !param.paramMax) param.pageMax = 5;
        	if(param.pageMax % 2 == 0) param.pageMax ++;
        	if(param.count > 0){
        		result.page = [];
        		var count = 0,
        			after = param.pageCount - param.pageNow,
        			before = param.pageNow - 1,
        			maxSub = (param.pageMax - 1)/2;
        		if(after > param.pageMax - 1) after = param.pageMax - 1;
        		if(before >= maxSub && after >= maxSub){
        			before = after = maxSub;
        		}else if(before >= maxSub && after < maxSub){
        			before += maxSub - after;
        			if(before > param.pageMax - 1 - after) before = param.pageMax - 1 - after;
        		}else if(before < maxSub && after >= maxSub){
        			after += maxSub - before;
        			if(after > param.pageMax - 1 - before) after = param.pageMax - 1 - before;
        		}
        		for(var i = 1;i <= before ; i++){
        			result.page.unshift(param.pageTeml.format(param.pageNow - i));
        		}
        		result.page.push(param.pageTemlNow.format(param.pageNow));
        		for(var i = 1;i <= after ; i++){
        			result.page.push(param.pageTeml.format(i + param.pageNow ));
        		}
				if (param.pageNow < param.pageCount) {
					result.page.push(param.pageTeml.format("»"));
				}
				if(param.pageNow > 1){
        			result.page.unshift(param.pageTeml.format("«"));
        		}
				param.page.html(result.page.join("")).find(param.select).bind("click",function(){
					var t  = $(this).html();
					if(t == "«"){
						param.pageForword(false);
					}else if(t == "»"){
						param.pageForword(true);
					}else{
						param.pageForword(t);
					}
				});
				
        	}else{
        		param.page.empty();	
        	}
        },
        /**
         {
         	action:默认查询basePath/baseshowAction.do?action=showList,
         	sqlCode:查询语句编码
         	size : "查询几条记录,-1表示全部(默认)"
         	page : "查询第几页",
         	sqlLocal : true
         	alias:{ //字段别名,如{isvalidation : "employee.isvalidation"} 表示where条件或者排序用employee.isvalidation来表示isvalidation
         		
         	},
         	order:{ //排序方式,如{employeename:"asc",birthday:"desc"} 即： 字段名:"排序方式",这里字段名不要考虑别名
         	
         	},
         	search:[]//查询条件,里面为json对象,属性:{
         		name:"", 【必填】字段名称, 不需要考虑别名
         		op: "",  【必填】查询关系,可选eq(等于),ne（不等于）,lt（小于）,le（小于等于）,gt（大于）,ge（大于等于）,like_r（右like）,nlike_r（右不like）,l_like（左like）,nl_like（左不like）,like,nlike（不like）,nn（not null）,n（is null）,in(参数必须以,分割),nin(not in,参数必须以,分割)
         		group : "and|or", 默认是and
         		null:true 默认true,参数的值为空时,后台是否忽略此参数；如果false,后台将把参数变为 xxxx is null, like null等
         		table: 该列在查询的表名,
         		value ："查询值"
         	},
         	flow:{ //工作流相关
         		code : 流程编码
         		id: 业务主键名
         	}
         }
         callback 回调方法,参数data属性为:{
            records : 记录条数
            rows : 记录
         }
         error 异常回调
         async 是否异步,默认true
         * */
        showList : function(param,callback,error,async){
        	param = $.extend({
        		ajax : true,
        		size : -1,
        		page : -1,
        		_table_withSql_ : true,
        		sqlLocal : true,
        		action : basePath  + "/baseShowAction.do?action=showList"
        	},param);
        	
        	param.rows = param.size;
        	delete param.size;
        	
        	if(param.alias){
        		param.columnTableName = [];
	        	for(var i in param.alias){
	        		param.columnTableName.push(i + "," + param.alias[i]);
	        	}
	        	delete param.alias;
        	}
        	
        	if(param.order){
        		var count = 0,o = [];
        		for(var i in param.order){
        			if(count == 0){
        				param.sidx = i;
        				o.push(param.order[i]);
        			}else{
        				o.push( i + " " + param.order[i]);
        			}
        			count ++;
        		}
        		param.sord = o.join(",");
        	}
        	
        	if(param.search){
        		param.rules = [];
	        	param.search.each(function(i,v){
	        		param.rules.push("{name}#{name}#{op}#{value}#{group}#{null}#{table}#{id}".format($.extend({
	        			group : "and",
	        			"null" : true,
	        			id : $MT.guid()
	        		},v)));
	        	});
	        	delete param.search;
        	}
        	
        	if(param.flow){
        		param._flow_Id_ = param.flow.id;
        		param._flow_Code_ = param.flow.code;
        		delete param.flow;
        	}
        	var action = param.action;
        	delete param.action;
        	$MT.ajax(action,param,callback,error,async);
        },
       	/**
        * 异步查询sqlquery中定义的语句,opt中属性
            code : sql语句编码,必填
            param: 参数键值对,参数值可以是数组!,可选
            local: sql语句执行是在本地还是oxhide? true|false,必填
            ok: 回调函数,必填
            error: 错误时回调函数,可选.该函数返回true时不再提示错误信息.参数是 jqXHR, textStatus, errorThrown,可选
            begin:从第几条记录开始查询,可选
            pages:查询几条 可选
            async:是否异步
            
            同步时,方法直接返回查询结果
        */
       	query : function(opt,param,local,ok,error,begin,pages,async){
       		if(typeof opt === "string"){
       			opt =	$.extend({
	                code : opt,
	                param: param || {},
	                local: local === undefined ? true : local,
	                ok: ok,
	                error: error,
	                begin:begin,
	                pages:pages,
	                async:async
            	},opt);
       		}else{
	            opt = $.extend({
	                code : "",
	                param: {},
	                local: true,
	                ok: "",
	                error: "",
	                begin:"",
	                pages:"",
	                async:true
	            },opt);
       		}
            opt.param["_code_"] = opt.code;
            opt.param["_local_"] = opt.local;
            opt.param["_begin_"] = opt.begin;
            opt.param["_pages_"] = opt.pages;
            return $MT.ajax(basePath + "/ajax.do?action=query",opt.param,opt.ok,opt.error,opt.async);
        },
        /**
         * 异步查询数据字典内容
            code :  数据字典类型编码,
            ok:   成功回调方法,
            error:失败回调方法(可选)该函数返回true时不再提示错误信息.参数是 jqXHR, textStatus, errorThrown,
            codeContent:数据字典 值 编码（可选）,
            codeFilter:数据字典 值编码过滤（可选）,
            valueFilter:数据字典 值显示内容过滤（可选）,
            size:查几条
            async:true|false当async=false时,方法会返回查询结果
         */
        dictionary : function(opt){
            opt = $.extend({
                code : "",
                ok: "",
                error: "",
                codeContent:"",
                codeFilter:"",
                valueFilter:"",
                size:""
            },opt);
            var param = {
                _code_ : opt.code,
                _codeContent_ : opt.codeContent,
                _codeFilter_ : opt.codeFilter,
                _valueFilter_:opt.valueFilter,
                _size_ : opt.size
            };
            return $MT.ajax(basePath + "/ajax.do?action=dictionary",param,opt.ok,opt.error,opt.async);
        },
        /*保存标记*/
        saveMark : function(employeeid,itemid,type,remark){
        	 $MT.ajax(basePath + "/ajax.do?action=saveMark",{
        	 	employeeid : employeeid,
        	 	itemid : itemid,
        	 	marktype : type,
        	 	remark: remark
        	 },null,function(){
        	 	return false
        	 });
        },
        /*移除标记*/
        removeMark : function(employeeid,itemid){
        	 $MT.ajax(basePath + "/ajax.do?action=removeMark",{
        	 	employeeid : employeeid,
        	 	itemid : itemid
        	 },null,function(){
        	 	return false
        	 });
        },
        /*获取标记状态*/
        getMarkState : function(employeeid,itemid,callback){
        	 $MT.ajax(basePath + "/ajax.do?action=getMarkState",{
        	 	employeeid : employeeid,
        	 	itemid : itemid
        	 },callback,function(){
        	 	return false
        	 });
        },
        /*获取标记备注*/
        getMarkInfo : function(employeeid,itemid,callback,asStr){
        	 $MT.ajax(basePath + "/ajax.do?action=getMarkInfo",{
        	 	employeeid : employeeid,
        	 	itemid : itemid,
        	 	str : asStr
        	 },callback,function(){
        	 	return false
        	 });
        },
        /*获取标记状态+备注*/
        getMark : function(employeeid,itemid,callback){
        	 $MT.ajax(basePath + "/ajax.do?action=getMark",{
        	 	employeeid : employeeid,
        	 	itemid : itemid
        	 },callback,function(){
        	 	return false
        	 });
        },
        /**
         * jquery ajax 数据请求,格式是jsonp,
         * 当服务器返回空字符串时,原本jquery作为异常处理了,理由时回调方法没有调用;但在这里当成正确情况了,并会调用成功时的回调方法,只是参数是空;
         * 因此如果服务器请求可能返回空字符串,那么成功回调方法中就要兼顾到回调参数是空的情况
         * 参数1：请求地址
         * 参数2：请求参数
         * 参数3：请求成功的回调函数,参数是data
         * 参数4：请求失败的回调函数,可选,参数是 jqXHR, textStatus, errorThrown,返回true,表示不需要ajax方法提示错误信息了
         * 参数5: 是否异步,默认true,可选
         * 
         * 同步执行时,方法返回异步执行结果
         * 
         */
        ajax : function(url,param,fnOK,fnError,async){
	        if(param === null || param === undefined) param = {ajax:true};
	        else param.ajax = true;
			if($('#sessionid').val()!== null){
				param.sessionid=$('#sessionid').val();
			}
	        var result;
	        $.ajax({
	                url:url,
	                timeout:0,
	                dataType:"jsonp",
	                type :"POST",
	                data :param,
	                async:async !== false,
	                traditional : true,
	                success:function(data){
	                	try{
		                    if(data && data.error){
				        		un_disabled_for_no_repeat_submit();
		                    	XqTipClose();
		                    	var selfDo = fnError && fnError(data.error);
		                        if(selfDo !== true){
		                        	var p = window;
		                        	error((oxhideDebug && (url + "<br/>")) +  data.error,function(){
										$MT.doError(data.exceptType);
		                        	});
		                        }else{
									$MT.doError(data.exceptType);
		                        }
		                    }else{
		                    	result = data;
		                    	fnOK && fnOK(data);
		                    }
	                	}catch(e){
	                	}
	                },
	                error:function(jqXHR, textStatus, errorThrown){
	                	try{
		                	un_disabled_for_no_repeat_submit();
		                	XqTipClose();
		                    if(jqXHR.status == 200 && jqXHR.responseText == "") {fnOK && fnOK(); return;}
		                    if(fnError)
		                        fnError(jqXHR, textStatus, errorThrown) || error((oxhideDebug && (url + "<br/>")) + "数据请求发生异常!");
		                    else
		                        error((oxhideDebug && (url + "<br/>")) + "数据请求发生异常!");
	                	}catch(e){}
	                }
	        });
	        return result;
        },
        /**
         * 处理异常
         */
        doError : function(exceptType,table){
        	var p = window;
			switch(+exceptType){
				case 0:
					p.history.back();
				break;
				case 1:
					
				break;
				case 2:
					window.top.location = window.top.oxhidePath || basePath;
				break;
				case 3:
					p = window;
                    while(p.dg === undefined && p.parent && p.parent.sihe === undefined && p.parent.location !== p.location){
                    	p = p.parent;
                    }
                    if(p.dg) dg.close();
				break;
				case 4:
                    while(p.parent && p.parent.sihe === undefined && p.parent.location !== p.location){
                    	p = p.parent;
                    }
                    ui("close",{tabid : p.name});
				break;
				case 5:
                    while(p.parent && p.parent.sihe === undefined && p.parent.location !== p.location){
                    	p = p.parent;
                    }
                    ui("close",{tabid : p.name});
				break;
				case 6:
					window.close();
				break;
				case 7:
					if(table) table.jqGrid("load",false);
					else window.location.href = window.location.href;
				break;
			}
        },
        /**
         * 循环
         * 参数1：要循环的对象或者数组
         * 参数2：循环时调用的函数,函数参数为(index,value)index表示对象属性名或者数组下表,value表示对象属性或者数组元素,函数this指向value
         */
        each : function(obj,fn){
        	if($.type(obj) === "array") obj.each(fn);
        	else{
        		for(var i in obj){
        			fn.call(obj[i],i,obj[i]);
        		}
        	}
        },
        /**
         * 将地址编译为先跳到load.jsp再转，并追加当前sessionid的地址;当用对话框组件打开地址事时,已经自动编译,无需重复编译了！
         * 参数1：url
         * 参数2：系统地址前缀，默认使用当前系统的前缀
         * 参数3：要追加到url中的参数键值对
         *
         * $MT.url("/plug-in/flow/frame.jsp");
         * $MT.url("/plug-in/flow/frame.jsp","http://192.168.1.2:8080/coal/");
         * $MT.url("/plug-in/flow/frame.jsp",{param1:"value1",param2:"value2"})
         * $MT.url("/plug-in/flow/frame.jsp","http://192.168.1.2:8080/coal/",{param1:"value1",param2:"value2"})
         */
        url : function(url,appPath,param){
        	if(appPath && typeof appPath === "object") {
        		param = appPath;
        		appPath = basePath;
        	}
        	return ui("url",url,appPath === false ?  false : (appPath || basePath),false,true,false,false,false,param) || url;
        }
    });
})();
/*window 基础类型扩展结束 */

//TODO jquery 扩展开始
(function($){
    /**
     * 万能方法
     * 不传参数作用：修订样式(按钮、文本框、文本域) 和 更新表单元素渲染(下拉框、tabs);每个元素都必须已经追加到dom中之后才能刷新,否则会有问题
     * 传参数作用：
     *
     * 参数=标签创建的js对象时(各种标签怎么创建对象,有的是abstractedName不为空,有的是abstracted=true),创建渲染效果(文本框的各种扩展)
     * 参数prototype为js对象时:
     * 必填_extendName，表示控件要执行什么方法?例如autocomplete、upload等jquery扩展,这个方法也可以不存在,只用来标记渲染效果
     * 可选_before_method数组,表示执行_extendName前要执行的方法,这个方法的this一定是当前jquery对象,数组中放置object,fn：方法,once:true|false 是否只执行一次,默认false
     * 可选_method数组,表示执行完_extendName后要执行的方法,这个方法的this一定是当前jquery对象,数组中放置object,fn：方法,once:true|false 是否只执行一次,默认false
     * 而prototype本身作为_extendName方法的参数处理,并存放在控件的data(_extendName + "_oxhide_options_")中,渲染完毕后,回给控件增加属性:_extendName,只要_extendName=true表示已经渲染过了
     *
     * 参数=字符串,可以调用各对象的方法,例如:
     * $(xx).refresh("tree","addNode","1234");
     * $(xx).refresh("jqGrid","refresh",true,1);
     * 这种情况下传参的格式是:第一个参数表示命名空间,第二个参数表示方法名,后面是方法的参数,参数多少个都行;
     * 象上面两个,$(xx).refresh("jqGrid","refresh",true,1);表示调用jqGrid的refresh方法，参数是true和1
     *
     * 还能获取对象的属性,例如
     * $(xx).refresh("tree","setting.async.otherParam.async");方法会返回该tree.setting.async.otherParam.async属性
     * 此时方法的返回值与其他情况都不同,其他情况返回的都是当前操作的jquery对象,现在返回的是调用的方法的返回值或者属性值
     * 执行失败或者属性获取失败,返回null
     *
     * 目前支持这种写法的命名空间有:jqGrid/tree/upload/tabs/autocomplete/button/datetimepicker/accordion/menu
     * 各个命名空间的方法、属性这里不赘述
     * 以后陆续标准化所有js插件
     *
     *
     *
     * 按钮刷新
     * 1:自身属性(attr)
     * buttonType=按钮图标
     * onlyIcon=true|false,是否只有图标
     * appendTo=按钮作为哪个按钮的子按钮?可以指向一个jquery选择器、一个dom元素、一个jquery对象
     * 2:data属性
     * appendTo=按钮作为哪个按钮的子按钮?此时appendTo直接指向一个jquery对象
     * unclickButtonset=按钮作为子按钮时,点击哪个控件,子按钮菜单隐藏?指向一个jquery对象;默认情况下,点击document会隐藏
     */
    (function($){
        $.fn.refresh = function(prototype){
            var t = this,types = typeof prototype;
            switch(typeof prototype){
            case "string":
                if(arguments.length === 1) return t;
                if(!$.fn[prototype] || typeof $.fn[prototype] !== "function") return t;
                return $.fn[prototype].apply(t,$.makeArray(arguments).slice(1));
            case "object":
                prototype = prototype && $.extend(true,{},prototype);
                var add,remove,breakMe = false;
                if(prototype._before_method){
                  add = [];remove = [];
                    $.each(prototype._before_method,function(){
                        var that = this;
                        (that.once ?  remove : add).push(that);
                    });
                    prototype._before_method = add;

                    $.each(remove,function(){
                      if(this.fn.call(t,prototype) === false){
                             breakMe = true;
                             return false;
                      }
                    });
                    if(breakMe === true) return t;
                    $.each(add,function(){
                      if(this.fn.call(t,prototype) === false){
                             breakMe = true;
                             return false;
                      }
                  });
                  if(breakMe === true) return t;
                }
                t.attr(prototype._extendName + "__","true").data(prototype._extendName + "_oxhide_options_",prototype) && t[prototype._extendName] && t[prototype._extendName](prototype);
                if(prototype._method){
                    add = [];remove = [];
                    $.each(prototype._method,function(){
                        var that = this;
                        (that.once ?  remove : add).push(that);
                    });
                    prototype._method = add;
                    $.each(remove,function(){
                        this.fn.call(t,prototype);
                    });
                    $.each(add,function(){
                        this.fn.call(t,prototype);
                    })
                }
                
                for(var i = 0,j = t.length;i<j;i++){
                	var self = $(t[i]),nodeName = self.prop("nodeName").toLowerCase(),type = self.prop("type"),name = nodeName == "input" ? nodeName+"_"+type : nodeName;
                    switch(name){
                		case "input_text"  :
                        case "input_password"  :
                        case "textarea"  :
                            self.addClass("ui-widget-content ui-corner-all").css("padding","5px");
                            break;
                    } 
                }
            break;
            default :
                for(var i = 0,j = t.length;i<j;i++){
                    var self = $(t[i]),nodeName = self.prop("nodeName").toLowerCase(),type = self.prop("type"),name = nodeName == "input" ? nodeName+"_"+type : nodeName;
                    switch(name){
                        case "button" :
                        case "input_button" :
                        	var icon = self.attr("buttonType"),icon2 = self.attr("secondButtonType");
                            if(self.data("isButtoned")){
                                if(self.data("notButtonUi") !== true) {
                                	var label = self.find(".ui-button-text");
                                	label = label.html() || self.html();
                                    self.button("option",{
                                        icons: {
                                            primary:icon,
                                            secondary: icon2
                                        },
                                        text:self.attr("onlyIcon") !== "true",
                                        label : label
                                     }).button("refresh");
                                }
                                break;
                            }
                            if(self.attr("appendTo") || self.data("appendTo")  ){
                                var appendTo = self.attr("appendTo"),elem,pdiv,menu,menuButton,menuWidth;
                                try{
                                    elem = $(new Function("return " + appendTo)());
                                }catch(e){
                                    elem = $(new Function("return \""+appendTo+"\"")());
                                }
                                if(!elem.length) elem = self.data("appendTo");
                                if(!elem || !elem.length){
                                    self.button({
                                        icons: {
                                            primary:icon,
                                            secondary: icon2
                                        },
                                        text:self.attr("onlyIcon") !== "true"
                                    }).data("isButtoned",true);
                                    break;
                                }
                                if(!elem.data("isButtonSet")){
                                    pdiv = $("<div style='display:inline-block'/>");
                                    elem.after(pdiv).appendTo(pdiv);
                                    menu = $("<ul />",{style:"position: absolute;z-index:10000;width:auto"});
                                    pdiv.after(menu).data("buttonMenu",menu.hide());
                                    menuButton = $("<button>更多操作</button>",{type:"button"});
                                    pdiv.append(menuButton);
                                    elem.bind("more",function(){
                                        menuButton.trigger("click");
                                        return false;
                                    })
                                    menuButton.button({
                                        text: false,
                                        icons: {
                                            primary: "ui-icon-triangle-1-s"
                                        }
                                    }).bind("click",function(){
                                        menu.show().position({
                                            my: "left top",
                                            at: "left bottom",
                                            of: this
                                        });
                                        $( document ).one( "click", function() {
                                            menu.hide();
                                        });
                                        elem.data("unclickButtonset") && elem.data("unclickButtonset").one( "click", function() {
                                            menu.hide();
                                        });

                                        return false;
                                    });
                                    pdiv.buttonset();
                                    elem.data("isButtonSet",true).data("pdiv",pdiv);
                                }
                                menuWidth = elem.attr("buttonWidth") || 100;
                                pdiv = elem.data("pdiv");
                                if(icon || icon2){
                                	var li = $("<li {2}><a href='javascript:;'>{1}{0}{3}</a></li>".format(
	                                        	self.html(),
	                                        	icon ? ("<span class='ui-icon "+icon+"'></span>") : "",
	                                        	self.attr("disabled") ? "disabled='disabled'" : "",
	                                        	icon2 ? ("<span class='ui-icon "+icon2+"'></span>") : ""
	                                        )).bind("click",function(){
                                            var that = $(this) , self = that.data("button");
                                            that.attr("disabled") || self.trigger("click");
                                        }).data("button",self);
                                    pdiv.data("buttonMenu").append(li).menu().menu("refresh");
                                    menuWidth != 100 &&   window.jqueryUiTool._width_right.call(pdiv,menuWidth,elem.attr("buttonMenuWidth"));
                                    self.data("abstractButton",li);
                                    if(self.attr("display") === "false") li.hide();
                                }else{
                                	var li = $("<li {1}><a href='javascript:;'>{0}</a></li>".format(self.html(),self.attr("disabled") ? "disabled='disabled'" : ""))
                                        .bind("click",function(){
                                            var that = $(this) , self = that.data("button");
                                            that.attr("disabled") || self.trigger("click");
                                        }).data("button",self);
                                    pdiv.data("buttonMenu").append(li).menu().menu("refresh");
                                    menuWidth != 100 &&   window.jqueryUiTool._width_right.call(pdiv,menuWidth,elem.attr("buttonMenuWidth"));
                                    self.data("abstractButton",li);
                                    if(self.attr("display") === "false") li.hide();
                                }
                                self.hide().data("isButtoned",true).data("notButtonUi",true);
                            }else if(icon || icon2){
                                self.button({
                                    icons: {
                                        primary:icon,
                                        secondary: icon2
                                    },
                                    text:self.attr("onlyIcon") !== "true"
                                }).data("isButtoned",true);
                            }else
                                self.button().data("isButtoned",true);
                            if(self.attr("group") || self.data("group")  ){
                                var group = self.attr("group") || self.data("group"),
                                     elem = $("input[type=button][group="+group+"],button[group="+group+"]"),
                                     father;

                                if(elem.length){
                                    father = elem.data("parentGroup");
                                    if(!father){
                                        father = $("<div/>",{
                                            style:"display: inline-block;"
                                        });
                                        elem.after(father).appendTo(father).data("parentGroup",father);
                                    }
                                    father.append(self).buttonset();
                                }
                            }
                            break;
                        break;
                        case "select" :
                            self.data("switchBox_oxhide_options_") && self.refresh(self.data("switchBox_oxhide_options_"));
                            self.data("echmultiselect_oxhide_options_") && self.refresh(self.data("echmultiselect_oxhide_options_"));
                        break;
                        case "input_text"  :
                        case "input_password"  :
                        case "textarea"  :
                            self.addClass("ui-widget-content ui-corner-all").css("padding","5px");
                        break;
                        case "body" :
                            self.addClass("ui-widget");
                        break;
                    }
                }
            }
            return t;
        }
    })($);

    /**
     * 为页面绑定单击事件,忽略选择器,
     * fn 是执行函数
     * hasChild 是否也忽略选择器的子元素,默认true
     * 返回一个function,该function就是绑定到body上的事件,
     * 可以用这个function来解绑定
     *
     * $(xx).pageClick(function(){},true);返回jquery对象
     * $(xx).pageClick("unbind"); 解除为xx绑定的页面单击事件
     */
    (function($) {
        $.fn.pageClick = function(fn, hasChild) {
           var that = this,tempId = $MT.guid();
            if (typeof fn == "string") return $.fn.pageClick[fn] && $.fn.pageClick[fn].apply(that, $.makeArray(arguments).slice(1));
            if (hasChild === undefined) hasChild = true;
            var fun = function(e) {
                var t = e.target,ownDom = false;
                that.each(function(){
                	var tt = $(this);
                	if(tt.is(t)){
                		ownDom = true;
                		return false;
                	}
                })
                ownDom || hasChild && that.each(function() {
                    var tt = this;
                    if (tt.each) {
                        for (var i = 0; i < tt.length; i++) {
                            ownDom = $.contains(tt[i], t);
                               if (ownDom) return false;
                           }
                    } else {
                        ownDom = $.contains(tt, t);
                        if (ownDom) return false;
                    }
                });
                if (!ownDom) fn.call(that, e, ownDom);
            };
            $("body").bind("click." + tempId, fun);
            that.each(function(){
                $(this).data("pageClick",tempId);
            });
            return that;
        };
        $.fn.pageClick.unbind = function() {
            var that = this,
            tempId = that.data("pageClick");
            if (tempId) {
                $("body").unbind("click."+tempId);
                  that.removeData("pageClick");
            }
           return that;
        }
    })($);

    /*jquery事件扩展 resize 开始*/
    (function($,window,undefined){
      '$:nomunge';
      var elems = $([]),
        jq_resize = $.resize = $.extend( $.resize, {} ),
        timeout_id,
        str_setTimeout = 'setTimeout',
        str_resize = 'resize',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';
      jq_resize[ str_delay ] = 250;
      jq_resize[ str_throttle ] = true;
      $.event.special[ str_resize ] = {
        setup: function() {
          if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
          var elem = $(this);
          elems = elems.add( elem );
          $.data( this, str_data, { w: elem.width(), h: elem.height() } );
          if ( elems.length === 1 ) {
            loopy();
          }
        },
        teardown: function() {
          if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
          var elem = $(this);
          elems = elems.not( elem );
          elem.removeData( str_data );
          if ( !elems.length ) {
            clearTimeout( timeout_id );
          }
        },
        add: function( handleObj ) {
          if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
          var old_handler;
          function new_handler( e, w, h ) {
            var elem = $(this),
              data = $.data( this, str_data );
               if(data){
                   data.w = w !== undefined ? w : elem.width();
                    data.h = h !== undefined ? h : elem.height();
               }
            old_handler.apply( this, arguments );
          };
          if ( $.isFunction( handleObj ) ) {
            old_handler = handleObj;
            return new_handler;
          } else {
            old_handler = handleObj.handler;
            handleObj.handler = new_handler;
          }
        }

      };
      function loopy() {
        timeout_id = window[ str_setTimeout ](function(){
          elems.each(function(){
            var elem = $(this),
              width = elem.width(),
              height = elem.height(),
              data = $.data( this, str_data );
            if ( width !== data.w || height !== data.h ) {
              elem.trigger( str_resize, [ data.w = width, data.h = height ] );
            }
          });
          loopy();
        }, jq_resize[ str_delay ] );
      };
    })(jQuery,this);
    /*jquery事件扩展 resize 结束*/

    /**
     *提示消息,
     * $("body").tip  以body为底布
     * $(element).tip 以控件为底布
     * body    时可以出现多个提示,并可以根据id进行修改内容、标题等，但是不能修改位置。。
     * 每个element只能有一个提示，重复调用可以修改其内容、标题、位置
     * 例如：
     * $("body/element").tip({
     *    lock  : false,   //【布尔值】是否锁屏,可选 true|false,默认false
     *    title : false,   //【字符串或者布尔值】标题,可选: "字符串"(标题内容,支持html字符) | false(不显示图标);支持format（param、url、sqlCode返回的数据）
     *    text  : "",      //【字符串】显示的消息内容,必须输入,支持html字符、jquery对象;支持format（param、url、sqlCode返回的数据）;如果url或者结果返回的是单个字符串/数字的非json对象或者json数组，则格式化关键字为oxhide;例如返回字符串为“1234”；ajax="说明：{oxhide}"
     *    join  : "".	   //【字符串】url、sqlCode返回数组时,用什么join显示
     *    sqlCode:"",	   //【字符串】
     *    sqlLocal    		//【布尔值】sqlCode方式时,查询的是本地还是oxhide,true=本地，false=oxhide;默认true
     *    defaultStr:""	   //【字符串】当url、sqlCode加载失败或者返回空字符时展示的默认内容,默认为：“暂无信息”
     *    icon  : true,    //【字符串或者布尔值】只对body有效,图标,可选：true(默认,显示info) | false(不显示图标) | icon.css中的图标
     *    type  : "notice",//【字符串】背景颜色类型,同时影响body时的默认图标,可选:  success | info | error | notice(默认);
     *    delay : 5000,    //【数字】显示的时间,单位毫秒,-1表示永不消失;body默认5000, elemtn默认-1
     *    close : true,    //【字符串或者布尔值】是否显示关闭图标,可选 ： true(永远显示,body默认)  |  false(永不显示,element默认) | "hover"(鼠标移过显示,移开隐藏,只对body有效)
     *    sticker: true,   //【字符串或者布尔值】只对body有效,是否显示钉住图标,可选 ： true(永远显示,默认)  |  false(永不显示) | "hover"(鼠标移过显示,移开隐藏)  该图标可以手动禁止消息消失
     *    pos   : "center" //【字符串】消息的位置,可选: center/center-center(上下左右居中,默认) | center-left(中间居左) | center-right(中间居右) |top/top-center(页面顶部横铺) | top-left(顶部居左) | top-right(顶部居右) |bottom/bottom-center(底部横铺) | bottom-left(底部居左) | bottom-right(底部居右)
     *    fn    : function(){} //【函数】提示关闭后的回调函数;
     *    id    : ""           //【字符串】只对body有效,提示消息的id,如果设置了id,那么关闭消息时,只关闭这个id对应的消息,否则将全部关闭; body时可以出现多个提示,而同一个element只能有一个!
     *    width : ""
     *    height: ""
     *    show  : true     //【字符串或者布尔值】只对element有效,表示提示什么时候显示,
     *                              可选:  true(永远显示,默认)
     *                              也可组合使用:任意事件,如click、focus、focus、blur、mocusemove、mocuseout等,显示和隐藏的事件用-分割,如果没有-表示显示、隐藏用一个事件
     *                                           click-blur 意思是单击显示,失去焦点隐藏;
     *                                           click/click-click 意思是单击显示或隐藏;
     *                                           特殊的：hover/hover-hover,表示鼠标移过显示,移除隐藏,即hover表示mouseenter，mouseleave
     *                                           特殊的: true-click 表示马上显示,点击隐藏,且不再出现
     *                                           特殊的: true-click,focus 表示马上显示,点击或者获得焦点隐藏,且不再出现
     *   click : 内容单击事件只有body有效
     *   url   : 异步获取内容的url,地址必须返回一个字符串用于显示,且必须是jsonp;字符串支持html格式
     *   titleFormat : null|true(红)|false(绿)
     *   format : null|true(红)|false(绿)
     *   param : 异步获取时的参数,例如param:{
     *   								 id:"xxx",
     *   								 name:function(){
     *   									return this.attr("iname"); //this表示tip触发对象
     *   								 }
     *   							  }
     * })
     *
     * 简单调用:
     * $(x).tip(text,delay,lock);表示上面的参数中,除了text,delay,lock其他都用默认值!
     */
    (function($){
        $.fn.tip = function(p,delay,lock){
        	var that = this;
            if (typeof p == "string") {
                var object = $MT.get($.fn.tip,p);
                if(object !== undefined){
                    if(typeof object === "function") return  object.apply(that, $.makeArray(arguments).slice(1));
                    else return object;
                }
            }
            if(typeof p === "string") p = { text : p,delay:delay,lock:lock };
            if(that.prop("nodeName") === "BODY"){
                p = $.extend({
                  lock  : false,
                  title : false,
                  text  : "",
                  icon  : true,
                  type  : "notice",
                  delay : 5000,
                  close : true,
                  sticker: true,
                  pos   : "center",
                  fn    : null,
                  id    : null,
                  click :null,
                  remove : true,
                  styling: "jqueryui",
                  animate_speed:"fast",
                  history: false,
                  hover:false,
                  mouse_reset:false
                },p);
                if(p.text.html)p.text = p.text.html();
                else if(p.text.innerHTML) p.text = p.text.innerHTML;
                if(p.delay === -1) {p.hide = false;p.delay = 2000;}
                else p.hide = true;
                if(p.close === true) $.extend(p,{closer : true,closer_hover : false });
                else if(p.close === false) $.extend(p,{closer : false,closer_hover : false });
                else if(p.close === "hover") $.extend(p,{closer : true,closer_hover : true });
                if(p.sticker === true) $.extend(p,{sticker : true,sticker_hover : false });
                else if(p.sticker === false) $.extend(p,{sticker : false,sticker_hover : false });
                else if(p.sticker === "hover") $.extend(p,{sticker : true,sticker_hover : true });
                if(typeof p.icon === "string") p.icon = "ui-icon "+p.icon;
                if(!p.id) p.id = $MT.guid();
                p.lock === undefined && (p.lock = true);
                switch(p.pos){
                    case "center" :
                    case "center-center" :
                        p.addclass = "";
                    break;
                    case "center-left" :
                        p.addclass = "stack-centerleft";
                    break;
                    case "center-right" :
                        p.addclass = "stack-centerright";
                    break;
                    case "top" :
                    case "top-center" :
                        $.extend(p,{
                            addclass : "stack-bar-top",
                            cornerclass : "",
                            width : "100%"
                        });
                    break;
                    case "top-left" :
                        p.addclass = "stack-topleft";
                    break;
                    case "top-right" :
                        p.addclass = "stack-topright";
                    break;
                    case "bottom" :
                    case "bottom-center" :
                        $.extend(p,{
                            addclass : "stack-bottomleft",
                            width : "100%"
                        });
                    break;
                    case "bottom-left" :
                        p.addclass = "stack-bottomleft";
                    break;
                    case "bottom-right" :
                        p.addclass = "stack-bottomright";
                    break;
                }
                p.stack = that.tip("stack." + p.pos);
                $.extend(p,{
                    before_open  : function(pnotify){
                        if(p.lock === true) that.tip("zz",9);
                        switch(p.pos){
                            case "center" :
                            case "center-center" :
                                pnotify.css({
                                    "top": ($(window).height() / 2) - (pnotify.height() / 2),
                                    "left": ($(window).width() / 2) - (pnotify.width() / 2)
                                });
                            break;
                            case "center-left" :
                                pnotify.css({
                                    "top": ($(window).height() / 2) - (pnotify.height() / 2),
                                    "left":25
                                });
                            break;
                            case "center-right" :
                                pnotify.css({
                                    "top": ($(window).height() / 2) - (pnotify.height() / 2),
                                    "right":25
                                });
                            break;
		                    case "top" :
		                    case "top-center" :
		                        pnotify.css({
                                    "top": 0,
                                    "left":0
                                });
		                    break;
		                    case "top-left" :
		                        pnotify.css({
                                    "top": 25,
                                    "left":25
                                });
		                    break;
		                    case "top-right" :
		                       pnotify.css({
                                    "top": 25,
                                    "right":25
                                });
		                    break;
		                    case "bottom" :
		                    case "bottom-center" :
		                       pnotify.css({
                                    "left":0
                                });
		                    case "bottom-left" :
		                    break;
		                    case "bottom-right" :
		                    break;
                        }
                    },
                    after_close : function(pnotify){
                        var notices_data = $(window).data("pnotify");
                        if(p.lock === true){
                            var locks = notices_data.indexOf(true,true,"opts.lock");
                            if(locks.length === 1) that.tip("zz",-1);
                        }
                        notices_data.splice(notices_data.indexOf(pnotify.opts.id,"opts.id"),1);
                        p.fn && p.fn.call(that);
                    }
                });
                var notices_data = $(window).data("pnotify");
                if(notices_data){
                    var notify = notices_data.find(p.id,"opts.id");
                    if(notify !== undefined){
                    	notify.pnotify(p);
                        return that;
                    }
                }
                var temp_ = $.pnotify(p);
                p.click && temp_.find(".ui-pnotify-text").bind("click",p.click).css("cursor","pointer");
                return that;
            }else{
                p = $.extend({
                  title : false,
                  lock  : false,
                  text  : "",
                  join  : "<br/>",
                  sqlCode:"",
                  sqlLocal:true,
                  defaultStr:"暂无信息",
                  type  : "notice",
                  delay : -1,
                  close : false,
                  pos   : "center",
                  fn    : null,
                  id    : $MT.guid(),
                  url	: null,
                  param : null,
                  show  : true,
                  titleFormat:null,
                  format:null
                },p);
                p.content = {};
                if(p.title !== false){
                	if(p.titleFormat != null){
                		p.content.title = {text : p.title.format(p.titleFormat,p.param)};	
                	}else{
                		p.content.title = {text : p.title.format(p.param)};
                	}
                    
                    if(p.close === true) p.content.title.button = true;
                }
                p.style = {};
                switch(p.type){
                    case  "notice" :
                    p.style.classes = "qtip-default qtip-shadow qtip-rounded";
                    break;
                    case  "success" :
                    p.style.classes = "qtip-green qtip-shadow qtip-rounded";
                    break;
                    case  "error":
                    p.style.classes = "qtip-red qtip-shadow qtip-rounded";
                    break;
                    case "info":
                    p.style.classes = "qtip-blue qtip-shadow qtip-rounded";
                    break;
                }
                if(p.width != undefined) p.style.width = p.width;
                if(p.height != undefined) p.style.height = p.height;
               	if(p.param){
            		for(var i in p.param){
            			if(typeof p.param[i] === "function"){
            				p.param[i] = p.param[i].call(that);
            			}
            		}
                }
                if(p.url){
                	p.content.text = function(event,api){
                		$.ajax({
                			url : p.url,
			                dataType:"jsonp",
			                type :"POST",
			                data :p.param,
			                async:true,
			                traditional : true,
			                success : function(data){
			                	if($.isArray(data)){
			                		if(data.length > 0){
			                			var tdata = [];
			                			data.each(function(i0,v0){
			                				if(typeof v0 === "object"){
			                					if(p.text){
			                						if(p.format != null) tdata.push(p.text.format(p.format,$.extend(true,p.param,v0)));
			                						else tdata.push(p.text.format($.extend(true,p.param,v0)));
			                					}else tdata.push($MT.obj2str(v0));
			                				}else{
			                					if(p.text){
			                						if(p.format != null) tdata.push(p.text.format(p.format,$.extend(true,p.param,{oxhide:v0})));
			                						else tdata.push(p.text.format($.extend(true,p.param,{oxhide:v0})));
			                					}else tdata.push(v0);
			                				}
			                			});
				                		api.set('content.text', tdata.join(p.join));
			                		}else{
			                			api.set('content.text', p.defaultStr);
			                		}
			                	}else if(typeof data === "object"){
			                		if(p.text){
                						if(p.format != null)  api.set('content.text', p.text.format(p.format,$.extend(true,p.param,data)));
                						else  api.set('content.text', p.text.format($.extend(true,p.param,data)));
			                		}else api.set('content.text', $MT.obj2str(data));
			                	}else{
		                			if(data){
		                				if(p.text){
	                						if(p.format != null)  api.set('content.text', p.text.format(p.format,$.extend(true,p.param,{oxhide:data})));
	                						else api.set('content.text', p.text.format($.extend(true,p.param,{oxhide:data})));
		                				}else{
		                					api.set('content.text',data);
		                				}
		                			}else{
		                				api.set('content.text',p.defaultStr);
		                			}
			                	}
			                },
			                error : function(){
			                	api.set('content.text', "加载失败..");
			                }
                		});
                		return "加载中...";
                	};
                }else if(p.sqlCode){
                	p.content.text = function(event,api){
						$MT.query({
							code:p.sqlCode,
							param:p.param,
							local:p.sqlLocal,
							ok:function(data){
								if(data.length > 0){
									if(p.text){
										var tdata = [];
										data.each(function(i0,v0){
	                						if(p.format != null) tdata.push(p.text.format(p.format,$.extend(true,p.param,v0)));
	                						else tdata.push(p.text.format($.extend(true,p.param,v0)));
										});
										data = tdata;
									}else{
										var iname,tdata0 = data[0];
										for(iname in tdata0){break;}
										data = data.convert(iname);
									}
									api.set('content.text', data.join(p.join));
								}else{
									api.set('content.text', p.defaultStr);
								}
							},
							error:function(){
								api.set('content.text', "加载失败..");
							}
						});
                		return "加载中...";
                	};
                }else if(p.text){
                	p.content.text = p.text.format(p.param);
                }else{
                	alert("提示没有内容可以显示!!");
                }
                
                switch(p.pos){
                    case "center" :
                    case "center-center" :
                        p.position = {my : "center center", at : "center center"};
                    break;
                    case "center-left" :
                        p.position = {my : "center right", at : "center left"};
                    break;
                    case "center-right" :
                        p.position = {my : "center left", at : "center right"};
                    break;
                    case "top" :
                    case "top-center" :
                        p.position = {my : "bottom center", at : "top center"};
                    break;
                    case "top-left" :
                        p.position = {my : "bottom right", at : "top left"};
                    break;
                    case "top-right" :
                        p.position = {my : "bottom left", at : "top right"};
                    break;
                    case "bottom" :
                    case "bottom-center" :
                        p.position = {my : "top center", at : "bottom center"};
                    break;
                    case "bottom-left" :
                        p.position = {my : "top right", at : "bottom left"};
                    break;
                    case "bottom-right" :
                        p.position = {my : "top left", at : "bottom right"};
                    break;
                    case "bottom-right" :
                        p.position = {my : "top left", at : "bottom right"};
                    break;
                    case "mouse" :
                        p.position = {my : "bottom center", at : "top center",target : "mouse",adjust : {"mouse" : true,resize:true,method: "shift"}};
                    break;
                }
                p.position.adjust || (p.position.adjust = { method: "shift"});
                p.position.collision = "flipfit";
                
                p.events = {
                    show: function(event, api) {
                        that.data("qtips",api);
                        if(p.delay !== -1) setTimeout(function() {
                            that.tip("close");
                        }, p.delay);
                        //if(p.lock === true) that.tip("zz",10000);
                    },
                    hide : function(event){
                        that.data("Tip_once") && that.tip("close");
                    }
                }
                if(p.show === true){
                    p.show = true;
                    p.hide = false;
                }else if(p.show){
                    var arr = p.show.split("-");
                    if(arr.length === 1) arr.push(arr[0]);
                    p.show = {solo : true,effect:false};
                    p.hide = {solo : true,effect:false};
                   
                    if(arr[0] === "hover") arr[0] = "mouseenter";
                    if(arr[1] === "hover") arr[1] = "mouseleave";
                    if(arr[0] !== "true") {
                        p.show.event= arr[0];
                        p.hide.event= arr[1];
                    }else{
                        p.show.ready = true;
                        p.hide = {event : arr[1].split(",").join(" ")};
                    }
                    that.data("Tip_once",arr[0] === "true");

                }
                var api = that.data("qtips");
                that.removeData("tipclosed");
                if(api) {
                    //api.hide();
                    api.destroy();
                    api.destroy();
                    that.removeData("qtips");
                }
                that.qtip(p);
                that.data("notBindResizeTip") || that.bind("resize",function(){
                    var api = that.data("qtips");
                    api && api.reposition(null, false);
                }) && that.data("notBindResizeTip",true);
            }
            return that;
        }
        $.extend($.fn.tip,{
            /**
             * 在控件上打开或关闭遮罩
             * zindex表示遮罩的z-index属性,-1表示关闭遮罩,最大不超过10000
             * $("body").zz(-1);
             * $(xx).zz(99);
             */
            zz : function(zindex){
                var t = this,zzz;
                if(zindex !== -1){
                	if(t.data("zzOpen")) return t;
                    zzz = t.data("zz");
                    if(!zzz){
                        if(t.prop("nodeName") === "BODY"){
                            zzz = $("<div/>",{
                               "css": {
                                   "display": "none",
                                    "position": "fixed",
                                    "top": "0",
                                    "bottom": "0",
                                    "right": "0",
                                    "left": "0",
                                    "background-color" : "#000",
                                    opacity: 0.4
                                  }
                            });
                            t.append(zzz);
                        }else{
                            zzz = $("<div/>").css({
                                width  : t.width(),
                                height : t.height(),
                                opacity: 0.4,
                                "background-color" : "#000",
                                position: "absolute",
                                 "display": "none"
                            });
                            t.after(zzz);
                            zzz.position({
                                of : t,
                                my : "center",
                                at : "center",
                                collision : "flip"
                            });
                            t.bind("resize",function(){
                                var t = $(this);
                                if(!t.data("zzOpen"))return;
                                zzz.css({
                                    width  : t.width(),
                                    height : t.height()
                                }).position({
                                    of : t,
                                    my : "center",
                                    at : "center",
                                    collision : "flip"
                                });
                            })
                        }
                        t.data("zz",zzz);
                    }
                    zzz.css("z-index",zindex).show();
                    t.data("zzOpen",true);
                }else{
                	t.data("zzOpen",false).data("zz") && t.data("zz").hide();
                }
                return t;
            },
            /**
             * 关闭
             */
            close : function(id){
                var that = this;
                if(that.prop("nodeName") === "BODY"){
                    var notices_data = $(window).data("pnotify");
                    if(id){
                        var notify = notices_data && notices_data.indexOf(id,"opts.id");
                        setTimeout(function(){
                        	notices_data && notify !== -1 && notices_data[notify].pnotify_remove(false) ;
                        },100);
                    }else{
                    	$.pnotify_remove_all();
                    	that.tip("zz",-1);
                    }

                }else{
                    var api = that.data("qtips"),fn;
                    that.data("Tip_once",false);
                    if(api){
                      fn = api.get("fn");
                        fn && typeof fn === "function" && fn.call(that);
                        if(api.get("lock") === true) that.tip("zz",-1);
                        api.hide();
                        api.destroy();
                        that.removeData("qtips").removeData("tipId");
                    }
                  	that.data("tipclosed",true);
                }
            },
            /**
             * notify的消息展开对象,只有建立独立对象,才会有效果哦
             */
            stack : {
                "center":false,
                "center-center":false,
                "center-left" : {"dir1": "down", "dir2": "right", "push": "top"},
                "center-right" :{"dir1": "down", "dir2": "left", "push": "top"},
                "top": {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0},
                "top-center": {"dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0},
                "top-left": {"dir1": "down", "dir2": "right", "push": "top"},
                "top-right":{"dir1": "down", "dir2": "left", "push": "top"},
                 "bottom":{"dir1": "up", "dir2": "right", "spacing1": 0, "spacing2": 0},
                 "bottom-center":{"dir1": "up", "dir2": "right", "spacing1": 0, "spacing2": 0},
                 "bottom-left":{"dir1": "right", "dir2": "up", "push": "top"},
                 "bottom-right": {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25}
            }
        })
    })($);

    /**
     * excel导出工具扩展
     * 例如:
     *  $(button).xls();                //当button具有标签渲染的导出效果后,触发该标签的导出行为
     *  $(button).xls(index,name,value);//当button具有标签渲染的导出效果后,修改标签将要传递到后台的参数
     *          参数1: 表示修改第几个sheet?
     *          参数2: 要修改的param名字,
     *          参数3: 要修改的param值,当参数3不传时,表示获取并返回参数1、2定义的param的值,当参数3=null时,表示要删除参数1、2定义的param;参数3=其他值,表示设置或增加param
     * $(button).xls(index,true|false); //当button具有标签渲染的导出效果后,修改标签的sheet有效信息
     *          参数1: 表示修改第几个sheet?
     *          参数2：有效还是无效
     * $(button).xls(index);            //当button具有标签渲染的导出效果后,获取标签的sheet有效信息
     *          参数1: 表示第几个sheet?
     *************************
     *  $.xls(abstractedName);                  //当标签的abstractedName定义时,该方法触发标签的导出行为
     *  $.xls(abstractedName,index,name,value); //修改标签将要传递到后台的参数
     *          参数1：通过sihe:xls 定义的json对象,即abstractedName
     *                      注意: 当只传参数1时,表示触发该对象的导出行为;传其他参数表示修改导出时传到后台的param(param是json对象)或者其他操作
     *          参数2: 表示修改第几个sheet?
     *          参数3: 要修改的param名字,
     *          参数4: 要修改的param值,当参数4不传时,表示获取并返回参数1、2、3定义的param的值,当参数4=null时,表示要删除参数1、2、3定义的param;参数4=其他值,表示设置或增加param
     * $(button).xls(abstractedName,index,true|false); //修改标签的sheet有效信息
     *          参数1：通过sihe:xls 定义的json对象,即abstractedName
     *                      注意: 当只传参数1时,表示触发该对象的导出行为;传其他参数表示修改导出时传到后台的param(param是json对象)或者其他操作
     *          参数2: 表示修改第几个sheet?
     *          参数3：有效还是无效
     * $(button).xls(abstractedName,index);            //获取标签的sheet有效信息
     *          参数1：通过sihe:xls 定义的json对象,即abstractedName
     *                      注意: 当只传参数1时,表示触发该对象的导出行为;传其他参数表示修改导出时传到后台的param(param是json对象)或者其他操作
     *          参数2: 表示第几个sheet?
     **************************
     *
     * 调用方式1和调用方式2的区别:
     * 每一个标签如果定义了abstractedName,那么将生成一个全局变量,名为abstractedName,此时调用方式2的操作将改变此全局变量;
     *
     * 如果定义了appendTo或者紧跟其后的方式绑定了控件或者控件refresh了abstractedName,
     *      那么每个控件都会有一个相当于abstractedName的副本变量,对每个控件的xls操作都不会影响到其他控件
     *
     */
    (function($){
        /**
         * 导出操作
         * 参数1：通过sihe:xls 定义的json对象,即abstractedName
         *        注意: 当只传参数1时,表示触发该对象的导出行为;
         * 参数2: 表示修改第几个sheet?
         * 参数3: 要修改的param名字
         * 参数4: 要修改的param值,当参数4不传时,表示获取并返回参数1、2、3定义的param的值,当参数4=null时,表示要删除参数1、2、3、定义的param;参数4=其他值,表示设置或增加param
         *
         *
         * 特殊:
         * $.xls(true,o); 修正导出的选项,displaySummary=true,移动到最前;同一个sheet,只有一个displaySummary=true
         * $.xls(o,index,true|false);设置o的index下标的有效状态
         * $.xls(o,index);获取o的index下标的有效状态
         */
        $.xls = function(o,index,param,value){
            if(typeof o === "boolean"){
                index.sheets.each(function(i,v){
                    $.xls.right(v.header,o);
                });
                return;
            }
            if(o.opt) o = o.opt;
           $.xls(true,o);
            var that = this,sheet;
            if(index !== undefined){
              if(index === undefined) return that === window ? o : that;
                sheet = o.sheets[index];
                if(sheet === undefined) return that === window ? o : that;
                if(param === undefined) return sheet.valid;
                if(typeof param === "boolean"){sheet.valid = param;return that === window ? o : that};
                if(value === undefined) return sheet.param[param];
                if(value === null){
                   delete sheet.param[param];
                    return that === window ? o : that;
                }
              sheet.param[param] = value;
                return that === window ? o : that;
            }else if(document.readyState === "complete" || document.readyState === "interactive"){
              $("#{0}_hidden".format(o.styleId)).val($MT.obj2str(o,null,["hasDisplaySummary","styleId"]));
                $("#{0}".format(o.styleId)).submit();
            }
        };
        $.xls.right = function(arrays,object){
            var index,temp1,temp2;
            arrays.each(function(i,v){
                if(index === undefined && v.displaySummary === true) index = i;
                $.xls.right(v.group,object);
//                if(object.hasDisplaySummary === true)
//                    v.displaySummary = false;
//                else if(v.displaySummary === true) object.hasDisplaySummary = true;
            });
            if(index !== undefined){
                temp1 = arrays[0];
                temp2 = arrays[index];
                arrays[0] = temp1;
                arrays[index] = temp2;
            }
        }
        $.fn.xls = function(){
           var that = $(this),xlsOpt = that.data("export_oxhide_options_"),args;
            if(!xlsOpt) return that;
            args = Array.prototype.slice.call(arguments);
            args.unshift(xlsOpt.opt);
            return $.xls.apply(that,args);
        }
    })($);

	/**
		数据导入工具,$(button).imper
		{
			path : null,		//模版文件路径
			callback : null,	//上传之后的回调方法
			service : null		//实现了com.sxsihe.utils.tld.plugs.xls.tool.XlsImpService的类在spring中的实例名
			param : null		//要传到service中的参数名
			downWarn:null       //下载模版前的提示
			impParamDialog:null	//jquery选择器,指向一个隐藏的div,点击导入按钮后,会弹出对话框,对话框包含该div,div中的控件的值会作为参数传递到导入service中
		}

		可以通过
		$(button).imper("paramname","paramvalue") 来设置要传到service中的参数名
		$(button).imper("paramname") 来获取要传到service中的参数值
	 */
	(function($){
		$.fn.imper = function(p,v){
			var that = this;
			if(typeof p === "string"){
				var imper_ = that.data("imper_");
				if(v !== undefined){
					if(!imper_) imper_ = {};
					imper_[p] = v;
					that.data("imper_",imper_);
				}else{
					if(imper_) return imper_[p];
					else return;
				}
				return that;
			}
			p = $.extend({
				path : null,		//模版文件路径
				callback : null,	//上传之后的回调方法
				service : null,		//实现了com.sxsihe.utils.tld.plugs.xls.XlsImpService的类在spring中的实例名
				param : null,		//要传到service中的参数名
				downWarn:null,		//下载模版前的提示
				impParamDialog : null
			},p);

			var form = $("#impXlsForm_oxhide_plug"),
				frame = $("#impXlsForm_oxhide_plug_frame"),
				file,
				pos,	//按钮的位置
				btn;	//下载模版的按钮

			p.id_ = that.attr("id"); //按钮的id

			if(form.length === 0){
				$("body").prepend($(
					'<form name="impXlsForm_oxhide_plug" method="post" enctype="multipart/form-data"  action="#" id="impXlsForm_oxhide_plug" target="impXlsForm_oxhide_plug_frame"><input type="hidden" name="service"/><input type="hidden" name="param"/><input type="hidden" name="callback"/></form><iframe name="impXlsForm_oxhide_plug_frame" src="about:blank" style="display:none;"  id="impXlsForm_oxhide_plug_frame"></iframe>'
				));
				form = $("#impXlsForm_oxhide_plug"),frame = $("#impXlsForm_oxhide_plug_frame");
			}

			form.attr("action",basePath + "/ajax.do?action=xlsimp");

			if(!p.id_){
				p.id_ = $MT.guid();
				that.attr("id",p.id_);
			}

			btn = $('<button buttonType="ui-icon-arrowthick-1-s" type="button" appendTo="#'+ p.id_ +'">下载模版</button>');
			that.after(btn);
			btn.refresh().bind("click",function(){
				info(p.downWarn || "下载模版后注意:<br/>1: 请不要调整列的顺序,否则将引起数据错误!<br/>2: 只支持上传excel的第一个Sheet.",function(){
					frame.attr("src",basePath + "/" + p.path);
				});
			});



			that.data("imper_",p);

			that.next().css("z-index",11);

			that.parent().after($('<div style="display: inline-block;position:relative" id="imperContain"/>'));
			that.parent().appendTo(that.parent().next()).css("position","relative");
			pos = that.parent().position();


			function addFile(){
				file = $('<input role="imper" type="file" name="impFile"/>');
				var htmls = that.parent().width();
				file.css({
					"opacity":0,
					"width":htmls ,
					"height":30,
					"z-index":"10",
					top:pos.top,
					left:pos.left - htmls,
					position: "relative"
				}).insertAfter(that.parent()).bind("change",function(){
					var imper_ = that.data("imper_"),hasDialog = false,file = this;
					form.find("[type=file]").remove();
					form.find("[name=service]").val(imper_.service);
					form.find("[name=callback]").val("impXlsForm_oxhide_plug" + imper_.id_);
					form.append(file);
					addFile();
					if(imper_.impParamDialog){
						var impParamDialog = $(imper_.impParamDialog);
						if(impParamDialog.length){
							hasDialog = true;
							win({
								title : "即将导入,请设置选项",
								id : "impdialog" + imper_.id_,
								html : function(){return impParamDialog.show()},
								self : "yes",
								maxBtn : "no",
								minBtn : "no",
								htmlRemove : "no",
								onOk : function(){
									var param = {};
									impParamDialog.find("select,input[type!=button][type!=submit][type!=reset][type!=file][type!=image],textarea").each(function(){
										var t_t = this,$t_t = $(t_t),id = t_t.id || t_t.name,v,temp_;
										if($t_t.check && $t_t.check() !== true) return;
										if(t_t.type === "checkbox" || t_t.type === "radio"){
											if(t_t.checked) v = t_t.value;
										}else{
											v = $t_t.val();
										}
										if(v === undefined || v === null) return;
										if(param[id]){
											if(typeof param[id] !== "object"){
												param[id] = [param[id]];
											}
											param[id].push(v);
										}else{
											param[id] = v;
										}
									});
									if(imper_.param){
										param = $.extend({},imper_.param,param);
									}
									form.find("[name=param]").val($MT.obj2str(param));
									XqTipOpen("正在导入数据,请耐心等待,期间不要刷新页面、关闭页面...");
									form[0].submit();
									return true;
								}
							});
						}
					}

					if(hasDialog === false){
						if(imper_.param) {
							form.find("[name=param]").val($MT.obj2str(imper_.param || {}));
						}
						XqTipOpen("正在导入数据,请耐心等待,期间不要刷新页面、关闭页面...");
						form[0].submit();
					}
				});
			}

			addFile();

			window["impXlsForm_oxhide_plug" + p.id_] = function(data){
				XqTipClose();
				if(data && data.error){
					if(data.path){
						error(data.error + "<br/>点击确定后下载标记出错误记录的文件,加以修改并重新上传!",function(){
							frame.attr("src",basePath + "/" + data.path);
						});
					}else{
						error(data.error);
					}
					return;
				}
				if(data && data.count){
					tip("导入成功{0}条记录".format(true,data.count),"success");
				}else{
					tip("导入成功!","success");
				}
				p.callback && p.callback(data);
			}
		}
	})(jQuery);

    /**
     *
     * 无缝滚动封装
     * $.scrollTo($(xx1),$(xx2),{jquery的animate属性}); //表示xx1的left和xx2的top
     * $(xx).scrollTo(left,top,{jquery的animate属性});
     */
    (function($){
        $.scrollTo = $.fn.scrollTo = function(x, y, options){
            if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);
            options = $.extend({}, {
               gap: {x: 0,y: 0},
                animation: {
                	easing : "swing",
                    duration: 600,
                    complete: $.noop,
                    step: $.noop
                }
            }, options);

            return this.each(function(){
                var elem = $(this);
                 elem.stop().animate({
                    scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
                    scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
                 }, options.animation);
            });
        };
    })($);

    /*
     * 页内frame
     * $(xx).pageFrame({
     * 		url : "地址",
     * 		width:
     * 		height:
     * })
     */
    (function($){
    	$.fn.pageFrame = function(param){
    		var that = this,
				div = $('<div style="border:1px solid red;display:none;width:{0}px;height:{1}px;position: absolute;"><div class="closer" style="background-image: url({2});width:16px;height:16px;cursor: pointer;margin-left:{3}px;top:0px;position:absolute"></div><iframe  name="{4}" id="{4}" src="{5}" frameBorder="no" style="width: 100%; height: 100%;" /></div>'.format(
					param.width,
					param.height,
					basePath + "/resource/base/theme/public/img/icon/487.png",
					param.width - 16,
					"Frame" + $MT.guid(),
					param.url
				));

			$("body").prepend(div);

			div.find(".closer").bind("click",function(){
				div.hide();
			}).end().find("iframe").prop("contentWindow").hide = function(){
				div.hide();
			};
			$([that,div]).pageClick(function(){
				div.hide();
			},true);

			that.bind("click",function(){
				div.show().position({
					of: that,
					my: "left top",
					at: "left bottom",
					collision: "flipfit"
				});
			})
    	}
    })($);

    /**
     * Iframe post方式跳转,调用方式两种
     * $(frame的选择器).forward(url,参数json对象);
     * $.forward(frame的name/frame的id/任何一个window对象,url,参数json对象);
     * $(frame的选择器).forward(url);
     * 
     * 被打开页面若要js调用刷新,只能$.forward(window,"${param.postUrl}");
     * */
    (function($){
    	$.fn.forward = function(url,param,w){
    		var that = this,p = $MT.getParam(url),form,isLoad = url.indexOf("/core/tool/load.jsp") > -1;
    		if(w === undefined || w === null){
    			if(that.length > 0){
    				w = that[0].contentWindow;
    			}else{
    				return;
    			}
    		}
    		
    		if(w.document.body){
	    		form = w.document.createElement("form");
	    		form.action = p.url;
	    		form.method = "post";
	    		form.name = "oxhide_forward";
    			w.document.body.appendChild(form);
    		}else{
    			w.document.write('<form action="{0}" method="post" name="oxhide_forward"></form>'.format(p.url));
    			form = w.document.oxhide_forward;
    		}
    		
    		p.param || (p.param = {});
    		if(isLoad){
    			p.param.postparam = param ? $MT.obj2str(param) : "{}";
    			p.param.postUrl = decodeURIComponent(p.param.url);
    		}else{
	    		p.param = $.extend(p.param,param);
	    		p.param.postUrl = url;
    		}
    		
    		if(param){
    			if(p.param.postUrl.indexOf("?") > -1) p.param.postUrl += "&_p_a_r_a_m_=";
    			else p.param.postUrl += "?_p_a_r_a_m_=";
    			p.param.postUrl += encodeURIComponent($MT.obj2str(param));
    		}
    		
    		if(p.param._p_a_r_a_m_){
    			p.param = $.extend(p.param,new Function("return " + decodeURIComponent(p.param._p_a_r_a_m_))());
    			delete p.param._p_a_r_a_m_;
    		}
    		
			for(var i in p.param){
				var v = p.param[i];
				if(v && typeof v === "object"){
					if(!v.join) v = $MT.obj2str(v);
					else{
						for(var index = 0;index < v.length;index++){
							var ele = w.document.createElement("input");
							ele.type = "hidden";
							ele.name = i;
							ele.value = v[index];
							form.appendChild(ele);
						}
					}
				}else{
					var ele = w.document.createElement("input");
					ele.type = "hidden";
					ele.name = i;
					ele.value = v;
					form.appendChild(ele);
				}
			}
    		form.submit();
    	}
    	$.forward = function(param,url,inparam){
    		if(typeof param === "string") $.fn.forward(url,inparam,window.frames[param]);
    		else $.fn.forward(url,inparam,param);
    	}
    })(jQuery);
    
	/**
	 * MVVM简单类型
	 * 
	 * 1:初始化
	 * 		数据源-->有4种,选择一种即可.
	 * 			1）data,表示本地数据;格式为json对象,key是属性名,value是值,值可以是数组
	 * 			2）showAction,该url需要在response中打印json数据,初始化时将ajax该action;json数据的格式:key是属性名,value是值,值可以是数组;
	 * 					   后台可以调用:AjaxHelper.responseWrite(ActionContext.getRequest(), ActionContext.getResponse(), JsonUtil.toJson(obj), false);将obj对象打印到response中
	 * 			3）控件中原来的值,此时不需要传data和showAction,初始化时将把控件中原来的值作为数据源
	 * 			4）sqlcode，查询对应的sql语句
	 * 		保存地址 saveAction
	 * 			如果传了saveAction,那么调用$(xx).mvvm("submit");时,将自动将控件中的值封装为json对象,传到saveAction中;
	 * 		提交参数方式 postParamName
	 * 			如果不设置此参数,则表示提交saveAction时,属性分开提交,即后台可以request.getParameter("属性名")获取,这种方式支持struts自动获取参数
	 * 			如果设置参数,表示提交saveAction时,将属性封装为一个json对象,并以此参数名传到后台,
	 * 				后台可以request.getParameter("postParamName")获取到封装好的json字符串,可调用JsonUtil.toBean(request.getParameter("postParamName"),XX.class)转换为对象
	 * 		是否同步 async
	 * 			ajax提交/获取数据时,是否同步进行?默认false
	 * 		异步查询参数 param
	 * 			异步查询（showAction、sqlcode）时传递到服务器的参数
	 * 		onsubmit  提交时触发，返回false取消提交，this = 本容器jquery对象，唯一的参数 = json对象，可以修改json对象
	 * 		onsuccess 定义了saveAction后提交成功时触发，this = 本容器jquery对象，唯一的参数 = json对象
	 * 		onerror   定义了saveAction后提交失败时触发，this = 本容器jquery对象，唯一的参数 = json对象
	 * 		onload 当数据将赋值到控件上时调用，this = 本容器jquery对象，唯一的参数 = json对象，可以修改json对象
	 * 
	 * 注意:
	 * 		1：不一定是form才能用mvvm,任何一个容器都可以,比如div,table等,此方法会将容器内所有表单型控件都作为属性来看,而控件的id或者name将作为属性名,一样的id,name视为属性数组
	 * 		2：checkbox的value表示选中的值,不选中的值需要设置offvalue,例如:<input type="checkbox" value="1" offvalue="2" /> 如果checkbox不选中,则表示该控件对应的值是2
	 * 		3：checkbox可以只作用于单选，即选择是|否之类的数据，如果要勾选多个，可以使用下拉框的复选模式
	 * 		4：支持的控件有：select、input_text、input_password、textarea、input_hidden、input_checkbox
	 * 		5：如果不想让容器中控件被mvvm控制，需要设置参数sel或者unsel
	 * 		6：控件的名称、id支持 多级，例如 员工的mvvm中，可以有 organ.organid；服务器中通过jsonutil将直接生成organ对象
	 * 		7：6中所提的多级，暂不能用于 remove 方法
	 * 		8：当get，set，remove属性时，如果要作用到控件，那么控件获取时，第5条仍然有效
	 * $(对象).mvvm({
	 * 		data : {
	 * 			
	 * 		},
	 * 		showAction : "",
	 * 		saveAction : "",
	 * 		postParamName : "",
	 * 		async : true,
	 * 		sqlcode:""
	 * 		onsubmit
	 * 		onload,
	 * 		onsuccess
	 * 		onerror
	 * 		sel 要被mvvm控制的控件的选择器,格式: [name=cc]属性选择器
	 * 		unsel 不要被mvvm控制的控件的选择器
	 * 		set 从data等数据源中获取属性时使用的属性名，如 <input set="wcsl" >那么该控件将在数据中源中查找wcsl字段;
	 * 		get 将数据封装到data等数据源中时使用的属性名，如 <input get="wcsl" >那么该控件的值将作为数据源的字段：wcsl 
	 * });
	 * 
	 * 
	 * 2:reset
	 * $(对象).mvvm("reset"); 将数据重置为本地缓存
	 * $(对象).mvvm("reset",true); 如果设置了showAction或者sqlcode,将重新请求showAction来重新设置控件value
	 * 
	 * 3:submit
	 * $(对象).mvvm("submit"); 提交数据到saveAction,如果saveAction没有定义,将返回false;
	 * $(对象).mvvm("submit",true); 提交数据到saveAction,如果saveAction没有定义,将返回封装好的json对象
	 * $(对象).mvvm("submit",false); 返回封装好的json对象
	 * 
	 * 4:check
	 * $(对象).mvvm("check"); 验证对象的各个控件,并返回验证结果.
	 * 
	 * 5:设置或者获取属性
	 * $(对象).mvvm("get","属性名"); 返回对象的属性名对应的值
	 * $(对象).mvvm("set","属性名","属性值",true|false); 设置对象的属性名对应的值,并显示到控件上,如果属性不存在，将添加一个属性，但不会创建控件;true|false 表示是否将值赋到控件上?默认true
	 * $(对象).mvvm("set",{
	 * 		属性名1：属性值1,
	 * 		属性名2：属性值2
	 * },true|false);设置对象的属性名对应的值,并显示到控件上,如果属性不存在，将添加一个属性，但不会创建控件;true|false 表示是否将值赋到控件上?默认true
	 * $(对象).mvvm("remove","属性名",true|false); 移除对象的属性，true|false表示是否移除控件，默认false
	 * 
	 * 6:设置或获取mvvm参数（如showAction，saveAction等）
	 * $(对象).mvvm("属性名"); 获取
	 * $(对象).mvvm("属性名","属性值"); 设置
	 * 
	 * */
    (function($){
    	$.fn.mvvm = function(param,v){
    		if(this.length === 0) return this;
    		if(typeof param === "string"){
    			var pp = $.fn.mvvm[param];
    			if(pp){
    				return pp.apply(this,Array.prototype.slice.call(arguments,1));
    			}else{
    				var that = this,p = that.data("mvvm_p");
    				if(v === undefined){
    					return p[param];
    				}else{
    					p[param] = v;
    					return that;
    				}
    			}
    		}else{
    			var that = this;
    			that.data("mvvm_p",param);
    			$.fn.mvvm._init.call(that);
    			return that;
    		}
    	}
    	
    	$.extend($.fn.mvvm,{
    		reset : function(server){
    			var that = this,p = that.data("mvvm_p");
    			if(server === true){
    				$.fn.mvvm._init.call(that);
    			}else{
    				$.fn.mvvm._set.call(that,p.data);
    			}
    			return that;
    		},
    		submit: function(server){
    			var that = this,p = that.data("mvvm_p"), data = $.fn.mvvm._get.call(that);
    			if(server === true){
    				if(p.saveAction){
    					$.fn.mvvm._submit.call(that,data);
    				}else{
    					return data;
    				}
    			}else if(server === false){
    				return data;
    			}else{
    				if(p.saveAction){
    					$.fn.mvvm._submit.call(that,data);
    				}else{
    					return false;
    				}
    			}
    			return that;
    		},
    		check : function(){
    			var that = this,p = that.data("mvvm_p"),ele,result = true;
    			$.fn.mvvm._getEles.call(that).each(function(i,v){
    				ele = $(v);
    				if(ele.check() === false){
    					result = false;
    					return result;
    				}
    			});
    			return result;
    		},
    		get : function(name){
    			var that = this,p = that.data("mvvm_p");
    			return $MT.get(p.data,name);
    		},
    		set : function(name,value,ee){
    			var that = this,p = that.data("mvvm_p"),fn = function(n,v){
	    			$MT.set(p.data,n,v);
	    			if(ee !== false){
	    				var ele = $("#" + n ,that);
	    				if(ele.length === 0){
	    					ele = $("[name="+n+"]",that);
	    				}
	    				if(ele.length === 0) return;
	    				var nodeName = ele.prop("nodeName").toLowerCase();
	    				nodeName = nodeName == "input" ? nodeName + "_" + ele.prop("type") : nodeName;
	    				n = p.set && ele.attr(p.set) || ele.attr("id") || ele.attr("name");
	    				if(v === undefined) v = "";
	    				switch(nodeName){
	                        case "select" :
	                            ele.val(v).refresh();
	                        break;
	                        case "input_text" :
	                        case "input_password" :
	                        case "input_range":
	                        case "input_number":
	                        case "input_date":
	                        case "input_datetime":
	                        case "input_datetime-local":
	                        case "input_email":
	                        case "input_month":
	                        case "input_time":
	                        case "input_url":
	                        case "input_week":
	                        case "input_hidden":
	                        case "textarea":
	                        	ele.val(v);
	                        break;
	                        case "input_checkbox":
	                        	ele[0].checked = ele.attr("v") == v;
	                        break;
	    				}
	    			}
    			}
    			if(typeof name === "object"){
    				ee = value;
    				for(var i in name){
    					fn(i,name[i]);
    				}
    			}else{
    				fn(name,value);
    			}
    			return that;
    		},
    		remove : function(name,ele){
    			var that = this,p = that.data("mvvm_p");
    			delete p.data[name];
    			if(ele === true){
    				var ee = $("#" + name,that);
    				if(ee.length === 0){
    					ee = $("[name="+name+"]",that);
    				}
    				ee.remove();
    			}
    		},
    		_getEles : function(){
    			var that = this,p = that.data("mvvm_p");
    			if(p.sel){
    				return $(p.sel,that);
    			}else if(p.unsel){
    				return $("textarea,select,input[type!=button][type!=submit][type!=reset][type!=file][type!=image]",that).not(p.unsel);
    			}else{
    				return $("textarea,select,input[type!=button][type!=submit][type!=reset][type!=file][type!=image]",that); 
    			}
    		},
    		_submit : function(data){
    			var that = this,p = that.data("mvvm_p"),param = data;
    			if(p.postParamName){
    				var _p = {};
    				_p[postParamName] = $MT.obj2str(param,null,null,null,null,"null","null");
    				param = _p;
    			}
    			var result = false;
    			if($.check){
	    			result = $.fn.mvvm.check.call(that);
	    			if(result === false) return that;
    			}
    			result = p.onsubmit && p.onsubmit.call(that,data);
    			if(result === false) return that;
    			
    			$MT.ajax(
    				p.saveAction,
    				param,
    				function(d){
    					if(d.error){
    						p.error && p.error("submit",d.error);
    					}else{
    						$.extend(that.data("mvvm_p").data,data);
    						p.onsuccess && p.onsuccess.call(that,that.data("mvvm_p").data);
    					}
    				},function(){
    					return p.onerror && p.onerror.call(that,that.data("mvvm_p").data);
    				},p.async
    			);
    			return that;
    		},
    		_init:function(){
    			var that = this,p = that.data("mvvm_p");
    			if(p.showAction){
    				$.fn.mvvm._ajax.call(that);
    			}else if(p.sqlcode){
    				$.fn.mvvm._sql.call(that);
    			}else if(p.data){
    				$.fn.mvvm._set.call(that,p.data);
    			}else{
    				p.data = $.fn.mvvm._get.call(that);
    			}
    			return that;
    		},
    		_set : function(data){
    			var that = this,p = that.data("mvvm_p"),ele,nodeName,value;
    			p.data = data;
    			p.onload && p.onload.call(that,data);
    			$.fn.mvvm._getEles.call(that).each(function(i,v){
    				ele = $(v);
    				nodeName = ele.prop("nodeName").toLowerCase();
    				nodeName = nodeName == "input" ? nodeName + "_" + ele.prop("type") : nodeName;
    				name = p.set && ele.attr(p.set) || ele.attr("id") || ele.attr("name");
    				value = $MT.get(data,name);
    				if(value === undefined) return;
    				switch(nodeName){
                        case "select" :
                            ele.val(value).refresh();
                        break;
                        case "input_text" :
                        case "input_password" :
                        case "input_range":
                        case "input_number":
                        case "input_date":
                        case "input_datetime":
                        case "input_datetime-local":
                        case "input_email":
                        case "input_month":
                        case "input_time":
                        case "input_url":
                        case "input_week":
                        case "input_hidden":
                        case "textarea":
                        	ele.val(value);
                        break;
                        case "input_checkbox":
                        	ele[0].checked = ele.attr("value") == value;
                        break;
    				}
				});    				
    			return that;
    		},
    		_get : function(){
    			var that = this,p = that.data("mvvm_p"),ele,nodeName,name,data = {};
    			$.fn.mvvm._getEles.call(that).each(function(i,v){
    				ele = $(v);
    				nodeName = ele.prop("nodeName").toLowerCase();
    				nodeName = nodeName == "input" ? nodeName + "_" + ele.prop("type") : nodeName;
    				name = p.get && ele.attr(p.get) || ele.attr("id") || ele.attr("name");
    				var val;
    				switch(nodeName){
                        case "select" :
                        case "input_text" :
                        case "input_password" :
                        case "input_range":
                        case "input_number":
                        case "input_date":
                        case "input_datetime":
                        case "input_datetime-local":
                        case "input_email":
                        case "input_month":
                        case "input_time":
                        case "input_url":
                        case "input_week":
                        case "input_hidden":
                        case "textarea":
                        	val = ele.val();
                        break;
                        case "input_checkbox":
                        	if(ele[0].checked === true){
                        		val = ele.attr("value");
                        	}else{
                        		val = ele.attr("offvalue") || null;
                        	}
                        break;
    				}
                	var temp = $MT.get(data,name); 
                	if(temp !== undefined){
                		if(typeof temp === "object"){
                			temp.push(val);
                		}else{
                			temp = [temp,val];
                		}
                	}else temp = val;
                	$MT.set(data,name,temp);
    			});
    			return data;
    		},
    		_ajax : function(){
    			var that = this,p = that.data("mvvm_p");
    			$MT.ajax(p.showAction,p.param,function(data){
					if(data.error){
						p.error && p.error(data.error);
					}else{
	    				if(data.length > 0){
	    					data = data[0];
	    				}
	    				$.fn.mvvm._set.call(that,data);
					}
    			},function(){
    				
    			},p.async);
    			return that;
    		},
    		_sql : function(){
    			var that = this,p = that.data("mvvm_p");
    			$MT.query({
    				code : p.sqlcode,
    				local:p.sqllocal,
    				param:p.param,
    				ok:function(data){
    					if(data.error){
    						p.error && p.error(data.error);
    					}else{
		    				if(data.length > 0){
		    					data = data[0];
		    				}
		    				$.fn.mvvm._set.call(that,data);
    					}
    				},
    				async:p.async
    			});
    			return that;
    		}
    	});
    })(jQuery);
    

    
    /*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
     * Version: 3.1.3
     * 滚轮事件监听扩展
     * 调用：
     * $(xx).mousewheel(function(event, delta){
     *      delta > 0 上滚
     *      delta > 0 下滚
     * });
     */
	(function(){
	    (function (factory) {
	        if ( typeof define === 'function' && define.amd ) {
	            // AMD. Register as an anonymous module.
	            define(['jquery'], factory);
	        } else if (typeof exports === 'object') {
	            // Node/CommonJS style for Browserify
	            module.exports = factory;
	        } else {
	            // Browser globals
	            factory(jQuery);
	        }
	    }(function ($) {
	
	        var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];
	        var toBind = 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
	        var lowestDelta, lowestDeltaXY;
	
	        if ( $.event.fixHooks ) {
	            for ( var i = toFix.length; i; ) {
	                $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
	            }
	        }
	
	        $.event.special.mousewheel = {
	            setup: function() {
	                if ( this.addEventListener ) {
	                    for ( var i = toBind.length; i; ) {
	                        this.addEventListener( toBind[--i], handler, false );
	                    }
	                } else {
	                    this.onmousewheel = handler;
	                }
	            },
	
	            teardown: function() {
	                if ( this.removeEventListener ) {
	                    for ( var i = toBind.length; i; ) {
	                        this.removeEventListener( toBind[--i], handler, false );
	                    }
	                } else {
	                    this.onmousewheel = null;
	                }
	            }
	        };
	
	        $.fn.extend({
	            mousewheel: function(fn) {
	                return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	            },
	
	            unmousewheel: function(fn) {
	                return this.unbind("mousewheel", fn);
	            }
	        });
	
	
	        function handler(event) {
	            var orgEvent = event || window.event,
	                args = [].slice.call(arguments, 1),
	                delta = 0,
	                deltaX = 0,
	                deltaY = 0,
	                absDelta = 0,
	                absDeltaXY = 0,
	                fn;
	            event = $.event.fix(orgEvent);
	            event.type = "mousewheel";
	
	            // Old school scrollwheel delta
	            if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta; }
	            if ( orgEvent.detail )     { delta = orgEvent.detail * -1; }
	
	            // New school wheel delta (wheel event)
	            if ( orgEvent.deltaY ) {
	                deltaY = orgEvent.deltaY * -1;
	                delta  = deltaY;
	            }
	            if ( orgEvent.deltaX ) {
	                deltaX = orgEvent.deltaX;
	                delta  = deltaX * -1;
	            }
	
	            // Webkit
	            if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY; }
	            if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = orgEvent.wheelDeltaX * -1; }
	
	            // Look for lowest delta to normalize the delta values
	            absDelta = Math.abs(delta);
	            if ( !lowestDelta || absDelta < lowestDelta ) { lowestDelta = absDelta; }
	            absDeltaXY = Math.max(Math.abs(deltaY), Math.abs(deltaX));
	            if ( !lowestDeltaXY || absDeltaXY < lowestDeltaXY ) { lowestDeltaXY = absDeltaXY; }
	
	            // Get a whole value for the deltas
	            fn = delta > 0 ? 'floor' : 'ceil';
	            delta  = Math[fn](delta / lowestDelta);
	            deltaX = Math[fn](deltaX / lowestDeltaXY);
	            deltaY = Math[fn](deltaY / lowestDeltaXY);
	
	            // Add event and delta to the front of the arguments
	            args.unshift(event, delta, deltaX, deltaY);
	
	            return ($.event.dispatch || $.event.handle).apply(this, args);
	        }
	    }));
	})();
})(jQuery);
/*jquery扩展结束*/

//TODO dialog扩展方法开始
(function($){
	var oxhideDialogSelf;
	$(window).load(function(){
		oxhideDialogSelf = $MT.getArgs("lhgdialog","t");
	});
    $.extend(window,{
        /*确认提示*/
        info : function(message,callback){
            var src = oxhideDialogSelf === "self" ? $.dialog : (window["dg"] ? dg.opener.$.dialog : $.dialog),
            index = window["dg"] ? dg.getIndex() : null;
            if(typeof message === "object"){
                callback = message.fn;
                  message = message.message;
            }
            return src({
                title: '警告',
                id: 'Alert',
                icon: 'alert.gif',
                fixed: true,
                lock: true,
                content: message,
                ok: true,
                esc:false,
                resize: false,
                close: callback || new Function,
                index : index,
                parent: src.focus
            });
        },
        /*错误提示*/
        error : function(message,callback){
            var src = oxhideDialogSelf === "self" ? $.dialog : (window["dg"] ? dg.opener.$.dialog : $.dialog),
            index = window["dg"] ? dg.getIndex() : null;
            if(typeof message === "object"){
                callback = message.fn;
                message = message.message;
            }
            return src({
                title: '错误',
                id: 'Error',
                icon: 'error.gif',
                fixed: true,
                lock: true,
                content: message,
                ok: true,
                esc:false,
                resize: false,
                close: callback || new Function,
                index : index,
                parent: src.focus
            });
        },
        /*成功提示*/
        right : function(message,callback){
            var src = oxhideDialogSelf === "self" ? $.dialog : (window["dg"] ? dg.opener.$.dialog : $.dialog),
            index = window["dg"] ? dg.getIndex() : null;
            if(typeof message === "object"){
                callback = message.fn;
                message = message.message;
            }
            return src({
                title: '提示',
                id: 'Success',
                icon: 'success.gif',
                fixed: true,
                lock: true,
                content: message,
                ok: true,
                esc:false,
                resize: false,
                close: callback || new Function,
                index : index,
                parent: src.focus
            });
        },
        /**
         * 提问,两种传参格式,推荐用第一种;
         * 支持验证码方提问,以及普通提问
         * 
         * ask({
         * 		message:"请输入{0}以确定!",
         * 		fn:function(data){if(data==="yes"){}else{}},
         * 		yes:"确定",
         * 		no:"取消",
         * 		content:"我真的确定"
         * 		btn:[
					{
						name:"按钮文字",
						back:"回调fn时的参数",
						icon
						icon2
						disabled
						focus
						appendTo
						pos
						group
					}
         * 		]
         * });
         * 
         * 
         * ask("请输入{0}以确定!",function(data){if(data==="yes"){}else{}},[
         * 		name:"按钮文字",
         * 		back:"回调fn时的参数",
         * 		icon
         * 		icon2
         *      disabled
         *      focus
         *      appendTo
         *      pos
         *      group
         * ],"确定","取消","我真的确定");
         * 
         * 当验证提问时,第一个参数、message属性必须包含{0}
         */
        ask : function(pa){
            var src = oxhideDialogSelf === "self" ? $.dialog : (window["dg"] ? dg.opener.$.dialog : $.dialog),
            index = window["dg"] ? dg.getIndex() : null,
            args = [].slice.call(arguments);
            if(typeof pa === "string"){
                pa = {};
                pa.message = args[0];
                pa.fn = args[1];
                if(typeof args[2] === "object"){
                	pa.btn = args[2];
	                pa.yes = args[3] || "确定";
	                pa.no = args[4] || "取消";
	                pa.content = args[5];
                }else{
	                pa.yes = args[2] || "确定";
	                pa.no = args[3] || "取消";
	                pa.content = args[4];
                }
            }
            if(pa.btn){
            	pa.btn.each(function(i,v){
					$.extend(v,{
	                    name    : v.name,
	                    id      : v.name.guid(),
	                    focus   : v.focus === "yes",
	                    disabled: v.disabled  === "yes",
	                    pos     : v.pos || "right",
	                    callback: function(){
	                    	pa.fn(v.back);
	                    	return true;
	                    }
					});
            	});
            }
            if(!pa.content){
	            return src({
	                title: '请问',
	                id: 'Confirm',
	                icon: 'prompt.gif',
	                fixed: true,
	                lock: true,
	                esc:false,
	                cancelVal:pa.no,
	                okVal:pa.yes,
	                content: pa.message,
	                button : pa.btn,
	                resize: false,
	                index:index,
	                parent: src.focus,
	                ok: function(){pa.fn && pa.fn("yes");return true},
	                cancel:function(){pa.fn && pa.fn("no");return true;}
	            });
            }else{
            	var input;
	            return src({
	                title: '请问',
	                id: 'Prompt',
	                icon: 'prompt.gif',
	                fixed: true,
	                lock: true,
	                esc:false,
	                index:index,
	                parent: src.focus,
	                content: [
	                    '<div style="margin-bottom:5px;font-size:13px;font-family:Tahoma">',
	                        pa.message.format(true,pa.content),
	                    '</div>',
	                    '<div>',
	                    '<input style="width:95%;padding:6px 4px" class="ui-widget-content ui-corner-all" />',
	                    '</div>'
	                    ].join(''),
	                init: function(){
	                    input = this.DOM.content[0].getElementsByTagName('input')[0];
	                    input.select();
	                    //input.focus();
	                },
	                ok: function(){
	                	if(input.value == pa.content){
							pa.fn && pa.fn("yes");return true;
	                	}else{
	                		alert("输入的内容不对,请输入" + pa.content);
	                	}
	                },
	                cancel:function(){
	                	pa.fn && pa.fn("no");
	                	return true;
	                }
	            });
            }
        },
		/*
        * 一般窗口
        * pa:
        * title:"标题",默认 视窗
        * id:"窗体唯一id"，默认 title的escape码
        * self: "yes|no" 是否在本页面打开，还是在父页面打开？默认父(no)
        * fns :"按钮数组"
        *       [
        *           {
        *               name:"按钮名称"
        *               id:"按钮id"，默认取 name
        *               icon:"按钮图标"，默认空
        *               focus: "按钮是否聚焦状态" ,默认否，可输入 yes和no,
        *               fn:"回调函数，函数中this表示窗体对象，this.content表示窗体中的window，this.opener表示窗体的打开者，this.frame表示窗体的frame"
        *               disabled : "yes|no",
        *               pos : "left|right",默认right
        *               appendTo : "#id" 要作为哪个按钮的子按钮,必须是已经存在的按钮@,
        *               abstractedName :按钮由哪个对象渲染？目前支持按钮渲染的控件有xls、imp;
        *               group   : 按钮的group属性一样的话,它们会合成一个buttonset;如果它们没有appendTo或者被appendTo了,效果就不好看了(这个要开发者判断);例如按钮1的group="commer";按钮1旁边一个按钮的group也是"commer"的话,这两按钮会合成一个buttonset
        *               buttonWidth : 当按钮被其他按钮appendTo后,生成的子菜单的宽度百分比,默认100；如果设置为50,则表示一行有两个菜单;33则一行有3个菜单
        *               buttonMenuWidth:当按钮被其他按钮appendTo后,并设置了buttonWidth时,此属性决定了按钮的菜单的宽度,默认400
        *           }
        *       ]
        * ok   : "yes|no" ,是否显示确定按钮，当为yes且没有指定onOk时,那么确定按钮只会关闭窗体 ,默认no
        * onOk :"点击确定按钮时执行的函数，同样可用this,传了此函数，表示会显示确定按钮，函数返回false，将阻止窗体关闭！",
        * okBtnTxt : 确定按钮的文字，默认确定
        * okGroup:确定按钮的group,默认common,相同group的按钮将组成按钮组
        * cancel: "yes|no",是否显示取消按钮，当为yes时，没有指定onCancel,那么确定按钮只会关闭窗体 默认yes
        * showClose :是否显示标题栏上的关闭按钮
        * onCancel :"点击取消按钮时执行的函数(只是按钮！！如果点击   x 关闭，是不会执行的！！)，同样可用this,传了此函数，表示会显示取消按钮，函数返回false，将阻止窗体关闭！",
        * canelBtnTxt:取消按钮的文字 ,默认取消
        * cancelGroup:取消按钮的group,默认common,相同group的按钮将组成按钮组
        * minBtn :"yes|no" 是否显示最小化，默认是
        * maxBtn :"yes|no" 是否显示最大化，默认是
        * width :宽度,默认600px
        * height :高度,默认300px
        * cover : "yes|no"是否锁屏   ,默认是
        * resize :"yes|no" 是否可以改变大小 ,默认否
        * drag : "yes|no" 是否可以拖动，默认是
        * onClose :窗体关闭时调用，返回false不关闭， 此事件即时点击  x 关闭，也会执行
        * minType : 最小化窗体的类型，yes，只显示标题栏， no ，在页面底部显示标题栏 ，默认yes
        * init    : 窗体加载时调用的方法
        * data    : 窗体传递的参数键值对
        * time    : 定时关闭，默认空
        * btnBar  : yes|no 是否显示按钮栏，默认情况下，只要有按钮就会显示按钮栏，没有就不显示，这个参数作用于有按钮却要隐藏按钮栏的情况，默认yes
        * show    : 默认是否打开，yes|no ，默认yes
        * url     : 地址
        * html    : html字符
        * showTitle: yes|no 是否显示标题栏
        * htmlRemove: yes|no 当内容是html字符时,关闭对话框时内容是否移除?如果不移除,将追加到body中并隐藏.默认yes,即移除
        * left:数字或者字符串,如 50%; 500;默认中间
        * top:数字或者字符串,如 50%; 500;默认中间
        * post:"yes|no" 默认no 如果你的url中参数较长,则可能出现参数传递失败的现象,此时需要post方式传递,但是此时在打开的页面中,无法用window.location.href = window.location.href的方式进行刷新页面了.只能使用 : $.forward(window,"${param.postUrl}")的方式刷新
        * param:要传递的参数,可传递中文,此时自动设置post=yes
        * urlchange : yes|no 是否对url进行修改,默认yes
        */
        win : function(pa){
            var title = pa.title || "对话框";
            var id = pa.id || escape(title).split(/(?:%u|%)/).join("");
            if(pa.showTitle === "no") title = false;
            var buttons = [],hasfocus = false;
            if(pa.fns){
                if(pa.fns.push){
                    for(var i = 0,j = pa.fns.length; i < j;i++ ){
                        buttons.push({
                            name    : pa.fns[i].name,
                            id      : pa.fns[i].id || pa.fns[i].name.guid(),
                            focus   : pa.fns[i].focus === "yes",
                            callback: pa.fns[i].fn,
                            icon    : pa.fns[i].icon,
                            icon2   : pa.fns[i].icon2 ,
                            disabled: pa.fns[i].disabled  === "yes",
                            appendTo: pa.fns[i].appendTo,
                            pos     : pa.fns[i].pos || "right",
                            group   : pa.fns[i].group,
                            abstractedName : pa.fns[i].abstractedName,
                            buttonWidth : pa.fns[i].buttonWidth,
                            buttonMenuWidth : pa.fns[i].buttonMenuWidth
                        });
                        pa.fns[i].focus === "yes" && (hasfocus = true);
                    }
                }else{
                    var j = 0;
                    for(var i in pa.fns ){
                        if(typeof pa.fns[i] == "object"){
                            buttons.push({
                                name    : pa.fns[i].name || i,
                                id      : pa.fns[i].id || (pa.fns[i].name || i).guid(),
                                focus   : pa.fns[i].focus === "yes",
                                callback: pa.fns[i].fn,
                                icon    : pa.fns[i].icon ,
                                icon2   : pa.fns[i].icon2 ,
                                disabled: pa.fns[i].disabled  === "yes",
                                appendTo: pa.fns[i].appendTo,
                                pos     : pa.fns[i].pos || "right",
                                group   : pa.fns[i].group,
                                abstractedName : pa.fns[i].abstractedName,
                                buttonWidth : pa.fns[i].buttonWidth,
                                buttonMenuWidth : pa.fns[i].buttonMenuWidth
                            });
                            pa.fns[i].focus === "yes" && (hasfocus = true);
                        }else if(typeof pa.fns[i] == "function"){
                            buttons.push({
                                name    : i,
                                id      : i.guid(),
                                callback: pa.fns[i]
                            });
                        }
                        j++;
                    }
                }
                if(!hasfocus && buttons.length) buttons[0].focus = true;
            }
            var src = (oxhideDialogSelf === "self" || pa.self == "yes") ?  $.dialog : (window["dg"] ? dg.opener.$.dialog : $.dialog),
            index =  window["dg"] ? dg.getIndex() : null;
            
            if(pa.param) pa.post = "yes";
            if(pa.urlchange !== "no" && pa.url && pa.url.indexOf("/core/tool/load.jsp") === -1){
            	pa.url = $MT.url(pa.url,false,{
            		"ui_height" : pa.height - 18,
            		"oxhideDialogSelf" : oxhideDialogSelf
            	});
            }
            
            if(typeof pa.html === "object" && pa.html.next){
            	var tempSrcElement = pa.html.next(),srcType = "insertBefore";
            	if(tempSrcElement.length > 0 ){
            		pa.html.data("mysrcElement_dialog",tempSrcElement);
            	}else{
            		tempSrcElement = pa.html.before();
            		srcType = "insertAfter";
            		if(tempSrcElement.length > 0 && pa.html.attr("id") !== tempSrcElement.attr("id")){
            			pa.html.data("mysrcElement_dialog",tempSrcElement);
            		}else{
	            		tempSrcElement = pa.html.parent();
	            		srcType = "appendTo";
	            		pa.html.data("mysrcElement_dialog",tempSrcElement);
            		}
            	}
            	pa.html.data("mysrcElement_type",srcType);
            	
            	if(pa.onClose){
            		var tempFn = pa.onClose;
            		pa.onClose = function(){
            			pa.html[pa.html.data("mysrcElement_type")](pa.html.data("mysrcElement_dialog"));
            			return tempFn();
            		}
            	}else{
            		pa.onClose = function(){
            			pa.html[pa.html.data("mysrcElement_type")](pa.html.data("mysrcElement_dialog"));
            		}
            	}
            }
            var dgTemp = src({
                title     : title,
                content   : pa.url ?  ("url:"+pa.url): pa.html ,
                ok        : pa.onOk      || (pa.ok == "yes"),
                cancel    : pa.onCancel  || (pa.cancel != "no"),
                showClose : pa.showClose !== "no",
                cancelVal : pa.canelBtnTxt || "取消",
                okVal     : pa.okBtnTxt || "确定",
                min       : pa.minBtn != "no",
                max       : pa.maxBtn != "no",
                button    : buttons,
                width     : pa.width || "auto",
                height    : pa.height || "auto",
                fixed     : true,
                lock      : pa.cover != "no",
                icon      : null,
                padding   : "15px 10px",
                skin      : "",
                focus     : true,
                time      : pa.time,
                resize    : pa.resize != "no",
                drag      : pa.drag != "no",
                esc       : false,
                cache     : false,
                extendDrag: true,
                data      : pa.data,
                id        : id,
                init      : function(){
                    if(pa.url){
                        this.content.father = window;
                        this.content.dg = this;
                    }
                    pa.init && pa.init.call(this);
                },
                close     : pa.onClose,
                parent    : src.focus,
                minType   : pa.minType != "no",
                self      : ((oxhideDialogSelf === "self" || pa.self == "yes")  ? "self" : "father"),
                btnBar    : pa.btnBar  != "no",
                show      : pa.show != "no",
                index     : index,
                htmlRemove: pa.htmlRemove !== "no",
                okGroup   : pa.okGroup === undefined ? "common" : pa.okGroup,
                cancelGroup   : pa.cancelGroup === undefined ? "common" : pa.cancelGroup,
                left: pa.left,
                top:pa.top,
                post : pa.post === "yes",
                param : pa.param
            });
            return dgTemp;
        },
        /*增加,fn中有参数表示新增的id pa.fnFail表示增加失败时调用的方法*/
        addWin : function(pa){
            pa.title = pa.title || "增加";
            pa.fns = [];
            if(pa.saveAndAdd !== false){
                pa.fns.push(
                    {
                        name     : "保存&增加",
                        id       : "saveAndAdd",
                        icon     : "ui-icon-plusthick",
                        fn       : function(){
                            var temp = this.content.document.getElementById("isSaveAndAdd");
                            if(temp) temp.value = "true";
                            this.content.save();
                        },
                        group    : "add"
                    }
                );
            }
            pa.fns.push(
                {
                    name     : "保存&关闭",
                    id       : "saveAndClose",
                    icon     : "ui-icon-check",
                    fn       : function(){
                        var temp = this.content.document.getElementById("isSaveAndAdd");
                        if(temp) temp.value = "false";
                        this.content.save();
                    },
                    group    : "add"
                }
            );
            pa.onClose = function(){
                var temp = this.content.document.getElementById("isSaveAndAdd");
                if(temp && temp.value !== "" && temp.value !== "false") pa.fn(temp.value);
                else pa.fnFail && pa.fnFail();
                return true;
            };
            pa.ok = "no";
            return win(pa);
        },
        
        /*自定义弹出框1，不带保存按钮的*/
        actionWin : function(pa){
            pa.title = pa.title || "";
            pa.fns = [];
           
            pa.onClose = function(){
                var temp = this.content.document.getElementById("isSaveAndAdd");
                if(temp && temp.value !== "" && temp.value !== "false") pa.fn(temp.value);
                else pa.fnFail && pa.fnFail();
                return true;
            };
            pa.ok = "no";
            return win(pa);
        },
        /*自定义弹出框，带保存按钮*/
        customWin : function(pa){
        	pa.title = pa.title || "";
        	pa.fns = [
        	          {
        	        	  name     : "保存&关闭",
        	        	  id       : "saveAndClose",
        	        	  icon     : "ui-icon-circle-check",
        	        	  fn       : function(){
        	        		  var temp = this.content.document.getElementById("isSaveAndAdd");
        	        		  temp && (temp.value = "");
        	        		  this.content.save();
        	        		  return false;
        	        	  },
        	        	  group    : "add"
        	          }
        	          ];
        	
        	pa.onClose = function(){
        		var temp = this.content.document.getElementById("isSaveAndAdd");
        		if(temp && temp.value !== "" && temp.value !== "false") pa.fn(temp.value);
        		else pa.fnFail && pa.fnFail();
        		return true;
        	};
        	pa.ok = "no";
        	return win(pa);
        },
        /*修改*/
        updateWin : function(pa){
            pa.title = pa.title || "修改";
            pa.fns = [
                {
                    name     : "保存&关闭",
                    id       : "saveAndClose",
                    icon     : "ui-icon-circle-check",
                    fn       : function(){
						var temp = this.content.document.getElementById("isSaveAndAdd");
						temp && (temp.value = "");
                        this.content.save();
                        return false;
                    },
                    group    : "add"
                }
            ];
            if(pa.showSave === true){
            	pa.fns.unshift({
                    name     : "保存",
                    id       : "saveNoClose",
                    icon     : "ui-icon-check",
                    fn       : function(){
						var temp = this.content.document.getElementById("isSaveAndAdd");
						temp && (temp.value = pa.url);
                        this.content.save();
                        return false;
                    },
                    group    : "add"
                });
            }
            pa.onClose = function(){
                var temp = this.content.document.getElementById("isSaveAndAdd");
                if(temp && temp.value !== "" && temp.value !== "false") pa.fn(temp.value);
                return true;
            };
            if(pa.target){
            	var ids = pa.target.jqGrid("id",false,false),ttt = pa.target[0],fn = function(btn){
                	var that = this,isLast = btn.attr("id") === "last_btn_record",newId;
                	if(isLast) newId = ids[--pa.index__];
                	else newId = ids[++pa.index__];
                	/*按钮效果调节*/
					if(pa.index__ === 0 && ttt.p.page === 1) that.disableBtn("last_btn_record");
					else that.enableBtn("last_btn_record");

					if(pa.index__ === ids.length - 1 && ttt.p.page === ttt.p.lastpage) that.disableBtn("next_btn_record");
					else that.enableBtn("next_btn_record");
					/*按钮效果调节*/

					/*需要翻上一页*/
					if(pa.index__ < 0){
						 that.disableBtn("last_btn_record","next_btn_record","saveNoClose","saveAndClose");
						 pa.target.jqGrid("load","-1",function(){
						 	ids = pa.target.jqGrid("id",false,false);
						 	pa.index__ = ids.length;
						 	that.enableBtn("last_btn_record","next_btn_record","saveNoClose","saveAndClose");
						 	btn.trigger("click");
						 });
						 return false;
					}
					/*需要翻上一页*/

					/*需要翻下一页*/
					if(pa.index__ >= ids.length){
						 that.enableBtn("last_btn_record","next_btn_record","saveNoClose","saveAndClose");
						 pa.target.jqGrid("load","+1",function(){
						 	ids = pa.target.jqGrid("id",false,false);
						 	pa.index__ = -1;
						 	that.enableBtn("last_btn_record","next_btn_record","saveNoClose","saveAndClose");
						 	btn.trigger("click");
						 });
						 return false;
					}
					/*需要翻上一页*/

					pa.target.jqGrid("row","select",newId);
					ask("是否保存当前记录?",function(data){
						if(data === "yes"){
							var temp = that.content.document.getElementById("isSaveAndAdd");
							temp && (temp.value = pa.baseUrl + "&id=" + newId);
							that.content.save();
						}else{
							that.content.location = $MT.url(pa.baseUrl + "&id=" + newId,false);
						}
					},"是","否");
					return false;
            	};
            	pa.index__ = ids.indexOf(pa.baseId);
            	pa.fns.push({
                    name     : "上一条",
                    pos		 : "left",
                    id       : "last_btn_record",
                    icon     : "ui-icon-arrowthick-1-w",
                    disabled : pa.index__ === 0 && ttt.p.page === 1 ? "yes" : "no",
                    group    : "navigateForm",
                    fn       : function(btn){
						return fn.call(this,btn);;
                    }
            	});
            	pa.fns.push({
                    name     : "下一条",
                    pos		 : "left",
                    id       : "next_btn_record",
                    icon2    : "ui-icon-arrowthick-1-e",
                    disabled : pa.index__ === ids.length - 1 && ttt.p.page === ttt.p.lastpage ? "yes" : "no",
                    group    : "navigateForm",
                    fn       : function(btn){
                    	return fn.call(this,btn);;
                    }
            	});
            }
            pa.ok = "no";
            return win(pa);
        },
        /*查看*/
        viewWin  : function(pa){
            pa.title = pa.title || "查看";
            pa.ok = "no";
            pa.canelBtnTxt = "关闭";
            if(pa.target){
            	var ids = pa.target.jqGrid("id",false,false),ttt = pa.target[0],fn = function(btn){
                	var that = this,isLast = btn.attr("id") === "last_btn_record",newId;
                	if(isLast) newId = ids[--pa.index__];
                	else newId = ids[++pa.index__];
                	/*按钮效果调节*/
					if(pa.index__ === 0 && ttt.p.page === 1) that.disableBtn("last_btn_record");
					else that.enableBtn("last_btn_record");

					if(pa.index__ === ids.length - 1 && ttt.p.page === ttt.p.lastpage) that.disableBtn("next_btn_record");
					else that.enableBtn("next_btn_record");
					/*按钮效果调节*/

					/*需要翻上一页*/
					if(pa.index__ < 0){
						 that.disableBtn("last_btn_record","next_btn_record","saveNoClose","saveAndClose");
						 pa.target.jqGrid("load","-1",function(){
						 	ids = pa.target.jqGrid("id",false,false);
						 	pa.index__ = ids.length;
						 	that.enableBtn("last_btn_record","next_btn_record","saveNoClose","saveAndClose");
						 	btn.trigger("click");
						 });
						 return false;
					}
					/*需要翻上一页*/

					/*需要翻下一页*/
					if(pa.index__ >= ids.length){
						 that.enableBtn("last_btn_record","next_btn_record","saveNoClose","saveAndClose");
						 pa.target.jqGrid("load","+1",function(){
						 	ids = pa.target.jqGrid("id",false,false);
						 	pa.index__ = -1;
						 	that.enableBtn("last_btn_record","next_btn_record","saveNoClose","saveAndClose");
						 	btn.trigger("click");
						 });
						 return false;
					}
					/*需要翻上一页*/
					pa.target.jqGrid("row","select",newId);
					that.content.location = $MT.url(pa.baseUrl + "&id=" + newId,false);
					return false;
            	};
            	pa.index__ = ids.indexOf(pa.baseId);
            	pa.fns = [{
                    name     : "上一条",
                    pos		 : "left",
                    id       : "last_btn_record",
                    icon     : "ui-icon-arrowthick-1-w",
                    disabled : pa.index__ === 0 && ttt.p.page === 1 ? "yes" : "no",
                    group    : "navigateForm",
                    fn       : function(btn){
                    	return fn.call(this,btn);;
                    }
            	},{
                    name     : "下一条",
                    pos		 : "left",
                    id       : "next_btn_record",
                    icon2     : "ui-icon-arrowthick-1-e",
                    disabled : pa.index__ === ids.length - 1 && ttt.p.page === ttt.p.lastpage ? "yes" : "no",
                    group    : "navigateForm",
                    fn       : function(btn){
						return fn.call(this,btn);;
                    }
            	}];
            }
            return win(pa);
        },
        /*htmlwin*/
        htmlWin : function(pa){
            $.dialog && (pa.self = "yes");
            return win(pa);
        },
        /*打开锁屏*/
        XqTipOpen : function(msg){
            $("body").tip({
                lock : true,
                text : msg,
                delay : -1,
                close : false,
                sticker : false,
                id:"bodyLockerTip"
            });
        },
        /*取消锁屏*/
        XqTipClose : function(){
            $("body").tip("close","bodyLockerTip");
        },
        /**
         参数1 消息
         */
        tip : function(msg,type){
            if(typeof msg === "string")
            	if(msg === "close") $("body").tip("close");
            	else{
	                $("body").tip({
	                    text : msg,
	                    delay : 2000,
	                    lock : false,
	                    close : false,
	                    sticker : false,
	                    id:"bodyTiper",
	                    type : type
	                });
            	}
            else
                $("body").tip(msg);
        },
        /**
         * window prompt重写
         * 参数1：文本框上面的标题
         * 参数2：回调
         * 参数3：弹窗的标题,默认 请问
         * 参数4：文本框默认值
         * 参数5: 文本框宽度
         * 参数6：文本框渲染值
         */
        prompts : function(title,fn,titleTop,value,width,abname){
            value = value === null || value === undefined ?  '' : value;
            var input,
            src = oxhideDialogSelf === "self" ? $.dialog : (window["dg"] ? dg.opener.$.dialog : $.dialog),
            index = window["dg"] ? dg.getIndex() : null,
            index = window["dg"] ? dg.getIndex() : null;
            if(!width) width = "95%";
            else width += "px";
            return src({
                title: titleTop || '请问',
                id: 'Prompt',
                icon: 'prompt.gif',
                fixed: true,
                lock: true,
                esc:false,
                index:index,
                parent: src.focus,
                content: [
                    '<div style="margin-bottom:5px;font-size:13px;font-family:Tahoma">',
                        title,
                    '</div>',
                    '<div>',
                    '<input value="',
                     value === null || value === undefined ?  "" : value,
                    '" style="width:',
                    width,
                    ';padding:6px 4px" class="ui-widget-content ui-corner-all" />',
                    '</div>'
                    ].join(''),
                init: function(){
                    input = this.DOM.content[0].getElementsByTagName('input')[0];
                    abname && $(input).refresh(abname);
                    input.select();
                    //input.focus();
                },
                ok: function(here){
                    return fn && fn.call(this, input.value, here);
                },
                cancel: true
            });
        },
        /**
         *关闭当前活动窗体
         */
        closeWin : function(){
            var src = window["dg"] ? dg.opener.$.dialog : $.dialog;
            src.focus && src.focus.close();
        }
    });

    $.extend({
        msgBar : function(p){
            p.delay = p.lifetime;
            p.pos = p.position;
            delete p.lifetime;
            delete p.position;
            $("body").tip(p);
        }
    });

})(jQuery);
/*dialog扩展方法结束*/

//TODO grid扩展 开始
(function() {
    $.jgrid && $.jgrid.extend({
        /*行内按钮事件初始化*/
        _buttonInit: function(btns){
        	return this.each(function(){
	            var $t = $(this),id = $t.attr("id");
	            if(this.p.buttonInited === true) return;
	            this.p.buttonInited = true;
	            btns.each(function(i,v){
	                v.fn && $("#" + id + "_" + v.id).live("click",function(){
	                	if($(this).hasClass("ui-state-disabled") || $(this).closest("tr").hasClass("ui-state-disabled")) return false;
	                    var id_row = $(this).closest("tr.jqgrow").attr("id");
	                    v.fn.call($t[0],id_row,$t.jqGrid("data",id_row),$(this));
	                });
	            });
	            $(".inline-navigate").live("mouseover",function(){
	                $(this).addClass("ui-state-hover")
	            }).live("mouseout",function(){
	                $(this).removeClass("ui-state-hover")
	            });

	            var p = $("#t_" + id),tp = $("#tb_" + id),imperContain;

	            imperContain = p.find("#imperContain");
	            imperContain.appendTo(p);

	            imperContain = tp.find("#imperContain");
	            imperContain.appendTo(tp);
        	});
        },
        /**
         * 表格异步请求完毕后,删除伪跳转和参数
         * 返回的数据中有异常信息,则提示异常信息 data.error
         * 返回的数据要求表格刷新时,刷新表格     data.forceRefresh
         * 返回的数据有普通提示信息,则提示      data.message
         * data是异步请求时服务器返回的数据!
         * isPushData 是指是否是批量插入数据操作,如果是,则不清空  "saveRows","addRows","deleteRows",
         * @returns
         */
        _restoreGridCustom:function(data,isPushData){
        	return this.each(function(){
	            var t = this,$t = $(t),page,url_ =  $t.jqGrid("param","url");
	            $t.jqGrid("row","unselect").jqGrid("param",{
	            	"url" : $t.jqGrid("param","baseUrl"),
	            	selrow : null,
	            	selarrrow : []
	           	 }).jqGrid("removeAjax",t.p.paramsAbstract).jqGrid("removeParam","paramsAbstract","oldEditId");
				$t.jqGrid("subGrid",false,"close");
	            isPushData !== true && $t.jqGrid("removeParam","saveRows","addRows","deleteRows");
	            if(data.error){
	            	error((oxhideDebug && (url_ + "<br/>")) + data.error,function(){
	            		$MT.doError(data.exceptType,$t);
	            	});
	            }
	            if(t.p.optionModel === true){
	            	 $("#t_" + t.id+",#tb_" + t.id).hide();
	            }
	           
	            data.message && tip({
	                text : data.message,
	                lock : false,
	                delay : 2000,
	                close:false,
	                sticker:false
	            });
	            (data.forceRefresh || data === "true" || data === true) && (t.p.forceRefresh = true);
	            page = t.p.page;
	            if(data.records && data.total && (!data.rows || data.rows.length == 0) && page > 1){
	            	t.p.page = page - 1;
	            	t.p.forceRefresh = true;
	            }else{
	            	t.p.canBackUp = true; //标记此表格可以进行还原数据了！！然后在endreq中处理
	            }
	            
	            if(data.extend){
	            	t.p.extendData = data.extend;
	            }
        	});
        },
        /**
         *对id进行dwr是否存在验证,验证通过返回true,否则返回false;必须定义service
         * 参数1：要验证的id
         */
        _exist : function(id){
        	if(this.length == 0) return false;
        	if(this[0].p.dwrExist === false) return true;
            var service = this[0].p.service;
            return service ? $MT.exist(service,id) : true;
        },
        /*设置表格高度/宽度*/
        _autoSize : function(){
            return this.each(function(){
                var $t = this,
                box = $($t.grid.bDiv),
                parent = box.parent(),
                parentTop = parent.parent().parent(),
                height = 0,
                width = 0,
                that = $($t),
                width_ = $t.p.autowidth ? "100%" : $t.p.widthCalc,
                height_ = $t.p.heightCalc,
                titleHeight = $t.p.caption ? 15 : 0;
                
                /*验证非resize元素*/
                $t.p._checkUnResizeEle || ($t.p._checkUnResizeEle = function(v,$t){
		        	if(!v.nodeName || v.nodeName =="SCRIPT" 
		        	|| (v.style && (v.style.display == "none" || v.style.position === "absolute")) 
		        	|| v.className.indexOf("ui-pnotify") > -1 || (v.className.indexOf("tip") > -1 && v.className.indexOf("oxhideTip") === -1) || v.className.indexOf("ui-echmultiselect-menu") > -1
		        	|| v.id === ("t_" + $t.id) || v.id === ("tb_" + $t.id))  return true;
					v = $(v);
		            if(v.hasClass(".tableStyle") && v.has(".ui-echmultiselecte-header,.ui_border") ) return true;
		            return v;
                });
                
                if(width_.indexOf("%") == -1 && height_.indexOf("%") == -1) return;
                if(parentTop.prop("nodeName") === "BODY"){
                    height = document.documentElement.clientHeight - 55;
                    width = document.documentElement.clientWidth - 10;
                }else{
                    height = parentTop.innerHeight() - 65;
                    width = parentTop.innerWidth() - 10;
                }
                if(!$t.p.caption) height += 14;
                $(box).siblings().each(function(k,v){
                  v = $t.p._checkUnResizeEle(v,$t);
                  if(v === true) return;
                  if(v.outerHeight(true)) height -= v.outerHeight(true) ;
                });
                if($("#t_"+$t.id).length) height -= 35;
                if($("#tb_"+$t.id).length) height -= 35;
                if($("#"+$t.id+"_pager").children().length === 0) height += 24;
                $(parent.parent()).siblings().each(function(k,v){
                  v = $t.p._checkUnResizeEle(v,$t);
                  if(v === true) return;
                  if(v.outerHeight(true)) height -= v.outerHeight(true) ;
                });
                height += $t.p.heightFix;
                if(width_.indexOf && width_.indexOf("%") > -1  ) that.jqGrid("setGridWidth",width);
                if(height_.indexOf && height_.indexOf("%") > -1) that.jqGrid("setGridHeight",height);
                if(!$t.grid.hasRegeditResize){
                    parentTop.bind("resize",function(e){that.jqGrid("_autoSize");});
                    $t.grid.hasRegeditResize = true;
                }
                return $t;
            });
        },
        /**
         * 导航栏上非按钮控件操作
         * {
			widget:"${widget}",
			styleId:"${styleId}",
			abstractedName:"${abstractedName}",
			pos:"${pos}",
			display : true
			disabled : false
			clone : true
         * }
         * 只传字符串时,当成styleid,并返回styleid对应的控件
         * 控件.data("table");表示表格对象
         * */
        element : function(param){
        	var $t = this,id = $t.attr("id"),t = $t[0];
        	if(typeof param === "object"){
				if(!param.join){
					param = [param];
				}
				param.each(function(i,pp){
					var ele;
					try{
						ele = $(new Function("return " + pp.widget)());
					}catch(e){
						ele = $(new Function("return \"" + pp.widget + "\"")());
					}
					if(ele && ele.length > 0){
						if(pp.clone !== false){
							ele = ele.clone(true);
						}
						if(pp.display !== false){
							ele.show();
						}else{
							ele.hide();
						}
						if(pp.disabled === true){
							ele.attr("disabled","disabled");
						}else{
							ele.removeAttr("disabled");
						}
						if(pp.styleId !== undefined){
							ele.attr("id",id + "_" + pp.styleId);
						}else if(ele.attr("id")){
							ele.attr("id",id + "_" + ele.attr("id"));
						}
						var p = $("#t_" + id),tp = $("#tb_" + id);
						if(tp.length === 0) tp = p;
	                    if(pp.pos === "top") p.append(ele);
	                    else tp.append(ele);
	                    if(pp.abstractedName && window[pp.abstractedName]){
	                    	ele.refresh(window[pp.abstractedName]);
	                    }else{
	                    	ele.refresh();
	                    }
	                    ele.data("table",$t);
					}
				});
				return $t;
        	}else{
        		return $("#"+id+"_"+param);
        	}
        },
        /**
         * 按钮操作
         * 参数1为按钮对象时,其他参数忽视,此时增加按钮,按钮对象格式:
         * {
         *  id        按钮的id
         *  pos       按钮位置 top|buttom (left、right目前不支持)
         *  caption   按钮文字
         *  fn        函数
         *  ico       按钮图标(可省)
         *  disabled true|false,
         *  appendTo 按钮作为哪个按钮的子按钮
         *  refresh  函数,按钮建好后,以按钮jquer对象为宿主而调用的方法,可以为按钮追加其他效果,可视为按钮创建好后的回调方法
         *  abstractedName 按钮由哪个对象渲染？目前支持按钮渲染的控件有xls、imp
         *  buttonWidth = 100;
         *  buttonMenuWidth 
         * }
         * fn会带3个参数,依此是 id=当前行id,data=当前行json对象,btn=按钮jquery对象
         * 且this表示表格dom对象
         * 参数1为按钮id,或者按钮id的数组,
         * 参数2为hide,show,disable,enable,中的一个(不区分大小写),参数2不传则返回按钮jquery对象
         * 参数3为行id仅作用于每行一个按钮时,例如
         * $(x).jqGrid("button","按钮id","hide","行id");此时隐藏行id上的按钮
         * $(x).jqGrid("button","按钮id",null,"行id");此时返回行id上的按钮jquery对象
         *
         */
        button:function(param,action,rowid){
            var $t = this,id = $t.attr("id");
            if(action === undefined && typeof param !== "string" && ((param.join && param.length && typeof param[0] !== "string") || !param.join)){
                if(!param.join) param = [param];
                var p = $("#t_" + id),tp = $("#tb_" + id),btn;
                if(tp.length === 0) tp = p;
                param.each(function(i,v){
                    v = $.extend({
                        id:null,
                        caption:null,
                        ico:null,
                        ico2:null,
                        fn:null,
                        disabled:null,
                        pos : null,
                        appendTo : null,
                        group : null,
                        abstractedName : null,
                        display : true,
                        buttonWidth : 100,
                        buttonMenuWidth : 400
                    },v);
                    if(v.appendTo) {
                        v.appendTo = v.appendTo.substr(1);
                        v.appendTo = id + "_" + v.appendTo;
                    }
                    if(v.disabled === true || v.disabled === "disabled") v.disabled = "disabled=\"disabled\"";
                    else v.disabled = "";
                    if(v.buttonWidth && v.buttonWidth != 100) v.disabled += " buttonWidth=\"" + v.buttonWidth + "\" buttonMenuWidth=\"" + v.buttonMenuWidth + "\"";
                    if(v.group)  v.group = id + "_" + v.group;
                    btn = $(["<button display=\""+v.display+"\" type=\"button\" id=\"",id,"_",v.id , "\"",v.disabled ,"buttonType=\"",v.ico || "","\" secondButtonType=\"",v.ico2 || "","\" appendTo=\"",v.appendTo || "","\" group=\"",v.group || "", "\" >",v.caption,"</button>"].join("")).click(function(event,id,data){v.fn && v.fn.call($t[0],id,data,$(this));});
                    if(v.pos === "top") p.append(btn);
                    else tp.append(btn);
                    if(v.display === false) btn.hide();
                    btn.refresh();
                    v.refresh && v.refresh.call(btn);
                });
            }else{
                if(typeof param === "string") param = [param];
                if(rowid){
                	param = $(param.format("#"+id+"_{0}").join(","),$("#" + rowid,$t));	
                }else{
                	param = $(param.format("#"+id+"_{0}").join(","),"#t_" + id).pushStack(
                		$(param.format("#"+id+"_{0}").join(","),"#tb_" + id)
                	).end();
                }
                action && (action = action.toLowerCase());
                switch(action){
                    case "disable":
                    if(param.data("abstractButton")) param.data("abstractButton").addClass("ui-state-disabled");
                    param.attr("disabled","disabled").refresh();
                    break;
                    case "hide":
                    if(param.data("abstractButton")) param.data("abstractButton").hide();
                    else param.hide();
                    break;
                    case "show":
                    if(param.data("abstractButton")) param.data("abstractButton").show();
                    else param.show();
                    break;
                    case "enable":
                    if(param.data("abstractButton")) param.data("abstractButton").removeClass("ui-state-disabled");
                    param.removeAttr("disabled").refresh();
                    break;
                    default:
                    return param;
                }
            }
            return $t;
        },
        /**
         * 配置TableSearchField，参数1:
         * {
         * 	  aliasName(默认为fieldName，匹配原有条件的关键字)
         * 	  fieldName(必传)
         *    op(必传)
         *    value
         *    groupOp(必传)
         *    notNull
         *    tableName  	
         * }
         * 参数2：add、update、delete原有条件,默认update
         * 
         */
        searchField : function(param,action){
        	param = $.extend({
        		aliasName : param.fieldName,
        		fieldName : "",
        		op		  : "",
        		value	  : "",
        		groupOp   : "and",
        		notNull	  : true,
        		tableName : " "
        	},param);
        	var $t = this,t = $t[0],postData = t.p.postData;
        	switch(action){
	        	case "add":
	        		postData.rules.push("{aliasName}#{fieldName}#{op}#{value}#{groupOp}#{notNull}#{tableName}".format(param));
	        	break;
	        	case undefined:
	        	case "update":
		            postData.rules.each(function(i,v){
		            	v = v.split("#");
		            	if(v[0] === param.aliasName){
		            		param.fieldName && (v[1] = param.fieldName);
		            		param.op && (v[2] = param.op);
		            		v[3] = param.value;
		            		param.groupOp && (v[4] = param.groupOp);
		            		v[5] = param.notNull;
		            		param.tableName && (v[6] = param.tableName);
		            		postData.rules[i] = v.join("#");
		            		return true;
		            	}
		            });
		            $.searchExternal && $.searchExternal[t.id] && $.searchExternal[t.id].each(function(i,v){
		               v.data = v.data.split("#");
		               if(v.data[0] === param.aliasName){
	            			param.fieldName && (v.data[1] = param.fieldName);
	            			param.op && (v.data[2] = param.op);
	            			v.data[3] = param.value;
	            			param.groupOp && (v.data[4] = param.groupOp);
	            			v.data[5] = param.notNull;
	            			param.tableName && (v.data[6] = param.tableName);
	            			v.data = v.data.join("#");
	            			return true;
		               }
		          	});
	        	break;
	        	case "delete":
	        		var newRules = [];
		            postData.rules.each(function(i,v){
		            	v = v.split("#");
		            	if(v[0] !== param.aliasName){
		            		newRules.push(v.join("#"));
		            		if(param.fieldName) delete postData[param.fieldName];
		            		return true;
		            	}
		            }) && (postData.rules = newRules);
		            newRules = [];
		            $.searchExternal && $.searchExternal[t.id] && $.searchExternal[t.id].each(function(i,v){
		               v.data = v.data.split("#");
		               if(v.data[0] !== param.aliasName){
		            	 newRules.push(v.data.join("#"));
		            	 return true;
		               }
		          	}) && ($.searchExternal[t.id] = newRules);
	        	break;
        	}
        	return $t;
        },
		/**
         * 配置TableSearchExternal标签使用,调用此方法时,将所有tableid为表格id的
         * TableSearchExternal标签定义的值传到后台执行查询
         */
        search : function(){
	         return this.each(function(){
		         var $t = $(this),
		               id = $t.attr("id"),
		               rules = $t.jqGrid("ajax","rules"),
		               index;
		          $.searchExternal && $.searchExternal[id] && $.searchExternal[id].each(function(i,v){
		               v.data = v.data.split("#");
		               index = rules.indexOf(function(ii,vv){
		               		return vv.indexOf(v.id) > -1 
		               });
		               v.data[3] = v.op.val();
		               v.data = v.data.join("#");
		               if(index === -1)
		                 rules.push(v.data);
		               else
		                 rules.splice(index,1,v.data);
		          });
		          $t.jqGrid("ajax","rules",rules).jqGrid("load",true);
	         });
       },
       /*
        *  清除通过配置TableSearchExternal标签定义的查询条件
        */
        clearSearch : function(){
	       	 return this.each(function(){
		         var   $t = $(this),
		               id = $t.attr("id"),
		               rules = $t.jqGrid("ajax","rules"),
		               index,
		               ruleNew = [];
		          rules.each(function(i,v){
		             v.split("#").length !== 8 && ruleNew.push(v);
		          });
		          $.searchExternal && $.searchExternal[id] && $.searchExternal[id].each(function(i,v){
		             v.op.val("");
		          });
		          $t.jqGrid("ajax","rules",ruleNew).jqGrid("search");
	       	 });
       },
        /**
         * 让表格跳转到非返回数据列表的url,
         * page是表格跳转后,显示第一页还是当前页,true显示第一页,false显示当前页
         * params是参数键值对json对象,当表格提交完毕后这些参数将被删除
         * 例如表格默认地址是showlist,删除时要跳转到batchDelete的action,那么调用此方法:
         * $("#xxx").jqGrid("go",url,params);
         *
         * url的请求中数据返回：
            AjaxHelper.jqGridRefresh(request,response,message,error)
           如果请求只返回null,而response没有打印任何东西,那么表格将不刷新!同时表格的action不会还原,因此只要这种方式请求的action,必须返回数据!
         *
         */
        go:function(url,page,params){
        	return this.each(function(){
	            var t = this,$t = $(this),paramsAbstract = t.p.paramsAbstract || [];
	            t.p.url = url;
	            if(params)
	                for(var i in params){
	                    paramsAbstract.push(i);
	                    $t.jqGrid("ajax",i,params[i]);
	                }
	           t.p.paramsAbstract = paramsAbstract;
	           $t.jqGrid("load",page,false);
           });
        },
        /**
         * 返回该table中选中的id或者全部id
         * 参数1:true|false是否只返回第一行,默认false
         * 参数2:true|false参数1=true时,是否对选中的id进行dwr是否存在的验证,默认true| 参数1=false时,表示是否至返回被选中的记录?如果false将返回全部id!默认true
         * 参数3:没有选中时错误提示,参数1=true时默认"请选择要操作的记录!",参数1=false时默认"请勾选要操作的记录!";当从参数3=null时,表示不提示!
         *
         * 例如:
         * id();                            相当于 id(false,true,"请选择要操作的记录！");
         * id("请选择要查看的记录！");        相当于 id(false,true,"请选择要查看的记录！");
         * id(true);                        相当于 id(true,true,"请选择要操作的记录！");
         * id(false);                       相当于 id(false,true,"请勾选要操作的记录！");
         * id(false,"请勾选要删除的记录！");相当于 id(false,true,"请选择要查看的记录！");
         * id(true,"请选择要查看的记录！"); 相当于 id(true,true,"请选择要查看的记录！");
         * id(true,false);                  相当于 id(true,false,"请选择要操作的记录！");
         * id(false,false);                 相当于 id(false,false,"请勾选要操作的记录！");
         * id(true,true);                   相当于 id(true,true,"请选择要操作的记录！");
         * id(false,true);                  相当于 id(true,true,"请勾选要操作的记录！");
         * id(true,true,"请选择要操作的记录！");
         * id(false,true,"请勾选要操作的记录！");
         * id(true,false,"请选择要操作的记录！");
         * id(false,false,"请勾选要操作的记录！");
         */
        id : function(){
        	if(this.length == 0) return;
            var that = this,t = that[0],args = $.makeArray(arguments);
            if(args.length === 0) args.push("请选择要操作的记录！");
            if(typeof args[0] !== "boolean")
                args.unshift(false,true);
            else if(args.length === 1)
                args.push(true,args[0] ? "请选择要操作的记录！" : "请勾选要操作的记录！");
            else if(typeof args[1] !== "boolean")
                args.unshift(false);
            else if(args.length === 2)
                args.push(args[0] ? "请选择要操作的记录！" : "请勾选要操作的记录！");
            var onlyOne = args[0],dwr = args[1],msg = args[2];
            if(onlyOne){
                var id = t.p.selrow;
                if(!id) {msg !== null && info(msg); return;}
                if(dwr && !that.jqGrid("_exist",id)) return;
                return id;
            }else{
                if(dwr){
                    var ids = t.p.selarrrow;
                    ids.length || (ids = t.p.selrow) && (ids = [ids]);
                    if(!ids || !ids.length){
                        msg !== null && info(msg);
                        return [];
                    }
                    return ids.slice(0);
                }else return that.jqGrid("getDataIDs");
            }
            return $t;
        },
        /**
         * 设置或获取表格异步提交参数 ,还能改变表格隐藏提交条件：tableSearchField标签定义的参数的值;
         * ajax("key","value"),添加或覆盖异步提交参数
         * ajax({"key1":"value1","key2":"value2"}),添加或覆盖异步提交参数
         * ajax(false,"key","value"); 如果存在key参数,则不覆盖
         * ajax(false,{"key1":"value1","key2":"value2"}); 如果存在参数,则不覆盖
         * ajax("key");获取名为key的参数
         */
        ajax : function(){
        	if(this.length == 0) return;
            var override,key,value,args = $.makeArray(arguments);
            if(typeof args[0] !== "boolean") args.unshift(true);
            override = args[0];
            key = args[1];
            value = args[2];
            var $t = this,t = $t[0],postData = t.p.postData;
            if(typeof key === "string" && value !== undefined) {
            	var hasSearchField = false;
                postData.rules.find(true,function(i,v){
                	v = v.split("#");
                	if(v[0] === key){
                		v[3] = value;
                		postData.rules[i] = v.join("#");
                		hasSearchField = true;
                		return true;
                	}
                });
                if(hasSearchField  === true && t.p["searchFieldOnlyQuery_"+key] === true) return $t;
                if(override || !override && !postData[key]) postData[key] = value;
            }else if(typeof key === "string" && value === undefined){
                var result = postData[key];
                result === undefined && postData.rules.find(true,function(ii,v){
                	v = v.split("#");
                	if(v[0] === key){
                		result = v[3];
                		return false;
                	}
                });
                return result;
            }else if(typeof key === "object"){
                for(var i in key){
                	var hasSearchField = false;
                    postData.rules.find(true,function(ii,v){
                    	v = v.split("#");
                    	if(v[0] === i){
                    		v[3] = key[i];
                    		postData.rules[ii] = v.join("#");
                    		return true;
                    	}
                    });
                    if(hasSearchField  === true && t.p["searchFieldOnlyQuery_"+key[i]] === true) continue;

                    if(override || !override && !postData[i]) postData[i] = key[i];
                }
            }

            return $t;
        },
        /**
         * 删除表格 异步提交参数
         * removeAjax(key);删除名为key的参数
         * removeAjax(key1,key2,key3,key4...);删除key1,key2,key3,key4
         * removeAjax([key1,key2,key3,key4]);删除key1,key2,key3,key4
         */
        removeAjax : function(){
        	var array = Array.prototype.slice.call(arguments);
        	return this.each(function(){
	            var t = this,$t = $(t),postData = t.p.postData;
	            if(array[0]){
	                if(typeof array[0] === "object")
	                    $.each(array[0],function(){
	                        delete postData[this];
	                    });
	                else
	                    $.each(array,function(){
	                        delete postData[this];
	                    })
	            }
        	});
        },
        /**
         * 设置或获取表格对象的属性 获取值时 key支持 .,例如 jqGrid("param","groupingView.groupField");
         * param("key","value"),添加或覆盖属性
         * param({"key1":"value1","key2":"value2"}),添加或覆盖属性
         * param(false,"key","value"); 如果存在key属性 ,则不覆盖
         * param(false,{"key1":"value1","key2":"value2"}); 如果存在属性 ,则不覆盖
         * param("key");获取名为key的属性
         *
         * 参数有:
         * param("parentTable")获取父表id
         */
        param : function(){
        	if(this.length == 0) return;
            var override,key,value,args = $.makeArray(arguments);
            if(typeof args[0] !== "boolean") args.unshift(true);
            override = args[0];
            key = args[1];
            value = args[2];
            var $t = this,t = $t[0];
            if(typeof key === "string" && value !== undefined) {
                $MT.set(t.p,key,value,override === true ? undefined : false)
            }else if(typeof key === "string" && value === undefined){
                return $MT.get(t.p,key)
            }else if(typeof key === "object"){
                if(override) $.extend(true,t.p,key)
                else {
                    for(var i in key){
                    	$MT.set(t.p,key,value,override === true ? undefined : false)
                    }
                };
            }
            return $t;
        },
        /**
         * 删除表格 对象属性
         * removeParam(key);删除名为key的属性
         * removeParam(key1,key2,key3,key4...);删除key1,key2,key3,key4
         * removeParam([key1,key2,key3,key4]);删除key1,key2,key3,key4
         */
        removeParam: function(){
        	var array = Array.prototype.slice.call(arguments);
        	return this.each(function(){
	            var $t = this;
	            if(typeof array[0] === "object"){
	                $.each(array[0],function(i,v){
	                    delete $t.p[v];
	                });
	            }else
	                $.each(array,function(i,v){
	                    delete $t.p[v];
	                })
            });
        },
        /**
         * 设置或获取表格底部的统计数据,前提是表格必须设置footerrow=true;设置统计数据时,默认情况下value将套用 列定义的格式化属性
         * footer("列名","value"),添加或覆盖 "列名" 对应的统计值
         * footer({"列名1":"value1","列名2":"value2"}),添加或覆盖 "列名1","列名2" 对应的统计值
         * footer(false,"列名","value"); 添加或覆盖 "列名" 对应的统计值,value不套用该列的格式化属性
         * footer(false,{"列名1":"value1","列名2":"value2"}); 添加或覆盖 "列名1","列名2" 对应的统计值,value不套用该列的格式化属性
         * footer("列名");获取 "列名" 下的统计值
         * footer();获取 所有统计值
         */
        footer : function(){
        	if(this.length == 0) return;
            var format,key,value,args = Array.prototype.slice.call(arguments);
            if(typeof args[0] !== "boolean") args.unshift(true);
            format = args[0];
            key = args[1];
            value = args[2];
            var t = this;
            if(typeof key === "string" && value !== undefined) {
                t.jqGrid("footerData","set",{key:value},format);
            }else if(typeof key === "string" && value === undefined){
                return t.jqGrid("footerData","get",key);
            }else if(key === undefined && value === undefined){
                return t.jqGrid("footerData","get");
            }else if(typeof key === "object"){
                t.jqGrid("footerData","set",key,format);
            }
            return t;
        },
        /**
         * 常规数据操作,如果行内编辑为true,那么add、update为行内编辑模式,否则为弹窗；add、update、view、delete、history都会先调用tableNaviate的check方法
         * 参数1:add,update,view,delete,history,search(弹出查询框),choose(弹出列选择框),xls(导出当前表),back(还原记录),showback(显示还原后的记录),table(还原为原始html表格) 不区分大小写
         * 参数2:可选,要操作的id或id集合,不传则默认为操作当前选中的行
         * 参数3:可选，跳过check方法
         * 例如:
         * $().jqGrid("form","add",true);//跳过验证方法
         * $().jqGrid("form","add",null,true);//跳过验证方法
         * $().jqGrid("form","add");
         * $().jqGrid("form","update",true); //跳过验证方法
         */
        form : function(handle,id,uncheck){
        	if(this.length == 0) return this;
            var that = this,t = that[0],editModel = t.p._editModel_,url_;
            handle = handle.toLowerCase();
            if(typeof id === "boolean"){
            	uncheck = id;
            	id = null;
            }
            switch(handle){
                case "add":
                if(uncheck !== true && that.jqGrid("check",null,"add") === false) return that;
                if(editModel){
                    that.jqGrid("row","add");
                }else{
                    url_ =  t.p.showAdd || window["showAdd"];
                    if(!url_){
                        info("没有定义增加地址showAdd！");
                        return that;
                    }
                    if(t.p.addWin)
                        addWin({
                            url : url_,
                            saveAndAdd : t.p.saveAndAdd,
                            fn : function(oldid) {
								tip({
					                text : "保存成功",
					                lock : false,
					                delay : 2000,
					                close:false,
					                sticker:false,
					                type : "success"
					            });
					            if(oldid){
					            	t.p.selrow = oldid.split("|")[0];
					            	t.p.selarrrow = null;
					            }
                                that.jqGrid("load");
                            },
                            maxBtn : t.p.canMaxSize ? "yes" : "no",
                            title : (t.p.pageTitleAppend === true  ? "增加" : "") + (t.p.pageTitle || window["pageTitle"] || "").format(),
                            width : t.p.formWidth || window["formWidth"] || ($("body").width()-200),
                            height : t.p.formHeight|| window["formHeight"] || ($("body").height()-100)
                        })[(t.p.formWidth + t.p.formHeight) === 0 ? "max" : "getIndex"]();
                    else{
                        var loadMethodName = "load"+ t.p.tableId + $MT.guid(),p = window;
                        while(p.parent && p.parent.sihe === undefined && p.parent.location !== p.location){
                        	p = p.parent;
                        }
                        p[loadMethodName] || (p[loadMethodName] = function(){
							tip({
				                text : "保存成功",
				                lock : false,
				                delay : 2000,
				                close:false,
				                sticker:false,
				                type : "success"
				            });
                           	that.jqGrid("load");
                        });

                        ui("open",{
                           url :  "{0}{1}{2}".format(url_,url_.indexOf("?") > -1 ? "&" : "?",$.param({
	                        	oxhideTableId : t.p.tableId,
	                        	oxhideTabid : ui("tab").id
                           })),
                           title: (t.p.pageTitleAppend === true  ? "增加" : "") + (t.p.pageTitle || window["pageTitle"] || "").format(),
                           onClose : loadMethodName,
                           onCloseParam : "addWinByTabCallBack_"
                        },false,t.p.addMulti);
                    }
                }
                break;
                case "update":
                    id || (id = that.jqGrid("id",true,true,"请选择要修改的记录！"));
                    if(!id) return that;
                    if(uncheck !== true && that.jqGrid("check",id,"update") === false) return that;
                    if(editModel)
                        that.jqGrid("row","edit",id);
                    else{
                    	
                        url_ = t.p.showUpdate || window["showUpdate"];
                        if(!url_){
                         	info("没有定义修改地址showUpdate！");
                            return that;
                        }
                    	
                    	
	                    var ids = that.jqGrid("id",false),upFn = function(){
	                        var selectRow = that.jqGrid("data",id,false);
	                        if(t.p.editWin)
	                            updateWin({
	                                url : url_ + "&id=" + id,
	                                fn : function() {
										tip({
							                text : "保存成功",
							                lock : false,
							                delay : 2000,
							                close:false,
							                sticker:false,
							                type : "success"
							            });
			                           	that.jqGrid("load");
	                                },
	                                maxBtn : t.p.canMaxSize ? "yes" : "no",
	                                title : (t.p.pageTitleAppend === true  ? "修改" : "") + (t.p.pageTitle || window["pageTitle"] || "").format(selectRow),
		                            width : t.p.formWidth || window["formWidth"] || ($("body").width()-200),
		                            height : t.p.formHeight|| window["formHeight"] || ($("body").height()-100),
	                                target : t.p.editBatch === true ? that : false,
	                                baseUrl: url_,
	                                baseId : id,
	                                showSave : t.p.showSave
	                            })[(t.p.formWidth + t.p.formHeight) === 0 ? "max" : "getIndex"]();
	                        else{
		                        var loadMethodName = "load"+ t.p.tableId + $MT.guid(),p = window,selectRow = that.jqGrid("data",id,false);
		                        while(p.parent && p.parent.sihe === undefined && p.parent.location !== p.location){
		                        	p = p.parent;
		                        }
		                        p[loadMethodName] || (p[loadMethodName] = function(){
									tip({
						                text : "保存成功",
						                lock : false,
						                delay : 2000,
						                close:false,
						                sticker:false,
							            type : "success"
						            });
		                           	that.jqGrid("load");
		                        });
		                        p.oxhideGetTable = function(){
		                        	return that;
		                        }
	
	                            ui("open",{
	                                 url :"{0}{1}{2}".format(url_,url_.indexOf("?") > -1 ? "&" : "?",$.param({
		                        		id : id,
		                        		oxhideTabid : ui("tab").id
	                            	 })),
	                                 title: (t.p.pageTitleAppend === true  ? "修改" : "") + (t.p.pageTitle || window["pageTitle"] || "").format(selectRow),
	                                 onClose : loadMethodName
	                            })
	                        }
	                    };
	                    if(ids.length > 1){
	                    	ask("您勾选了{0}条记录,但同时只能修改一条记录,系统将为您打开选择的第一条记录,确定继续吗?".format(true,ids.length),function(ddd){
	                    		if(ddd === "yes"){
	                    			id = ids[0];
	                    			upFn();
	                    		}
	                    	});
	                    }else{
	                    	upFn();
	                    }
                    }
                break;
                case "view":
                    id || (id = that.jqGrid("id",true,true,"请选择要查看的记录！"));
                    if(!id) return that;
                    if(uncheck !== true && that.jqGrid("check",id,"view") === false) return that;
                    url_ =  t.p.showView || window["showView"];
                    if(!url_){
                        info("没有定义查看地址showView！");
                        return that;
                    }
                    var ids = that.jqGrid("id",false),viewFn = function(){
	                    var selectRow = that.jqGrid("data",id,false);
	                    if(t.p.viewWin)
	                        viewWin({
	                            url : url_ + "&id=" + id,
	                            title :(t.p.pageTitleAppend === true  ? "查看" : "") + (t.p.pageTitle|| window["pageTitle"] || "").format(selectRow),
	                            maxBtn : t.p.canMaxSize ? "yes" : "no",
	                            width : t.p.viewWidth || window["viewWidth"] || ($("body").width()-200),
	                            height : t.p.viewHeight|| window["viewHeight"] || ($("body").height()-100),
	                            target : t.p.viewBatch === true ? that : false,
	                            baseUrl: url_,
	                            baseId : id
	                        })[(t.p.viewWidth + t.p.viewHeight) === 0 ? "max" : "getIndex"]();
	                    else{
	                    	var p = window;
	                        while(p.parent && p.parent.sihe === undefined && p.parent.location !== p.location){
	                        	p = p.parent;
	                        }
	                        p.oxhideGetTable = function(){
	                        	return that;
	                        }
	
	                        ui("open",{
	                            url : "{0}{1}{2}".format(url_,url_.indexOf("?") > -1 ? "&" : "?",$.param({
		                        		id : id,
		                        		oxhideTabid : ui("tab").id
	                            })),
	                            title: (t.p.pageTitleAppend === true  ? "查看" : "") + (t.p.pageTitle || window["pageTitle"] || "").format(selectRow)
	                        })
	                    }
                    };
                    if(ids.length > 1){
                    	ask("您勾选了{0}条记录,但同时只能查看一条记录,系统将为您打开选择的第一条记录,确定继续吗?".format(true,ids.length),function(ddd){
                    		if(ddd === "yes"){
                    			id = ids[0];
                    			viewFn();
                    		}
                    	});
                    }else{
	                    viewFn();
	                }
                break;
                case "delete":
                    id || (id = that.jqGrid("id",false,true,"请勾选要删除的记录！"));
                    if(typeof id === "string") id = [id];
                    if(!id.length) return that;
                    if(uncheck !== true && that.jqGrid("check",id,"delete") === false) return that;
                    var addRows = t.p.addRows || [];
                    if(editModel){
                    	url_ =  t.p.showBatchDelete || window["showBatchDelete"];
                    	if(url_){
                    		t.p.service &&  (url_ = url_ + "&service=" + t.p.service);
	                        ask({
	                            message : $.jgrid.format(t.p.deleteMessage || window["deleteMessage"] || "您确定要"+(t.p.deleteLogic && t.p.isShowLogicDeleteed ? "彻底" : "")+"删除选中的  <font style='color:red;font-weight:bold;font-size:13px;'>{0}</font>  条记录吗？",id.length),
	                            fn : function(data) {
	                                if (data == 'yes') {
	                                	var deleteRowsServer = [],deleteRowsLocal = [];
	                                    id.each(function(i,v){
	                                    	(addRows.indexOf(v) > -1 ? deleteRowsLocal : deleteRowsServer)["push"](v);
	                                    });
	                                    that.jqGrid("row","delete",deleteRowsLocal);
	                                    if(deleteRowsServer.length){
											tip({
								                text : "删除中...",
								                lock : true,
								                delay : -1,
								                close:false,
								                sticker:false
											});
	                                    	$MT.ajax(url_,{
	                                    		itemlist:deleteRowsServer,
	                                    		abstracted : t.p.deleteLogic && !t.p.isShowLogicDeleteed,  //抽象删除且显示的是删除之前的记录,进行虚拟删除
	                                    		deleteLogicColumnName : t.p.deleteLogicColumnName,
	                                    		deleteLogicTableName : t.p.deleteLogicTableName,
	                                    		delete_idName : t.p.rowidName
	                                    	},function(d){
												tip("close");
												tip({
									                text : "删除成功",
									                lock : false,
									                delay : 2000,
									                close:false,
									                sticker:false,
													type : "success"
												});
												that.jqGrid("row","delete",deleteRowsServer);
	                                    		return true;
	                                    	},function(e){
	                                    		return true;
	                                    	});
	                                    }
	                                 }
	                            }
	                        });
                    	}else{
                        	var deleteRowsServer = [],deleteRowsLocal = [];
                            id.each(function(i,v){
                            	(addRows.indexOf(v) > -1 ? deleteRowsLocal : deleteRowsServer)["push"](v);
                            });
                            if(t.p.deleteDisabled){
                            	that.jqGrid("row","save",id);
                            	that.jqGrid("row","disabled",id);
                            	var deleteRows = t.p.deleteRows || [];
                            	t.p.deleteRows = deleteRows.concat(deleteRowsServer);
                            }else {
								ask({
									message : $.jgrid.format(t.p.deleteMessage || window["deleteMessage"] || "您确定要删除选中的  <font style='color:red;font-weight:bold;font-size:13px;'>{0}</font>  条记录吗？",id.length),
								    fn : function(data) {
								        if (data == 'yes'){
											that.jqGrid("row","delete",id);
			                            	var deleteRows = t.p.deleteRows || [];
			                            	t.p.deleteRows = deleteRows.concat(deleteRowsServer);
								        }
								    }
								});
                            }
                    	}
                    }else{
						url_ =  t.p.showBatchDelete || window["showBatchDelete"] ||  t.p.service &&  (window["basePath"] + "/baseDeleteAction.do?action=batchDelete&service=" + t.p.service);
						if(!url_){
						    info("没有定义删除地址showBatchDelete,而且没有定义service!");
						    return that;
						}
						ask({
							message : $.jgrid.format(t.p.deleteMessage || window["deleteMessage"] || "您确定要"+(t.p.deleteLogic && t.p.isShowLogicDeleteed ? "彻底" : "")+"删除选中的  <font style='color:red;font-weight:bold;font-size:13px;'>{0}</font>  条记录吗？",id.length),
						    fn : function(data) {
						        if (data == 'yes') that.jqGrid("go",url_,false,{
						        	itemlist:id,
	                        		abstracted : t.p.deleteLogic && !t.p.isShowLogicDeleteed,  //抽象删除且显示的是删除之前的记录,进行虚拟删除
	                        		deleteLogicColumnName : t.p.deleteLogicColumnName,
	                        		deleteLogicTableName : t.p.deleteLogicTableName,
	                        		deleteLogicIdName : t.p.rowidName
						        });
						    }
						});
					}
                break;
                case "history":
                    id || (id = that.jqGrid("id",true,true,"请选择要查看的记录！"));
                    if(!id) return that;
                    if(uncheck !== true && that.jqGrid("check",id,"history") === false) return that;
                    var ids = that.jqGrid("id",false), selectRow = that.jqGrid("data",id,false),hiFn = function(){
	                    if(t.p.formhistoryWin)
	                        viewWin({
	                            url : basePath +"/plug-in/formrecord/formrecordlist.jsp?itemid=" + id,
	                            title :(t.p.pageTitleAppend === true  ? "查看" : "") + (t.p.pageTitle || window["pageTitle"] || "").format(selectRow) + (t.p.pageTitleAppend === true  ? "历史修改记录" : ""),
	                            width : t.p.formhistoryWidth || window["formhistoryWidth"] || ($("body").width()-200),
	                            height : t.p.formhistoryHeight|| window["formhistoryHeight"] || ($("body").height()-100),
	                            baseUrl: basePath +"/plug-in/formrecord/formrecordlist.jsp",
	                            baseId : id
	                        })[(t.p.formhistoryWidth + t.p.formhistoryHeight) === 0 ? "max" : "getIndex"]();
	                    else{
	                    	var p = window;
	                        while(p.parent && p.parent.sihe === undefined && p.parent.location !== p.location){
	                        	p = p.parent;
	                        }
	                        p.oxhideGetTable = function(){
	                        	return that;
	                        }
	                        ui("open",{
	                            url : "{0}{1}{2}".format(url_,url_.indexOf("?") > -1 ? "&" : "?",$.param({
		                        		id : id,
		                        		oxhideTabid : ui("tab").id
	                            })),
	                            title:(t.p.pageTitleAppend === true  ? "查看" : "") + (t.p.pageTitle || window["pageTitle"] || "").format(selectRow) + (t.p.pageTitleAppend === true  ? "历史修改记录" : "")
	                        })
	                    }
                    };
                    if(ids.length > 1){
                    	ask("您勾选了{0}条记录,但同时只能查看一条记录,系统将为您打开选择的第一条记录,确定继续吗?".format(true,ids.length),function(ddd){
                    		if(ddd === "yes"){
                    			id = ids[0];
                    			hiFn();
                    		}
                    	});
                    }else{
	                    hiFn();
	                }
                break;
                case  "search" :
                    that.jqGrid("searchGrid",{multipleSearch:t.p.multipleSearch});
                break;
                case  "choose" :
                    that.jqGrid("columnChooser");
                break;
                case  "xls" :
                    var	 xlsOpt = t.p.xlsOpt,
                         postData = t.p.postData,
                         xlsServerData = t.p.xlsServerData,
                         xlsRowpan = t.p.xlsRowpan,
                         xlsRowspanCustom = t.p.xlsRowspanCustom,
                         form,
                         tid = that.attr("id"),
                         appendDoc = [],
                         xls_data = $.extend({},postData),
                         rowspan = t.p.rowspaningView && t.p.rowspaningView.joinEx(",","groupField"),
                         postDataType,
                         addPostData = function(object) {
                			for (var i in object){
                				if (typeof object[i] === "object") {
                					if ($.isArray(object[i])) {
                                        object[i].each(function(ii, v) {
                                            if (typeof v === "object") {
     	                                        if ($.isArray(v)) v = v.join(",");
     	                                        else v = $MT.obj2str(v);
                                            }
                                            appendDoc.push("<input type='hidden' name='{0}' value='{1}'/>".format(i, v));
                                         });
                					}else
                						appendDoc.push("<input type='hidden' name='{0}' value='{1}'/>".format(i, $MT.obj2str(object[i])));
                				}else
                					appendDoc.push("<input type='hidden' name='{0}' value='{1}'/>".format(i, object[i]));
                			}
                         },
                         action = t.p.xlsAction || t.p.baseUrl;
                    if(!action){
                    	error("没有定义导出的服务器地址!");
                    	return;
                    }
                    if(!xlsOpt || t.p.xlsOptionUpdate === true){
                        var opt = {
                            fileName :t.p.xlsTitle || t.p.caption || that.attr("id"),
                            sheetName:t.p.xlsSheetName || t.p.xlsTitle,
                            title:t.p.xlsInTitle ,
                            title2:t.p.xlsInTitle2 ,
                            summaryTextShowColumnName : t.p.xlsSummaryTextShowColumnName,
                            header : []
                        },
                        headers = t.p.headers,
                        groups = that.jqGrid("param","groupingView.groupField"),
                        groupSummary = that.jqGrid("param","groupingView.groupSummary"),
                        columns = t.p.colModel.find(true,function(i,v){
                        	if($.jgrid.unColumns.indexOf(v.name) !== -1) return false;
                        	if(groups && groups.indexOf(v.name) > -1) return true;
                        	if(v.hidden === true) return v.hidedlgExcel === false;
                        	return v.hideExcel === false;
                        }),
                        length = columns.length,

                        /**
                         * 添加
                         * t:要添加的对象
                         * care:第几层
                         */
                        addHead = function(t,care){
                            var grouped = !!(t.name && groups && groups.indexOf(t.name) > -1),
                            	summaryed = !!(t.name && groupSummary && groupSummary[groups.indexOf(t.name)]),
                            	target_ ={
                                title : (t.label || t.titleText || t.name).replace(/<[^>]*>/g,""),
                                name :t.name,
                                columnType : t.excelType || "",
                                grouped : grouped,
                                summaryed :summaryed,
                                aggregateRule : t.summaryType,
                                aggregateRuleFoot : t.footrowType,
                                group :[],
                                care : care //第几层
                            },index = columns.indexOf(t.startColumnName || t.name,"name"),hasPush = false,indexTemp = -1;
                            target_.begin = index;
                            t.numberOfColumns && (target_.end = target_.begin + t.numberOfColumns - 1);
                            while(care >= 0){
                                if(care == 0) {
                                    lastHead.each(function(i,v){
                                        if(target_.begin < v.begin ){
                                             indexTemp = i;
                                             return false;
                                        }
                                    });
                                    if(indexTemp > -1) lastHead.splice(indexTemp,0,target_);
                                    else lastHead.push(target_);
                                    break;
                                }else{
                                    care = care - 1;
                                    tempHead.find(true,care,"care").each(function(){
                                        var tt = this;
                                        if(tt.begin <= index && tt.end >= index){
                                            tt.group.each(function(i,v){
                                                if(target_.begin < v.begin){
                                                     indexTemp = i;
                                                     return false;
                                                }
                                            });
                                            if(indexTemp > -1) tt.group.splice(indexTemp,0,target_);
                                            else tt.group.push(target_);
                                            hasPush = true;
                                        }
                                    });
                                    if(hasPush) break;
                                }
                            }
                            tempHead.push(target_);
                            return target_;
                        },
                        tempHead = [],
                        lastHead = opt.header,
                        care = -1;

                        headers.each(function(i,v){
                            this.each(function(){addHead(this,i);});
                            care ++;
                        });
                        care ++;
                        columns.each(function(i,v){
                            addHead(this,care);
                        });
                        $.xls.right(opt.header,opt);
                        if(uncheck !== true){
                        	xlsOpt = $MT.obj2str(opt,[null,false,undefined],["begin","end","care","hasDisplaySummary"]);
                        	that.jqGrid("param","xlsOpt",xlsOpt);
                        	$("body").prepend("<form name=\"{0}_xls_form\" method=\"post\" action=\"{1}\" id=\"{0}_xls_form\" target=\"_blank\"></form>".format(tid,action));
                        }else{
                        	xlsOpt = opt;
                        }
                    }
                    
                    if(uncheck !== true){
                    	form = $("#" + tid + "_xls_form");
                    	addPostData(postData);
                    	appendDoc.push("<input type='hidden' name='{0}' value='{1}'/>".format("xlsOpt",xlsOpt));
            		}else{
            			xls_data.xlsOpt = xlsOpt;
            		}
                    
                    
                    if(xlsServerData === false){
                    	var tempData = that.jqGrid("getRowHtmlData",null,false,true);
                    	if(uncheck !== true){
                    		appendDoc.push("<input type='hidden' name='xlsData' value='{0}'/>".format($MT.obj2str(tempData)));
                    	}else{
                    		xls_data.xlsData = $MT.obj2str(tempData).replaceAll("\"","'");
                    	}
                    	tempData = null;
                    }
                    if(xlsRowpan === true){
                    	if(uncheck !== true){
                    		appendDoc.push("<input type='hidden' name='xlsRowpan' value='true'/>");
                    	}else{
                    		xls_data.xlsRowpan = true;
                    	}
                    }
                    if(xlsRowspanCustom === true){
                    	if(uncheck !== true){
                    		appendDoc.push("<input type='hidden' name='xlsRowspanCustom' value='true'/>");
                    	}else{
                    		xls_data.xlsRowspanCustom = true;
                    	}
                    }
                    if(rowspan){
                    	if(uncheck !== true){
                    		appendDoc.push("<input type='hidden' name='rowspan' value='{0}'/>".format(rowspan));
                    	}else{
                    		xls_data.rowspan = rowspan;
                    	}
                    }
                    if(uncheck !== true){
                    	form.empty().append(appendDoc.join(""));
                    	form.submit();
                    }else{
                    	xls_data.allin_xls = true;
                    	xls_data.sessionid = sessionId;
                    	xls_data.xlsZip = false;
                    	return $MT.obj2str({
                    		url : action,
                    		data : xls_data
                    	});
                    }
                break;
                case "table":
					var div = that.closest("div.ui-jqgrid-bdiv"),
						head = $("table",div.prev()).prop("innerHTML"), //head
						end = $("table",div.next()).prop("innerHTML"),	//可能存在的foot
						html = $(that.prop("outerHTML")
								.replace(/onclick\=\"[^\"]+\"/g,"")
								//.replace(/<input[^>]+>/g,"")
								.replace(/<a[^>]+>/g,"")
								.replace(/<\/a>/g,"")
								.replace(/<select[^>]+>/g,"")
								.replace(/<\/select>/g,"")
								.replace(/<button[^>]+>/g,"")
								.replace(/<\/button>/g,"")
								.replace(/<input[^>]+>/g,"")
								.replace(/<\/input>/g,"")
								.replace(/border: 0px/g,"")),
						rowTpl = $("tr.jqgfirstrow",html);   //第一行,行模版,最终要移除
					head && html.prepend(head.replace(/<span[^>]+>/g,"").replace(/border: 0px;/g,""));
					end && html.append(end.replace(/<span[^>]+>/g,"").replace(/border: 0px;/g,""));
					
					
					var th = $("th[role=columnheader]",html),
						boxid_ = that.attr("id") + "_cb",
						orderid_ = that.attr("id") + "_rn";
					/*显隐控制*/
					th.each(function(i,v){
						var ther = $(this),hide = ther.attr("hidePrint"),width = ther.attr("printWidth") || "auto";
						if(ther.attr("id") === orderid_){
							if(t.p.printOrder === true){
								ther.html("序号").css("width","39");
							}else{
								$("td:eq("+i+"),th:eq("+i+")",$("tr:not(.jqgroup)",html)).hide();
							}
							return;
						}else if(ther.attr("id") === boxid_){
							$("td:eq("+i+"),th:eq("+i+")",$("tr:not(.jqgroup)",html)).hide();
							return;
						}
						
						if(hide === "false"){
							if($("div",ther).length) ther.html($("div",ther).html());
							$("td:eq("+ i +"),th:eq(" + i + ")",$("tr:not(.jqgroup)",html)).show().css("width",width);
						}else if(hide === "true" || hide === "undefined"){
							$("td:eq("+ i +")",$("tr:not(.jqgroup)",html)).hide();
							ther.hide();
						}
						//index_ ++;
						
					});
					
					/*子表*/
					$(".ui-subgrid",html).remove();
					
					/*列宽优化*/
					var jqrows = $("tr.jqgrow",html);
					$("td",jqrows).css("width","");
					
					/*最小行数*/
					if(t.p.printMinRows !== -1){
						var	rowCount = jqrows.length, 
							needAdd = rowCount % t.p.printMinRows;
						if(needAdd !== 0){
							needAdd = t.p.printMinRows - needAdd;
							if(needAdd > 0){
								var rowTemp = (jqrows.length > 0 ? jqrows.eq(0) : rowTpl.find("td").css("height","26px").end()).clone(true).show(),
									rowAdd = jqrows.last();
								$("td",rowTemp).html("&nbsp;").removeAttr("title");
								for(var i  = 0; i < needAdd; i ++){
									rowAdd.after(rowTemp.clone(true));
								}
							}
						}
					}
					

					
					/*columnGroup行操作*/
					var index = -1;
					$("tr.jqgroup",html).each(function(i,v){
						v = $(v);
						var td = $("td",v),tr = v.nextUntil(".jqgroup");
						td.attr("rowspan",tr.length).removeAttr("colspan");
						tr.filter(":first").prepend(td);
						v.remove();
						index = 0;
					});
					if(index === 0){
						$("tr",$("thead",html)).prepend('<td style="border:0px"/>');
					}
					
					//不要表头0=否，1=是
					if(id == 0){	
						$("thead",html).remove();
					}
					
					
					/*统计行*/
					var footRow = $("tr.footrow",html);
					if(footRow.length > 0){
						if(t.p.printFootRowEveryPage){
						 	var bodyFoot = footRow.parent();
						 	$("tbody",html).last().after($("<tfoot/>"));
						 	$("tfoot",html).append(footRow);
						 	bodyFoot.remove();
						}
						var footrowPrintText,footrowPrintFormat,cmFootrowType,footrowPrintColumnName,tds = $("td",rowTpl);
						$("td",footRow).each(function(i,v){
							v = $(v);
							footrowPrintText = v.attr("footrowPrintText");
							footrowPrintFormat = v.attr("footrowPrintFormat");
							footrowPrintType = v.attr("footrowPrintType");
							footrowPrintColumnName =  v.attr("footrowPrintColumnName");
							//jqgrid的统计有sum|count|avg|min|max,目前打印支持前三种
							switch(footrowPrintType){
								case "sum" :
									v.attr("tdata",t.p.printFootRowEveryPage === true ? "subSum" : "allSum");
								break;
								case "count" :
									v.attr("tdata",t.p.printFootRowEveryPage === true ? "subCount" : "allCount");
								break;		
								case "avg" :
									v.attr("tdata",t.p.printFootRowEveryPage === true ? "subAverage" : "allAverage");
								break;
							}
							footrowPrintFormat && v.attr("format",footrowPrintFormat);
							if(footrowPrintColumnName){
								var indexPrintSum = -1;
								tds.each(function(ii,vv){
									vv = $(vv);
									if(vv.css("display") === "none") return;
									indexPrintSum ++;
									if(vv.attr("aria-describedbyjq") === t.id + "_" + footrowPrintColumnName.replace(".","_")) return false
								});
								if(indexPrintSum > -1) v.attr("tindex",indexPrintSum + 1);
							}
							footrowPrintText && v.html(footrowPrintText);
						});
					}
					
					t.p.beforePrint && t.p.beforePrint.call(html);
					
					/*去除模版行*/
					//rowTpl.remove();
					//要附加的样式,此时说明要返回字符串格式
					if(uncheck !== undefined){	
						html.css("width",t.p.printWidth);
						return '<style type=\"text/css\">'+uncheck+'</style>' + html.prop("outerHTML");
					}
					return html;
                break;
                case "back":
                    id || (id = that.jqGrid("id",false,true,"请勾选要还原的记录！"));
                    if(typeof id === "string") id = [id];
                    if(!id.length) return that;
                    if(that.jqGrid("check",id,"back") === false) return that;
					var url_ =  t.p.showBatchDelete || window["showBatchDelete"] ||  t.p.service &&  (window["basePath"] + "/baseDeleteAction.do?action=batchDelete&service=" + t.p.service);
					if(!url_){
					    info("没有定义删除地址showBatchDelete,而且没有定义service!");
					    return that;
					}
					ask({
						message : $.jgrid.format(t.p.deleteMessage || window["deleteMessage"] || "您确定要还原选中的  <font style='color:red;font-weight:bold;font-size:13px;'>{0}</font>  条记录吗？",id.length),
					    fn : function(data) {
					        if (data == 'yes') that.jqGrid("go",url_,false,{
					        	itemlist:id,
                        		isback : t.p.deleteLogic && t.p.isShowLogicDeleteed,  //抽象删除且显示的是删除之后的记录,进行还原
                        		deleteLogicColumnName : t.p.deleteLogicColumnName,
                        		deleteLogicTableName : t.p.deleteLogicTableName,
                        		deleteLogicIdName : t.p.rowidName
					        });
					    }
					});
                break; 
                case "showback":
                	var url_ = t.p.backUrl || window.location.href,param_;
                	try{
                		url_ = parent.$("#" + window.name).attr("longdesc");
                		if(url_ === undefined){
                			url_ = parent.$("#" + window.name).attr("src");
                		}
                		param_ = parent.$("#" + window.name).data("postParams");
                	}catch(e){
                	}
                	if(url_.indexOf("%3A") > -1){
                		url_ += url_.indexOf("%3F") > -1 ? "%26delete_abstracted_oxhide_param%3Dtrue" : "%3Fdelete_abstracted_oxhide_param%3Dtrue";
                	}else{
                		url_ += url_.indexOf("?") > -1 ? "&delete_abstracted_oxhide_param=true" : "?delete_abstracted_oxhide_param=true";
                	}
                	
                	if(t.p.backWin){
	                    win({
	                        url : url_ ,
	                        title :  t.p.backTitle || "查看回收站",
	                        width :  t.p.backWidth || window["backWidth"] || ($("body").width()-200),
	                        height : t.p.backHeight|| window["backHeight"] || ($("body").height()-100),
	                        onClose: function(){
	                        	that.jqGrid("load");
	                        },
	                        btnBar : "no",
	                        param : param_,
	                        post : "yes"
	                    })[(t.p.backWidth + t.p.backHeight) === 0 ? "max" : "getIndex"]();
                	}else{
                        var loadMethodName = "load"+ t.p.tableId + $MT.guid(),p = window;
                        while(p.parent && p.parent.sihe === undefined && p.parent.location !== p.location){
                        	p = p.parent;
                        }
                        p[loadMethodName] || (p[loadMethodName] = function(){
                           	that.jqGrid("load");
                        });
                        p.oxhideGetTable = function(){
                        	return that;
                        }
                        url_ += "&" + $.param({
                    		oxhideTabid : ui("tab").id
                        });
                        ui("open",{
                             url  : url_,
                             title :t.p.backTitle || "查看回收站",
                             onClose : loadMethodName,
                             param : param_,
	                         post : true
                        })
                	}
                break;
            }
            return that;
        },
        /**
         * 验证表格是否有未保存的数据
         */
        checkUnSave : function(){
            var t = this[0],
            	addRows = t.p.addRows,
            	saveRows = t.p.saveRows,
            	deleteRows = t.p.deleteRows;
            return !!(addRows && addRows.length || saveRows && saveRows.length || deleteRows && deleteRows.length);
        },
		/**
         * 刷新表格
         * 参数1 true|false 跳转页码,true=1,false=当前,数字=页码,默认 false; "+1"表示下一页,"-1"表示上一页;注意上一页/下一页时,参数是字符串
         * 参数2 是否检查有无保存过数据,默认true
         * 参数3 跳转之后的回调
         * 例如
         * load(true); 检查是否保存数据,跳转第一页
         * load(false);不检查是否保存数据,跳转第一页
         * load(2); 检查是否保存数据,跳转第二页
         * load(2,false); 不检查是否保存数据,跳转第二页
         * load(2,true); 检查是否保存数据,跳转第二页
         * load(true,true); 检查是否保存数据,刷新当前页
         * load(false,true);不检查是否保存数据,刷新当前页
         * load("+1",true); 检查是否保存数据,跳转下一页
         * load("+1",false);不检查是否保存数据,跳转下一页
         * load("-1",true); 检查是否保存数据,跳转上一页
         * load("-1",false);不检查是否保存数据,跳转上一页
         *
         */
        load : function(page,check,fn){
        	return this.each(function(){
	            var t = this,that = $(t),
	            	pageNow = t.p.page;
	            t.p.initReq = true;
	            if(typeof page === "string") page = {page:page === "+1" ? (pageNow + 1) : (pageNow - 1)};
	            else if(page === true) page = {page:1};
	            else if(!isNaN(page)) page = {page:page};
	            else page = {current:true};
	            if(typeof check === "function") fn = check;
	            if(typeof page === "function") fn = page;
	            if(check !== false && t.p.askBeforeRefreshWhenEdit === true && that.jqGrid("checkUnSave")){
	                ask("数据没有保存,确定继续吗?",function(data){
	                	if(data === "yes"){
		                	if(fn!== undefined) that.bind("reloadGridCallBack",fn);
		                    that.trigger("reloadGrid",[page]);
	                	}
	                });
	            }else{
	            	if(fn!== undefined) that.bind("reloadGridCallBack",fn);
	            	that.trigger("reloadGrid",[page]);
	            }
        	});
        },
        /**
         *行操作
         *(参数1不区分大小写)
         * 参数1：edit,操作传的id参数或者选中的第一行
         * 		  check,验证，操作传的id参数或者选中的第一行
         * 		  getEdit 获取编辑模式下被编辑过的行的id数组
         * 		  save,操作传的id参数或者选中的第一行
         * 		  add(如果行内编辑,返回新增行id), 如果add({列名:"值"}) 则参数将作为行的数据增加; 如果add({列名:"值"},{color:"red","border":"1px solid red"}) 那么除了赋值还会有样式,如果add(null,{color:"red","border":"1px solid red"}) 那么只会有样式
         * 		  insert(与add类似,如: insert({列名:"值"},{color:"red","border":"1px solid red"},第三个重要参数); 
         * 				第三个重要参数表示插入位置,如果不传,则插入到选中的行(如果选中多个则第一行);
         * 				第二个参数可以为空如insert({列名:"值"},null,"id");
         * 
         * 		  getAdd 获取编辑模式下新增的行的id数组
         * 		  delete(删除选中的行,不提交后台),不传id时,操作当前选中的行;传false时,操作全部数据
         * 		  getDelete 获取编辑模式下已经删除的行的id数组
         * 		  select(选中某一行或者全部),不传id时,操作全部数据
         * 		  unselect(取消选中某一行或者全部),不传id时,操作全部数据
         * 		  isnew 判断某个id是否是编辑模式下新增的id
         *        scroll(滚动到指定行id)  $(xx).refresh("jqGrid","row","scroll",id); 滚动到id行,只支持一个id参数
         *        move(id,upOrDown) $(xx).refresh("jqGrid","row","move",id,true); 上移id行
         *        disabled 行变为不可用(行变灰色,不触发select/edit,getdata无法获取) 不传id时,操作当前选中的行;传false时,操作全部数据
         *        enabled 行变为可用,不传id时,操作当前选中的行;传false时,操作全部数据
         *        isDisabled 某一行是否是disabled状态(只支持一个id参数)
         *        isEnabled 某一行是否是enabled状态(只支持一个id参数)
         *        filterEnabled 从一堆id中过滤出状态不是disabled的行的id(只支持id数组参数,不传参数表示在全部id中过滤)
         *        filterDisabled 从一堆id中过滤出状态是disabled的行的id(只支持id数组参数,不传参数表示在全部id中过滤)
         *        getEle 当行是可编辑状态时,获取某一列的编辑控件,例如  $(xx).refresh("jqGrid","row","getElement",rowId,"列名")
         *        exists 返回行在当前表格中数据的下标,例如 $(xxx).refresh("jqGrid","row","exists" ,"111234") 返回111234在当前表格中数据的下标,返回 -1表示不存在
         *        getCell 返回指定列名的单元格jquery对象,多个用,分割,或者传数组,$(xxx).refresh("jqGrid","row","getCell" ,id或者row的jquery对象,"列名");$(xxx).refresh("jqGrid","row","getCell" ,id或者row的jquery对象,"列名1,列名2,列名3");$(xxx).refresh("jqGrid","row","getCell" ,id或者row的jquery对象,["列名1","列名2","列名3"])
         *        getHead 返回表格的表头行jquery对象
         *        getFoot 返回表格的统计行jquery对象 
         * 参数2: 可选,要操作的id或id数组,默认操作当前选中的行
         * 参数3、4在特定情况下才有用
         */
        row : function(handle,id,param,insertId){
            var that = this, t = that[0];
            if(that.length == 0) return that;
            handle = handle.toLowerCase();
            switch(handle){
                case "edit" :
                    id || (id = that.jqGrid("id",true));
                    if(that.jqGrid("check",id,"update") === false) {
						var oldEditId = t.p.oldEditId;
						if(id !== oldEditId){
							oldEditId && that.jqGrid("saveRow",oldEditId);
							delete t.p.oldEditId;
						}
						return false;                    
                    }
                    that.jqGrid("editRow",id);
                case "check" :
                    return $.check && $.check(id);
                break;
                case "getedit" :
                    return t.p.saveRows || [];
                break;
                case "save" :
                    id || (id = that.jqGrid("id",true));
                    if(that.jqGrid("check",id,"save") === false) return false;
                    return id && that.jqGrid("saveRow",id);
                break;
                case "add" :
                	if(t.p.addAsInsert === true){
                		return that.jqGrid("row","insert",id,param);
                	}
                	if(that.jqGrid("check",null,"add") === false) return false;
                    var row_newRowId = t.p.row_newRowId || $MT.guid;
                    row_newRowId = row_newRowId();
                    that.jqGrid("addRow",{
                        rowID : row_newRowId,
                        position : t.p.row_addFirst === false ? "last" :"first",
                        initdata : id
                    });
                    if(param !== undefined && typeof param === "object"){
	                    that.jqGrid("setRowData",row_newRowId,null,param);
                    }
                    return row_newRowId;
                break;
                case "insert" :
                	insertId || (insertId = that.jqGrid("id",true));
                	if(!insertId) return false;
                	if(that.jqGrid("check",null,"add") === false) return false;
                    var row_newRowId = t.p.row_newRowId || $MT.guid;
                    row_newRowId = row_newRowId();
                    that.jqGrid("addRow",{
                        rowID : row_newRowId,
                        position : t.p.row_addFirst === true ? "before" :"after",
                        initdata : id,
                        src : insertId
                    });
                    if(param !== undefined && typeof param === "object"){
	                    that.jqGrid("setRowData",row_newRowId,null,param);
                    }
                    return row_newRowId;
                break;
                case "getadd" :
                    return t.p.addRows || [];
                break;
                case "delete" :
                    if(id === undefined) id = that.jqGrid("id",false,true,null);
                    else if(id === false) id = that.jqGrid("id",false,false,null);
                    if(that.jqGrid("check",id,"delete") === false) return false;
                    id && id.joinEx || (id = [id]);
                    var subGrid = t.p.subGrid;
                    id.length && $.each(id,function(i,v){
                        subGrid && $("#" + v).next(".ui-subgrid").remove();
                        that.jqGrid("delRowData", v);
                    });
                    var oldEditId =  t.p.oldEditId;
                    if(oldEditId && id.indexOf(oldEditId) > -1) delete  t.p.oldEditId;
                break;
                case  "getdelete" :
                	return t.p.deleteRows || [];
                break;
                case "select" :
                    if(id && !id.joinEx) id = [id];
                    else if(!id)  id = that.jqGrid("id",false,false);
                    that.jqGrid("resetSelection");
                    id.each(function(i,v){
                        that.jqGrid("setSelection",v,true);
                        if(i + 1 == id.length) that.jqGrid("scrollRows",v);
                    });
                break;
                case "unselect" :
                    if(id && !id.joinEx) id = [id];
                    if(!id) that.jqGrid("resetSelection");
                    else id.each(function(i,v){that.jqGrid("resetSelection",v,true);});
                break;
                case "isnew":
                	if(!id) return false;
                	if(t.p.addRows) return t.p.addRows.indexOf(id) !== -1;
                	return false;
                break;
                case "scroll" :
                    id && that.jqGrid("scrollRows",id);
                break;
                case "move" :
                	id || (id = that.jqGrid("id",true));
                	if(id){
                		t.p.hasSort = true;
                		var result,row1,row2,subrow1,subrow2;
                		row1 = $("#" + id,that);
                		subrow1 = row1.next(".ui-subgrid");
                		if(param === true){
                			row2 = row1.nextAll(":not(.jqgfirstrow,.ui-subgrid):eq(0)");
                			subrow2 = row2.next(".ui-subgrid");
                			row1.length && row2.length && row2.insertBefore(row1) && (result = true);
                		}else if(param === false){
                			row2 = row1.prevAll(":not(.jqgfirstrow,.ui-subgrid):first");
                			subrow2 = row2.next(".ui-subgrid");
                			row1.length && row2.length && row1.insertBefore(row2) && (result = true);
                		}
                		if(result === true){
                			subrow1.insertAfter(row1);
                			subrow2.insertAfter(row2);
                			var td1 = row1.find(".jqgrid-rownum"),td2 = row2.find(".jqgrid-rownum");
                			if(td1.length && td2.length){
                				var html = td1.html();
                				td1.html(td2.html());
                				td2.html(html)
                			}
                		}
                	}
                break;
                case "isdisabled" :
                	id && (id = t.rows.namedItem(id));
                	return id && (id = $(id)) && id.hasClass("ui-state-disabled")
                break;
                case "isenabled" :
                	id && (id = t.rows.namedItem(id));
                	return id && (id = $(id)) && !id.hasClass("ui-state-disabled")
                break;
                case "filterdisabled" :
                	if(!id)  id = that.jqGrid("id",false,false);
                	var result = [];
                    id.each(function(i,v){
                		var row = t.rows.namedItem(v);
                		if(row) {
                			row = $(row);
                			row.hasClass("ui-state-disabled") && result.push(v);
                		}
                    });
                	return result;
                break;
                case "filterenabled" :
                	if(!id)  id = that.jqGrid("id",false,false);
                	var result = [];
                    id.each(function(i,v){
                		var row = t.rows.namedItem(v);
                		if(row) {
                			row = $(row);
                			row.hasClass("ui-state-disabled") || result.push(v);
                		}
                    });
                	return result;
                break;
                case "disabled" :
                    if(id === undefined) id = that.jqGrid("id",false,true,null);
                    else if(id === false) id = that.jqGrid("id",false,false,null);
                    id && id.joinEx || (id = [id]);
                    id.each(function(i,v){
                		var row = t.rows.namedItem(v),editable;
                		if(row) {
                			row = $(row);
                			that.jqGrid("subGrid",v,"close");
                			row.addClass("ui-state-disabled").find("#jqg_{0}_{1}".format(t.id,v)).attr("disabled","disabled");
							that.jqGrid("resetSelection",undefined,true);
							that.jqGrid("saveRow",v);
                		}
                    });
                break;
                case "enabled" :
                    if(id === undefined) id = that.jqGrid("id",false,true,null);
                    else if(id === false) id = that.jqGrid("id",false,false,null);
                    id && id.joinEx || (id = [id]);
                    id.each(function(i,v){
                		var row = t.rows.namedItem(v);
                		if(row) {
                			if(t.p.deleteRows) t.p.deleteRows.splice(t.p.deleteRows.indexOf(v),1);
                			row = $(row);
                			t.p._editModel_ === true && row.attr("editEd",true);
                			row.removeClass("ui-state-disabled").find("#jqg_{0}_{1}".format(t.id,v)).removeAttr("disabled");
                		}
                    });
                break;
                case "getele" :
                    if(id === undefined || param === undefined) return;
                    return $("#" + id + "_" + param);
                break;
                case "exists" :
                	if(id){
                		var index = t.p._index[id];;
                		if(index === undefined) return -1;
                		return index;
                	}else return -1;
                break;
                case "getcell" :
                	if(typeof id === "string"){
                		id = $("tr#"+id,that);
                	}
                	if(typeof param === "string"){
                		param = param.split(",");
                	}
                	param = param.format("td[aria-describedbyjq="+t.id+"_{0}]");
                	return $(param.join().replace(".","_"),id);
                break;
                case "gethead" :
                	return $("tr",$("table",that.closest("div.ui-jqgrid-bdiv").prev()));
                break;
                case "getfoot" :
                	return $("tr",$("table",that.closest("div.ui-jqgrid-bdiv").next()));
                break;
            }
            return that;
        },
        /**
         * 子表相关
         * 参数1：要操作的父表行id,传值false或者不传表示全部行;如果该行id的子表是不能打开的状态,将返回null
         * 参数2: 操作类型,为空表示获取子表jquery对象(一行有多个子表时,如果传了一个行id,那么返回的是json对象,key是子表id,value是子表;如果不传id或者多个id,那么返回json数组,数组中每个元素都是key=子表id,value=子表jquery对象数组)
					false表示将某一行（主键为id）的子表关闭，并不能再打开;返回当前表格对象
					true表示将某一行（主键为id）的子表还原为可打开的状态;返回当前表格对象
					"close"表示将某一行（主键为id）的子表关闭;返回当前表格对象
					"open"表示将某一行（主键为id）的子表打开;返回当前表格对象
					toggle 表示打开或者关闭 某一行（主键为id）的子表;返回当前表格对象
					show 表示当有多个子表时,选项卡切换到指定的子表上,如 subGrid("id","show","出库记录")即切换到出库记录子表上
         */
        subGrid : function(id,handel,param){
        	var that = this,t = that[0],tableId = that.attr("id");
//        	if(t.p.subGridTableids === undefined || t.p.subGridTableids.length === 0) return;
        	switch(handel){
        		case undefined:
        		case null:
	                if(id) {
	                	if($("#"+id).data("sub") === false) return;
	                	if(t.p.subGridTableids.length > 1){
							var result = {};
							for(var i = 0 ;i < t.p.subGridTableids.length; i++){
								result[t.p.subGridTableids[i]] = $("#" + that.attr("id") + "_" + id + "_" + t.p.subGridTableids[i] + "_t");
							}
							return result;
	                	}else{
	                		return $("#" + that.attr("id") + "_" + id + "_" + t.p.subGridTableids[0] + "_t");
	                	}
	                } else{
	                	id = [];
	                	that.jqGrid("id",false,false).each(function(i,v){
	                		$("#"+v).data("sub") !== false && id.push(v);
	                	});
	                	if(t.p.subGridTableids.length > 1){
							var result = {};
							for(var i = 0 ;i < t.p.subGridTableids.length; i++){
								result[t.p.subGridTableids[i]] = $(id.format("#" + that.attr("id") + "_{0}_" + t.p.subGridTableids[i] + "_t").join(","))
							}
							return result;
	                	}else{
	                		return $(id.format("#" + that.attr("id") + "_{0}_" + t.p.subGridTableids[0] + "_t").join(","));
	                	}
	                }
        		break;
        		case "open":
        			if(id) that.jqGrid("expandSubGridRow",id);        				
        			else that.jqGrid("id",false,false).each(function(i,v){
        				that.jqGrid("expandSubGridRow",v);
        			});
        		break;
        		case "close":
        			if(id) that.jqGrid("collapseSubGridRow",id);
        			else  that.jqGrid("id",false,false).each(function(i,v){
        				that.jqGrid("collapseSubGridRow",v);
        			});
        		break;
        		case "toggle":
        			if(id) that.jqGrid("toggleSubGridRow",id);
        			else that.jqGrid("id",false,false).each(function(i,v){
        					that.jqGrid("toggleSubGridRow",v);
        			});
        		break;
        		case "show":
        			if(id && param){
        				 that.jqGrid("expandSubGridRow",id);
        				 var temp = $("#{0}_{1}_tab".format(t.id,id));
        				 temp.tabs("show",temp.tabs("indexOf",param))
        			}
        		break;
        		case false:
        			if(id){
        				that.jqGrid("collapseSubGridRow",id);
        				$(".ui-icon",$("#subgrid_header_"+tableId,$("#"+id).data("sub",false)).addClass("nosub")).removeClass("ui-icon-plus").removeClass("ui-icon-minus").addClass("ui-icon-cancel");
        			}else
        				that.jqGrid("id",false,false).each(function(i,v){
        					that.jqGrid("collapseSubGridRow",v);
        					$(".ui-icon",$("#subgrid_header_"+tableId,$("#"+v).data("sub",false)).addClass("nosub")).removeClass("ui-icon-plus").removeClass("ui-icon-minus").addClass("ui-icon-cancel");
        				});
        		break;
        		case true:
        			if(id){
        				$(".ui-icon",$("#subgrid_header_"+tableId,$("#"+id).data("sub",true)).removeClass("nosub")).removeClass("ui-icon-cancel").addClass("ui-icon-plus");
        				that.jqGrid("expandSubGridRow",id);
        			}else
        				that.jqGrid("id",false,false).each(function(i,v){
        					$(".ui-icon",$("#subgrid_header_"+tableId,$("#"+v).data("sub",true)).removeClass("nosub")).removeClass("ui-icon-cancel").addClass("ui-icon-plus");
        					that.jqGrid("expandSubGridRow",v);
        				});
        		break;
        	}
        	return that;
        },
        /**
         * 获取或设置表格数据
         * 获取值时,如果该单元格是编辑状态,将返回编辑状态下控件的val
         * 设置值时，如果该单元格是编辑状态,将给编辑状态下控件赋值
         *
         * -------------
         * |一:赋值模式|
         * -------------
         * 只要参数3不是false、undefined，就表示使用该方法的赋值模式，该模式可以给某行、某单元格、多行、某列赋值或者修改某行、某单元格、多行、多个单元格的样式
         * 参数1:行id,false表示全部
         * 参数2:列名,false表示全部
         * 参数3:要赋值的内容,value(一个单元格)或者json对象(一行数据)或者数组(N行数据)或者null(不设置值,只修改css);
         * 参数4:当参数1和参数2中至少有一个不是false时,表示要修改的样式,是一个json对象,key是样式名称,value是样式值;
         * 		 当参数1和参数2都是false时,赋值的内容（参数3）必须是一个json数组,且表格和参数3中都必须有主键，
         * 		 此时参数4表示追加新的data时，原有数据是否清空？默认false
         * 参数5:只有赋值给单个单元格时有效,表示追加到此单元格中的attr,例如{colspan:3,rowspan:4};
         * 赋值模式下,返回true|false表示赋值是否成功
         *
         *
         * -------------
         * |二:取值模式|
         * -------------
         * 只要参数3是false或者undefined，就表示使用该方法的取值模式，该模式可获取某行、某单元格、多行、某列的数据
         * 参数1:行id,false表示全部,当参数1是false时,将返回数组;true表示选中的行的id
         * 参数2:列名,false表示全部;参数2是false时,返回的结果将是json对象(json对象数组);当参数2不是false时,将返回值(值数组)
         * 参数3:当需要传参数4时,参数3必须传false来标记此时是取值模式
         * 参数4:当参数1为false,参数2不是false时,表示获取某一列的数据,此时参数4可以对返回数据进行统计,可传sum/max/avg/min,将返回计算后的数据
         *
         *
         * --------------
         * |三:参数默认值|
         * --------------
         * 参数默认值是指不传参数时,参数默认的值
         * 参数1:默认false
         * 参数2:默认false
         * 参数3:默认false
         * 参数4:默认null
         * 参数5:默认null
         *
         * ---------
         * |四:举例|
         * ---------
         * 		4.1赋值模式
         * data("行id","列名","新的值",{"height":20,"background":"red"}); 给行id的列名赋值为"新的值",并设置高度20,单元格背景色红色
         * data("行id","列名","新的值"); 给行id的列名赋值为"新的值"
         * data("行id",false,{"列名1":"新值1","列名2":"新值2","列名3":"新值3"...},{"height":20,"background":"red"}); 给行id的列名们赋值,并设置高度20,行背景色红色
         * data("行id",false,{"列名1":"新值1","列名2":"新值2","列名3":"新值3"...}); 给行id的列名们赋值
         * data(false,"列名","新的值",{"height":20,"background":"red"}); 给所有行的列赋值,并修改该列所有单元格的样式
         * data(false,false,[{"列名":"值"}..]);   清空表格数据,并将[{"列名":"值"}] 赋值给表格;
         * data(false,false,[{"列名":"值"}..],false);   将[{"列名":"值"}]赋值给表格;
         *
         *
         * 		4.2取值模式
         * data();返回所有数据的json对象数组,json对象中key是属性名,value是属性值,且会验证数据合法性(编辑模式下)
         * data(false);返回所有数据的json对象数组,json对象中key是属性名,value是属性值,不会验证数据合法性
         * data(false,"dname"); 返回列dname的数据的数组;不会验证数据合法性
         * data("id123");返回id为id123的行的数据的json对象,key是属性名,value是属性值不会验证数据合法性
         * data("id123","dname");返回id为id123的行中列dname的数据,不会验证数据合法性
         * data("id123","dname",false,"min");返回id为id123的行中列dname最小值,不会验证数据合法性
         * data("id123","dname",true);返回[{id:主键,value:值}]数组,不会验证数据合法性

         */
        data : function(row,cell,data,css,attr){
        	if(this.length == 0) return;
            var t = this[0],that = this,data2;

            if(data !== false && data !== undefined){
            	if(row){
	                if(cell) return that.jqGrid("setCell",row,cell,data,css,attr);
	                else return that.jqGrid("setRowData",row,data,css);
            	}else if(!$.isArray(data)){
            		var id = that.jqGrid("id",false,false,null);
            		if(cell) id.each(function(index,v){ that.jqGrid("setCell",v,cell,data,css);});
	        		else id.each(function(index,v){that.jqGrid("setRowData",v,data,css);});
	        		return true;
            	}else if($.isArray(data)){
            		var id = t.p.rowidName;
            		t.p.addRows || (t.p.addRows = []);
            		that.jqGrid("_restoreGridCustom",{},true);
            		t.p.addDataWithEdit = true;//编辑模式下新增的数据也带上editED=true
            		if(css){
            			Array.prototype.each.call(data,function(index,v){
            				v[id] && Array.prototype.pushEx.call(t.p.addRows,v[id]);
            			});
            			return t.addJSONData(data);
            		}else{
            			Array.prototype.each.call(data,function(index,v){
            				if(v[id]){
            					Array.prototype.pushEx.call(t.p.addRows,v[id]);
            					that.jqGrid("addRowData",v[id],v,t.p.row_addFirst === false ? "last" :"first");
            				}
            			});
            		}
            		return true;
            	}
            }else
                if(row && cell){
                	 if(row !== true) return that.jqGrid("getCell",row,cell);
                	 else{
                	 	row = that.jqGrid("id");
                	 	var result = [];
                	 	row.each(function(i,v){
                	 		result.push(that.jqGrid("getCell",v,cell));
                	 	});
                	 	return result;
                	 }
                }else if(row && !cell) {
                	if(row !== true){
	                	var result = that.jqGrid("getRowData",row);
	                	if(result) delete result._id_;
	                	return result;
                	}else{
                	 	row = that.jqGrid("id");
                	 	var result = [];
                	 	row.each(function(i,v){
                	 		var ttt = that.jqGrid("getRowData",v);
                	 		if(ttt) delete ttt._id_;
                	 		result.push(ttt);
                	 	});
                	 	return result;
                	}
                }else if(!row && !cell){
                	if(t.p._editModel_ && row !== false && row !== null){
                		var result = [],checkResult = that.jqGrid("getAndCheckRow",result);
                		if(checkResult === false) return false;
                    	return result;
                	}else{
                		return that.jqGrid("getRowData");
                	}
                }else if(!row && cell) 
                	return that.jqGrid("getCol",cell,css,attr);
        },
        /**
         * 备份表格数据到隐藏域中，当页面提交遇到异常后，返回页面时会自动还原备份的数据,隐藏域必须在表格标签中设置backup=true才能创建
         * 参数表示是备份还是还原,true=还原,false=备份,不传参数表示备份
         */
        backup : function(action){
        	if(this.length == 0) return this;
            var t = this[0],that = this;
            if(action === true){
	            var backInput = t.p.backupid && $("#" + t.p.backupid);
	        	if(backInput && backInput.length > 0 && backInput.val()){
	        		window.oxhide_back_for_jqgrid || (window.oxhide_back_for_jqgrid = {});
	    			try{
	    				var temp = new Function("return " + backInput.val())();
	    				backInput.val("");
	    				if(window.oxhide_back_for_jqgrid){
	    					window.oxhide_back_for_jqgrid = $.extend(window.oxhide_back_for_jqgrid,temp);
	    				}else{
	    					window.oxhide_back_for_jqgrid = temp;
	    				}
	    			}catch(e){
	    				window.console && window.console.error("表格" + t.id + "还原时遇到错误:" + e.message);
	    			}
	        	}
	        	temp = window.oxhide_back_for_jqgrid && window.oxhide_back_for_jqgrid[t.id];
	        	if(temp){
        		    that.jqGrid("data",false,false,temp.data,true);
            		that.jqGrid("row","disabled",temp.disabledRows);
            		temp.subRows.each(function(i,v){
            			that.jqGrid("subGrid",v,true);
            			that.jqGrid("subGrid",v,"open");
            		});
            		temp.subCloseRows.each(function(i,v){
            			that.jqGrid("subGrid",v,"close");
            			that.jqGrid("subGrid",v,false);
            		});
            		delete window.oxhide_back_for_jqgrid[t.id];
	        	}
	        	t.p.canBackUp = false;
            }else{
	            var backInput = t.p.backupid && $("#" + t.p.backupid);
	        	if(backInput.length === 0){
	        		alert("表格" + t.id + "备份时错误,找不到备份需要的隐藏域！");
	        		return that;
	        	}
	            var backData = backInput.val();
	            if(backData){
	            	backData = new Function("return " + backData)();
	            }else{
	            	backData = {};
	            }
	            var data = {data : that.jqGrid("getRowDataAll"), disabledRows : [],subRows : [],subCloseRows : []},jj = -1;
	            $.each(data.data,function(i,v){
	            	var row = $(t.rows.namedItem(v[t.p.rowidName]) || t.rows[++jj]);
	            	while(row.length === 0 || !row.hasClass('jqgrow')){
	            		row = $(t.rows.namedItem(v[t.p.rowidName]) || t.rows[++jj]);
	            	}
	            	row.hasClass("ui-state-disabled") && data.disabledRows.push(v[t.p.rowidName] || jj);
	            	if(t.p.subGridTableids && t.p.subGridTableids.length > 0){
		            	var ico = $(".ui-icon",$("#subgrid_header_" + t.id,row));
		            	if(ico.hasClass("ui-icon-plus")){
			            	var sub = that.jqGrid("subGrid",v.id),hassub = false;
			            	if(t.p.subGridTableids.length > 1){
			            		for(var i in sub){
			            			if(sub[i].length > 0){
			            				sub[i][0].p.backupid = t.p.backupid;
			            				sub[i].jqGrid("backup");
			            				hassub = true;
			            			}
			            		}
			            	}else if(sub.length > 0){
	            				sub[0].p.backupid = t.p.backupid;
	            				sub.jqGrid("backup");
	            				hassub = true;
			            	}
			            	hassub && data.subRows.push(v.id);
		            	}else{
		            		data.subCloseRows.push(v.id);
		            	}
	            	}
	            });
	            backData[t.id] = data;
	            backInput.val($MT.obj2str(backData));
            }
            return that;
        },
		/**
         * 列操作,
         * cell=列名
         * handle=true|false 显示或者隐藏列  handle="字符串",表示重新设置列的标题
         * resize=true|false 是否调整表格的宽度,默认false
         */
        cell : function(cell,handle,resize){
        	return this.each(function(){
        		if(typeof handle === "boolean") $(this).jqGrid("showHideCol",cell,handle ? "":"none",resize);
        		else if(typeof handle === "string") $(this).jqGrid("setLabel",cell,handle);
        	});
        },
        /**
         * 调用表格标签中定义的函数（TableNavigat的check属性）验证id是否有效
         * 参数1=行的id
         * 参数2=执行的动作,可选
         * 返回验证结果,true和false
         */
        check : function(id,action){
        	if(this.length == 0) return false;
            var that = this,t = that[0],method = t.p.customCheckMethod_;
            if(method) return method.call(that,id,action);
            return true;
        },
        /**
         * 编辑模式下,提交表格数据或者将表格数据追加到form中或者获取将要保存的数据，返回true和false表示操作成功还是失败,返回未定义,表示表格不存在
         * 参数1：要附加的表单名称或者jquery对象或者dom元素或者jquery选择器,可选
         * 如果不传参数1或者参数1=true,将根据表格自身设置的saveAction、saveForm来保存
         * 如果参数1=false,那么此方法将返回验证通过后的data对象,对象获取失败将返回false,data对象的属性:
         * {
         *   add : [], //将要增加的记录的json对象数组,没有主键,主键都被删掉了!因为主键是页面上js临时生成的,以_createByjqGrid结尾
         *   edit:[],  //将要修改的记录的json对象数组
         *   del:[],   //将要删除的记录的主键数组
         *   idName:"" //这些对象的主键的属性名,与表格标签的子标签row的id是一样的
         * }
         */
        save : function(form){
        	if(this.length == 0) return;
            var formElement,that = this,t = that[0],action,data,ele,saveName = t.p.saveName || "OXHIDELISTDATA";
            if(form !== undefined && typeof form !== "boolean"){
                typeof form === "string" && (formElement = $(document[form]));
                formElement.length || (formElement = $(form));
                if(!formElement.length) {
                    info("表单不存在! (" + form + " )");
                    return false;
                }
            }else if(form === undefined || form === true){
                form = t.p.saveForm;
                if(form){
                    try{
                        formElement = $(new Function("return document[\"" + form + "\"]")());
                        formElement.length || (formElement = $(new Function("return \"" + form + "\"")())) ;
                    }catch(e){
                        formElement = $(new Function("return " + form)());
                    }
                }
                if(!formElement || !formElement.length) {
                    action = t.p.saveAction;
                    if(!action){
                        info("表格没有定义saveAction,saveForm,无法保存!");
                        return false;
                    }
                }
            }

            data = that.jqGrid("getAndCheckRow");
            if(data === false) return false;
            if(form === false) return data;

            if(formElement && formElement.length){
                ele = formElement.find("input[name="+saveName+"]");
                data = $MT.obj2str(data,null,null,null,null,null,null);
                if(ele.length) ele.val(data);
                else  formElement.prepend($("<input type='hidden' name='"+saveName+"' />").val(data))
                return true;
            }else if(action){
                var param = {};
                param.service = t.p.service || "";
                param[saveName] = $MT.obj2str(data,null,null,null,null,null,null);
                that.jqGrid("go",action,true,param);
                return true;
            }else{
                return data;
            }
        },
        /**
         * 工作流插件方法
         * 用于获取工作流相关数据
         * @param id 获取哪一行的工作流数据?可以传数组,也可以不传(此时获取全部)
         * 当id只传一个时,返回的是json对象,否则返回的是json数组
         * json对象中的属性:
         * {
		      	行主键:"",
		        instance_id:"流程实例id",
		        create_time:"创建时间",
		        creator:"创建人id",
		        employeename:"创建人姓名",
		        node_state:"流程状态",
		        node_code:"当前节点编码",
		     	node_type_id:"流程是否完成,9=完成,其他=未完成"
         * }
         * @param finish 是否只获取已经完成的或者未完成的记录?不传表示获取全部,传true表示获取已完成的,传false获取未完成的
         * */
        flow : function(id,finish){
        	var that = this, t = that[0],returnArray = true;
            if(that.length == 0) return that;
            if(id === false || id === null || id === undefined) id = that.jqGrid("id",false,false,null);
            else if(id.joinEx === undefined){
            	 id = [id];
            	 returnArray = false;
            }
            var result = [],rowidName = t.p.rowidName;
            id && id.each(function(i,v){
            	var index = t.p._index[v],rowData;
            	if(index !== undefined){
            		rowData = t.p.data[index];
            		index = rowData._biz_flow_info;
            		if(index !== undefined && ((finish === true && index.node_type_id == 9) || (finish === false && index.node_type_id != 9) || finish === undefined)){
            			index[rowidName] = v;
            			index[t.p.flowCodeColumnName] = rowData[t.p.flowCodeColumnName];
            			if(t.p.flowTabTitle !== undefined) index["flow_tab_title"] = t.p.flowTabTitle.format(rowData);
            			result.push(index);
            		}else result.push(undefined);
            	}
            });
            return returnArray === true ? result : result[0];
        }
    });
})();
/* grid扩展 结束 */

//TODO 一般元素初始化、复杂元素初始化、页面必须css引入开始
(function($){
    /*引入资源开始*/
    var s = $MT.getArgs("base","s");
    window.oxhideDebug = $MT.getArgs("base","debug");
    window.oxhideHost = $MT.getArgs("base","oxhidehost");
    window.oxhideHost || (window.oxhideHost = basePath);
    window.sessionId = $MT.getArgs("base","sessionId");
    $MT.importCss(basePath +"/resource/base/theme/" + s + "/base/style.css",window,false,"baseStyle");
    $MT.importCss(basePath + "/resource/base/theme/public/style/icon.css",window,false,"icon");
    $MT.importCss(basePath + "/resource/base/theme/public/style/ui.jqgrid.css",window,false,"ui-jqgrid");
    var _doc;
    try{
        _doc = window['top'].document;  // 跨域|无权限
        _doc.getElementsByTagName; // chrome 浏览器本地安全限制
        $MT.importCss(basePath + "/resource/base/theme/" + s + "/base/style.css",parent,false,"baseStyle");
        $MT.importCss(basePath + "/resource/base/theme/public/style/icon.css",parent,false,"icon");
        $MT.importCss(basePath + "/resource/base/theme/public/style/ui.jqgrid.css",parent,false,"ui-jqgrid");
    }catch(e){
        //alert(e.message);
    };
    /*引入资源结束*/

    $(window).load(function(){
        /*普通表格初始化开始*/
        $(".tableStyle").each(function(){
            var that = $(this),formMode = that.attr("formMode") === "true",footerCenter = that.attr("footerCenter") === "true";
            var trs = that.children().children();
            that.attr("rules","all");
            if(formMode){
                $("td td",that).css("border","0px");
                for(var i = 0,j = trs.length;i<j;i++){
                    var tr = $(trs[i]),tds = tr.children("td");
                    tr.css({height:"25px"});
                    if(footerCenter && i === j - 1){
                        for(var m = 0,n = tds.length;m<n;m++) {
                        	var ttt = $(tds[m]);
                        	ttt.css({"text-align":"center"});
                        }
                    }else if(tds.length > 1){
                        for(var m = 0,n=tds.length;m<n;m++){
                        	var ttt = $(tds[m]);
	                        if(m % 2 == 0) ttt.css({"text-align":"right"})
	                        else ttt.css({"text-align":"left"})
                        }
                    }
                }
            }
        });
        /*普通表格初始化结束*/

        /*盒子模型的显示隐藏图标点击事件初始化开始*/
        $(".box-showClose").toggle(
            function(){
                var self = $(this),elems = self.parent().parent().next(),eventHead = elems.parent().attr("onHeadClick");
                elems.slideUp("fast", function() {
                    self.find("span").removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");
                    eventHead && (new Function(eventHead)).apply(self.parent());
                });
            },
            function (){
                var self = $(this),elems = self.parent().parent().next(),eventHead = elems.parent().attr("onHeadClick");
                elems.slideDown("fast", function() {
                    self.find("span").addClass("ui-icon-circle-triangle-n").removeClass("ui-icon-circle-triangle-s");
                    eventHead && (new Function(eventHead)).apply(self.parent());
                });
            }
        );
        /*盒子模型的显示隐藏图标点击事件初始化结束*/


        /*普通元素初始化开始*/
        $("button:not([class]),input:not([class]),textarea:not([class]),body:not([class])").refresh();
        /*普通元素初始化结束*/

        /*解决有时出现的文本框无法输入的问题*/
        var fixUnInput = $('<input type="text" style="display:none"/>');
        $("body").append(fixUnInput);
        fixUnInput.trigger("focus");
        /*解决有时出现的文本框无法输入的问题*/
    });

})(jQuery);
/*一般元素初始化、复杂元素初始化、页面必须css引入结束*/

//TODO jquery ui 扩展开始
(function($){
	
    /*自动完成扩展开始*/
    $.widget("ui.autocomplete", $.ui.autocomplete, {
        _renderMenu: function(ul, items) {
            var that = this,currentCategory = "";
            $.each(items,function(index, item) {
                if(that.options.maxCount > 0 && ul.children("[class!=ui-autocomplete-category]").length == that.options.maxCount) return;

                if (item.category &&  item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                that._renderItemData(ul, item);
            });

            if(that.options.scrollCount > 0){
                if(ul.children("[class!=ui-autocomplete-category]").length > that.options.scrollCount){
                    ul.css({overflow:"auto",height:30 * that.options.scrollCount});
                }else{
                    ul.css({overflow:"hidden",height:"auto"});
                }
            }
        },
        search: function( value, event ,fromButton) {
            value = value != null ? value : this._value();
            this.term = this._value();
            if ( value.length < this.options.minLength  && !fromButton) {
                return this.close( event );
            }
            if ( this._trigger( "search", event ) === false ) {
                return;
            }
            return this._search( value );
        }
    });
    /*自动完成扩展结束*/

    /*jquery ui 辅助工具方法开始 */
    window.jqueryUiTool = {
    	/*menu扩展,修正过高问题开始*/
		_width_right : function(width,allwidth){
			var that = this;
			$(".ui-menu-item",that.next().css({
			    content: ".",
			    clear: "both",
			    "line-height": 0,
			    width:allwidth
			})).css({
			    display: "inline-block",
			    "float": "left",
			    margin: 0,
			    padding: 0,
			    width: (width - 3) + "%"
			});
		},
        /**
         *  将json对象数组转换为可以追加到下拉框中的html字符串
         *  selectObj = json数组
         *  value = option的值对应的json对象的属性名
         *  label = option的显示的内容对应的json对象的属性名
         *  group = option的分组对应的json对象的属性名,不传或者false或者null 时不分组
         *  emptyOption = 创建一个值为空的option,参数的值就是作为空的option显示的内容,不传或者false或者null表示不创建
         *  onlyOne = 是否过滤重复值 ,默认不过滤
         */
        selectCreate : function(selectObj,value,label,group,emptyOption,onlyOne){
            if(!selectObj) return;
            if(label === undefined) label = value;
            if(group === "false" || group === false || group === undefined || group === null) group = "";
            if(emptyOption === "false" || emptyOption === false || emptyOption === undefined || emptyOption === null) emptyOption = "";
            var groups = {},pros = [value,label,group],result = [],filter = {};
            for(var i = 0, j = selectObj.length;i < j;i++){
                var obj = selectObj[i] ;
                if(onlyOne === true && filter[obj[value]] === true) continue;
                obj[group] || (obj[group] = "");
                groups[obj[group]] || (groups[obj[group]] = []);
                var str = [],names = [];
                for(var m in obj){
                    if(m && typeof obj[m] !== "object" ){
                        str.push(m + '="' + obj[m] + '"');
                        names.push(m);
                    }
                }
                str.push('_oxhide_attr_names_="'+names.join(",")+'"');
                groups[obj[group]].push('<option value="{0}" {1}>{2}</option>'.format(obj[value],str.join(" "),obj[label]));
                if(onlyOne === true) filter[obj[value]] = true;
            }
            for(var i in groups){
                if(i) result.push('<optgroup label="{0}" >{1}</optgroup>'.format(i,groups[i].join("")));
                else result.push(groups[i].join(""));
            }
            if(emptyOption !== "") {
            	result.unshift('<option value="">'+emptyOption+'</option>');
            }
            return result.join("");
        }
    };
    /*jquery ui 辅助工具方法结束 */

    /*jquery ui tab扩展开始*/
    $.widget("ui.tabs", $.ui.tabs ,{
        /**
         *增加选项卡(参数是json对象)
         * {
         * title 标题*
         * id id,可选,不传则随机生成一个
         * element 内容 jquery对象，字符串，dom对象,与url选择一个
         * url   一个url地址,会创建一个frame,与element选择一个
         * active 是否打开,默认true
         * canDelete 是否可以关闭,默认true
         * viewMax 是否可以放大,默认按照tab的属性,仅支持url
         * viewHeight 放大的对话框高度,默认按照tab的属性,-1表示最大
         * viewWidth 放大的对话框宽度,默认按照tab的属性,-1表示最大
         * viewMaxDialog 最大化打开方式是否是对话框模式,默认按照tab的属性,否则是选项卡方式
         * refresh 是否显示刷新按钮,仅支持src模式,默认按照tab的属性
         * post 将重写tab的同名属性;如果你的url中参数较长,则可能出现参数传递失败的现象,此时需要post方式传递,但是此时在打开的页面中,无法用window.location.href = window.location.href的方式进行刷新页面了.只能使用 : $.forward(window,"${param.postUrl}")的方式刷新
         * }
         * 返回被创建好的下标
         */
        add : function(param){
        	var that = this;
        	param = $.extend({
        		title : null,
        		id : $MT.guid(),
        		element : null,
        		url : null,
        		active : true,
        		canDelete : true,
        		viewMax : that.element.data("viewMax"),
        		viewHeight : that.element.data("viewHeight"),
        		viewWidth : that.element.data("viewWidth"),
        		refresh : that.element.data("refresh"),
        		viewMaxDialog : that.element.data("viewMaxDialog"),
        		post : that.element.data("post")
        	},param);
        	if(param.title === null) return -1;
        	if(param.url === null && param.element === null) return -1;

            var index = that.indexOf(param.title);
            if(index > -1) {
                that.show(index);
                return index;
            }
            var tabOnTop = that.element.data("tabOnTop");
            that.element.find("ul").append($([
                '<li id="',
            	param.id,
                '"><a href="#',
                param.id,
                '_element">',
                param.title,
                '</a>',
                param.viewMax ? ('<span class="ui-icon ui-icon-arrow-4-diag"  viewHeight="'+param.viewHeight+'" viewWidth="'+param.viewWidth+'" style="float: left; margin: 0.4em 0.2em 0 0; cursor: pointer;" title="放大">放大</span>') : '',
                param.url && param.refresh ? '<span class="ui-icon ui-icon-refresh" role="presentation" style="float: left; margin: 0.4em 0.2em 0 0; cursor: pointer;" title="刷新">刷新</span>' : '',
                param.canDelete ? '<span class="ui-icon ui-icon-close" role="presentation" style="float: left; margin: 0.4em 0.2em 0 0; cursor: pointer;" title="删除">删除</span>' : '',
                '</li>'
            ].join("")));
            var div = $([
                '<div role="myElementsForJqueryTab" style="padding: 0px;margin: 0px;width:100%;height:90%;overflow-y:auto;overflow-x:hidden" id="',
                param.id,
                '_element"></div>'
            ].join(""));
            that.element.append(div);
            if(param.element !== null) div.append(param.element);
            else{
            	if(param.post === true){
	            	div.append([
	            		'<iframe name="',
	            		 param.id,
	            		'_tab_iframe" src="about:blank" longdesc="',
	            		param.url,
	            		'"id="',
	            		param.id,
	            		'_tab_iframe" post="',
	            		param.post,
	            		'" style="padding: 0px;margin: 0px;width:100%;height:95%"></iframe>'
	            	]);
	            	$("#" + param.id + "_tab_iframe",div).forward(param.url);
            	}else{
	            	div.append([
	            		'<iframe name="',
	            		 param.id,
	            		'_tab_iframe" src="',
	            		param.url,
	            		'"id="',
	            		param.id,
	            		'_tab_iframe" post="',
	            		param.post,
	            		'" style="padding: 0px;margin: 0px;width:100%;height:95%"></iframe>'
	            	]);
            	}
            }
            that.refresh();
            if(tabOnTop === false){
                that.element.find(".ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *") .removeClass( "ui-corner-all ui-corner-top" ).addClass( "ui-corner-bottom" );
                that.element.find(".ui-tabs-nav").appendTo( that.element);
            }
            param.active === false || that._activate(that.tabs.length - 1);
            return that.tabs.length - 1;
        },
        /**
         * 判断是否存在名字为title的标签,返回下标
         * title 标题
         */
        indexOf : function(title){
            var that = this,
                li = that.tablist.children(":has(a[href])"),
                title = title.trim();
            for(var i = 0 ,j = li.length;i < j;i++){
                if($(li[i]).find("a").html().trim() === title) return i;
            }
            return -1;
        },
        /**
         * 删除第几个tab
         * index 下标，不传则全部移除
         * 返回tab总jquery对象
         */
        remove : function(index){
            var that = this;
            if(index !== undefined){
	            var tab = that.tabs.eq(index) ,id = tab.attr("id");
	            tab.remove();
	            $("#"+id+"_element",that.element).remove();
            }else{
            	that.tabs.each(function(){
            		$("#"+this.id+"_element",that.element).remove();
            	});
            	that.tabs.remove();
            }
            that.refresh();
            return that;
        },
        /**
         * 更新第几个tab
         * index 更新下标
         * title 标题
         * element 内容 jquery对象，字符串，dom对象
         */
        update : function(index,title,element){
            var that = this;
            that.tabs.eq(index).find("a").html(title);
            that.panels.eq(index).empty().append(element);
            that.refresh();
            return that.element;
        },
        /**
         *获取指定下标的title,index=-1的话获取全部标题li的数组 ,li里find("a").html()可获取到标题内容
         */
        getTitle : function(index){
            var that = this;
            if(index > -1) return that.tabs.eq(index);
            else return that.tabs;
        },
        /**
         *	获取指定下标的内容div frame  jq对象
         *	index=-1的话获取全部div jq对象的数组
         *	index不传获取当前活动选项卡
         */
        getContent : function(index){
            var that = this;
            if(index === undefined) index = that.element.tabs("getAcive");
            return index > -1 ? that.panels.eq(index) : that.panels;
        },
        /**
         * 获取当前显示的下标或者显示哪个选项卡
         * 参数1 指定要显示的下标，不指定则返回当前显示的选项卡的下标
         */
        show : function(index){
            if(index !== undefined) this._activate(index);
            else index = this.tabs.index(this.tabs.filter(".ui-state-active"));
            return index;
        },
        /**
         * 放大显示某个选项卡
         * */
        max : function(index){
        	var that = this;
            if(index !== undefined){
	            var tab = that.tabs.eq(index) ,
	            	id = tab.attr("id"),
	            	ele = $("#"+tab.attr("mytab"),that.element),
	            	a = tab.find("a") ,
	            	span = tab.find("span.ui-icon-arrow-4-diag"),
	            	viewWidth = +span.attr("viewWidth"),
	            	viewHeight = +span.attr("viewHeight"),
	            	viewMaxDialog = span.attr("viewMaxDialog");
	            if(ele.prop("nodeName") !== "DIV"){
	            	if(viewMaxDialog == "true"){
						var ttt = win({
							title : a.html(),
							id : id + "_dialog_max",
							width : viewWidth == -1 ? 5 : viewWidth,
							height: viewHeight == -1 ? 5 : viewHeight,
							btnBar : "no",
							url : ele.attr("longdesc"),
							cover : "yes",
							post : ele.attr("post") == "true" ? "yes" : "no"
						});
						viewWidth == -1 && viewHeight == -1 && ttt.max();
	            	}else{
	            		ui("open",{
	            			title : a.html(),
	            			url : ele.attr("longdesc"),
	            			canRefresh : true,
	            			post : ele.attr("post") == "true",
	            			param : ele.data("postParams"),
	            			post : true
	            		});
	            	}
	            }else{
	            	var table = $("table.siheTable",ele),visible = ele.filter(":visible"),tableDiv,tableHeight,eleWidth;
	            	if(visible.length === 0) ele.show();
	            	eleWidth = ele.css("width");
	            	ele.css("width",(viewWidth == -1 ? $("body").width() : viewWidth) - 50);
	            	if(table.length > 0 ){
	            		tableDiv = table.closest("div.ui-jqgrid-bdiv");
	            		tableHeight = tableDiv.css("height");
	            		tableDiv.css("height",viewHeight === -1 ? (ui("height") - 120) : viewHeight)
	            	}
	            	var closeFn = function(){
	            		if(visible.length === 0) ele.hide().css("width",eleWidth);
	            		tableDiv && tableDiv.css("height",tableHeight);
	            	},ttt = win({
						title : a.html(),
						id : id + "_dialog_max",
						width : viewWidth == -1 ? 5 : viewWidth,
						height: viewHeight == -1 ? 5 : viewHeight,
						btnBar : "no",
						html : ele,
						cover : "yes",
						onClose : closeFn,
						self : "yes",
						post : ele.attr("post") == "true" ? "yes" : "no"
					});
					viewWidth == -1 && viewHeight == -1 && ttt.max();
	            }
            }
        },
        /*刷新某个下标*/
        refresh_self : function(index){
        	var that = this;
            if(index !== undefined){
	            var tab = that.tabs.eq(index) ,
	            	id = tab.attr("id"),
	            	ele = $("#"+id+"_element",that.element);
	            if(ele.prop("nodeName") !== "DIV"){
	            	var src = ele.attr("longdesc");
	            	if(ele.attr("post") == "true"){
	            		ele.forward(src);
	            	}else{
	            		ele.attr("src",src);
	            	}
	            }
            }
        },
        /*获取活动页下标*/
        getAcive : function(){
            var that = this,
                li = that.tablist.children(":has(a[href])"),
                active = that.tablist.children(":has(a[href]).ui-tabs-active");
            return li.index(active);
        }
    });
    /*jquery ui tab扩展结束*/
})(jQuery);
/*jquery ui 扩展结束*/

/*TODO 桌面UI扩展开始,使用条件：与oxhide不跨域！
   ui("app");返回所有可访问的系统列表
   ui("resource");返回所有课访问的资源列表

   //获取选项卡对象,选项卡有属性:id(可作为其他方法的tabid传递)
   ui("tab",{
      title:选项卡标题,必须是已经打开的选项卡
      tabid:选项卡id,必须是已经打开的选项卡(也就是window.name)
      resid:菜单id,必须是存在的菜单
      appcode:与rescode结合使用,必须是存在的菜单
      appid: 与rescode结合使用,必须是存在的菜单
      rescode:与 appid|appcode结合使用,必须是存在的菜单
      index:资源在整个数组中的下标

   });

   //打开一个选项卡在UI上,打开的页面中,只有存在全局方法：uiClose ,且该方法返回true,才会执行onClose(不适用于对话框方式打开的页面)
   ui("open",{
        url :     *绝对地址
        title:    *标题
        target:   打开的目标 1=常规  2=对话框 默认1
        selfClick: 要调用这个选项卡或者已经打开的选项卡的方法
        onClose:  关闭时调用,只能传方法名,例如关闭时要刷新列表,首先在本页面加一个方法: function aa(){$(xx).jqGrid("load")};onClose="aa";
        onOpen:   打开时调用,只能传方法名,例如关闭时要刷新列表,首先在本页面加一个方法: function aa(){$(xx).jqGrid("load")};onClose="aa";
        canClose : true|false 是否可以关闭,默认true
        canRefresh:是否可以刷新
        post : 页面打开地址的url参数是否用post方式提交,默认false
   });


   //切换到已经UI中打开的选项卡上或者打开一个菜单,可以使用以下条件定位到一个选项卡:
   ui("show",{
      title:选项卡标题,必须是已经打开的选项卡
      tabid:选项卡id,必须是已经打开的选项卡(也就是window.name)
      resid:菜单id,必须是存在的菜单
      appcode:与rescode结合使用,必须是存在的菜单
      appid: 与rescode结合使用,必须是存在的菜单
      rescode:与 appid|appcode结合使用,必须是存在的菜单
      index:资源在整个数组中的下标
   });
   ui("show","选项卡标题"); 切换到选项卡标题匹配的选项卡上或者打开一个菜单

   //获取已经打开的选项卡的window对象,可以使用以下条件定位到一个选项卡
   ui("win",{
      title:选项卡标题,必须是已经打开的选项卡
      tabid:选项卡id,必须是已经打开的选项卡(也就是window.name)
      resid:菜单id,必须是存在的菜单
      appcode:与rescode结合使用,必须是存在的菜单
      appid: 与rescode结合使用,必须是存在的菜单
      rescode:与 appid|appcode结合使用,必须是存在的菜单
      index:资源在整个数组中的下标
   });
   ui("win","选项卡标题");

   //获取已经打开的选项卡的dwr sessionid,可以使用以下条件定位到一个选项卡,不传参数获得顶级页面sessionid
    * 后台可根据这个session调用此页面的js方法!!
   ui("dwr",{
      title:选项卡标题,必须是已经打开的选项卡
      tabid:选项卡id,必须是已经打开的选项卡(也就是window.name)
      resid:菜单id,必须是存在的菜单
      appcode:与rescode结合使用,必须是存在的菜单
      appid: 与rescode结合使用,必须是存在的菜单
      rescode:与 appid|appcode结合使用,必须是存在的菜单
      index:资源在整个数组中的下标
   });
   ui("dwr","选项卡标题");

   //关闭选项卡,可以使用以下条件定位到一个选项卡,不传参数关闭当前页面
   ui("close",{
      title:选项卡标题,必须是已经打开的选项卡
      tabid:选项卡id,必须是已经打开的选项卡(也就是window.name)
      resid:菜单id,必须是存在的菜单
      appcode:与rescode结合使用,必须是存在的菜单
      appid: 与rescode结合使用,必须是存在的菜单
      rescode:与 appid|appcode结合使用,必须是存在的菜单
      index:资源在整个数组中的下标
   });
   ui("close","选项卡标题");

   //刷新选项卡,可以使用以下条件定位到一个选项卡,不传参数刷新当前页面
   ui("refresh",{
      title:选项卡标题,必须是已经打开的选项卡
      tabid:选项卡id,必须是已经打开的选项卡(也就是window.name)
      resid:菜单id,必须是存在的菜单
      appcode:与rescode结合使用,必须是存在的菜单
      appid: 与rescode结合使用,必须是存在的菜单
      rescode:与 appid|appcode结合使用,必须是存在的菜单
      index:资源在整个数组中的下标
   });
   ui("refresh","选项卡标题");

   //返回appcode对应的系统对象
   ui("findApp",appcode)

   // 获取当前body高度
   ui("height");

   //设置或获取全局参数
   ui("data",name,value);

   //获取对应的资源对象,可以使用以下条件定位到一个资源
   ui("find",{
      resid:菜单id,必须是存在的菜单
      appcode:与rescode结合使用,必须是存在的菜单
      appid: 与rescode结合使用,必须是存在的菜单
      rescode:与 appid|appcode结合使用,必须是存在的菜单
      index:资源在整个数组中的下标
   });

 */
(function(w){
    $(w).load(function(){
        if(w["_skip_ui__"]) return;
        var kuayu = false;
        w.ui = function(name){
            if(kuayu) return;
            var pp = w.top,param = $.makeArray(arguments).slice(1);
            if(name === "open") param[0].father = "tab-" + document.title.toString().guid();
            try{
            	param.unshift(name);
                return pp.sihe.apply(pp,param);
            }catch(e){

            }
        };

        $("body").bind("click",function(){
            if(kuayu) return;
            try{
                w.top.sihe && w.top.$("body").trigger("click");
            }catch(e){
                kuayu = true;
            }
        });
    });
})(window);
/*桌面UI扩展结束*/

//TODO 工作流扩展开始
(function(){
	window.flow = {
		/**
		 * 打开创建流程的页面
		 * @param code :工作流流程编码
		 * @param title:打开的窗体名称
		 * @param appPath:目标系统请求地址(本系统传null)
		 * @param param:要传到工作流中的参数字符串(可选);后台获取方式为FlowContext.getFlowParameters().getBizParam()
		 */
		create : function(code,title,appPath,param){
			if(appPath){
				if(!appPath.startWith("http") && !appPath.startWith("/")){
					appPath = ui("findApp",appPath);
					if(appPath) appPath = appPath.appurl;
				}
			}
			if(param){
				ui("open", {
					url : $MT.url("/plug-in/flow/frame.jsp",appPath,{flowCode:code,bizParam:typeof param === "object" ? $MT.obj2str(param) : param}),
					title : title || "创建流程",
					post : true
				});
			}else{
				ui("open", {
					url : $MT.url("/plug-in/flow/frame.jsp",appPath,{flowCode:code}),
					title : title || "创建流程"
				});
			}
		},
		/**
		 * 打开流程处理页面,用流程实例id打开
		 * @param instanceId 流程实例id
		 * @param title 选项卡名称
		 * */
		open : function(instanceId,title){
			ui("open", {
				url : $MT.url("/plug-in/flow/frame.jsp?instanceId=" + instanceId),
				title : title
			});
		},
		/**
		 * 打开流程处理页面,用业务id打开
		 * @param instanceId 流程实例id
		 * @param code 流程编码
		 * @param title 选项卡名称
		 */
		openByBiz : function(bizId,code,title){
			ui("open", {
				url : $MT.url("/plug-in/flow/frame.jsp?bizId=" + bizId+"&flowCode=" + code),
				title : title
			});
		},
		/**
		 * 触发流程操作按钮点击(处于工作流frame中可用)
		 * @param code 按钮编码
		 * @param index 假如actionCode对应多个操作,那么需要指定当前操作的是第几个(非必须,默认0)
		 * @param data 要传递到流程中的参数
		 * */
		doAction : function(code,index,data){
			parent.doAction(code,index,data);
		},
		/**
		 * 触发流程操作按钮点击(任意地方调用,但仅限于不提交业务表单的操作)
		 * @param bizId 业务主键
		 * @param flowCode 流程编码
		 * @param actionCode 操作编码
		 * @param comment 处理意见,无需填写请传null
		 * @param fn 处理成功后的回调方法,无参数,可不传
		 * @param fnError 处理失败后的回调方法,无参数,可不传
		 * */
		doActionAjax : function(bizId,flowCode,actionCode,comment,fn,fnError){
			XqTipOpen("正在执行操作,请稍后...");
			$MT.ajax(basePath + "/ajax.do?action=flow",{
				bizId	 : bizId,
				flowCode : flowCode,
				actionCode : actionCode,
				comment : comment
			},function(data){
				XqTipClose();
				tip(data);
				fn && fn();
			},function(data){
				XqTipClose();
				if(fnError){
					fnError();
				}else{
					error(data);
				}
				return true;
			});
		},
		/**
		 * 发起某个子流程(隐式),工作流frame中调用,不建议单独使用
		 * @param intanceId 实例id
		 * @param flowCode 流程编码
		 * @param bizId 业务主键id
		 * @param actionCode 操作编码
		 * @param actionParam 操作所带参数
		 * @param actionIndex 操作按钮下标(如果编码一样的操作有多个,需要用下标来指定具体哪个操作)
		 * */
		_createFlowWithOutFrame : function(intanceId,url,actionCode,actionParam,actionIndex){
			//先判断有还是没有frame
			if(actionParam === undefined) actionParam = {};
			var frameId = "{0}_{1}_iframe".format(intanceId,actionCode),frame = $("#"+frameId);
			window._cache_Flow_biz_frames || (window._cache_Flow_biz_frames = {});
			url += "&callback=" + actionCode + "&actionIndex="+actionIndex + "&fmid=" + frameId;
			if(frame.length === 0){
				_cache_Flow_biz_frames[frameId] = false;
				//没有,需要创建
				XqTipOpen("正在执行操作,请稍后...");
				frame = $('<iframe name="{0}" id="{0}" src="{1}" style="display:none"  frameBorder="no" />'.format(
					frameId,
					url
				));
				$("body").prepend(frame);
			}else if(_cache_Flow_biz_frames[frameId] === false){
				return;
			}else{
				if(actionIndex !== undefined){
					_cache_Flow_biz_frames[frameId](actionCode,actionIndex,actionParam);
				}else{
					_cache_Flow_biz_frames[frameId](actionCode,actionParam);
				}
			}
		},
		/**
		 * 触发流程操作按钮点击(任意地方调用操作,但仅限触发子流程且不提交业务表单的操作使用)
		 * @param flowCode 流程编码
		 * @param bizId 业务主键id
		 * @param actionCode 操作编码
		 * @param actionParam 操作所带参数
		 * @param actionIndex 操作按钮下标(如果编码一样的操作有多个,需要用下标来指定具体哪个操作)
		 * @param autoSubmitCode 如果要自动发起子流程，设置为发起的按钮，前提是子流程发起不需要用户填写数据
		 * */
		doActionWithOutFrame : function(flowCode,bizId,actionCode,actionParam,actionIndex,autoSubmitCode){
			//先判断有还是没有frame
			if(actionParam === undefined) actionParam = {};
			var frameId = "{0}_{1}_iframe".format(flowCode,bizId),frame = $("#"+frameId);
			window._cache_Flow_biz_frames || (window._cache_Flow_biz_frames = {});
			if(frame.length === 0){
				_cache_Flow_biz_frames[frameId] = false;
				//没有,需要创建
				XqTipOpen("正在执行操作,请稍后...");
				frame = $('<iframe name="{0}" id="{0}" src="{1}" style="display:none;" frameBorder="no" />'.format(frameId,$MT.url("/plug-in/flow/frame.jsp?bizId=" + bizId+"&flowCode=" + flowCode)));
				frame.bind("load",function(){
					var w = this.contentWindow || this;
					if(w.doAction){
						w.withOutFrameCallBack = function(){
							XqTipClose();
							_cache_Flow_biz_frames[frameId] = w.doAction;
							if(actionIndex !== undefined){
								w.doAction(actionCode,actionIndex,actionParam,autoSubmitCode);
							}else{
								w.doAction(actionCode,actionParam,autoSubmitCode);
							}
						}
					}
				})
				$("body").prepend(frame);
			}else if(_cache_Flow_biz_frames[frameId] === false){
				return;
			}else{
				if(actionIndex !== undefined){
					_cache_Flow_biz_frames[frameId](actionCode,actionIndex,actionParam);
				}else{
					_cache_Flow_biz_frames[frameId](actionCode,actionParam);
				}
			}
		},
		/**
		 * doActionAjax为jqgrid封装的方法,不建议单独使用
		 */
		_doActionAjaxForJqgrid : function(bizId,flowCode,actionCode,actionName,actionType,tableId){
			switch(actionType){
				case flow.constants.ACTION_TYPE_GOTO : //跳转
				case flow.constants.ACTION_TYPE_SAVE : //保存
					flow.doActionWithOutFrame(flowCode,bizId,actionCode);
				break;
				case flow.constants.ACTION_TYPE_DELETE : //删除
				case flow.constants.ACTION_TYPE_UNDO :   //撤销
				case flow.constants.ACTION_TYPE_DISCARD : //废弃
					ask("确定要" + actionName + "吗?",function(d){
						if(d === "yes"){
							flow.doActionAjax(bizId,flowCode,actionCode,null,function(){
								$("#" + tableId).jqGrid("load");
							},function(){
								$("#" + tableId).jqGrid("load");
							});						
						}
					});
				break;
				case flow.constants.ACTION_TYPE_DEAL :
				case flow.constants.ACTION_TYPE_DEAL_CONCURRENT :
					prompts("请输入"+actionName+"意见：", function(value){
						flow.doActionAjax(bizId,flowCode,actionCode,value,function(){
							$("#" + tableId).jqGrid("load");
						},function(){
							$("#" + tableId).jqGrid("load");
						});
						return true;
					},actionName + "的意见",null,500);
				break;
				case flow.constants.ACTION_TYPE_REJECT :	 //驳回
				case flow.constants.ACTION_TYPE_DEAL_AUTO : //暂停恢复
					prompts("请输入"+actionName+"的意见：", function(value){
						if(!value){
							error("请输入"+actionName+"的意见！");
							return false;
						}
						flow.doActionAjax(bizId,flowCode,actionCode,value,function(){
							$("#" + tableId).jqGrid("load");
						},function(){
							$("#" + tableId).jqGrid("load");
						});
						return true;
					},actionName + "的意见",null,500);
				break;
			}
		},
		/**
		 * 显示流程图示
		 * @param id 流程实例id(非业务主键)
		 */
		showPic : function(id){
			win({
				width : 800,
				height : 400,
				url : oxhideHost + "/flowConfigAction.do?action=showView&id=" + id,
				title : "流程图示",
				canelBtnTxt : "关闭"
			});
		},
		/**
		 * 显示流转历史
		 * @param id 流程实例id(非业务主键)
		 */
		showHis : function(id){
			win({
				width : 800,
				height : 400,
				url : oxhideHost + "/flowShowAction.do?action=showHistory&id=" + id,
				title : "流转历史",
				canelBtnTxt : "关闭"
			});
		},
		constants : {
			/** 操作类型-跳转 */
			ACTION_TYPE_GOTO : "1",
			/** 操作类型-保存 */
			ACTION_TYPE_SAVE : "2",
			/** 操作类型-删除 */
			ACTION_TYPE_DELETE : "3",
			/** 操作类型-处理 */
			ACTION_TYPE_DEAL : "4",
			/** 操作类型-并发处理 */
			ACTION_TYPE_DEAL_CONCURRENT : "5",
			/** 操作类型-撤销 */
			ACTION_TYPE_UNDO : "6",
			/** 操作类型-驳回 */
			ACTION_TYPE_REJECT : "7",
			/** 操作类型-废弃 */
			ACTION_TYPE_DISCARD : "8",
			/** 操作类型-自定义操作 */
			ACTION_TYPE_DEAL_AUTO : "9",
			/** 操作类型-暂停、恢复处理 */
			ACTION_TYPE_DEAL_AUTO : "0",
		
			/** 节点类型-开始 */
			NODE_TYPE_START : "1",
			/** 节点类型-草稿 */
			NODE_TYPE_DRAFT : "2",
			/** 节点类型-串行 */
			NODE_TYPE_SERIAL : "3",
			/** 节点类型-并行 */
			NODE_TYPE_CONCURRENT : "4",
			/** 节点类型-自动 */
			NODE_TYPE_AUTO : "5",
			/** 节点类型-完成 */
			NODE_TYPE_FINISH : "9",
		
			/** 布尔断定 */
			YES : "1",
			/** 布尔断定 */
			NO : "0",
			
			/** 处理人指定方式-不指定 */
			ASSIGN_TYPE_NONE : "0",
			/** 处理人指定方式-用户指定 */
			ASSIGN_TYPE_USER : "1",
			/** 处理人指定方式-业务指定 */
			ASSIGN_TYPE_BIZ : "2"
		}
	};
})();
/*工作流扩展结束*/

//TODO 老版本兼容方法开开开开开开开开开开开开开始
//(function($){
//    $(window).load(function(){
        /*my97改为jquery ui date开始*/
//        $("input[onclick*=WdatePicker]").live("click",function(){
//            var $t = $(this);
//            if($t.attr("my97patcher")) return;
//            var format = (new Function("return " + $t.attr("onclick").match(/{.*}/) ))();
//            $t.val($MT.formatDate(format && format.dateFmt));
//            $t.datetimepicker($MT.oxhideTime({
//                format:format && format.dateFmt
//            })).attr("my97patcher",true).datetimepicker("show");
//        });
        /*my97改为jquery ui date结束*/


        /*原先的box2、box1的初始化开始*/
//        $(".box2").each(function(){
//            var t = $(this),b2 = $("<div/>").css("padding","1em").addClass("box2");
//            t.children().appendTo(b2);
//            t.prepend(b2).addClass("ui-widget-content ui-corner-all").prepend(
//                $("<h3/>").html("<span class=\"ui-icon ui-icon-gear\" style=\"float: left; margin-right: .3em;\"></span>"+t.attr("panelTitle")).addClass("ui-widget-header ui-corner-top").css({"margin":"0","padding":"0.4em"})
//            ).css("width",t.attr("panelWidth")||"100%")
//        });
//        $(".box1").each(function(){
//            var t = $(this);
//            t.addClass("ui-widget-content ui-corner-all").css("width",t.attr("panelWidth")||"98%");
//        })
        /*原先的box2、box1的初始化结束*/



        /*操作按钮事件开始*/
//        if(window["listOpen"]){
//            $("button[createBy=struts]").each(function(){
//                var that = $(this),
//                    role = that.attr("buttonType");
//                switch(role){
//                    case "add":
//                        that.bind("click",function(){add.call(this);});
//                    break;
//                    case "view":
//                        that.bind("click",function(){view.call(this);});
//                    break;
//                    case "edit":
//                        that.bind("click",function(){update.call(this);});
//                    break;
//                    case "delete":
//                        that.bind("click",function(){batchDelete.call(this);});
//                    break
//                    case "bubble":
//                        that.bind("click",function(){clearConditionSelect.call(this);});
//                    break;
//                    case "find":
//                        that.bind("click",function(){conditionSelect.call(this);});
//                    break;
//                    case "formhistory":
//                        that.bind("click",function(){formhistory.call(this);});
//                    break;
//                }
//            });
//        }
        /*操作按钮事件结束*/
//    });
//    $.jgrid && $.fn.extend({
//        /**
//         * 返回该table中选中的id
//         * onlyOne:是否只返回第一行
//         */
//        getId : function(onlyOne){
//            return this.jqGrid("id",onlyOne);
//        },
//        preDelete : function(){},
//        tableSubmit : function(){},
//        moveUp:function(){},
//        moveDown:function(){},
//        moveTop:function(){},
//        moveBottom:function(){},
//        del:function(){},
//        setAction:function(){}
//    });
//
//    //时间控件老版本补丁
//    window.WdatePicker || (window.WdatePicker = function(){});
//
//    $.extend(window,{
//        /*增加(表格|表单)*/
//        add : function() {
//            var tids = this.id ? ( this.id.indexOf("_") > -1 ? this.id.split("_") : []): [],
//                tid = tids[0],
//                that = $((this.nodeName == "TABLE" || this.prop) ? this : "#" +   (tid || window.tableId || "siheTable"));
//            that.jqGrid("form","add");
//        },
//        /*修改(表格|表单)*/
//        update : function(id) {
//            var tids = this.id ? ( this.id.indexOf("_") > -1 ? this.id.split("_") : []): [],
//                tid = tids[0],
//                that = $((this.nodeName == "TABLE" || this.prop) ? this : "#" +   (tid || window.tableId || "siheTable"));
//            that.jqGrid("form","update");
//        },
//        /*查看(表格|表单)*/
//        view:function(id) {
//            var tids = this.id ? ( this.id.indexOf("_") > -1 ? this.id.split("_") : []): [],
//                    tid = tids[0],
//                    that = $((this.nodeName == "TABLE" || this.prop) ? this : "#" +   (tid || window.tableId || "siheTable"));
//            that.jqGrid("form","view");
//        },
//        /*删除(表格|表单)*/
//        batchDelete : function(myid) {
//            var tids = this.id ? ( this.id.indexOf("_") > -1 ? this.id.split("_") : []): [],
//                    tid = tids[0],
//                    that = $((this.nodeName == "TABLE" || this.prop) ? this : "#" +   (tid || window.tableId || "siheTable"));
//            that.jqGrid("form","delete");
//        },
//        /*清空查询条件(表单)*/
//        clearConditionSelect : function() {
//            var tids = this.id ? ( this.id.indexOf("_") > -1 ? this.id.split("_") : []): [],
//                    tid = tids[0],
//                    that = $((this.nodeName == "TABLE" || this.prop) ? this : "#" +   (tid || window.tableId || "siheTable")),
//                    formName = that.jqGrid("getGridParam","formName")|| window["formName"];
//            if(document[formName]){
//                var ele = document[formName].elements;
//                for (var i = 0; i < ele.length; i++) {
//                    if ($(ele[i]).hasClass("notclear")) continue;
//                    if (ele[i].tagName == "INPUT" && ele[i].type != "button")
//                        ele[i].value = "";
//                    else if (ele[i].tagName == "SELECT") {
//                        if (ele[i].options.length)
//                            ele[i].value = ele[i].options[0].value;
//                    }
//                }
//            }
//            conditionSelect.call(that[0]);
//        },
//        /*查询(表单)*/
//        conditionSelect : function(){
//            var tids = this.id ? ( this.id.indexOf("_") > -1 ? this.id.split("_") : []): [],
//                    tid = tids[0],
//                    that = $((this.nodeName == "TABLE" || this.prop) ? this : "#" +   (tid || window.tableId || "siheTable"));
//            if(document[formName]){
//                var ele = document[formName].elements,formParam = {};
//                for (var i = 0; i < ele.length; i++) {
//                    var ele_ = $(ele[i]);
//                    that.jqGrid("ajax",ele_.attr("name"),ele_.val());
//                }
//            }
//            that.jqGrid("load",true);
//        },
//        /*历史记录查看(表格|表单)*/
//        formhistory : function(id){
//            var tids = this.id ? ( this.id.indexOf("_") > -1 ? this.id.split("_") : []): [],
//                    tid = tids[0],
//                    that = $((this.nodeName == "TABLE" || this.prop) ? this : "#" +   (tid || window.tableId || "siheTable"));
//            that.jqGrid("form","history");
//        }
//    });
//})(jQuery);
/*老版本兼容方法结结结结结结结结结结结结结结束*/