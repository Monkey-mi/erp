Ext.define('erp.report.engine.view.WriteableTemplateDesigner', {
	extend: 'erp.ux.Panel',
	alias: 'widget.dc_userdesigner',
	requires: ['erp.util.form.Supcan','erp.report.engine.util.AnalysisFun'],
	hideMode: 'offsets',
	layout: 'border',
	dsObj:{},
	/**
	 * 当前操作的模板记录
	 */
	tplRec: null,
	tables:[],
	tblObj:{},
	isAdd:false,
	workMode: {
		'01': 'DesignTime',
		'02': 'UploadDesignTime',
		'03': 'UploadRunTime',
		'04': 'RunTime',
		'05': 'InputDSRunTime'
	},
	/**
	 * supcan控件用指标库
	 */
	itemLibrary: null,
	reportType:'01',
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
		me.gridStore=Ext.create('erp.report.engine.store.UserDefineReports');
		var workmode='workmode=' + me.workMode['05']+";Rebar=Main;main=105,106,189";
		var leftPanel=Ext.widget('grid',
			{
			split:true,
			region:'west',
			title:'统计数据记录',
			flex:1,
			collapsible:true,
			itemId:'grdReportList',
			tbar:[
			{text:'新增',iconCls:"page_add",itemId:'BTN_ADD'},
			{text:'编辑',iconCls:"page_edit",itemId:'BTN_EDT',disabled:true},
			{text:'删除',iconCls:"page_delete",itemId:'BTN_DEL',disabled:true},
			"-",
			{text:'刷新',iconCls:'page_refresh',handler:function(){
				me.gridStore.load();
			}}
			],
			columns:[{header:'',xtype:"rownumberer",width:20
			},{
				header:'统计名称',
				dataIndex:'report_name',
				flex:2			
			},{header:"年度",dataIndex:'report_year',flex:1},
			{header:"月份",dataIndex:'month',flex:1},	
			{
				header:'备注说明',
				dataIndex:'remark',
				flex:2
			}],
			store:me.gridStore,
			dockedItems:[{
			    		xtype : 'pagingtoolbar',
			    		store:me.gridStore,
			    		dock:'bottom',
			    		displayInfo:true
			}]
		});	
		me.supcanId = Ext.id();
		me.items =[leftPanel,
			Ext.create('Ext.container.Container',
			{
				region:'center',
				flex:4,
				itemId:'cntrContent',
				layout:{type:"vbox",align:'stretch'},
				items:[{xtype:'form',bodyPadding:5,
						itemId:'cntrTitle',
						border:false,
						frame:true,
						disabled:true,
						layout:{type:'hbox',align:'stretch',defaultMargins:'5 20 5 10'},
						defaults:{labelWidth:60,msgTarget: 'qtip'},
						items:[
						{xtype:'textfield',fieldLabel:'统计名称',flex:1,itemId:'txtReportName',allowBlank:false,blankText:'报表名称不能为空'},
						{xtype:'textfield',readOnly:true, fieldLabel:'年度',flex:1,hidden:true,itemId:'txtYear',allowBlank:false,blankText:'年度不能为空'},
						{xtype:'textfield',readOnly:true, fieldLabel:'月份',flex:1,hidden:true,itemId:'txtMonth',allowBlank:false,blankText:'年度不能为空'},
						{xtype:'textfield',fieldLabel:'备注说明',flex:2,itemId:'txtRemark'},
						{xtype:'textfield',fieldLabel:'周期特性',flex:1,itemId:'txtCycle',hidden:true},
						{xtype:'button',text:'归档',iconCls:'save',itemId:'BTN_SAVE',width:80}]
						},
						me.tplEditor = Ext.widget('component', {
						border: false,
						flex:1,
						hideMode: 'offsets',
						html: erp.SupcanUtil.getReport(me.supcanId,workmode)
				})
				]
			})];
		erp.Const.application.on('supcanReady', me.onSupcanReady, me);
		erp.Const.application.on('supcanEvent', me.onSupcanEvent, me);
		me.callParent(arguments);
	},
	initSupCan:function(rec){
		var me=this;
		me.isAdd=false;
		me.isEdit=false;
		me.down('#cntrTitle').down('#txtReportName').setValue('');
		me.down('#cntrTitle').down('#txtYear').setValue('');
		me.down('#cntrTitle').down('#txtRemark').setValue('');
		me.down('#cntrTitle').setDisabled(true);
		if (rec){
			var type=rec.get('type');
			type=type.substring(type.indexOf('t')+1);
			me.reportType=type;
		}
		var editor = erp.SupcanUtil.getSupcanById(me.supcanId);
		editor.func('DeleteWorksheet','');
	},
	onSupcanReady: function(id) {
		var me = this;
		switch(id){
		// 根据id判断，只处理与自己相关的报表控件
		case me.supcanId:
			var s = erp.SupcanUtil.getSupcanById(id);
			// 注册事件
			s.func('SubscribeEvent', 'Clicked');
			//设定权限；不允许增删列
			s.func('Swkrntpomzqa','512,256');
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
					if (p3=='start'){
						s.func('Calc',"");
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
	saveReport: function(rec) {
		var me = this;
		var editor = erp.SupcanUtil.getSupcanById(me.supcanId);
		if(editor){
			if(rec){
				if(me.tplRec.report_type==erp.Const.BIZ_TYPE_STATS){
					 var xml = editor.func('GetChangedXml','');
					 if (xml){
					 	var xmlDoc=Ext.XmlUtil.loadXMLString(xml);
						var node=xmlDoc.getElementsByTagName("record")[0];
						if (node)
					 		me.doSaveRptFrmInput(editor,xml,erp.Const.UPDATE_DATA);
					 	else
					 		erp.Util.showMsg('无数据可被保存!');
					 }
				}
				else{
					var tpl_xml = editor.func('GetFileXML', 'isSaveCalculateResult=true');
					rec.set('report_content',tpl_xml);
					
				}
				if (rec.get('rpt_id')==0)
						me.gridStore.add(rec);
					else
						me.gridStore.update(rec);
					me.gridStore.sync({success:function(){
						erp.Util.showMsg('保存成功!');
					}});
					me.gridStore.sort();	
			}
		}
	},
	doSaveRptFrmInput:function(AF,xml,dataAct){
		var me=this;
		var xmlDoc=Ext.XmlUtil.loadXMLString(xml);
		var node=xmlDoc.getElementsByTagName('table');
		me.tblObj=me.tables[node.item(0).attributes[0].value.substring(2)];
		erp.SupcanUtil.saveReport2Data(xml,dataAct,function(retRecs,errMsg){
				if(Ext.isArray(retRecs)){
					AF.func('ResetChanged', '');
					erp.Util.showMsg('保存成功!');
				}else{
					erp.Util.showMsg(errMsg);
				}
			},me.tblObj);
		
	},	
	getAddflag:function(){
		return this.isAdd;
	},
	setAddflag:function(flg){
		this.isAdd=flg;		
	},
	/**
	 * 加载报表模板
	 */
	loadReport: function(rec,conditions) {
		var me = this;
		if (conditions){
			me.tblObj[erp.Const.WHERE_CONDITIONS]=conditions.condition;
			
		}
		
		// 指定记录或者当前记录
		var rec = me.tplRec = rec || me.tplRec;
		if(rec){
			var editor = erp.SupcanUtil.getSupcanById(me.supcanId);
			me.tblObj[erp.Const.STATS_CYCLE]=rec.cycle;
			if(editor){
				if (Ext.isEmpty(rec.xml))
					me.CreatedsCenter();
				else
					erp.SCReportUtil.makeReportByXml(editor,rec.tpl_xml);
	  		}
		}
	},
	CreatedsCenter:function(){
		var me=this;
		var editor = erp.SupcanUtil.getSupcanById(me.supcanId);
		//2、定义数据源
		Ext.Ajax.request({
			url: 'dc/dsCenterService.do?method=getDsCenterListAll',
			async : false,
			params: {
				list_id: me.tplRec.list_id
			},
			success: function(response) {
				var obj = Ext.JSON.decode(response.responseText);
				var datas=[],pdescs=[],memo=[],dsId=[],list_id=[],dsType=[],params=[];
				var sql="";
				var index=0;
				me.dsObj=obj.data;
				Ext.each(obj.data,function(item){
				  	if (item.data_type!='DS_PARAM'){
					  	 sql=(item.ds_id==0?Ext.JSON.decode(item.script_sql).sql:item.script_sql);
					  	 me.tblObj[erp.Const.TABLE_NAME]=erp.Const.TABLE_PREFIX+item.table_name;
					  	 me.tblObj[erp.Const.PRIMARY_KEY]=erp.Const.KEY_FIELDCODE;
				  		 me.tblObj[erp.Const.STATS_FIELDS]=item.fd_code;
				  		 me.tblObj[erp.Const.DATASOURCE_CODE]=item.dsid;
				  		 switch(me.srcRec.cycle){
								case erp.Const.STATS_CYCLE_DAY:
									 me.tblObj[erp.Const.WHERE_CONDITIONS]=Ext.String.format(me.tblObj[erp.Const.WHERE_CONDITIONS],me.tblObj[erp.Const.STATS_FIELDS]);
									break;
								case erp.Const.STATS_CYCLE_WEEK:
									 me.tblObj[erp.Const.WHERE_CONDITIONS]=Ext.String.format(me.tblObj[erp.Const.WHERE_CONDITIONS]," datename(week,"+me.tblObj[erp.Const.STATS_FIELDS]+")"," datename(year,"+me.tblObj[erp.Const.STATS_FIELDS]+")");
									break;
								case erp.Const.STATS_CYCLE_MONTH:
									 me.tblObj[erp.Const.WHERE_CONDITIONS]=Ext.String.format(me.tblObj[erp.Const.WHERE_CONDITIONS]," datename(month,"+me.tblObj[erp.Const.STATS_FIELDS]+")"," datename(year,"+me.tblObj[erp.Const.STATS_FIELDS]+")");
									break;
								case erp.Const.STATS_CYCLE_SEASON:
									break;
								case erp.Const.STATS_CYCLE_YEAR:
									 me.tblObj[erp.Const.WHERE_CONDITIONS]=Ext.String.format(me.tblObj[erp.Const.WHERE_CONDITIONS]," datename(year,"+me.tblObj[erp.Const.STATS_FIELDS]+")");
									break;
								default:
									condition="";
							}
							
						 	me.tblObj[erp.Const.WHERE_CONDITIONS]=Ext.String.format(me.tblObj[erp.Const.WHERE_CONDITIONS],me.tblObj[erp.Const.STATS_FIELDS]);
						 	params.push(me.tblObj[erp.Const.WHERE_CONDITIONS])
						 	me.tables.push(me.tblObj);
					  	 }
				  	else
				  		sql=item.script_sql
						me.sqlResult=erp.AnalysisFun.exe_sql(sql,(item.dsid=='0'?"":item.dsid));
	                	me.getDsDesc(item.ds_id)
	                	dsId[index]=item.ds_id;
	                	memo[index]=item.tip;
	                	list_id[index]=item.list_id;
						pdescs[index]=me.createDatasource(me.data,me.descMap,me.typeMap);
						datas[index]=JSON.stringify(me.sqlResult.DATA_ROWS);
						dsType[index]=item.data_type;
						index++;
				  	});
				 	erp.SCReportUtil.makeReportByData(editor,'json',datas,pdescs,me.tplRec.tpl_xml,{url:'dc/execSqlQuery.do',typeM:'JSON',type:4,memo:memo,dsId:dsId,list_id:list_id,dataType:dsType,params:params});
				 	
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
	setRecData:function(rec){
		var me=this;
		me.tplRec=rec;
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