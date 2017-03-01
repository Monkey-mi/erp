Ext.define('erp.view.purchaseOrder.model.TopSearch', {
	extend: 'Ext.data.Model',
	fields: [
		{ name: 'htbh' },
		{ name: 'htbhw' },
		{ name: 'csmc' },
		{ name: 'cglb' },
		{ name: 'cgrq', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'cgrqw', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'qfsj', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'qfsjw', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'hqsj', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'hqsjw', type: 'date', dateFormat: 'Y-m-d H:i:s'},
		{ name: 'ztdw' },
		{ name: 'cgbz' },
		{ name: 'czym' },
		{ name: 'topping10' ,type: 'boolean', defaultValue: false},
		{ name: 'topping9' ,type: 'boolean', defaultValue: false},
		{ name: 'topping1' ,type: 'boolean', defaultValue: false},
		{ name: 'topping3' ,type: 'boolean', defaultValue: false},
		{ name: 'topping4' ,type: 'boolean', defaultValue: false},
		{ name: 'topping5' ,type: 'boolean', defaultValue: false},
		{ name: 'topping6' ,type: 'boolean', defaultValue: false},
		{ name: 'topping7' ,type: 'boolean', defaultValue: false},
		{ name: 'topping8' ,type: 'boolean', defaultValue: false},
		{ name: 'topping2' ,type: 'boolean', defaultValue: false}
	]
});
