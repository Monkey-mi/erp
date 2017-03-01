//供应商档案信息表model
Ext.define('erp.supplierAccess.model.SupplierFileShow', {
	extend: 'Ext.data.Model',
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
		{name:'turnover_currency_id',type:'int'},
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
		{ name: 'filesave_score', type: 'float' },
		{name:'is_archive',type:'boolean'},
		{name:'is_delete',type:'boolean'},
		{name:'operator'},
		{name:'operater_dt',type:'date',dateFormat: 'Y-m-d H:i:s'},
		{name:'auditor'},
		{name:'audit_dt',type:'date',dateFormat: 'Y-m-d H:i:s'},
		{name:'is_chinese',type:'int'},
		{name:'mc_id_1',type:'int'},
		{name:'mc_name_1'},
		{name:'mc_id_2'},
		{name:'mc_name_2'},
		{name:'mc_id_3'},
		{name:'mc_name_3'},
		{name:'auditopinion'}
		//辅助字段
		,{ name: 'area_pro_reg'}
		,{ name: 'area_city_reg'}
		,{ name: 'area_pro_contact'}
		,{ name: 'area_city_contact'}
		,{ name: 'fkts', type: 'float' },
		{ name: 'xyed', type: 'float' },
		{ name: 'ztdw' },
		{ name: 'wbbh' },
		{ name: 'xdbl', type: 'float' },
		{ name: 'fwlx' },
		{ name: 'csbh' },
		{ name:'fktj'},
		{ name:'class_name'},
		{ name:'nature_name'},
		{ name:'reg_addr_all'},
		{ name:'contact_addr_all'},
		{ name:'industry_name'},
		{ name:'taxman_name'},
		{ name:'currency_name'},
		{ name:'turnover_currency_name'},
		{ name:'key_remark'},
		{ name:'assess_dt',type:'date',dateFormat: 'Y-m-d H:i:s'},
		{ name:'head_audit'},
		{ name:'supplier_id'},
		{ name:'currency_en'},
		{ name:'turnover_currency_en'}
	]
});
