Ext.define('erp.purchaseInspectionManage.view.PurchaseInspectionTest',{
    extend:'erp.ux.Panel',
    requires:[
     'erp.ux.PagingBar',
	 'erp.ux.QueryPanel',
	 'erp.ux.SupcanGrid'
    ],
    title:'成品采购验货查验合格',
	alias:'widget.mng_PurchaseInspectionTest',
	hideMode: 'offsets',
	layout:{
		type:'border',
		padding:2
	},
	listeners:{
	close:function(panel){
		//为避免界面关闭时 close 时 不触发销毁方法在关闭时主动销毁界面
		if(panel){
			panel.destroy();
		}
	 }
	},
	initComponent:function(){
		var me=this;
		me.store = Ext.create('erp.purchaseInspectionManage.store.PurchaseInspectionManager');	
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		me.store.proxy.extraParams.cyhg='1';
		me.store.load();
	    Ext.apply(me,{
	       items : [{
	       	region:'center',
  	  		flex:2,
  	  		split:true,
  	  		xtype: 'grid',
  	  		itemId : 'inspectionTestGrid',
  	  		mainModel:Ext.create('erp.purchaseInspectionManage.model.PurchaseInspectionManager'),
	       	columns:me.MainColumns,
			store:me.store,
			selModel:Ext.create('Ext.selection.CheckboxModel'),
			dockedItems:[{
			    		xtype : 'pagingbar',
	                    stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		dock:'bottom',
			    		displayInfo:true,
			    		defaultPageSize : 50,
			    		store:me.store
		    	}]
	       }]
	    });
	    me.callParent(arguments);
	},
	loadMain:function(){
		var me=this;
		me.down('#MaterialInspection').load(me.params);
	}
})