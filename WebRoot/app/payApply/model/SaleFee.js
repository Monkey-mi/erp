Ext.define('erp.payApply.model.SaleFee', {
	extend: 'Ext.data.Model',
	idProperty: 'sqh',
	fields: [
		{ name: 'sqbh', type: 'float' },
		{ name: 'sqxh', type: 'float' },
		{ name: 'hsbm'},
		{ name: 'bmmc'},
		{ name: 'fydh', type: 'float' },
		{ name: 'fyxh', type: 'float' },
		{ name: 'fyh'},
		{ name: 'fyje', type: 'float' },
		{ name: 'sqje', type: 'float' },
		{ name: 'yfje', type: 'float' },
		{ name: 'wbbh'},
		{ name: 'sqh',convert:function(v,rec){
	  	return rec.get('sqbh')+'-'+rec.get('sqxh')
	    }},
		{ name: 'wbdh'},
		{ name: 'wbhl', type: 'float' },
		{ name: 'wbje', type: 'float' },
		{ name: 'wbsq', type: 'float' }
	]
});