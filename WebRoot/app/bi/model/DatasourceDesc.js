Ext.define('erp.bi.model.DatasourceDesc', {
			extend : 'Ext.data.Model',
			idProperty : 'ds_desc_id',
			fields : [{
						name : 'ds_desc_id',
						type : 'int'
					}, {
						name : 'ds_id',
						type : 'int'
					}, {
						name : 'col_name'
					}, {
						name : 'col_code'
					}, {
						name : 'data_type'
					}]
		});