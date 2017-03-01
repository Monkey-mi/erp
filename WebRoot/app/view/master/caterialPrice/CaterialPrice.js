Ext.define('erp.view.master.caterialPrice.CaterialPrice',{
	extend:'erp.ux.Panel',
	alias:'widget.caterialPrice',
	requires:[
		'erp.view.master.caterialPrice.CaterialPriceCtl',
		'erp.ux.PagingBar',
		'erp.ux.SelectField',
		'erp.view.master.caterialPrice.window.EdtCaterialPrice',
		'erp.view.master.caterialPrice.window.ArgumentSet',
		'erp.view.master.caterialPrice.store.CaterialPrice',
		'erp.view.master.caterialPrice.store.CaterialPriceArgument'
	],
	controller:'caterialPrice',
	xtype: 'caterialPrice',
	layout: {
        type: 'border'
    },
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.caterialPrice.store.CaterialPrice',{autoLoad:true});
		me.store.on({
    	 	 load:function(s,recs){
    	 	 	var grid=me.down('#caterialPriceGrid');
				erp.Util.gridSelect(grid,recs);
    	 	 }
    	}),
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'caterialPriceBar',
	    	items:[{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
			   	  {text: '修改',	iconCls:'page_edit',	itemId:erp.Const.FUNC_ITEMID_BTN_EDT,	disabled:true},
			   	  {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
			   	   '-',
			   	  {text: '锁定',iconCls:'permssion',itemId:'lock',disabled:true},
				   '-',
				  {text: '参数维护',iconCls:'',itemId:'argument'}
			]
	    			}],
		this.items= [{
		        region: 'center',
		        xtype:'grid',
		        reference:'caterialPriceGrid',
		        itemId:'caterialPriceGrid',
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
				    	}],
		    	listeners : {
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.setMainBtnStatus(false);
							} else {
								me.setMainBtnStatus(true);
							}
						},
						itemdblclick:function(t,rec,item,index){
							var ctl=me.getController(); 
							ctl.edtShow(rec,false,true);
						}
				}
			}]
		this.callParent();
	},
	//设置按钮状态
	setMainBtnStatus:function(sts){
		var me=this;
		var panel=me.down('#caterialPriceBar');
		panel.down('#BTN_EDT').setDisabled(sts);
		panel.down('#BTN_DEL').setDisabled(sts);
		panel.down('#lock').setDisabled(sts);
	}
})