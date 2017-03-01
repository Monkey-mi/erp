Ext.define('erp.express.model.ExpressDetail', {
	extend: 'Ext.data.Model',
	idProperty: 'jlh',
	fields: [
		{ name: 'jlbh' },
		{ name: 'jlxh' },
		{ name: 'jlh',convert:function(v,rec){
	  	return rec.get('jlbh')+'-'+rec.get('jlxh')
	  } },
		{ name: 'cpbh' },
		{ name: 'jldw' },
		{ name: 'ypsl', type: 'float' },
		{ name: 'zzhm' },
		{ name: 'sfbj', type: 'int' },
		{ name: 'ddbh', type: 'float' },
		{ name: 'ddxh', type: 'float' },
		{ name: 'dydh', type: 'float' },
		{ name: 'dyxh', type: 'float' },
		{ name: 'cpmc' },
		{ name: 'dyy' },
		{ name: 'ddh' },
		{ name: 'sfsl',type: 'float'},
		{ name: 'cybh' },
		{ name: 'cyxh', type: 'int' }
	]
});
