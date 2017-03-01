Ext.define('erp.view.master.caterialPrice.model.CaterialPriceArgument', {
	extend: 'Ext.data.Model',
	idProperty: 'csbh',
	fields: [
		{ name: 'csbh', type: 'int',header:'参数编号',columnWidth:80},
		{ name: 'csmc' ,header:'参数名称',columnWidth:-1},
		{ name: 'spbj', type: 'int',header:'审批标记',columnWidth:80,isSign:true}
	]
});
