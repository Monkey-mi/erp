Ext.define('erp.master.desctemplate.view.ProjectTemplateManager',{
	extend:'erp.ux.Window',
    alias:'widget.mng_ProjectTemplateManager',
    iconCls:'box',
    requires:[	
    			'erp.ux.PagingBar',
    			'erp.ux.QueryPanel',
    			'erp.ux.SearchCombobox'
    		],
    width:800,
    height:480,
    anchorSize:95,
//    maximizable: true,
    modal : true,
   layout:'border',
    initComponent:function(){
    	var me =this;
 		me.store=Ext.create('erp.crm.master.desctemplate.store.ProjectTemplate');
 		me.detailStore=Ext.create('erp.crm.master.desctemplate.store.ProjectTemplateDetail');
 		Ext.apply(me.detailStore.proxy.extraParams, {usePaging:false});
		Ext.apply(me.store.proxy.extraParams, {mblb:me.mblb});	
		me.store.load();
 		var rowEditing=Ext.create('Ext.grid.plugin.CellEditing', {
			        clicksToMoveEditor: 1,
			        autoCancel: false,
			        pluginId: 'cellEditing',
			        listeners: {
			        	//编辑时事件
			        	'edit':function(editor, e) {
			        		if(e.record.get('oo')=='000'){			
			        			e.record.phantom =true;//标记这条记录在store中不存在
			        		}					        		
			        		e.grid.getStore().sync({
			        					success : function(e, batch) {
			        						me.store.load();//必须的，避免记录没有主键的情况
											Ext.Msg.alert('提示', '保存成功！');
										},
										failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败！');
										}
			        			});
			        		
			        		e.record.commit();
							},
						//取消编辑是触发
						'canceledit':function(editor, e){
							if(e.record.get('oo')=='000'){
								e.grid.getStore().remove(e.record);
							}
						}
			        }
			});
		var rowEditing2=Ext.create('Ext.grid.plugin.CellEditing', {
			        clicksToMoveEditor: 1,
			        autoCancel: false,
			        pluginId: 'cellEditing2',
			        listeners: {
			        	//编辑时事件
			        	'edit':function(editor, e) {
			        		if(e.record.get('oo')=='000'){			
			        			e.record.phantom =true;//标记这条记录在store中不存在
			        		}					        		
			        		e.grid.getStore().sync({
			        					success : function(e, batch) {
			        						me.detailStore.load();//必须的，避免记录没有主键的情况
											Ext.Msg.alert('提示', '保存成功！');
										},
										failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败！');
										}
			        			});
			        		
			        		e.record.commit();
							},
						//取消编辑是触发
						'canceledit':function(editor, e){
							if(e.record.get('oo')=='000'){
								e.grid.getStore().remove(e.record);
							}
						}
			        }
			});
    	Ext.apply(me,{
	  	
   	  	  items:[
	   	  	{
   	  	  	xtype:'grid',
   	  	  	title:'模板',
   	  	  	itemId:'grd_EP',
   	  	  	flex:1,   	 
   	  	  	region:'west',
   	  	  	split:true,
			
   	  	  	store:me.store,
   	  	  	frame:true,
//   	  	  	multiSelect:true,
//   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'),
   	  	  	dockedItems:[{
			    		xtype : 'pagingbar',
                        stateId : 'pagingbar'+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	 },
			    {xtype:'toolbar',dock:'top',itemId:'top_bar',items:[
		  		{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD,hidden:!me.canEdit},
   	  		    {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, hidden:!me.canEdit,disabled:true}
   	  			]
   	  		}],
   	  	  	plugins: [
   	  	  			rowEditing
   	  	  	],
   	  	  	columns:[
   	  	  			{header: '编号',dataIndex: 'mbbh',flex:1},
   	  	  			{header: '名称',dataIndex: 'mbmc',flex:3,editor:{ 
   	  	  				
   	  	  				allowBlank:false,
   	  	  				blankText:'请输入名称'
                     }}
   	  	  			]
   	  	  	},
   	  	  	{
   	  	  		
   	  	  	xtype:'grid',
   	  	  	title:'具体信息',
   	  	  	itemId:'grd_EP2',
   	  	  	flex:2,
   	  	  	region:'center',
   	  	  	split:true,
   	  	  	store:me.detailStore,
   	  	  	frame:true,
   	  	  	multiSelect:true,
   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'),
   	  	  	dockedItems:[/*{
			    		xtype : 'pagingbar',
                        stateId : 'pagingbar'+Ext.id(),
			    		store:me.detailStore,
			    		dock:'bottom',
			    		displayInfo:true
			    	 },*/
			    {xtype:'toolbar',dock:'top',itemId:'top_bar',items:[
		  		{text: '新增',	iconCls:'page_add',		itemId:'BTN_ADD2', hidden:!me.canEdit,disabled:true},
		  		'-',
   	  		    {text: '删除',	iconCls:'page_delete',		itemId:'BTN_DEL2',hidden:!me.canEdit, disabled:true},
   	  		    '->',
   	  		    {xtype:'tps_searchcbo',itemId:'search2',fieldLabel:'快速查询',emptyText:'输入名称..',labelWidth:60,width:320,
   	  				hideTrigger:true,
   	  			 	store:me.detailStore,
		    	 	displayField:'mbxh',
		    	 	valueField:'xmmc'
   	  			},
   	  			{text:'查询',iconCls:'query',
       	  				   handler:function(btn){
       	  				    	//加载给定 'page' 的数据,通过适当地设置 start 以及 limit 的值. 在本方法内部只是 传入计算后的 'start' 与 'limit' 配置项 执行一个普通的 load 操作.
       	  				    	me.detailStore.loadPage(1,
       	  				    		{
           	  				    	params:{
           	  				    		search:me.down('#search2').getValue()
           	  				    	}
       	  				    	});
       	  				    }
   	  			 }
   	  			]
   	  		}],
   	  	  	plugins: [
   	  	  		rowEditing2
   	  	  	],
   	  	  	columns:[
   	  	  			{header: '序号',dataIndex: 'mbxh',flex:1},
   	  	  			{header: '项目',dataIndex: 'xmmc',flex:3,editor:{
   	  	  				//20160119,shg
   	  	  				//显示所有项目描述条目
						name:'xmmc',
						xtype : 'helpField',
						code : erp.DataConst.ProjectName,
						forceSelection:true	
                    }},{header: '描述',dataIndex: 'xmms',flex:3,editor:{ 
                    	
                    }}
   	  	  			]
   	  	  	}
   	  	  	],
   	  	  	buttons:[{text:'确定',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',handler:function(){
   	  	  			me.close();
   	  	  	}}]
		});		
 		me.callParent(arguments);
 	},
 	loadDetail:function(mblb,mbbh){
 		var me=this;				
		Ext.apply(me.detailStore.proxy.extraParams, {mblb:mblb,mbbh:mbbh});	
		me.detailStore.loadPage(1);
 		
 	}
});
