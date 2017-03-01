Ext.define('erp.report.engine.controller.CustomReportList',{
	extend:'Ext.app.Controller',
	requires:[
	          'erp.report.engine.model.ReportDocTree',
	          'erp.common.function.store.CurrentTreeR',
	          'erp.report.engine.view.SqlTreeStyle',
	          'erp.report.engine.view.SqlSupcanStyle',
	          'erp.report.engine.view.SqlPreviewGrid',
	          'erp.bi.view.CustomQueryChartPortlet'
	          ],
	views:[
	       'erp.report.engine.view.CustomReportList',
	       'erp.report.engine.view.CustomReportSql',
	       'erp.bi.view.MultiDatasource',
	       'erp.report.engine.view.SqlPreviewGrid',
	       'erp.bi.view.CustomQueryChartPortlet',
	       'erp.report.engine.view.WriteableTemplateDesigner'
	       ],
	refs: [
           {ref:'customReportList',selector:'CustomReportList'},
	       {ref:'docuTree',selector:'CustomReportList #docuTree'},
	       {ref:'resultList',selector:'CustomReportList #result_list'},
	       {ref:'reportScript',selector:'reportScript'},
	       {ref:'contentPermit',selector:'CustomReportList ContentPermit'},
	       {ref:'customReportSql',selector:'CustomReportSql'},
	       {ref:'sqlreport',selector:'CustomReportSql #sql_report'},
	       {ref:'sqlwin',selector:'CustomReportSql #sql_win'},
	       {ref:'sqledit',selector:'CustomReportSql #sql_edit'},
	       {ref:'dataSourse',selector:'CustomReportSql #dataSourse'},
	       {ref:'custFilter',selector:'CustomReportSql #custFilter'},
	       {ref:'customFilter',selector:'CustomReportSql #customFilter'},
	       {ref:'selectresult',selector:'CustomReportSql #select_result'},
	       {ref:'sqlPreviewGrid',selector:'SqlPreviewGrid'},
	       {ref:'customQueryChartPortlet',selector:'customQueryChartPortlet'},
	       {ref:'ContentPermitGrid',selector:'CustomReportList ContentPermit grid'},
	       {ref:'multiDatasource',selector:'MultiDatasource'},
	       {ref:'DsCenter',selector:'MultiDatasource #dsCenter'},
	       {ref:'sqlDefine',selector:'MultiDatasource #sqlDefine'},
	       {ref:'sqlDesc',selector:'MultiDatasource #sqlDesc'},
	       {ref:'dsParams',selector:'MultiDatasource #dsParams'},
	       {ref:'sqlScript',selector:'MultiDatasource #Sql_script'}
	      ],
	//sql执行结果
	sqlResult:null,
	displayPanel:null,
    init:function(app){
    	var me = this;
		//controller只初始化一次
		if(me.isInited) {
			return;
		}
    	me.control({
    		'CustomReportList':{
    			beforerender:function(cmp){
    				cmp.initMyPanel();
    			},
    			afterrender: function(cmp){
    				me.getDocuTree().loadDocu();
    				var grid=me.getResultList();
    				me.rowedit(grid);
    			}
    		},
    		'CustomReportSql':{
    			afterrender: function(cmp){
    				var source = Ext.create('erp.setup.model.ExtDataSource', {
    			        dstype:'',
    			        dscode:'',
    			        dsname:'本系统数据源',
    			        srvaddr:'',
    			        srvport:'',
    			        srvlogin:'',
    			        srvpwd:'',
    			        dbname:''
    				});
    				cmp.down('#dataSourse').store.insert(0,source);
    			}
    		},
    		'CustomReportSql #select_result button':{
    			click : function(btn){
    				switch(btn.itemId){
    				case 'docu_preview':
    					var style = me.getSelectresult().down('#displayStyle').getValue();
    					this.sqlPreview(style);
    					break;
    				}
    			}
    		},
    		'CustomReportSql button':{
    			click : function(btn){
    				switch(btn.itemId){
    				case 'docu_add':
    					this.sqlStart();
    					break;
    				case 'docu_del':
    					this.deleteSql();
    					break;
    				case 'docu_save':
    					this.saveSql();
    					break;
    				}
    			}
    		},
    		'CustomReportSql #dataSourse':{
//    			select : function(value){
//    				var custFilter = me.getCustFilter();
//    				if(value.getValue()!=''&&value.getValue()!=null){
//    					custFilter.disable();
//    				}else if(custFilter.isDisabled()){
//    					custFilter.setDisabled(false);
//    				}
//    			}
    		},
    		'CustomReportList #docuTree button':{
    			click : function(btn){
    				switch(btn.itemId){
    				case 'docu_add':
    				{	
    					var reportList = me.getResultList(); 
    					var docRec = me.getDocuTree().getSelectDocu();
    					if (reportList.getStore().getCount()==0 || !docRec.get('leaf')){
    						me.getDocuTree().addDocu();
    						}
    					else{
    						Ext.Msg.alert("提示","该目下存在报表记录,无法新增下级目录。");
    					}
    				}	
    					break;
    				case 'docu_del':
    				{
    					var docRec = me.getDocuTree().getSelectDocu();
    					if (docRec){
    						if (docRec.get('parentId')==0||!docRec.get('leaf')) {
    							Ext.Msg.alert('提示',"无法删除根目录或非末级目录!");
    							return;
    						}
    						
	    					Ext.Msg.confirm('提示',"你确定要删除这个目录吗?",function(btn){
	    						if (btn=="yes"){
	    							me.getDocuTree().deleteDocu();
	    						}
    						
    					});
    					}else{
    						Ext.Msg.alert('提示','请选择一个目录!');
    					}
    				}	
    					break;
    				case 'docu_edt':
    					me.getDocuTree().updateDocu();
    					break;
    				case 'docu_refresh':
    					me.getDocuTree().refesh();
    					me.getResultList().clear();
    					 /*var cPermission = me.getCustomReportList1().getContentPermission();
    		 			 cPermission.clearContent();*/
    					break;
    				}
    			}
    		},
    		'CustomReportList #docuTree':{
    			select : function(rowModel,rec){
    				me.getResultList().setBarDisable(true,'normal');
    				var p = me.getCustomReportList();
    				p.myload(p.isadmin,rec.get('nodeId'));
    			}
    		},
    		'CustomReportList #result_list':{
    			selectionchange : function(sm,recs){
 				   if(recs.length>0){
					   var resultRec = recs[0];
		 			   var level = resultRec.get('level');
		 			   var p = me.getCustomReportList();
		 			   me.doSelectChange();
				   }
	 			}
    		},
    		'CustomReportList #result_list #top_bar button':{
    			click : function(btn){
    				var panel = me.getCustomReportList();
    				var reportList = me.getResultList();
    				var reportListStore = me.getResultList().getStore();
    				var recs = me.getResultList().getSelectionModel().getSelection();
    				var docRec = me.getDocuTree().getSelectDocu();
    				switch(btn.itemId){
    				case 'reportlist_refresh':
    					panel.myload(null,docRec.get('nodeId'));
    					break;
    				case 'reportlist_add' :{
    					if(docRec){
    					    //panel.addupdateItem(panel,null,docRec);
    						if (!docRec.get('leaf'))
    						{
    							Ext.Msg.alert('提示','该目录非末级目录,请重新选择');
    							return;
    						}
//    						reportList.setBarDisable(true,'all');
    						panel.addItem(reportList,panel,reportListStore,docRec);	
    					}else{
    						Ext.Msg.alert('提示','请选择一个目录!');
    					}
    				}	
    				break;
    				case 'reportlist_delete':{
	    				if(recs.length>0){
	    					switch(btn.itemId){
		        				case 'reportlist_modify':
		        					reportList.setBarDisable(true,'all');	
		        					panel.updateItem(recs[0],reportList);
		        					break;
		        				case 'reportlist_delete':
		        				    Ext.Msg.confirm('提示',"你确定要删除该报表及其关联的订阅记录吗?",function(btn){
		        				    	if (btn=="yes")
		        				    		panel.deletData(recs);
		        				    });
		        					
		        					break;
		        				case 'reportlist_query':
		        					erp.report.engine.util.AnalysisFun.doquery(recs[0],panel);
		        					break;
	        				}
	    				}else{
	    					Ext.Msg.alert('提示','请选择一条记录!');
	    				}
    				}
    				break;
	    			}
    			}
    		},
    		'CustomReportList ContentPermit button':{
    		  click:me.ContentPermitBtnClick
    		},
    		'publicRestrict button':{
    		    click:me.editContentPermitBtnClick
    		},
    		'reportScript grid':{
    		   selectionchange:function(model,rec){
    		   	 if(rec.length>0){
	    		   	var win=me.getReportScript();
	    		   	win.down("#script_delete").setDisabled(false);
	    		   	win.down("#contentPanel").setDisabled(false);
	    		   	win.editor.setValue(rec[0].get('content'));
    		   	 }
    		   }
    		},
    		'reportScript button':{
    			click:me.ReportScriptBtnclick
    		},
    		
    		'MultiDatasource #dsCenter': {
				afterrender:function(){
					var dsStore=me.getDsCenter().getStore();
					dsStore.load();
					me.centerStore=dsStore;
				},
				selectionchange : this.DsChange,
				itemdblclick : function() {
							this.doEditDsCenter(true);
				}
			},
    		'MultiDatasource #dsCenter button':{
    			click:function(btn){
    				var me =this;
    				var dsStore=me.getDsCenter().getStore();
    				switch(btn.itemId){
    					case erp.Const.FUNC_ITEMID_BTN_ADD:
    					{
    						me.doAddDsCenter();
    						break;
    					}
    					case erp.Const.FUNC_ITEMID_BTN_EDT:
    					{
    						me.doEditDsCenter();
    						break;
    					}
    					case erp.Const.FUNC_ITEMID_BTN_DEL:{
    						me.doDelDsCenter();
    						break;
    					}
    					case erp.Const.FUNC_ITEMID_BTN_REFRESH:
    					    dsStore.load(
							{
								params:{'list_id':me.getMultiDatasource().listId}
							});
							break;
    				}
    			}	
    			
    		},
    		'edt_dscenter button' : {
						click : this.saveCenterClick
			},
			'MultiDatasource #dsParams': {
				afterrender:function(){
					var dpStore=me.getDsParams().getStore();
					dpStore.load();
					me.paramStore=dpStore;
				},
				itemdblclick : function() {
							this.doEditDsParam();
				}
			},
			
			'MultiDatasource #dsParams button':{
				click:function(btn){
					var me=this
					switch(btn.itemId){
						case erp.Const.FUNC_ITEMID_BTN_ADD:
							me.doParamsAdd();
							break;
						case erp.Const.FUNC_ITEMID_BTN_EDT :
							me.doEditDsParam();
							break;
						case erp.Const.FUNC_ITEMID_BTN_DEL :
							me.doDelDsParam();
							break;
						case erp.Const.FUNC_ITEMID_BTN_REFRESH :
							me.paramStore.load();
							break;	
					}
				}
			},
			'edt_dsparam button' : {
						click : this.saveDpClick
			},
			'MultiDatasource #sqlDesc':{
				afterrender : function() {
							me.descStore = me.getSqlDesc().getStore();
						},
						itemdblclick : function() {
							this.doEditDsDesc(true);
						}
			},
			'dsdesc button' : {
						click : me.DescBtnClick
					},
			'edt_desc button' : {
						click : this.EditDsDescBtnClick
			},
			'ds_sqlscript button' :{
				click: function(btn){
					if (btn.itemId!='docu_save')
						me.getSqlScript().doAction(btn);
					else
						me.saveSqlforMulti();
				}
			}		
    	});
    	
    	//初始化完成
    	this.isInited = true;
    },
    
    //sql报表保存
	saveSql: function(){
		var me = this;
		var sqlPanel = me.getCustomReportSql();
		var edit = me.getSqledit().getValue().replace(/(^\s*)|(\s*$)/g, "");
		var models = me.getCustomFilter().getCdtions();
		var param = [];
		var sqlWhere='1=1';
		var editSql=edit;
		var newRec;
		for(var i=0;i<models.length;i++){
			newRec = models[i];
			param.push({
				//"l_id":result.get('list_id'),
				"ope":newRec.get('ope'),
				"opeVal":newRec.get('opeVal'),
				"field_type":newRec.get('field_type'),
				"ft_ff_id":newRec.get('ft_ff_id'),
				'freg_id': newRec.get('freg_id'),
				"cd_type":newRec.get('cd_type')
			});
				if (newRec.get('opeVal') instanceof Date)
					 sqlWhere+=' and ' +newRec.get('ft_ff_id')+' '+newRec.get('ope')+' \''+Ext.Date.format(newRec.get('opeVal'),'Y-m-d')+'\'';
				else
					sqlWhere+=' and ' +newRec.get('ft_ff_id')+' '+newRec.get('ope')+' \''+newRec.get('opeVal')+'\'';
		}
		if(sqlWhere!=null){
			editSql = "select * from ("+editSql+") a "+"where "+sqlWhere;
		}
		/**
  		  * 将操作保存为操作模板
  		  */
	    if(edit!=null && edit!=""){
	    	 var result = {
    				sql: edit,
    				data:param,
    				editSql:editSql
    		 }
			 var myname = sqlPanel.getDockedItems('toolbar[dock="top"]')[0].down('#queryName').getValue().replace(/(^\s*)|(\s*$)/g, "");
			 var dsId = sqlPanel.down('#dataSourse').getValue();
    		 var displayStyle = me.getSelectresult().down('#displayStyle').getValue();
    		 sqlPanel.setGridRecord(displayStyle,Ext.JSON.encode(result),myname,dsId);
	    }else{
		  Ext.Msg.alert('提示','SQL为空');
	    }   
	},
    
    //sql语句执行
	sqlStart: function(){
		var me = this;
		var dscode = me.getDataSourse().getValue();
		var sql = me.getSqledit().getValue();
		var models = me.getCustomFilter().getCdtions();
		var newRec;
		var sqlWhere='1=1';
		for(var i=0;i<models.length;i++){
			newRec = models[i];
			if (newRec.get('opeVal') instanceof Date)
				 sqlWhere+=' and ' +newRec.get('ft_ff_id')+' '+newRec.get('ope')+' \''+Ext.Date.format(newRec.get('opeVal'),'Y-m-d')+'\'';
			else
				sqlWhere+=' and ' +newRec.get('ft_ff_id')+' '+newRec.get('ope')+' \''+newRec.get('opeVal')+'\'';
		}
		if(sqlWhere!=null){
			sql = "select * from ("+sql+") a "+"where "+sqlWhere;
		}
		me.sqlResult = erp.AnalysisFun.exe_sql(sql,dscode);
		if(me.sqlResult!=null){
			var selectresult =erp.report.engine.util.AnalysisFun.createTable(me.sqlResult);
			if(!me.getSelectresult().down('#sel_result')){
				me.getSelectresult().add(selectresult);
			}else{
				me.getSelectresult().remove(me.getSelectresult().down('#sel_result'));
			    me.getSelectresult().add(selectresult);	
			}
		}
	},
	//sql语句清空
	deleteSql: function(){
		var me = this;
		var edit = me.getSqledit();
		edit.setValue('select');
	},
	
    //创建sql查询结果表
	createTable: function(result){
		var arrField =[];
		var arrClu = [];
		for (var i = 0; i < result.DATA_FIELDS.length; i++){
		    var f = {name:result.DATA_FIELDS[i].name};
		    var c = {
	                text     : result.DATA_FIELDS[i].name,
	                flex     : 1,
	                dataIndex: result.DATA_FIELDS[i].name
	            };
		    arrField[i]=f;
		    arrClu[i] = c;
		};
		var store = Ext.create('Ext.data.Store', {
	        fields: arrField,
	        data:result.DATA_ROWS
		});
		var selectresult = Ext.create('Ext.grid.Panel',{
			itemId:'sel_result',
			plugins: {
				        ptype: 'bufferedrenderer',
				        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
				        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
			},
			store:store,
			columns:arrClu
        });
		return selectresult;
	},
	//初始化rowedit
	rowedit:function(grid){
	    	  var me=this;
	    	  var i=1;
	    	  var rowEdit=grid.getPlugin('rowedit1');
	    	  rowEdit.on('validateedit',me.validateedit);
	    	  rowEdit.on('beforeedit',me.BeforeEdit);
	    	  rowEdit.on('canceledit',me.canceledit);
	    	  rowEdit.on('edit',function(editor, e) {
			    // commit the changes right after editing finished
	    	  	var store=e.grid.getStore();
	    	  	if (e.record.get('report_type')=='数据统计报表')
	    	  		e.record.set('tpl_type','05');
	    	  	else
	    	  		e.record.set('tpl_type','01');
	    	  	store.sync({
	    	  		success:function(){
	    	  			store.sort();
	    	  		}
	    	  	});
	    	  	store.load();
	    	  	e.record.commit();
});
	    		
	      },
	BeforeEdit:function(editor,e,obj){
		var columns=editor.grid.columns;
			Ext.each(columns,function(column){
				if(column.dataIndex=='name'||column.dataIndex=='report_type'||column.dataIndex=='description'||column.dataIndex=='cycle'){
						column.field.setDisabled(false);
						if (column.dataIndex=='report_type' && e.record.get('report_type')!=''){
							 column.field.setValue(e.record.get('report_type'));		
							 }
				}
				else if(column.field){
						column.field.setDisabled(true);
				}
		    });
	},
	canceledit:function(editor,e,obj){
		if (e.record.get('name')==''){
			e.store.remove(e.record);
			e.store.sort();
		}	
	},
	validateedit:function(editor,e,obj){
		if(e.newValues.name!=""&&e.newValues.report_type!=""){
			return true;
		}
		return false;
	},    
    //展示方式预览
	sqlPreview: function(style,list_id) { 
	    var me = this;
		if(me.sqlResult!=null){
			 switch(style){
				case 'gridQueryStyle':
					me.sqlPreviewGrid(list_id);
					break;
				case null:
					me.sqlPreviewGrid(list_id);
					break;
				case 'supacnReportStyle':
					me.sqlPreviewSupacn();
					break;
				case 'supcanTreeListStyle':
					me.sqlPreviewTree();
					break;
			 }
		}else{
			Ext.MessageBox.show({title:'提示',icon:Ext.MessageBox.INFO,msg:'请先执行查询后再预览',buttons:Ext.MessageBox.OK});
		}
		
	},
	
	//显示普通表格
	sqlPreviewGrid: function(list_id){
		 var me = this;
		 var selectresult = me.createTable(me.sqlResult);
		 var resultpreview = Ext.create('erp.report.engine.view.SqlPreviewGrid',{
     			itemId: 'SqlPreview',
     			closable: true,
     			customQueryId:list_id
     			
     	 });
		 resultpreview.down('#alytar').store = Ext.create('Ext.data.Store', {
			fields : [
	            'name',
	            'code',
	            'datatype'
		    ],
		    data : me.sqlResult.DATA_FIELDS
		 });
     	 resultpreview.down('#sql_preview').add(selectresult);
		 if(me.displayPanel) {
			 erp.Util.closeContentTab(me.displayPanel);
		 }
		 me.displayPanel = erp.Util.addContentTab(resultpreview);
	},
	
	//显示电子表格
	sqlPreviewSupacn: function(){
		 var me = this;
		 me.createSqlPreview('erp.report.engine.view.SqlSupcanStyle','SqlSupcanPreview');
	},
	
	//显示树列表
	sqlPreviewTree: function(){
		 var me = this;
		 me.createSqlPreview('erp.report.engine.view.SqlTreeStyle','SqlTreePreview');
		 
	},
	//创建展示电子表格视图、树视图
	createSqlPreview: function(v,id){
		 var me = this;
		 var result = me.sqlResult;
		 var tableField =[];
		 var treeField =[];
		 for (var i = 0; i < result.DATA_FIELDS.length; i++){
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
		     tableField[i]=f;
		     treeField[i]=t;
		 };
		 var supacnpreview = Ext.create(v,{
     			itemId: id,
     			closable: true
     	 });
		 if(id=='SqlSupcanPreview'){
			 supacnpreview.makeListPanel(result.DATA_ROWS,tableField,null);
		 }else{
			 supacnpreview.makeListPanel(result.DATA_ROWS,treeField,null);
		 }
		 if(me.displayPanel) {
			 erp.Util.closeContentTab(me.displayPanel);
		 }
		 me.displayPanel = erp.Util.addContentTab(supacnpreview);
	},
	/*******************内容授权相关******************/
	editContentPermitBtnClick:function(btn){
		    var me=this;
			var panel=btn.up('publicRestrict');
	        switch(btn.action){
	          case 'ACT_SAVE':
	          var rec=panel.saveallCp();
	          var store=me.getContentPermitGrid().getStore();
	   		  store.add(rec);
	   		  panel.close();
	          break;
	        }
	},
	ContentPermitBtnClick:function(btn){
		var me=this;
		var panel=btn.up('ContentPermit');
	  switch(btn.action){
	    case 'ACT_SAVE':
	    var store=me.getContentPermitGrid().getStore();
	    store.sync();
	    break;
	    case 'ACT_ADD':
	    me.doAddCp();
	    break;
	    case 'ACT_DELETE':
	    me.doDeleteCp();
	    break;
	  }
	},
	doAddCp:function(){
	   var me=this;
	   var panel=me.getResultList();
	   var rec=panel.getSelectionModel().getSelection()[0];
	   if(!rec){
	    Ext.Msg.alert('提示','请先选择一个报表');
	    return;
	   }
	   var model=Ext.create('erp.main.model.ContentPermit',{
	       cp_module:'report',
	       cp_table_key:rec.get('list_id')
	   });
	   var win=Ext.widget('publicRestrict');
	   win.show();
	   win.loadRecord(model);
	},
	doDeleteCp : function() {
		var me = this;
		var panel = me.getContentPermitGrid();
		var rec = panel.getSelectionModel().getSelection()[0];
		if (!rec) {
			Ext.Msg.alert('提示', '请先选择一个权限');
			return;
		}
		Ext.Msg.confirm('提示', '确认要删除这条吗？', function fn(ids) {
			if (ids == Ext.Msg.buttonIds[1]) {
				panel.getStore().remove(rec);
				panel.getStore().sync();
			}
		});
	},
	doSelectChange:function(){
	  var me=this;
	  var rec=me.getResultList().getSelectionModel().getSelection()[0];
	  var store=me.getContentPermitGrid().getStore();
	  store.load({
	  	params:{
	  	 cp_module:'report',
	     cp_table_key:rec.get('list_id')
	  	},
	  	callback:function(){
	  		if(!me.isAdmin){
	  		 me.getCustomReportList().setContent(store);
	  		}
	  	}
	  });
	},
	
	doAddDsCenter:function(){
		var me=this;
    	var rec = Ext.create('erp.bi.model.DatasourceCenter',{
    		'list_id':me.getMultiDatasource().listId
    	});
    	var editwin = Ext.widget('edt_dscenter', {
    				reportType:me.getMultiDatasource().reportType,
    				cycleType:me.getMultiDatasource().cycleType,
					isAddNews : true
				});
		
		editwin.down('form').loadRecord(rec);		
		editwin.show();
    },
	
	saveCenterClick : function(btn) {
		var me = this;
		var win = btn.up('window');
		switch (btn.action) {
			case "ACT_SAVE" :
				var form = win.down('form')
				if (form.getForm().isValid() && form.getForm().isDirty()) {
					var rec = form.getRecord();
					form.getForm().updateRecord(rec);
					me.SaveDsCenter(rec);
					win.close();
				}
				break;
			case "ACT_CLOSE" :
				win.close();
				break;
		}
	},
	SaveDsCenter : function(rec) {
		var me = this;
		if (me.getMultiDatasource().listId==""){
		  me.getMultiDatasource().setGridRecord();
		}
		rec.set('list_id',me.getMultiDatasource().listId);
		if (me.centerStore.indexOf(rec) < 0) {
			me.centerStore.add(rec);
		}
		me.centerStore.sync();
		me.centerStore.sort();
	},
	DsChange : function() {
		var me = this;
		var grid=me.getDsCenter();
		var rec = grid.getSelectionModel().getSelection()[0];
		if (rec) {
			me.getSqlDefine().setDisabled(false);
//			me.getSqlDesc().setDisabled(false);
//			me.getSqlDesc().DataChange(rec.get('ds_id'));
			me.getSqlScript().DataChange(rec);
			
		} else {
			me.getSqlDefine().setDisabled(true);
//			me.getSqlDesc().setDisabled(true);
		}
	},
	doEditDsCenter : function(isEdit) {
		var me = this;
		var rec = me.getDsCenter().getSelectionModel().getSelection()[0];
		if (!rec) {
			Ext.Msg.alert('提示', '请先选择一条数据');
			return;
		}
		var editwin = Ext.widget('edt_dscenter', {
					isAddNew : true,
					reportType:me.getMultiDatasource().reportType,
    				cycleType:me.getMultiDatasource().cycleType,
					isEdit : isEdit
				});
		editwin.down('form').loadRecord(rec);
		editwin.show();
	},
	doDelDsCenter : function() {
		var me = this;
		var rec = me.getDsCenter().getSelectionModel().getSelection()[0];
		if (!rec) {
			Ext.Msg.alert('提示', '请先选择一条数据');
			return;
		}
		Ext.Msg.confirm('提示', '请问要删除' + rec.get('name') + "吗？",
				function fn(ids) {
					if (ids == Ext.Msg.buttonIds[1]) {
						me.centerStore.remove(rec);
						me.centerStore.sync();
					}
				});
	},
	doParamsAdd:function(){
		var me=this;
		var rec = Ext.create('erp.bi.model.DatasourceParam', {
					'list_id':me.getMultiDatasource().listId
				});
		var edtwin = Ext.widget('edt_dsparam', {
					isAddNew : true
				});
		edtwin.down('form').loadRecord(rec);
		edtwin.show();	
	},
	doEditDsParam : function(isEdit) {
		var me = this;
		var rec = me.getDsParams().getSelectionModel().getSelection()[0];
		if (!rec) {
			Ext.Msg.alert("提示", "请先选择一条参数");
			return;
		}
		var edtwin = Ext.widget('edt_dsparam', {
					isAddNew : true,
					isEdit : isEdit
				});
		edtwin.down('form').loadRecord(rec);
		edtwin.show();
	},
	doDelDsParam : function() {
		var me = this;
		var rec = me.getDsParams().getSelectionModel().getSelection()[0];
		if (!rec) {
			Ext.Msg.alert("提示", "请先选择一条参数");
			return;
		}
		Ext.Msg.confirm('提示', '请问要删除' + rec.get('name') + "吗？",
				function fn(ids) {
					if (ids == Ext.Msg.buttonIds[1]) {
						me.paramStore.remove(rec);
						me.paramStore.sync();
					}
				});
	},
	saveDpClick : function(btn) {
		var me = this;
		var win = btn.up('window');
		switch (btn.action) {
			case "ACT_SAVE" :
				var form = win.down('form')
				if (form.getForm().isValid() && form.getForm().isDirty()) {
					var rec = form.getRecord();
					form.getForm().updateRecord(rec);
					me.SaveDpCenter(rec);
					win.close();
				}
				break;
			case "ACT_CLOSE" :
				win.close();
				break;
		}
	},
	SaveDpCenter : function(rec) {
		var me = this;
		if (me.getMultiDatasource().listId==""){
		  me.getMultiDatasource().setGridRecord();
		}
		rec.set('list_id',me.getMultiDatasource().listId);
		if (me.paramStore.indexOf(rec) < 0) {
			me.paramStore.add(rec);
		}
		me.paramStore.sync();
		me.paramStore.sort();
	},
	DescBtnClick : function(btn) {
		var me = this;
		switch (btn.itemId) {
			case erp.Const.FUNC_ITEMID_BTN_ADD :
				me.doAddDsDesc();
				break;
			case erp.Const.FUNC_ITEMID_BTN_EDT :
				me.doEditDsDesc();
				break;
			case erp.Const.FUNC_ITEMID_BTN_DEL :
				me.doDelDsDesc();
				break;
			case erp.Const.FUNC_ITEMID_BTN_REFRESH :
				me.descStore.load();
				break;
		}
	},
	doAddDsDesc : function() {
		var me = this;
		var datacenter = me.getDsCenter().getSelectionModel()
				.getSelection()[0];
		if (!datacenter) {
			Ext.Msg.alert("提示", "请先选择一条数据源");
			return;
		}
		var rec = Ext.create('erp.bi.model.DatasourceDesc', {
					ds_id : datacenter.get('ds_id')
				});
		var edtwin = Ext.widget('edt_desc', {
					isAddNew : true
				});
		edtwin.down('form').loadRecord(rec);
		edtwin.show();
	},
	
	doEditDsDesc : function(isEdit) {
		var me = this;
		var rec = me.getSqlDesc().getSelectionModel().getSelection()[0];
		if (!rec) {
			Ext.Msg.alert("提示", "请先选择一条描述");
			return;
		}
		var edtwin = Ext.widget('edt_desc', {
					isAddNew : true,
					isEdit : isEdit
				});
		edtwin.down('form').loadRecord(rec);
		edtwin.show();
	},
	doDelDsDesc : function() {
		var me = this;
		var rec = me.getSqlDesc().getSelectionModel().getSelection()[0];
		if (!rec) {
			Ext.Msg.alert("提示", "请先选择一条描述");
			return;
		}
		Ext.Msg.confirm('提示', '请问要删除' + rec.get('col_name') + "吗？",
				function fn(ids) {
					if (ids == Ext.Msg.buttonIds[1]) {
						me.descStore.remove(rec);
						me.descStore.sync();
					}
				});
	},
	EditDsDescBtnClick : function(btn) {
		var me = this;
		var editwin = btn.up('window');
		switch (btn.action) {
			case "ACT_SAVE" :
				var form = editwin.down("form");
				if (form.getForm().isValid && form.getForm().isDirty()) {
					var rec = form.getRecord();
					form.getForm().updateRecord(rec);
					me.SaveDesc(rec);
					editwin.close();
				}

				break;
			case "ACT_CLOSE" :
				editwin.close();
				break;
		}
	},
	SaveDesc : function(rec) {
		var me = this;
		if (me.descStore.indexOf(rec) < 0) {
			me.descStore.add(rec);
		}
		me.descStore.sync();
		me.descStore.sort();
	},
	saveSqlforMulti:function(){
		var me=this;
		var rec=me.getDsCenter().getSelectionModel().getSelection()[0];
		rec.set('script_sql',me.getSqlScript().editor.getValue());
		rec.set('dsid',me.getSqlScript().down('#dataSourse').getValue());
		me.centerStore.sync({
					success : function(){
						Ext.Msg.alert('提示','保存成功!');;
		    		},
		    		scope:this
				});
		rec.commit();
	},
	ReportScriptBtnclick:function(btn){
		var me=this;
		var win = btn.up('window');
		var panel=win.down('grid');
		var store=panel.getStore();
		switch (btn.action) {
			case erp.Const.FUNC_ITEMID_BTN_ADD:
				win.addItem(panel);
				break;
			case erp.Const.FUNC_ITEMID_BTN_DELETE:
			  Ext.Msg.confirm('提示',"你确认要删除这条记录吗?",function(btn){
			  	   if (btn=="yes"){
			  	   		var rec=panel.getSelectionModel().getSelection()[0];
			  	   		store.remove(rec);
			  	   		store.sync();
			  			win.down("#script_delete").setDisabled(true);
    		   			win.down("#contentPanel").setDisabled(true);
			  	   }
			  })
				
			    break;
			case erp.Const.FUNC_ITEMID_BTN_REFRESH:
				store.load();
				break;
			case "ACT_SAVE":
				var rec=panel.getSelectionModel().getSelection()[0];
				rec.set('content',win.editor.getValue());
				store.sync();
				break;
			case "ACT_CLOSE":
				win.close();
				break;
		}
		
	}
});