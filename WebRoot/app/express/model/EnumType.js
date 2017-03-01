Ext.define('erp.express.model.EnumType', {
	extend: 'erp.common.basic.model.Model',
	idProperty: 'mjxl',
	fields: [
		{ name:'tablename',defaultValue:'sysmjb'}, //表名  系统枚举表
		{ name: 'mjbh' },
		{ name: 'mjms' },
		{ name: 'mjxl' },
		{ name: 'mjbz' },
		{ name: 'ckbt' },
		{ name: 'zzid', type: 'int' },
		{ name: 'oo' },
		{ name: 'order_id'}
	]
});
