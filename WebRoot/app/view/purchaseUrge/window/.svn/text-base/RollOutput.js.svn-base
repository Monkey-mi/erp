Ext.define('erp.view.purchaseUrge.window.RollOutput',{
	extend:'erp.ux.Window',
	alias : 'widget.RollOutput',
	title:'滚动输出',
	modal:true,
	width: 800,
	height:400,
	controller:'PurchaseUrgeCtl',
	requires:[
		'erp.view.purchaseUrge.store.RollOutput'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseUrge.store.RollOutput');
		if(me.rec.hzlx==0){
			me.store.proxy.api.read='purchaseurge/purchaseurge.act?method=getRollOutputList'
		}
		me.store.load({params:{hths:me.hths,cgym:me.rec.cgym,jltj:me.rec.jltj}})
		Ext.apply(me,{
    		layout:{
			     type: 'fit',
			     pack: 'start',
			     align: 'stretch'
	    	},
			items:[{
	    			xtype:'grid',
	    			itemId:'mainGrid',
	    			width:200,
	    			store:me.store,
	    			features: [{
					       ftype: 'summary',
				           dock:'bottom'
					    }],
	    			columns:[
	    				{header:'供应厂商',dataIndex:'csmc',width:160,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					    }},
	    				{header:'合同编号',dataIndex:'htbh',width:80},
	    				{header:'序号',dataIndex:'htxh',width:40},
	    				{header:'材料货号',dataIndex:'clhh',width:80},
	    				{header:'材料名称',dataIndex:'clmc',width:240},
	    				{header:'规格尺寸',dataIndex:'cltx1',width:80},
	    				{header:'单位',dataIndex:'jldw',width:40},
	    				{header:'采购未完',dataIndex:'cgww',width:80,renderer:Ext.util.Format.floatRenderer,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					    }},
					    {header:'物控交期',dataIndex:'wkjq',width:85},
					    {header:'确认交期',dataIndex: 'qrjq',width:120},
	    				{header:'追催摘要',dataIndex:'zczy',width:80},
	    				{header:'采购数量',dataIndex:'cgsl',width:80,renderer:Ext.util.Format.floatRenderer,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					    }},
					    {header:'到货/入库',dataIndex:'dhrk',width:80,renderer:Ext.util.Format.floatRenderer,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					    }},
	    				{header:'记录条件',dataIndex:'jltj',width:85}
	    			]
	    	}]
		})
		me.callParent(arguments);
	}
});