Ext.define('erp.master.caterialPricePurchase.model.CaterialHistoryPriceCtl', {
	extend: 'Ext.data.Model',
	idProperty: 'jlbh',
	fields: [
	{name : 'jlbh'},
	{name : 'clhh'},
	{name : 'kzdj', type: 'float'},
	{name : 'jlrq', type: 'date' , dateFormat: 'Y-m-d H:i:s'},
	{name : 'clmc'}
	]
})