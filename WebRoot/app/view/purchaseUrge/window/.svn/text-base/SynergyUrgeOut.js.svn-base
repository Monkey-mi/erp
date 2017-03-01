Ext.define('erp.view.purchaseUrge.window.SynergyUrgeOut',{
	extend:'erp.ux.Window',
	alias : 'widget.SynergyUrgeOut',
	title:'协同追催发送',
	modal:true,
	requires:[
		'erp.view.purchaseUrge.store.SynergyUrge'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseUrge.store.SynergyUrge');
		me.store.on({
			load:function(s,recs){
    	 	 	var grid=me.down('#mainGrid');
				if(recs.length>0){
					grid.getSelectionModel().selectAll();
				}else{
					grid.getStore().removeAll();
				}
    	 	 }
		})
		me.store.load({params:{hths:me.hths}});
		me.sColumns=erp.Util.getColumns(me.store.getModel());
		Ext.apply(me,{
			height:document.body.clientHeight*5/8,
			width:document.body.clientWidth*3/4,
    		layout:{
			     type: 'fit',
			     pack: 'start',
			     align: 'stretch'
	    	},
	    	items:[{
	    			title:'追催记录',
	    			xtype:'grid',
	    			itemId:'mainGrid',
	    			selModel:Ext.create('Ext.selection.CheckboxModel'),
	    			store:me.store,
	    			features: [{
					       ftype: 'summary',
				           dock:'bottom'
					    }],
	    			columns:me.sColumns
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