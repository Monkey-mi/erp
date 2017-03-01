Ext.define('erp.view.purchaseUrge.model.ProcessCost', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'hth',header:'合同号',columnWidth:80,allow_summaryOne:true},
		{ name: 'clhh',header:'材料货号',columnWidth:80},
		{ name: 'clmc',header:'材料名称',columnWidth:300},
		{ name: 'cltx1',header:'规格尺寸',columnWidth:80},
		{ name: 'jldw' ,header:'单位',columnWidth:40},
		{ name: 'cgsl', type: 'float',header:'采购数量',columnWidth:80,allow_summary:true,summaryFomat:'0,000.###'},
		{ name: 'clje', type: 'float',header:'加工单价',columnWidth:80},
		{ name: 'jgje', type: 'float',header:'加工金额',columnWidth:80,allow_summary:true,summaryFomat:'0,000.00',renderer:Ext.util.Format.floatRendererOne},
		{ name: 'htbh', type: 'int' ,hidden:true},
		{ name: 'htxh', type: 'int' ,hidden:true},
		{ name: 'plmth',hidden:true },
		{ name: 'plmtx',hidden:true }
	]
});
