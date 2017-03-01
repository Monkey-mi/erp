Ext.define('erp.report.engine.controller.CustomReportForSys',{
	extend:'Ext.app.Controller',
	views:['erp.report.engine.view.CustomReportForSys',
		   'erp.bi.view.MultiDatasource'],
	refs:[{ref : 'moduleTree',selector : 'sys_report treepanel'},
			{ref : 'panelReport',selector : 'sys_report'},
			{ref : 'grdReport',selector : 'sys_report gridpanel'},
		    {ref:'multiDatasource',selector:'MultiDatasource'},
	       {ref:'DsCenter',selector:'MultiDatasource #dsCenter'},
	       {ref:'sqlDefine',selector:'MultiDatasource #sqlDefine'},
	       {ref:'sqlDesc',selector:'MultiDatasource #sqlDesc'},
	       {ref:'dsParams',selector:'MultiDatasource #dsParams'},
	       {ref:'sqlScript',selector:'MultiDatasource #Sql_script'}
	],
	init:function(app){
    	var me = this;
		//controller只初始化一次
		if(me.isInited) {
			return;
		}
    	me.control({
    	  'sys_report':{
    	  	afterrender:function(cmp){
    	  		var grid=me.getGrdReport();
    	  		me.grdStore=grid.getStore();
    	  		me.rowedit(grid);
    	  	}
    	  },	    		
    	  'sys_report treepanel' : {
				// 功能模块菜单树节点被选取时,右面模块信息列表中显示该节点及其直接下属节点的信息
				selectionchange :me.onSelectModule
			},
		'sys_report gridpanel button':{
			click:me.doAction			
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
			'MultiDatasource #sqlDesc':{
				afterrender : function() {
							me.descStore = me.getSqlDesc().getStore();
						},
						itemdblclick : function() {
							this.doEditDsDesc(true);
						}
			},
			'edt_dscenter button' : {
						click : this.saveCenterClick
			},
			'ds_sqlscript button' :{
				click: function(btn){
					me.doScriptAction(btn);
//					if (btn.itemId!='docu_save')
//						me.getSqlScript().doAction(btn);
//					else
//						me.saveSqlforMulti();
				}
			},
			'dsdesc button' : {
						click : me.DescBtnClick
					},
			'edt_dsparam button' : {
						click : this.saveDpClick
			},
			'edt_desc button' : {
						click : this.EditDsDescBtnClick
			}
    	});
    	me.isInited=true;
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
	 
		//初始化rowedit
	rowedit:function(grid){
	    	  var me=this;
	    	  var i=1;
	    	  var rowEdit=grid.getPlugin('rowedit');
	    	  rowEdit.on('validateedit',me.validateedit);
	    	  rowEdit.on('canceledit',me.canceledit);
	    	  rowEdit.on('beforeedit',me.BeforeEdit);
	    	  rowEdit.on('edit',function(editor, e) {
			    // commit the changes right after editing finished
	    	  	e.grid.getStore().sync({callback:function(){
	    	  		e.grid.getStore().load({params:{menu_id:e.record.get('menu_id')}});
	    	  	}});
	    	  	e.record.commit();
	});
	}, 
	BeforeEdit:function(editor,e,obj){
		var columns=editor.grid.columns;
			Ext.each(columns,function(column){
				if(column.dataIndex=='name'||column.dataIndex=='mod_description' || column.dataIndex=='order_seq'){
						column.field.setDisabled(false);
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
		if(e.newValues.name!=""){
			return true;
		}
		return false;
	},
	doAction:function(btn){
		var me=this;
		switch(btn.itemId){
		 case erp.Const.FUNC_ITEMID_BTN_ADD:
		 	var rec=me.getTreeRec();
		 	if (Ext.isEmpty(rec)){
		 		Ext.Msg.alert('Tips','请选择菜单模块!')
				return;	
		 	}else if(!rec.get('leaf')){
		 		Ext.Msg.alert('提示','非末级菜单不能新增打印报表,请重新选择!')
				return;
		 	}
		 	var grid=me.getGrdReport();
		 	me.getPanelReport().AddNewRecord(grid,rec);
		 	break;
		case  erp.Const.FUNC_ITEMID_BTN_REFRESH:
		   var nodeId= me.getTreeRec();
		   var store=me.grdStore;
		   if(nodeId){
			var proxy = store.getProxy();
			proxy.setExtraParam("menu_id",Ext.encode(nodeId.get('id')));
			proxy.setExtraParam("creater",erp.Util.currentUser.userInfo.u_id);
			store.load({
	    	    scope: this,
	    	    callback: function() {
	    	    	//me.getContentPermission().clearContent();
	    	    }
	    	});
	    	
	   
	      
		}
		break;
	   case erp.Const.FUNC_ITEMID_BTN_DEL:
	   	var rec=me.getGrdReport().getSelectionModel().getSelection()[0];
	   	Ext.Msg.confirm('提示','你确定要删除报表:【'+rec.get('name')+'】吗?',function(btn){
	   		if (btn=="yes")
	   		{
	   			me.grdStore.remove(rec);
	   			me.grdStore.sync();
	   		}
	   	});
		break;
	   case  erp.Const.FUNC_ITEMID_BTN_ACC:
	   	Ext.Msg.confirm('提示','你确定要启用报表这些报表吗?',function(btn){
	   		if (btn=="yes")
	   		{
	   		   var recs=me.getGrdReport().getSelectionModel().getSelection();
	   		   Ext.each(recs,function(rec){
	   		   	rec.set('is_active','true')
	   		   });
	   		   me.grdStore.sync();
	   		}
	   	});
	   	break;
	   case  erp.Const.FUNC_ITEMID_BTN_DISACC:
	   
	  	 Ext.Msg.confirm('提示','你确定要停用报表这些报表吗?',function(btn){
	   		if (btn=="yes")
	   		{
	   		var recs=me.getGrdReport().getSelectionModel().getSelection();
	   		   Ext.each(recs,function(rec){
	   		   	rec.set('is_active','false')
	   		   });
	   		   me.grdStore.sync();
	   		}
	   	});
		break;
		case 'accept_out':
			Ext.Msg.confirm('提示','你确定要确认该报表为外发吗?',function(btn){
		   		if (btn=="yes")
		   		{
		   		   var recs=me.getGrdReport().getSelectionModel().getSelection();
		   		   Ext.each(recs,function(rec){
		   		   		rec.set('is_out','true')
		   		   });
		   		   me.grdStore.sync();
		   		}
		   	});
		break;
		case 'stop_out':
			Ext.Msg.confirm('提示','你确定要取消该报表为外发吗?',function(btn){
		   		if (btn=="yes")
		   		{
		   		   var recs=me.getGrdReport().getSelectionModel().getSelection();
		   		   Ext.each(recs,function(rec){
		   		   		rec.set('is_out','false')
		   		   });
		   		   me.grdStore.sync();
		   		}
		   	});
		break;
	}
	
	},
	getTreeRec:function(){
		var me=this;
		var tree=me.getModuleTree();
		var recs=tree.getSelectionModel().getSelection();
		return recs.length>0?recs[0]:null;
	},
	onSelectModule:function(rowModel, rec, eOpts) {
		this.grdStore.load({
			params : {
				menu_id : rec[0].get('id')
			}
		})
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
		me.centerStore.sync({callback:function(){
			me.centerStore.load();
		}});
		me.centerStore.sort();
	},
	DsChange : function() {
		var me = this;
		var grid=me.getDsCenter();
		var rec = grid.getSelectionModel().getSelection()[0];
		if (rec) {
			me.getSqlDefine().setDisabled(false);
			//me.getSqlDesc().setDisabled(false);
			//me.getSqlDesc().DataChange(rec.get('ds_id'));
			me.getSqlScript().DataChange(rec);
		} else {
			me.getSqlDefine().setDisabled(true);
			//me.getSqlDesc().setDisabled(true);
		}
	},
	saveSqlforMulti:function(){
		var me=this;
		var rec=me.getDsCenter().getSelectionModel().getSelection()[0];
		var sql=me.getSqlScript().editor.getValue();
		var dsid=me.getSqlScript().down('#dataSourse').getValue();
		//保存前检查SQL是否正常
		var result=me.sqlResult = erp.AnalysisFun.exe_sqlForSys(sql,dsid,me.getMultiDatasource().listId);
		if (!Ext.isEmpty(result.DATA_ROWS[0])&&result.DATA_ROWS[0].error)
			return;
		rec.set('script_sql',sql);
		rec.set('dsid',dsid);
		me.centerStore.sync({
					success : function(){
						Ext.Msg.alert('提示','保存成功!');;
		    		},
		    		scope:this
				});
		rec.commit();
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
	SaveDesc : function(rec) {
		var me = this;
		if (me.descStore.indexOf(rec) < 0) {
			me.descStore.add(rec);
		}
		me.descStore.sync();
		me.descStore.sort();
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
	doScriptAction:function(btn){
    				switch(btn.itemId){
    				case 'docu_add':
    					this.sqlStart();
    					break;
    				case 'docu_del':
    					this.deleteSql();
    					break;
    				case 'docu_save':
    					this.saveSqlforMulti();
    					break;
    				}
    	},
	   //sql语句执行
	sqlStart: function(){
		var me = this;
		var panel=me.getSqlDefine();
		var dscode =panel.down('#dataSourse').getValue();
		var sql = me.getSqlScript().editor.getValue();
		var sqlResultform=panel.down('#select_result');
		var newRec;
//		sql=me.getSqlWithCondtion(sql);
		me.sqlResult = erp.AnalysisFun.exe_sqlForSys(sql,dscode,me.getMultiDatasource().listId);
		if(me.sqlResult!=null){
			var selectresult =erp.report.engine.util.AnalysisFun.createTable(me.sqlResult);
			if(!sqlResultform.down('#sel_result')){
				sqlResultform.add(selectresult);
			}else{
				sqlResultform.remove(sqlResultform.down('#sel_result'));
			    sqlResultform.add(selectresult);	
			}
		}
	},
	getSqlWithCondtion:function(sql){
		var me=this;
		var dpStore=me.getDsParams().getStore();
		if (dpStore.getCount()<=0)
		  	return sql;
		var statment;  	
		var defines=[],setValue=[];
		  dpStore.each(function(rec){
		  	switch(rec.get('datatype')){
		  		case 'varchar':
		  			defines.push("@"+rec.get("code")+" "+rec.get('datatype')+'(max)');
		  			break;
				case 'integer':
					defines.push("@"+rec.get("code")+" "+rec.get('datatype')+"(10)");
					break;
				case 'decimal':
					defines.push("@"+rec.get("code")+" "+rec.get('datatype')+"(18)");
					break;
				case 'date':
				case 'text':
				case 'timestamp':
				case 'datetime':
				defines.push("@"+rec.get("code")+" "+rec.get('datatype'));
				break;
		  	}
		  	 
		  	 setValue.push(" set @"+rec.get("code")+"="+rec.get('default_value'));
		  })	
		statment="declare "+defines.join(",")+";"+" "+setValue.join(" ")+" "+sql;
		return statment;
	},
	//sql语句清空
	deleteSql: function(){
		var me = this;
		var edit =  me.getSqlScript().editor;
		edit.setValue('select');
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
	}
}); 	