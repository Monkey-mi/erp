Ext.define('erp.view.purchaseOrder.model.SalesOrderImp', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'ddh' ,header:'订单号',columnWidth:80},
		{ name: 'bcpbh',header:'材料货号',columnWidth:80},
		{ name: 'clmc',header:'材料名称',columnWidth:240},
		{ name: 'ggzc',header:'规格尺寸',columnWidth:100},
		{ name: 'htbz',header:'生产单号',columnWidth:100},
		{ name: 'khmc',header:'客户名称',columnWidth:160},
		{ name: 'jldw',header:'单位',columnWidth:80},
		{ name: 'dhsl', type: 'float',header:'订货数量',columnWidth:80,allow_summaryOne:true},
		{ name: 'bssl', type: 'float',header:'备损数量',columnWidth:80},
		{ name: 'cgsl', type: 'float',header:'转采购数',columnWidth:80,allow_summaryOne:true},
		{ name: 'jhsl', type: 'float',header:'转计划数',columnWidth:80,allow_summaryOne:true},
		{ name: 'wzsl', type: 'float',header:'未转数量',columnWidth:80,allow_summaryOne:true},
		{ name: 'ddbh', type: 'int' ,hidden:true},
		{ name: 'ddxh', type: 'int' ,hidden:true},
		{ name: 'cpbh' ,hidden:true},
		{ name: 'khxh' ,hidden:true},
		{ name: 'pono' ,hidden:true},
		{ name: 'ywms' ,hidden:true},
		{ name: 'fach' ,hidden:true},
		{ name: 'psjq', type: 'date', dateFormat: 'Y-m-d H:i:s' ,hidden:true},
		{ name: 'clth' ,hidden:true},
		{ name: 'fzzbj', type: 'int' ,hidden:true},
		{ name: 'txgz' ,hidden:true},
		{ name: 'khbh' ,hidden:true},
		{ name: 'jhlb' ,hidden:true}
	]
});
