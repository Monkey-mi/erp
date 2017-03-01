Ext.define('erp.view.purchaseUrge.model.SynergyUrge', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'csmc' ,header:'供应厂商',columnWidth:160,allow_summaryOne:true},
		{ name: 'clhh' ,header:'材料货号',columnWidth:80},
		{ name: 'clmc' ,header:'材料名称',columnWidth:160},
		{ name: 'cltx1' ,header:'规格尺寸',columnWidth:80},
		{ name: 'jldw' ,header:'单位',columnWidth:50},
		{ name: 'cgww', type: 'float',header:'采购未完',columnWidth:80,allow_summary:true,summaryFomat:'0,000.000'},
		{ name: 'wkjq', type: 'date', dateFormat: 'Y-m-d H:i:s',header:'物控交期',columnWidth:85},
		{ name: 'htbh', type: 'int' ,header:'合同编号',columnWidth:80},
		{ name: 'pur_order_id', type: 'int' ,header:'订单号',columnWidth:80},
		{ name: 'order_detail_id', type: 'int' ,header:'订单明细',columnWidth:80},
		{ name:'htmx',header:'合同序号汇总',columnWidth:80},
		{ name:'is_edit', type: 'int',hidden:true},
		{ name:'htxh',hidden:true},
		{ name:'csbh',hidden:true}
	]
});
