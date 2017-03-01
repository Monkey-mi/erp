Ext.define('erp.supplierManager.model.AppSupplierAccessLoop', {
	extend: 'Ext.data.Model',
	idProperty: 'loop_id',
	identifier:'negative',
	fields: [
		{ name: 'loop_id', type: 'int' },
		{ name: 'company_id', type: 'int' },
		{ name: 'assess_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'head_audit' },
		{ name: 'operator' },
		{ name: 'operator_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'assess_sts', type: 'int' },
		{ name: 'assess_sts_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'assess_sts_op'},
		{ name:'displayField',convert:function(v,r){
			return Ext.Date.format(r.get('assess_dt'),'Y-m-d');
		}}
	]
});
