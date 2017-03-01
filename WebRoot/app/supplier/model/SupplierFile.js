Ext.define('erp.supplier.model.SupplierFile', {
	extend: 'erp.basic.model.Model',
	idProperty: 'company_id',
	identifier:'negative',
	fields: [
		{ name: 'company_id', type: 'int' },
		{ name: 'class_id' },
		{ name: 'nature_id' },
		{name:'industry_id',type:'int'},
		{name:'taxman_id',type:'int'},
		{ name: 'inner_level' },
		{ name: 'apply_sts' },
		{ name: 'cpyname_en' },
		{ name: 'cpyname_cn' },
		{ name: 'reg_addr_code', type: 'int' },
		{ name: 'reg_addr' },
		{ name: 'contact_addr_code', type: 'int' },
		{ name: 'contact_addr' },
		{ name: 'f_phone' },
		{ name: 'corporation' },
		{ name: 'contacts' },
		{ name: 'm_phone' },
		{ name: 'fax' },
		{ name: 'email' },
		{ name: 'bus_license' },
		{ name: 'tax_no' },
		{ name: 'reg_fund', type: 'float' },
		{name:'currency_id',type:'int'},
		{ name: 'establish_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'emplyees', type: 'int' },
		{ name: 'college_num', type: 'int' },
		{ name: 'op_num', type: 'int' },
		{ name: 'tech_num', type: 'int' },
		{ name: 'qc_num', type: 'int' },
		{ name: 'staff_num', type: 'int' },
		{ name: 'qe_num', type: 'int' },
		{ name: 'company_area', type: 'float' },
		{ name: 'factory_area', type: 'float' },
		{ name: 'factory_owner' },
		{ name: 'use_begintime', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'use_endtime', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'turnover', type: 'float' },
		{ name: 'certification_system' },
		{ name: 'create_dt', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'ip_addr' },
		{ name: 'checked_date', type: 'date', dateFormat: 'Y-m-d H:i:s' },
		{ name: 'version', type: 'int' },
		{ name: 'manage_score', type: 'float' },
		{ name: 'improve_score', type: 'float' },
		{ name: 'area_score', type: 'float' },
		{ name: 'exploit_score', type: 'float' },
		{ name: 'storage_score', type: 'float' },
		{ name: 'equ_score', type: 'float' },
		{ name: 'tec_score', type: 'float' },
		{ name: 'pro_file_score', type: 'float' },
		{ name: 'research_score', type: 'float' },
		{ name: 'reject_score', type: 'float' },
		{ name: 'quality_score', type: 'float' },
		{ name: 'qc_score', type: 'float' },
		{ name: 'filesave_score', type: 'float' }
		
		//辅助字段
		,{ name: 'area_pro_reg'}
		,{ name: 'area_city_reg'}
		,{ name: 'area_pro_contact'}
		,{ name: 'area_city_contact'}
	]
});
