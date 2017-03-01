Ext.define('erp.view.purchaseOrder.model.PurchaseFile', {
	extend: 'Ext.data.Model',
	idProperty: '',
	fields: [
		{ name: 'htbh', type: 'int' },
		{ name: 'qxbj', type: 'int' },
		{ name: 'wjbh', type: 'int' },
		{ name: 'wjmc' },
		{ name: 'wjlj' },
		{ name: 'scrq', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'cjrm' },
		{ name: 'fjlx',type : 'int'},
		{ name: 'ptsc',type : 'int'},
		{ name: 'fjzt',type : 'int'}
	]
});
