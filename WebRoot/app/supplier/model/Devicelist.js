Ext.define('erp.supplier.model.Devicelist', {
	extend: 'erp.basic.model.Model',
	idProperty: 'device_id',
	identifier:'negative',
	fields: [
		{ name: 'device_id', type: 'int' },
		{ name: 'device_name' },
		{ name: 'company_id', type: 'int' },
		{ name: 'format' },
		{ name: 'place' },
		{ name: 'price', type: 'float' },
		{ name: 'buy_day', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'advanced' }
	]
});
