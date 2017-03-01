Ext.define('erp.view.master.purchaseDetail.window.PurSupplierSearch',{
	extend:'erp.ux.Window',
	alias:'widget.purSupplierSearch',
	requires:[
		'erp.view.master.purchaseDetail.store.PurSupplierSearch'
	],
	overflowY: 'auto',
	listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	},
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.purchaseDetail.store.PurSupplierSearch');
		me.store.load({params:{clhh:me.clhh}});
		if(!Ext.isEmpty(me.cltx1)){
			me.store.load({params:{clhh:me.clhh,cltx1:me.cltx1}});
		}
		Ext.apply(me,{
			height:400,
			width:860,
			title:'供应商查询【材料名称:'+me.clmc+'】',
			layout:{
		      type: 'fit',
		      align: 'stretch'
    		},
			items:[{
				xtype:'grid',
				store:me.store,
				 features: [{
					       ftype: 'summary'
				 }],
				 columns:[
							{header:'合同编号',dataIndex:'htbh',width:80,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					        }},
				   	  	  	{header:'厂商名称',dataIndex:'csmc',width:160},
			   	  	  		{header:'采购日期',dataIndex:'cgrq',width:90,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'本币总额',dataIndex:'htze',width:120,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');;
					        }},
			   	  	  		{header:'采购总数',dataIndex:'htzs',width:120,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');;
					        }},
			   	  	  		{header:'到货/入库',dataIndex:'dhrk',width:120,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');;
					        }},
					        {header:'采购未完',dataIndex:'cgww',width:120,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');
					        }}
			   	  	 ]
			}]
		});
	me.callParent(arguments);
	}
});