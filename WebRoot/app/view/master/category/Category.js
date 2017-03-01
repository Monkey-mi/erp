Ext.define('erp.view.master.category.Category',{
	extend:'erp.ux.Panel',
	alias:'widget.category',
	requires:[
		'erp.view.master.category.CategoryController',
		'erp.view.master.category.CategoryModel',
		'erp.view.master.category.store.CategoryTree',
		'erp.view.master.category.store.Category',
		'erp.ux.PagingBar',
		'Ext.grid.selection.SpreadsheetModel',  
    	'Ext.grid.plugin.Clipboard',
    	'erp.view.master.category.store.CategoryAuthority',
    	'erp.view.master.category.store.CooperateAuthority'
	],
	controller:'category',
	xtype: 'category',
	viewModel:{
		type:'category'
	},
	layout: {
        type: 'border'
    },
    
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.category.store.Category',{autoLoad:true});
		me.store.on({
    	 	 load:function(s,recs){
    	 	 	var grid=me.down('#categoryGrid');
				erp.Util.gridSelect(grid,recs);
    	 	 }
    	}),
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		me.autStore=Ext.create('erp.view.master.category.store.CategoryAuthority');
		me.autColumns=erp.Util.getColumns(me.autStore.getModel());
		me.copperateStore = Ext.create('erp.view.master.category.store.CooperateAuthority');
		me.copperateColumns=erp.Util.getColumns(me.copperateStore.getModel());
		me.treeStore=Ext.create('erp.view.master.category.store.CategoryTree');
		delete me.treeStore.proxy.extraParams.czy_gh; 
		delete me.store.proxy.extraParams.czy_gh; 
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'categoryBar',
	    	items:[{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
			   	  {text: '修改',	iconCls:'page_edit',	itemId:erp.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
			   	  {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
			   	   '-',
			   	  {text: '增加操作员',iconCls:'group_green_add',itemId:'addOperator_btn',disabled:true},
				  {text: '删除操作员',iconCls:'group_green_delete',itemId:'deleteOperator_btn',disabled:true},
				  '-',
				  {text: '增加协同人员',iconCls:'group_green_add',itemId:'addCooperate_btn',disabled:true},
				  {text: '删除协同人员',iconCls:'group_green_delete',itemId:'deleteCooperate_btn',disabled:true},
				   '-',
				  {text: '特批',iconCls:'',itemId:'approval_btn',disabled:true},
				  {text: '批量修改',iconCls:'',itemId:'batch_btn',disabled:true},
				  {text: '改后类别',iconCls:'',itemId:'kind_btn',disabled:true}
			]
	    			}],
		this.items= [{
	    			xtype:'treepanel',
	    			region:'west',
	    			reference:'categorytree',
	    			collapsible:true,
	    			width:200,
	    			split:true,
	    			store:me.treeStore,
	    			listeners:{
	    			  'itemclick':function(t,rec){
	    			  		if(rec.get('nodeId')!=0){
	    			  			me.store.proxy.extraParams.lbbh=rec.get('nodeId');
	    			  			me.store.loadPage(1);
	    			  		}else{
	    			  			delete me.store.proxy.extraParams.lbbh;
	    			  			me.store.loadPage(1);
	    			  		}
	    			  }
	    			}
	    	},{
		        region: 'center',
		        xtype:'grid',
		        reference:'categoryGrid',
		        itemId:'categoryGrid',
				columns:me.MainColumns,
				store:me.store,
				width:890,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				dockedItems:[{
				    		xtype : 'pagingbar',
		                    stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
				    		dock:'bottom',
				    		displayInfo:true,
				    		defaultPageSize : 50,
				    		store:me.store
				    	}],
		    	listeners : {
							selectionchange:function(grid,recs){
								if (recs.length>0){
									me.setMainBtnStatus(false);
									me.autStore.load({params:{lbbh:recs[0].get('lbbh')}});
									me.copperateStore.load({params:{lbbh:recs[0].get('lbbh')}});
								}else{
									me.setMainBtnStatus(true);
									me.autStore.load({params:{lbbh:-1}});
									me.copperateStore.load({params:{lbbh:-1}});
								}
							}
				}
			}, 
//		{
//	        region: 'east',
//	        xtype:'grid',
//	        reference:'CategoryAuthority',
//			columns:me.autColumns,
//			split:true,
//			store:me.autStore,
//			width:220,
//			listeners : {
//							selectionchange:function(grid,recs){
//								if (recs.length>0){
//									me.setEastBtnStatus(false);
//								}else{
//									me.setEastBtnStatus(true);
//								}
//							}
//				}
//	    },
	    {
	        region: 'east',
	        xtype:'tabpanel',
	        itemId:'category_tab',
			width:220,
			autoScroll :'true',
			items:[{
			    xtype:'grid',
		   	  	title:'操作员',
		   	  	itemId:'CategoryAuthority',
		   	  	reference:'CategoryAuthority',
		   	  	split:true,
		   	  	region:'center',
		   	  	store:me.autStore,
		   	  	columns:me.autColumns,
		   	  	listeners : {
							selectionchange:function(grid,recs){
								if (recs.length>0){
									me.setEastBtnStatus(false);
								}else{
									me.setEastBtnStatus(true);
								}
							}
					}
			},{
			    xtype:'grid',
		   	  	title:'协同人员',
		   	  	itemId:'cooperate',
		   	  	reference:'cooperateGrid',
		   	  	region:'center',
		   	  	store:me.copperateStore,
		   	  	columns:me.copperateColumns,
		   	  		listeners : {
							selectionchange:function(grid,recs){
								if (recs.length>0){
									me.setCooperateBtnStatus(false);
								}else{
									me.setCooperateBtnStatus(true);
								}
							}
					}
			}]
	    }]
		this.callParent();
	},
	//设置按钮状态
	setMainBtnStatus:function(sts){
		var me=this;
		var panel=me.down('#categoryBar');
		panel.down('#BTN_EDT').setDisabled(sts);
		panel.down('#BTN_DEL').setDisabled(sts);
		panel.down('#batch_btn').setDisabled(sts);
		panel.down('#kind_btn').setDisabled(sts);
		panel.down('#addOperator_btn').setDisabled(sts);
		panel.down('#addCooperate_btn').setDisabled(sts);		
	},
	//设置按钮状态
	setCooperateBtnStatus:function(sts){
		var me=this;
		var panel=me.down('#categoryBar');
		panel.down('#deleteCooperate_btn').setDisabled(sts);
//		panel.down('#approval_btn').setDisabled(sts);
	},
	//设置按钮状态
	setEastBtnStatus:function(sts){
		var me=this;
		var panel=me.down('#categoryBar');
		panel.down('#deleteOperator_btn').setDisabled(sts);
		panel.down('#approval_btn').setDisabled(sts);
	}
})