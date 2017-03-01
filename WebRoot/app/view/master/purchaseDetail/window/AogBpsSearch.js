Ext.define('erp.view.master.purchaseDetail.window.AogBpsSearch',{
	extend:'erp.ux.Window',
	alias:'widget.aogBpsSearch',
	requires:[
		'erp.view.master.purchaseDetail.store.AogBps'
	],
	overflowY: 'auto',
	listeners:{
		'close':function(cmp){
			cmp.destroy();
		}
	},
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.purchaseDetail.store.AogBps');
		me.store.load({params:{cgbh:me.cgbh,cgxh:me.cgxh}});
		Ext.apply(me,{
			height:document.body.clientHeight<800?document.body.clientHeight:800,
			width:document.body.clientWidth<1200?document.body.clientWidth:1200,
			title:'到货/入库明细查询【'+me.cgbh+'-'+me.cgxh+'】',
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
							{header:'单据类型',dataIndex:'djlx',width:80,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					        }},
				   	  	  	{header:'仓库名称',dataIndex:'ckmc',width:90},
			   	  	  		{header:'单号',dataIndex:'dhdh',width:80,align:'right'},
			   	  	  		{header:'序号',dataIndex:'dhxh',width:80,align:'right'},
			   	  	  		{header:'日期',dataIndex:'dhrq',width:90,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'供应厂商',dataIndex:'csmc',width:160},
			   	  	  		{header:'材料货号',dataIndex:'clhh',align:'center',width:80},
			   	  	  		{header:'材料名称',dataIndex:'clmc',width:160},
			   	  	  		{header:'规格尺寸',dataIndex:'cltx1',width:90},
			   	  	  		{header:'单位',dataIndex:'jldw',width:80,align:'center'},
			   	  	  		{header:'到货/入库',dataIndex:'dhsl',width:100,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000');;
					        }},
			   	  	  		{header:'辅助单位',dataIndex:'fzdw',width:80,align:'center'},
			   	  	  		{header:'辅助数量',dataIndex:'fzsl',width:80,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000');;
					        }},
			   	  	  		{header:'备注说明',dataIndex:'bzsm',width:100},
			   	  	  		{header:'操作员名',dataIndex:'czym',width:80},
			   	  	  		{header:'操作时间',dataIndex:'czsj',width:90,renderer : Ext.util.Format.dateRendererOne}
			   	  	 ]
			}]
		});
	me.callParent(arguments);
	}
});