Ext.define('erp.view.purchaseOrder.window.ProductDescImp',{
	extend:'erp.ux.Window',
	alias:'widget.imp_ProductDescImp',
//	plugins : {
//		ptype : 'FormKey'
//	},
	width:800,
	title:'采购计划选择',
	iconCls:'page_go',
	modal:true,
	height:500,
	requires: [
		'erp.view.purchaseOrder.store.ProductDescImp'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseOrder.store.ProductDescImp');
		me.store.proxy.extraParams.htbh=me.htbh;
		me.store.load();
		me.MainColumns=erp.Util.getColumns(me.store.getModel());
		Ext.apply(me,{
			layout:{type:'border',align: 'stretch'},
			items:[{
				xtype:'grid',
				itemId:'ProductDescImp',
				flex:1,
				listeners:{
					'selectionchange':function(view,recs){
						if(recs.length>0){
						  	var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorder.act?method=getProductDescImp',
						  	{ddbh:recs[0].get('ddbh'),ddxh:recs[0].get('ddxh')}
						  	);
							console.log(result);
							me.down('#topright').setValue(result);
						}
					}
				},
				columns:me.MainColumns,
				store:me.store,
				region: 'center',
				dockedItems:[{
			    	xtype : 'pagingbar',
                    stateId : '8081d6f3-9ddaasb7-470d-b764-dbb70c5e81b1',
			    	store:me.store,
			    	dock:'bottom',
			    	displayInfo:true
			    }]
			},{
				region:'east',
				split:true,
				flex:1,
				itemId:'topright',
				xtype:'textarea'
			}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	}
})