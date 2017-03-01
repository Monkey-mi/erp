Ext.define('erp.report.engine.view.TemplateDesignerForSys', {
	extend: 'erp.ux.Panel',
	alias: 'widget.sys_tpldesigner',
	requires: ['erp.util.form.Supcan','erp.report.engine.util.AnalysisFun','erp.bi.store.DatasourceParams',
	'erp.report.engine.view.CustomUtil',
	'erp.util.form.SCReport'],
	printRecs:[],		//定义打印记录数组
	bakRecs:[],		//定义打印记录数组
	hideMode: 'offsets',

	layout: 'border',
	/**
	 * 当前操作的模板记录
	 */
	tplRec: null,
	/**
	 * supcan控件用指标库
	 */
	itemLibrary: null,
	//条件记录
	recCdn:null,
	
	workMode: {
		'01': 'DesignTime',
		'02': 'UploadDesignTime',
		'03': 'UploadDesignTime',
		'04': 'RunTime',
		'05': 'InputDSRunTime'
	},

	dataTypes: {
		text: 'textfield',
		string: 'textfield',
		int: 'textfield',
		float: 'textfield',
		decimal: 'textfield',
		date: 'datefield',
		auto: 'textfield'
	},

	c_tpl: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],

	changeToCTpl: function(colnum) {
		var me = this;
		var col = parseInt(colnum);
		var ret = '';
		while(true){
			var i;
			if(col < 26){
				i = col;
			}else{
				i = col % 26;
			}
			ret = me.c_tpl[i] + ret;
			col = Math.floor(col / 26) - 1;
			if(col < 0){
				break;
			}
		}
		return ret;
	},

	initComponent: function() {
		var me = this;
		var hidden= me.tplRec.get('tpl_type') != '02'? true:false
		var workmode
		if (me.tplRec.get('tpl_type')=='04'){
			workmode=workmode= 'workmode=' + me.workMode[me.tplRec.get('tpl_type')]+";Rebar=Print,Main;main=105";
		}else{
			workmode= 'workmode=' + me.workMode[me.tplRec.get('tpl_type')];	
		}	
		me.supcanId = Ext.id();
		me.items = [{
			xtype: 'panel',
			region: 'center',
			flex: 1,
			layout: 'fit',
			tbar: [me.editSaveButton = Ext.widget('button', {
				itemId: 'openHtmlEditor',
				text: '保存模板',
				hidden: me.tplRec.get('tpl_type') == '04',
				iconCls: 'report_save',
				handler: function() {
					me.saveReport();
				}
			}),me.ClearSaveButton= Ext.widget('button', {
				itemId: 'ClearHtml',
				text: '清除模板样式',
				hidden: me.tplRec.get('tpl_type') == '04',
				iconCls: 'broom',
				handler: function() {
					me.saveReport(true);
				}
			}),{
				text: '外发本合同',
				hidden:!me.isOrder,
				handler:function(){
					var af=me.getSupcan(),
					recs=me.printRecs,
					rec=recs[0],
					csbh = rec.get('csbh'),
					cgyq = rec.get('cgyq'),
					htbh = rec.get('htbh');
					httk = rec.get('httk');
					var myMask = new Ext.LoadMask({
						target : me
					});
					myMask.mask('正在生成合同，请等待......');
					af.func('OpenLoadMask','');
					var filename =af.func("callfunc", "105\r\nType=pdf;ExportAsPrint=true;Scale=100;Precision=100;filename=//erp07/test/temp/采购合同("+htbh+").pdf;");
					af.func('CloseLoadMask','');
					myMask.unmask();
					var pid = erp.Util.getPlatformLoginId();
					myMask.mask('正在通信，请等待......');	
					var data = erp.Const.callServiceMethodSync('purchaseorder/upOrderFileForWs.act',{
					    ptid:pid,
						login_id : pid,
						url:filename,
						htbh : htbh,
						csbh : csbh,
						cgyq : cgyq,
						httk : httk,
						czym : erp.Util.currentUser.userInfo.name
					});
					if(data&&data.msg){
						Ext.toastInfo(data.msg);
						myMask.unmask();
						return;
					}
					/*result = erp.Const.callServiceMethodSync('purchaseorder/ordertows.act?method=getSubmitOrder',{
			            htbh : htbh, csbh : csbh,ptid : pid,czym : erp.Util.currentUser.userInfo.name
			        })*/
			        myMask.unmask();
			        Ext.toastInfo('发送成功！');
				}
			}],
			items: [me.tplEditor = Ext.widget('component', {
				border: false,
				hideMode: 'offsets',
				html: erp.SupcanUtil.getReport(me.supcanId,workmode)
			})]
		}];

		erp.Const.application.on('supcanReady', me.onSupcanReady, me);
		erp.Const.application.on('supcanEvent', me.onSupcanEvent, me);
		me.callParent(arguments);
	},

	onSupcanReady: function(id) {
		var me = this;
		switch(id){
		// 根据id判断，只处理与自己相关的报表控件
		case me.supcanId:
			var s = erp.SupcanUtil.getSupcanById(id);
			// 注册事件
			s.func('SubscribeEvent', 'Clicked');
			//如果是外发合同时使用不允许编辑
			if(me.isOrder){
				 s.func("Swkrntpomzqa", "1, 2");
			}
			// 加载报表
			me.loadReport();
			break;
		}
		
	},
	onSupcanEvent: function(id, event, p1, p2, p3, p4) {
		var me = this;
		switch(id){
		// 根据id判断，只处理与自己相关的报表控件
		case me.supcanId:
			var s = erp.SupcanUtil.getSupcanById(id);
			switch(event){
				case 'Printed':
				case 'Exported':
					if(me.printRecs.length>0){
						var callback=me.printRecs[0].callback;
						if(Ext.isFunction(callback)){
							callback(me.printRecs,me);
						}
					}
				break;
				case 'Clicked':
					if (p3=='start'){
						s.func('Calc',"");
					}
				break;
			}
			
		}
	},
	/**
	 * 获取当前supcan编辑器
	 * 
	 * @returns
	 */
	getSupcan: function() {
		var me = this;
		return erp.SupcanUtil.getSupcanById(me.supcanId);
	},
	/**
	 * 保存模板
	 */
	saveReport: function(reset) {
		var me = this;
		var editor = erp.SupcanUtil.getSupcanById(me.supcanId);
		if(editor){
			var record = me.tplRec;
			if(record){
				var tpl_xml = editor.func('GetFileXML', '');
				Ext.Ajax.request({
					url: 'report/SysReports.do?method=setDatagridTplXml',
					async: false,//改成 同步 避免数据丢失
					params: {
						mod_id: record.get('mod_id'),
						mod_tpl: (reset ?'': tpl_xml)
					},
					success: function(response) {
						var obj = Ext.JSON.decode(response.responseText);
						if(obj.success){
							// 提示
							erp.Util.showMsg('保存成功!');
						}
						//外界面store刷新
							var panel=me.main;
							var tree=panel.down('treepanel');
							var recs=tree.getSelectionModel().getSelection();
							if(recs.length>0){
								var store=panel.store;
								var proxy = store.getProxy();
								proxy.setExtraParam("menu_id",Ext.encode(recs[0].get('id')));
								proxy.setExtraParam("creater",erp.Util.currentUser.userInfo.u_id);
								store.load({
						    	    scope: this,
						    	    callback: function() {
						    	    	//me.getContentPermission().clearContent();
						    	    }
						    	});
							}
					}
				});
			}
		}
	},
	/**
	 * 加载报表模板
	 */
	loadReport: function() {
		var me = this;
		if(me.tplRec){
			var editor = erp.SupcanUtil.getSupcanById(me.supcanId);
			if(editor)
				me.CreatedsCenter();
		}
	},
	CreatedsCenter:function(){
		var me=this;
		var editor = erp.SupcanUtil.getSupcanById(me.supcanId);
		editor.func('OpenLoadMask','');
		//2、定义数据源
		Ext.Ajax.request({
			url: 'dc/dsCenterService.do?method=getDsCenterListAll',
			async : false,
			params: {
				list_id: me.tplRec.get('list_id')
			},
			success: function(response) {
				//console.log(me.tplRec.get('list_id'));
				var obj = Ext.JSON.decode(response.responseText);
				var datas=[],pdescs=[],memo=[],dsId=[],list_id=[],dsType=[];
				var sql="";
				var index=0;
				  Ext.each(obj.data,function(item){
				  		sql=item.script_sql
	                	me.getDsDesc(item.ds_id)
	                	dsId[index]=item.ds_id;
	                	memo[index]=item.tip;
	                	list_id[index]=item.list_id;
						dsType[index]=item.data_type;
						//在直接打印时不需要再次组织数据源XML 提速伍恰20161119
						if(me.tplRec.get('tpl_type') != '04'){
							me.sqlResult=erp.AnalysisFun.exe_sqlForSys(sql,(item.dsid=='0'?"":item.dsid),me.tplRec.get('list_id'));
							datas[index]=Ext.JSON.encodeValue(me.sqlResult.DATA_ROWS);
							pdescs[index]=me.createDatasource(me.data,me.descMap,me.typeMap);
						}
						index++;
				  });
				  editor.func('CloseLoadMask','');
				  var params={url:'dc/execSqlQuery.do',typeM:'JSON',type:4,memo:memo,dsId:dsId,list_id:list_id,dataType:dsType};
				  //若从存在打印记录
				  if(me.printRecs.length>0){
				  	//传入额外参数；
				  	var paramStore=Ext.create('erp.bi.store.DatasourceParams');
				  	//遍历参数记录；
				  	paramStore.load({params:{list_id:me.tplRec.get('list_id')},
				  		callback:function(recs){
				  			params.params={};
				  			for(var j=0;j<recs.length;j++){
						  		var rec=recs[j];
						  		var values=[];
						  		for (var i=0;i<me.printRecs.length;i++){
						  			var tmpVal=me.printRecs[i].get(rec.get('code'));
						  			if (!Ext.isEmpty(tmpVal))
						  				values.push(tmpVal);
						  		}
						  		//有值数组存在
						  		if(values.length>0)
						  			params.params[rec.get('code')]=values.join(",");
				  			}
				  			erp.SCReportUtil.makeReportByData(editor,'json',datas,pdescs,me.tplRec.get('mod_tpl'),params);
				  		}
				  		
				  	});
				  }
				  else
				  		erp.SCReportUtil.makeReportByData(editor,'json',datas,pdescs,me.tplRec.get('mod_tpl'),params);
				} 
			});	 			
	},
	getDsDesc:function(ds_id){
			var me=this;
			 //3、获取字段描述
			Ext.Ajax.request({
				async : false,
				url: 'dc/dsCenterService.do?method=getDsDescList',
				params: {
					ds_id: ds_id
				},
			success: function(response) {
				var obj = Ext.JSON.decode(response.responseText);
					me.data=obj.data;
					me.descMap = new Ext.util.HashMap(); 
					me.typeMap=new Ext.util.HashMap(); 
					Ext.each(obj.data,function(item){
						me.descMap.add(item.col_code,item.col_name);
						me.typeMap.add(item.col_code,item.data_type);
					});
				}
			});
		},
	createDatasource:function(data,descMap,typeMap){
		var me=this;
		var result = me.sqlResult;
		var tableField =[];
		var treeField =[];
	 	for (var i = 0; i < result.DATA_FIELDS.length; i++){
	 			if (!Ext.isEmpty(data)){
	 				var tempDesc=descMap.get(result.DATA_FIELDS[i].name)?descMap.get(result.DATA_FIELDS[i].name):result.DATA_FIELDS[i].name;
	 				var tempType=typeMap.get(result.DATA_FIELDS[i].name)?typeMap.get(result.DATA_FIELDS[i].name):result.DATA_FIELDS[i].datatype
	 				
	 				 var f = {
			            name     : result.DATA_FIELDS[i].name,
			            type     : tempType,
			            value    : tempDesc
			     	};
			     	var t = {
			    		codeType: null,
			    	    condition: null,
			    		cusName: tempDesc,
			    		datatype: tempType,
			    		ffName: tempDesc,
			    		ftName: tempDesc
		         	};
	 			}else{
			     var f = {
			            name     : result.DATA_FIELDS[i].name,
			            type     : result.DATA_FIELDS[i].datatype,
			            value    : result.DATA_FIELDS[i].name
			     };
			     var t = {
			    		codeType: null,
			    	    condition: null,
			    		cusName: result.DATA_FIELDS[i].name,
			    		datatype: result.DATA_FIELDS[i].datatype,
			    		ffName: result.DATA_FIELDS[i].name,
			    		ftName: result.DATA_FIELDS[i].name
		         };
	 			}
			     tableField[i]=f;
			     treeField[i]=t;
			 }
		var pdescs=me.makeNaVals(tableField);
		return pdescs;
	},
	
    	 
	//生成名称值对
    makeNaVals : function(descs){
    	var naVals = [];
    	 for(var i=0;i<descs.length;i++){
    		 naVals.push({name:descs[i].name,value:descs[i].value,type:erp.CustomUtil.getSupcanDataType(descs[i].type)});
    	 }
    	 return naVals;
    },
    //刷新打印标记、打印时间等
    refreshPrintInfo:function(sql){
    	var me=this;
    	if(sql){
	    	var myMask = new Ext.LoadMask({
				target : me
			});
			var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getStringFromSql',
			{sql : sql});
			myMask.unmask();
			var data = Ext.decode(result);
			if (!data.bool) {
				Ext.toastErrorInfo(data.msg);
				return ;
			}
    	}
    }
});