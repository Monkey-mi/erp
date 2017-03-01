Ext.define('erp.view.plasticPartsPledge.PlasticPartsPledge',{
	extend:'erp.ux.Panel',
	alias:'widget.PlasticPartsPledge',
	requires:[
		'erp.ux.PagingBar',
		'erp.view.plasticPartsPledge.PlasticPartsPledgeCtl',
		'erp.view.plasticPartsPledge.store.PlasticPartsPledge',
		'erp.view.plasticPartsPledge.store.PlasticPartsPledgeInvoice'
	],
	controller:'PlasticPartsPledgeCtl',
	xtype: 'PlasticPartsPledge',
	layout: {
        type: 'border'
    },
    listeners:{
	    afterrender:function(cmp){
	    	cmp.store.loadPage(1);
	    }
	},
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.plasticPartsPledge.store.PlasticPartsPledge');
		me.store.on({
			'load':function(s,recs){
				var grid=me.down('#CenterGrid');
				if(recs.length>0){
					erp.Util.gridSelect(grid,recs);
				}else{
					me.dStore.load({params:{
						zydh:-1
					}})
				}
			}
		});
		me.dStore=Ext.create('erp.view.plasticPartsPledge.store.PlasticPartsPledgeInvoice');
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		me.southColumns=erp.Util.getColumns(me.dStore.getModel());
		me.ct=me.getController();
		this.dockedItems=[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'TBar',
	    	items:[
				{text:'新增',iconCls:'page_add',itemId:erp.Const.FUNC_ITEMID_BTN_ADD},
				{text:'删除',iconCls:'page_delete',itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true},
				{text: '锁定', iconCls:'permssion',itemId:'btn_lock', disabled:true},
				{text: '审核', iconCls:'email_edit',itemId:'btn_audit', disabled:true},
				{text: '解押', iconCls:'',itemId:'btn_uncoil', disabled:true},
				{text: '筛选', iconCls:'page_find',itemId:'btn_query'}
			]
	    }],
		this.items= [{
		        region: 'center',
		        xtype:'grid',
		        reference:'CenterGrid',
		        itemId:'CenterGrid',
				store:me.store,
				flex:2,
				features: [{
			        ftype: 'summary',
			        dock:'bottom'
			    }],
				columns:me.MainColumns,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				dockedItems:[{
				    		xtype : 'pagingbar',
		                    stateId : Ext.id(),
				    		dock:'bottom',
				    		displayInfo:true,
				    		defaultPageSize : 200,
				    		store:me.store
				    	}],
		    	listeners : {
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.setMainBtnStatus(false);
								me.dStore.load({params:{
									zydh:recs[0].get('zydh')
								}})
							} else {
								me.setMainBtnStatus(true);
								me.dStore.load({params:{
									zydh:-1
								}})
							}
						},
						itemdblclick:'mainitemdblclick'
				}
			},{
		        region: 'south',
		        xtype:'grid',
		        split:true,
		        reference:'SouthGrid',
		        itemId:'SouthGrid',
				store:me.dStore,
				flex:2,
				features: [{
			        ftype: 'summary',
			        dock:'bottom'
			    }],
				columns:me.southColumns,
				selModel:Ext.create('Ext.selection.CheckboxModel')
			}]
		this.callParent();
	},
	//设置按钮状态
	setMainBtnStatus:function(sts){
		var me=this;
		var tool=me.down('#TBar');
		tool.down('#btn_lock').setDisabled(sts);
		tool.down('#BTN_DEL').setDisabled(sts);
		tool.down('#btn_audit').setDisabled(sts);
		tool.down('#btn_uncoil').setDisabled(sts);
	}
})