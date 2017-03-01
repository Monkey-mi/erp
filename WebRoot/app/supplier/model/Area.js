Ext.define('erp.supplier.model.Area', {
	extend: 'erp.basic.model.Model',
	idProperty: 'area_id',
	identifier:'negative',
	fields: [
		{ name: 'area_id', type: 'int' },
		{ name: 'area_name' },
		{ name: 'f_id', type: 'int' },
		{ name: 'shortName' },
		{ name: 'levelType' },
		{ name: 'cityCode' },
		{ name: 'zipCode' },
		{ name: 'mergerName' },
		{ name: 'ing' },
		{ name: 'lat' },
		{ name: 'pinyin' }
	]
});
