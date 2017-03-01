Ext.define('erp.view.purchaseUrge.window.SynergyUrgeAccept',{
	extend:'erp.ux.Window',
	alias : 'widget.SynergyUrgeAccept',
	title:'协同追催接收',
	modal:true,
	requires:[
		'erp.view.purchaseUrge.store.OrderDeliveryNotice',
		'erp.view.purchaseUrge.store.OrderDeliveryNoticedetails'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseUrge.store.OrderDeliveryNotice');
		me.dStore=Ext.create('erp.view.purchaseUrge.store.OrderDeliveryNoticedetails');
		me.store.proxy.extraParams.login_id=me.login_id;
		me.store.on({
			load:function(s,recs){
    	 	 	var grid=me.down('#mainGrid');
				if(recs.length>0){
					grid.getSelectionModel().select(recs[0]);
				}else{
					me.dStore.removeAll();
				}
    	 	 }
		})
		me.store.load({params:{htbh:me.htbh}});
		me.sColumns=erp.Util.getColumns(me.store.getModel());
		me.dColumns=erp.Util.getColumns(me.dStore.getModel());
		Ext.apply(me,{
			height:document.body.clientHeight*7/8,
			width:document.body.clientWidth*3/4,
    		layout:{
			     type: 'border',
			     pack: 'start',
			     align: 'stretch'
	    	},
	    	items:[{
	    			dockedItems:[{xtype:'toolbar',dock:'top',itemId:'top_bar4',
	   	  	  		  items:[
					  {xtype:'textfield',itemId:'companymc',fieldLabel:'快速查询',emptyText:'供应商名称关键字搜索..',enableKeyEvents:true,labelWidth:60,width:260,
							listeners:{
								specialkey: function(field, e){
		    	                    if (e.getKey() == e.ENTER) {
		    	                    	var companymc =me.down('#companymc').getValue();
								  		me.store.proxy.extraParams.companymc=companymc;
										me.store.load();
		    	                    }
		    	                }
							}
					  },
					  {text:'查询',glyph:0xf002,itemId:'btn_search',handler:function(btn){
					  		var companymc =me.down('#companymc').getValue();
					  		me.store.proxy.extraParams.companymc=companymc;
							me.store.load();
					  }}]
	   	  	  		}],
	    			title:'通知单',
	    			xtype:'grid',
	    			region:'north',
	    			itemId:'mainGrid',
	    			listeners : {
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.dStore.load({params:{delivery_notice_id:recs[0].get('delivery_notice_id')}});
							} else {
								me.dStore.removeAll();
							}
						}
	    			},
	    			split:true,
	    			flex:2,
	    			selModel:Ext.create('Ext.selection.CheckboxModel'),
	    			store:me.store,
	    			columns:me.sColumns
	    	},{
	    			title:'通知单明细',
	    			flex:5,
	    			xtype:'grid',
	    			itemId:'detailGrid',
	    			region: 'center',
	    			store:me.dStore,
	    			features: [{
					       ftype: 'summary',
				           dock:'bottom'
					    }],
	    			columns:me.dColumns
	    	}],
			buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES'},{
				text:'关闭',
				iconCls:'cancel',
				handler:function(){
					me.close();
				}
			}]
		})
		me.callParent(arguments);
	}
});