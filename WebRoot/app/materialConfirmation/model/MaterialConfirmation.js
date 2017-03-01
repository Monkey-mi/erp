Ext.define('erp.materialConfirmation.model.MaterialConfirmation', {
	extend: 'Ext.data.Model',
	idProperty: 'confirmation_id',
	identifier:'negative',
	fields: [
		{ name: 'confirmation_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'company_name' },
		{ name: 'contacts' },
		{ name: 'f_phone' },
		{ name: 'addr' },
		{ name: 'fax' },
		{ name: 'm_phone' },
		{ name: 'proposer' },
		{ name: 'apply_companyid', type: 'int' },
		{ name: 'apply_companyname' },
		{ name: 'apply_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'mc_id', type: 'int' },
		{ name: 'mc_name' },
		{ name: 'isreplace_material', type: 'int' },
		{ name: 'replace_material' },
		{ name: 'former_supplierid', type: 'int' },
		{ name: 'former_suppliername' },
		{ name: 'submit_reason' },
		{ name: 'submit_item' },
		{ name: 'ismatch_item' ,type:'int'},
		{ name: 'integrity_status'},
		{ name: 'nomeet_explan' },
		{ name: 'confirm_integrity_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'confirmation_status', type: 'int' },
		{ name: 'final_confirrmor' },
		{ name: 'confirm_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'qrbj',type: 'int'},
		{ name: 'dybj',type: 'int'},
		{ name: 'dysj', type: 'date', dateFormat: 'Y-m-d H:i:s' }
	]
});
