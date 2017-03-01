Ext.define('erp.master.manufacturer.model.BillDetail', {
	extend: 'Ext.data.Model',
	fields: [	
        { name: 'csbh'},
		{ name: 'hsbm' },
		{ name: 'pzh' },	
		{ name: 'rq'},
		{ name: 'bzsm' },
		{ name: 'nf' },
		{ name: 'yf'},
		{ name: 'kcpj',type:'float'},
		{ name: 'yfpj' ,type:'float'},
		{ name: 'pjyf' ,type:'float' },
		{name: 'px' ,type:'int'}
	]
});