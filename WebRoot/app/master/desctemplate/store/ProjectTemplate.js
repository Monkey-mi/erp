Ext.define('tp.crm.master.desctemplate.store.ProjectTemplate', {
	extend: 'Ext.data.Store',
	reqiures: ['tp.crm.master.desctemplate.model.ProjectTemplate'],
	model: 'tp.crm.master.desctemplate.model.ProjectTemplate',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: 'post',
		extraParams:{usePaging:true},
		api: {
			create: 'crm/projectTemplate.act?method=addProjectTemplate',
			update: 'crm/projectTemplate.act?method=updateProjectTemplate',
			read: 'crm/projectTemplate.act?method=getProjectTemplateList',
			destroy: 'crm/projectTemplate.act?method=deleteProjectTemplate'
		},
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			root: 'data',
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'mbbh',
		direction: 'ASC'
	}]
});
