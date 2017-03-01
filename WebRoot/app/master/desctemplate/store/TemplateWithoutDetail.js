Ext.define('erp.master.desctemplate.store.TemplateWithoutDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.master.desctemplate.model.TemplateWithoutDetail'],
	model: 'erp.master.desctemplate.model.TemplateWithoutDetail',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'projecttemplate/projecttemplate.act?method=addProjectTemplate',
			update: 'projecttemplate/projecttemplate.act?method=updateProjectTemplate',
			read: 'projecttemplate/projecttemplate.act?method=getProjectTemplateList',
			destroy: 'projecttemplate/projecttemplate.act?method=deleteProjectTemplate'
		},
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total',
			messageProperty: 'message'
		},
		writer: {
			type: 'json',
			rootProperty: 'data',
			encode: true,
			allowSingle: false
		}
	},
	sorters: [{
		property: 'mbbh',
		direction: 'ASC'
	}]
});
