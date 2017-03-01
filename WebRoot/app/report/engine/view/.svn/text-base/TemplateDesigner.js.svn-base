Ext.define('erp.report.engine.view.TemplateDesigner', {
	extend: 'erp.ux.Panel',
	alias: 'widget.dc_tpldesigner',
	requires: ['erp.util.form.Supcan','erp.report.engine.util.AnalysisFun'],

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

	workMode: {
		'01': 'DesignTime',
		'02': 'UploadDesignTime',
		'03': 'UploadDesignTime',
		'04': 'RunTime'
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
		var hidden= me.tplRec.get('tpl_type') != '02'? true:false;
		var workmode
		if (me.tplRec.get('tpl_type')=='04'){
			workmode='workmode=' + me.workMode[me.tplRec.get('tpl_type')]+";Rebar=Main";
		}else{
			workmode= 'workmode=' + me.workMode[me.tplRec.get('tpl_type')];	
		}	
		me.cdtPanel=Ext.create('Ext.panel.Panel',{
			region:'west',
			width:300,
			split:true,
			hidden:true,
			collapsed:true,
			collapsible: true,
			frame:true,
			title:'条件选择'
		});
		me.supcanId = Ext.id();
		var html=erp.SupcanUtil.getReport(me.supcanId,workmode);
		me.tplEditor = Ext.widget('component', {
				border: false,
				hideMode: 'offsets',
				html:html
			});
		me.items = [me.cdtPanel,{
			xtype: 'panel',
			region: 'center',
			flex: 1,
			layout: 'fit',
			tbar: [
				me.editSaveButton = Ext.widget('button', {
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
					erp.SCReportUtil.clearPrintReport(me.getSupcan());
					me.saveReport(true);
				}
			})],
			items: [me.tplEditor]
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
				case 'Clicked':
					if (p3=='start'   ){
						s.func('Calc',"");
					}
					else if(p4!='')
					{
						//获取工作表的页签号
						var sheetIndex = parseInt(s.func("GetCurrentWorksheet", ""))+1;
						//切换到下一个工作表 
						s.func("SetCurrentWorkSheet", sheetIndex);
						//动态设置参数
						s.func("SetParas", "ds"+sheetIndex+" \r\n" + p3);
						 //仅计算本工作表						
						s.func("calc", "range=current");
						
					}
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
					url: 'form/Forms.do?method=setDatagridTplXml',
					params: {
						list_id: record.get('list_id'),
						tpl_xml: (reset ?'': tpl_xml)
					},
					success: function(response) {
						var obj = Ext.JSON.decode(response.responseText);
						if(obj.success){
							// 提示
							erp.Util.showMsg('保存成功!');
						}
					}
				});
			}
		}
	},
	/**
	 * 加载报表模板
	 */
	loadReport: function(rec) {
		var me = this;
		// 指定记录或者当前记录
		var rec = me.tplRec = rec || me.tplRec;
		if(rec){
			var editor = erp.SupcanUtil.getSupcanById(me.supcanId);
			if(editor){
				if (Ext.isEmpty(rec.get('tpl_xml')))
					me.CreatedsCenter();
				else
				{
					editor.func("Build",rec.get('tpl_xml'));
					editor.func('callfunc','163\r\n163'); 
				}	
	  		}
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
				var obj = Ext.JSON.decode(response.responseText);
				var datas=[],pdescs=[],memo=[],dsId=[],list_id=[],dsType=[];
				var sql="";
				var index=0;
				  Ext.each(obj.data,function(item){
				  	if (item.data_type!='DS_PARAM'){
					  	 sql=(item.ds_id==0?Ext.JSON.decode(item.script_sql).editSql:item.script_sql);
				  		me.setPanelStatus(item)
				  	}else
				  		 sql=item.script_sql
	                	me.getDsDesc(item.ds_id)
	                	dsId[index]=item.ds_id;
	                	memo[index]=item.tip;
	                	list_id[index]=item.list_id;
						dsType[index]=item.data_type;
						me.sqlResult=erp.AnalysisFun.exe_sql(sql,(item.dsid=='0'?"":item.dsid));
						datas[index]=Ext.JSON.encodeValue(me.sqlResult.DATA_ROWS);
						pdescs[index]=me.createDatasource(me.data,me.descMap,me.typeMap);
						index++;
				  });
				  editor.func('CloseLoadMask','');
				 erp.SCReportUtil.makeReportByData(editor,'json',datas,pdescs,me.tplRec.get('tpl_xml'),{url:'dc/execSqlQuery.do',typeM:'JSON',type:4,memo:memo,dsId:dsId,list_id:list_id,dataType:dsType});
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
	setPanelStatus:function(item){
			var me=this;
			if (item.ds_id!=0)
				return;
			
			var sqlObj=Ext.JSON.decode(item.script_sql);	
			if (Ext.isEmpty(sqlObj.data))
				return;
				
			var store = new Ext.data.JsonStore({
				fields:['ope','opeVal','field_type','ft_ff_id'],
				data:sqlObj.data
			})
			me.cdtPanel.items.add(Ext.create('Ext.grid.Panel',{
				itemId:'grid'+item.list_id,
				title:'ds'+item.ds_id+'数据源',
				tbar:[{text:'查询',iconCls:'query'},{text:'清空',iconCls:'broom'},'-',{text:'设为默认条件',iconCls:'save'}],
				padding:5,
				columns:[{header:'',xtype:'rownumberer',width:35},
					{header:'字段名',dataIndex:'ft_ff_id',flex:2},
					{header:'比较符',dataIndex:'ope',flex:1},
					{header:'值',dataIndex:'opeVal',flex:2}
				],
				store:store
			}));
			me.cdtPanel.doLayout();
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
    }
});