Ext.define('erp.view.purchaseUrge.window.SteelFrame',{
	extend:'erp.ux.Window',
	alias : 'widget.SteelFrame',
	title:'钢架计价明细',
	modal:true,
	requires:[
		'erp.view.purchaseUrge.store.SteelFrameDetail',
		'erp.view.purchaseUrge.store.ProcessCost'
	],
	initComponent:function(){
		var me=this;
		me.sfdStore=Ext.create('erp.view.purchaseUrge.store.SteelFrameDetail');
		me.sfdStore.load({params:{hths:me.hths}});
		me.pcStore=Ext.create('erp.view.purchaseUrge.store.ProcessCost');
		me.pcStore.load({params:{hths:me.hths}});
		me.sfdColumns=erp.Util.getColumns(me.sfdStore.getModel());
		me.pcColumns=erp.Util.getColumns(me.pcStore.getModel());
		Ext.apply(me,{
			height:document.body.clientHeight*5/8,
			width:document.body.clientWidth*3/4,
    		layout:{
			     type: 'fit',
			     pack: 'start',
			     align: 'stretch'
	    	},
	    	items:[{
	    		xtype:'tabpanel',
	    		
	    		items:[{
	    			title:'钢架明细',
	    			xtype:'grid',
	    			itemId:'mainGrid',
	    			store:me.sfdStore,
	    			features: [{
					       ftype: 'summary',
				           dock:'bottom'
					    }],
	    			columns:me.sfdColumns
	    		},{
	    			title:'加工费用',
	    			xtype:'grid',
	    			store:me.pcStore,
	    			features: [{
					       ftype: 'summary',
				           dock:'bottom'
					    }],
	    			columns:me.pcColumns
	    		}]
	    	}]
			
		})
		me.callParent(arguments);
	}
});