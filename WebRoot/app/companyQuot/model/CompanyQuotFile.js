Ext.define('erp.companyQuot.model.CompanyQuotFile', {
	extend: 'Ext.data.Model',
	fields: [		
	   {name : 'bjdh', type: 'float'},
	   {name : 'wjbh',type: 'float'},
	   {name : 'wjmc'},
	   {name : 'wjlj'},
	   {name : 'cjrq',type: 'date', dateFormat: 'Y-m-d H:i:s'},
	   {name : 'cjrm'}
	]
});
