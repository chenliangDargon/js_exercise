	
	${tableId}Options.left_actions = [];
	${tableId}Options.right_actions = [];
	${tableId}Options.top_actions = [];
	${tableId}Options.bottom_actions = [];
	${tableId}Options.top_eles = [];
	${tableId}Options.bottom_eles = [];
	<%if(search){%>
	${tableId}Options.${searchPos}_actions.push({
		id:"search",
		caption:"${searchText}",
		ico:"find",
		<%if(fn.isNotEmpty(searchGroup)){%>
		group:"${searchGroup}",
		<%}%>
		fn:function(){
			$(this).refresh("jqGrid","form","search");
		},
		pos:"${searchPos}",
		display:${searchDisplay}
	});
	<%}%>
	<%if(view){%>
	${tableId}Options.${viewPos}_actions.push({
		id:"view",
		caption:"${viewText}",
		ico:"view",
		<%if(fn.isNotEmpty(viewGroup)){%>
		group:"${viewGroup}",
		<%}%>
		fn:function(id,data,btn){
			$(this).refresh("jqGrid","form","view",id);
		},
		pos:"${viewPos}",
		display:${viewDisplay}
	});
	<%if(fn.isNotEmpty(viewAttr)){%>
	${tableId}Options.btnAttrs.push({
		id : "view",
		fn : function(){
			${viewAttr}
		}
	});
	<%}%>
	<%}%>
	<%if(add){%>
	${tableId}Options.${addPos}_actions.push({
		id:"add",
		caption:"${addText}",
		ico:"add",
		<%if(fn.isNotEmpty(addGroup)){%>
		group:"${addGroup}",
		<%}%>
		fn:function(){
			$(this).refresh("jqGrid","form","add");
		},
		pos:"${addPos}",
		display:${addDisplay}
	});
	<%}%>
	<%if(edit){%>
	${tableId}Options.${editPos}_actions.push({
		id:"edit",
		caption:"${editText}",
		ico:"edit",
		<%if(fn.isNotEmpty(editGroup)){%>
		group:"${editGroup}",
		<%}%>
		fn:function(id,data,btn){
			$(this).refresh("jqGrid","form","update",id);
		},
		pos:"${editPos}",
		display:${editDisplay}
	});
	<%if(fn.isNotEmpty(editAttr)){%>
	${tableId}Options.btnAttrs.push({
		id : "edit",
		fn : function(){
			${editAttr}
		}
	});
	<%}%>
	<%}%>
	<%if(delete){%>
	${tableId}Options.${deletePos}_actions.push({
		id:"delete",
		caption:"${deleteText}",
		<%if(fn.isNotEmpty(deleteGroup)){%>
		group:"${deleteGroup}",
		<%}%>
		ico:"delete",
		fn:function(id,data,btn){
			$(this).refresh("jqGrid","form","delete",id);
		},
		pos:"${deletePos}",
		display:${deleteDisplay}
	});
	<%if(fn.isNotEmpty(deleteAttr)){%>
	${tableId}Options.btnAttrs.push({
		id : "delete",
		fn : function(){
			${deleteAttr}
		}
	});
	<%}%>
	<%}%>
	<%if(delete && deleteLogic && !isShowLogicDeleteed && backResource){%>
	${tableId}Options.${deletePos}_actions.push({
		id:"showback",
		caption:"${backText}",
		<%if(fn.isNotEmpty(deleteGroup)){%>
		group:"${deleteGroup}",
		<%}%>
		ico:"ui-icon-copy",
		fn:function(id,data,btn){
			$(this).refresh("jqGrid","form","showback",id);
		},
		pos:"${deletePos}",
		display:${backDisplay}
	});
	<%}%>
	<%if(delete && deleteLogic && isShowLogicDeleteed && backReturnResource){%>
	window.uiClose = function(){return true;}
	${tableId}Options.${deletePos}_actions.push({
		id:"back",
		caption:"${backReturnText}",
		<%if(fn.isNotEmpty(deleteGroup)){%>
		group:"${deleteGroup}",
		<%}%>
		ico:"ui-icon-arrowreturnthick-1-w",
		fn:function(id,data,btn){
			$(this).refresh("jqGrid","form","back",id);
		},
		pos:"${deletePos}",
		display:${backReturnDisplay}
	});
	<%if(fn.isNotEmpty(backAttr)){%>
	${tableId}Options.btnAttrs.push({
		id : "back",
		fn : function(){
			${backAttr}
		}
	});
	<%}%>
	<%}%>
	<%if(formhistory){%>
	${tableId}Options.${formhistoryPos}_actions.push({
		id:"formhistory",
		caption:"${formhistoryText}",
		<%if(fn.isNotEmpty(formhistoryGroup)){%>
		group:"${formhistoryGroup}",
		<%}%>
		ico:"ui-icon-shuffle",
		fn:function(id,data,btn){
			$(this).refresh("jqGrid","form","history",id);
		},
		pos:"${formhistoryPos}",
		display:${formhistoryDisplay}
	});
	<%if(fn.isNotEmpty(formhistoryAttr)){%>
	${tableId}Options.btnAttrs.push({
		id : "formhistory",
		fn : function(){
			${formhistoryAttr}
		}
	});
	<%}%>
	<%}%>
	<%if(columnChooser){%>
	${tableId}Options.${columnChooserPos}_actions.push({
		id:"columnChooser",
		caption:"${columnChooserText}",
		<%if(fn.isNotEmpty(columnChooserGroup)){%>
		group:"${columnChooserGroup}",
		<%}%>
		ico:"ui-icon-link",
		fn:function(){
			$(this).refresh("jqGrid","form","choose");
		},
		pos:"${columnChooserPos}",
		display:${columnChooserDisplay}
	});
	<%}%>
	<%if(refresh){%>
	${tableId}Options.${refreshPos}_actions.push({
		id:"refresh",
		caption:"${refreshText}",
		<%if(fn.isNotEmpty(refreshGroup)){%>
		group:"${refreshGroup}",
		<%}%>
		ico:"ui-icon-refresh",
		fn:function(){
			$(this).refresh("jqGrid","load",true);
		},
		pos:"${refreshPos}",
		display:${refreshDisplay}
	});
	<%}%>
	<%if(save){%>
	${tableId}Options.${savePos}_actions.push({
		id:"saveTable",
		caption:"${saveText}",
		ico:"save",
		<%if(fn.isNotEmpty(saveGroup)){%>
		group:"${saveGroup}",
		<%}%>
		fn:function(){
			$(this).refresh("jqGrid","save",true);
		},
		pos:"${savePos}",
		display:${saveDisplay}
	});
	<%}%>
	<%if(xls){%>
	${tableId}Options.${xlsPos}_actions.push({
		id:"xlsTable",
		caption:"${xlsText}",
		<%if(fn.isNotEmpty(xlsGroup)){%>
		group:"${xlsGroup}",
		<%}%>
		ico:"ui-icon-extlink",
		fn:function(){
			$(this).refresh("jqGrid","form","xls");
		},
		pos:"${xlsPos}",
		display:${xlsDisplay}
	});
	<%}%>
	<%if(order){%>
	${tableId}Options.${orderPos}_actions.push({
		id:"upTable",
		caption:"上移",
		<%if(fn.isNotEmpty(orderGroup)){%>
		group:"${orderGroup}",
		<%}%>
		ico:"ui-icon-arrowthick-1-n",
		fn:function(id,data,btn){
			$(this).refresh("jqGrid","row","move",id,false);
		},
		pos:"${xlsPos}",
		display:${orderDisplay}
	});
	${tableId}Options.${orderPos}_actions.push({
		id:"downTable",
		caption:"下移",
		<%if(fn.isNotEmpty(orderGroup)){%>
		group:"${orderGroup}",
		<%}%>
		ico:"ui-icon-arrowthick-1-s",
		fn:function(id,data,btn){
			$(this).refresh("jqGrid","row","move",id,true);
		},
		pos:"${xlsPos}",
		display:${orderDisplay}
	});
	<%}%>
	<%if(imp){%>
	${tableId}Options.${impPos}_actions.push({
		id:"imp",
		caption:"${impText}",
		refresh:function(){
			this.imper({
				<%if(fn.isNotEmpty(impCallBack)){%>
				callback : function(data){
					(function(){
						${impCallBack}
					}).call($("#${tableId}"))
				},
				<%}%>
				<%if(fn.isNotEmpty(impParam)){%>
				param : ${impParam},
				<%}%>
				<%if(fn.isNotEmpty(impParamDialog)){%>
				impParamDialog : "${impParamDialog}",
				<%}%>
				<%if(fn.isNotEmpty(impDownWarn)){%>
				downWarn : "${impDownWarn}",
				<%}%>
				path : "${impPath}",
				service : "${impService}"
			});
		},
		pos:"${impPos}",
		display:${impDisplay}
	});
	<%}%>
	
	$.extend(true,${tableId}Options,{
		optionModel : ${optionModel},
		showSave : ${showSave},
		showSearchAndOr : ${showSearchAndOr},
	    <%if(fn.isNotEmpty(xlsAction)){%>
	    xlsAction	 : "${xlsAction}",
	    <%}%>
		xlsServerData : ${xlsServerData},
		xlsRowspanCustom : ${xlsRowspanCustom},
		row_addFirst : ${addFirst},
		addAsInsert : ${addAsInsert},
		multipleSearch : ${userSearch},
		searchOnEnter : true,
		closeOnEscape : true,
		<%if(fn.isNotEmpty(check)){%>
		customCheckMethod_ : function(id,action){
			${check}
		},
		<%}%>
		<%if(editModel){%>
		<%if(fn.isNotEmpty(orderFieldName)){%>
		orderFieldName : "${orderFieldName}",
		<%}%>
		<%if(!editModelPage){%>
		pgbuttons : false,
		pginput : false,
		rowList : false,
		rowNum : -1,
		<%}%>
		_editModel_:true,
		saveName:"${saveName}",
		onSelectRow : function(rowid,status){
			var t = this,that = $(t);
			var oldEditId = t.p.oldEditId;
			if(rowid !== oldEditId){
				oldEditId && that.jqGrid("saveRow",oldEditId);
				if(that.jqGrid("check",rowid,"update") !== false){
					that.jqGrid("editRow",rowid);
					t.p.oldEditId = rowid;
				}else{
					delete t.p.oldEditId;
				}
			}
		},
		<%if(fn.isNotEmpty(saveAction)){%>
		saveAction : "${saveAction}",
		<%}%>
		<%if(fn.isNotEmpty(saveForm)){%>
		saveForm : "${saveForm}",
		<%}%>
		<%}%>
		<%if(fn.isNotEmpty(showAdd)){%>
		showAdd : "${showAdd}",
		<%}%>
		<%if(fn.isNotEmpty(showUpdate)){%>
		showUpdate : "${showUpdate}",
		<%}%>
		<%if(fn.isNotEmpty(showView)){%>
		showView : "${showView}",
		<%}%>
		<%if(fn.isNotEmpty(showDelete)){%>
		showDelete : "${showDelete}",
		<%}%>
		<%if(fn.isNotEmpty(showBatchDelete)){%>
		showBatchDelete : "${showBatchDelete}",
		<%}%>
		<%if(fn.isNotEmpty(service)){%>
		service : "${service}",
		<%}%>
		<%if(fn.isNotEmpty(deleteMessage)){%>
		deleteMessage : "${deleteMessage}",
		<%}%>
		<%if(fn.isNotEmpty(formName)){%>
		formName : "${formName}",
		<%}%>
		<%if(formWidth!=-1){%>
		formWidth : ${formWidth},
		<%}%>
		<%if(formHeight!=-1){%>
		formHeight : ${formHeight},
		<%}%>
		<%if(viewHeight!=-1){%>
		viewHeight : ${viewHeight},
		<%}%>
		<%if(viewWidth!=-1){%>
		viewWidth : ${viewWidth},
		<%}%>
		<%if(fn.isNotEmpty(pageTitle)){%>
		pageTitle : "${pageTitle}",
		<%}%>
		pageTitleAppend : ${pageTitleAppend},
		addMulti : ${addMulti},
		<%if(fn.isNotEmpty(backTitle)){%>
		backTitle : "${backTitle}",
		<%}%>
		<%if(formhistoryWidth!=-1){%>
		formhistoryWidth : ${formhistoryWidth},
		<%}%>
		<%if(formhistoryHeight!=-1){%>
		formhistoryHeight : ${formhistoryHeight},
		<%}%>
		<%if(backWidth!=-1){%>
		backWidth : ${backWidth},
		<%}%>
		<%if(backHeight!=-1){%>
		backHeight : ${backHeight},
		<%}%>
		backWin : ${backWin},
		saveAndAdd : ${saveAndAdd},
		canMaxSize : ${canMaxSize},
		formhistoryWin : ${formhistoryWin},
		viewWin : ${viewWin},
		editWin : ${editWin},
		addWin : ${addWin},
		<%if(fn.isNotEmpty(rowIdAdd)){%>
		row_newRowId : function(){
			${rowIdAdd}
		},
		<%}%>
		<%if(fn.isNotEmpty(deleteLogicColumnName)){%>
		deleteLogicColumnName:"${deleteLogicColumnName}",
		<%}%>
		<%if(fn.isNotEmpty(deleteLogicTableName)){%>
		deleteLogicTableName:"${deleteLogicTableName}",
		<%}%>
		<%if(fn.isNotEmpty(backUrl)){%>
		backUrl:"${backUrl}",
		<%}%>
		<%if(fn.isNotEmpty(xlsTitle)){%>
		xlsTitle:"${xlsTitle}",
		<%}%>
		xlsRowpan : ${xlsRowpan},
		<%if(fn.isNotEmpty(xlsSheetName)){%>
		xlsSheetName:"${xlsSheetName}",
		<%}%>
		<%if(fn.isNotEmpty(xlsInTitle)){%>
		xlsInTitle:"${xlsInTitle}",
		<%}%>
		<%if(fn.isNotEmpty(xlsInTitle2)){%>
		xlsInTitle2:"${xlsInTitle2}",
		<%}%>
		<%if(fn.isNotEmpty(xlsInTitle3)){%>
		xlsInTitle3:"${xlsInTitle3}",
		<%}%>
		xlsOptionUpdate : ${xlsOptionUpdate},
		<%if(fn.isNotEmpty(xlsSummaryTextShowColumnName)){%>
		xlsSummaryTextShowColumnName : "${xlsSummaryTextShowColumnName}",
		<%}%>
		deleteLogic : ${deleteLogic},
		isShowLogicDeleteed : ${isShowLogicDeleteed},
		viewBatch : ${viewBatch},
		editBatch : ${editBatch},
		deleteDisabled : ${deleteDisabled},
		forceValid : ${forceValid},
		assignedId : ${assignedId},
		<%if(autoHeight != null){%>
		autoHeight:${autoHeight},
		<%}else{%>
		autoHeight:null,
		<%}%>
		askBeforeRefreshWhenEdit : ${askBeforeRefreshWhenEdit},
		dwrExist : ${dwrExist}
	});
	
	<%if(delete && deleteLogic && !isShowLogicDeleteed){%>
	${tableId}Options.postData.rules.push("${deleteLogicColumnName}#${deleteLogicColumnName}#eq#1#and#true#${deleteLogicTableAlias}");
	<%}%>
	<%if(delete && deleteLogic &&isShowLogicDeleteed){%>
	${tableId}Options.postData.rules.push("${deleteLogicColumnName}#${deleteLogicColumnName}#eq#0#and#true#${deleteLogicTableAlias}");
	<%}%>
	
	$.extend(true,${tableId}Options,{
		postData:{
			___saveName:"${saveName}",
			xlsSearched:${xlsSearched},
			xlsZip:${xlsZip},
			xlsAll : ${xlsAll}
		}
	});
	
	<%if(editModel && addRes && enterAdd){%>
	var tempIndex = ${tableId}Options.preOptions.methods.indexOf("bindKeys","name");
	if(tempIndex !== -1) ${tableId}Options.preOptions.methods.splice(tempIndex,1);
	${tableId}Options.preOptions.methods.push({
		name:"bindKeys",
		value: {
			"onEnter":function( rowid ){ 
				$(this).jqGrid("row","add");
			 }
		} 
	});
	<%}%>