Ext.define('erp.express.model.ShipmentLoad', {
	extend: 'Ext.data.Model',
	idProperty: 'cybh',
	fields: [
		{ name: 'xzbj', type: 'int' },
		{ name: 'cybh' },
		{ name: 'xslb' },
		{ name: 'khbh' },
		{ name: 'chsj', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'yfje', type: 'float' },
		{ name: 'bzsm' },
		{ name: 'khmc' },
		{ name:'khzd'},
		{ name:'dfzh'}
	]
});
