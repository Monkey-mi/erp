Ext.define('erp.bi.model.DatasourceCenter', {
	extend: 'Ext.data.Model',
	idProperty: 'ds_id',
	fields: [{
		name: 'ds_id',
		type: 'int'
	}, {
		name: 'b_code'
	}, {
		name: 'name'
	}, {
		name: 'code'
	}, {
		name: 'tip'
	}, {
		name: 'data_url'
	}, {
		name: 'desc_url'
	}, {
		name: "mode"
	}, {
		name: 'script_sql'
	}, {
		name: 'text'
	},{
		name:'dsid',
		type:'int'
	},{
		name:'list_id',
		type:'int'
	},
	{
		name:'ft_id',
		type:'int'
	},
	{
		name:'fd_code'
	}]
});