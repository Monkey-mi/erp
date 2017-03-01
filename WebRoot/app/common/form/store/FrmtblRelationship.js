Ext.define('tp.common.form.store.FrmtblRelationship', {
	extend: 'Ext.data.Store',
	reqiures: ['tp.common.form.model.FrmtblRelationship'],
	model: 'tp.common.form.model.FrmtblRelationship',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: 'post',
		api: {
			create: 'form/Forms.do?method=addFrmtblRelationship',
			update: 'form/Forms.do?method=updateFrmtblRelationship',
			read: 'form/Forms.do?method=getFrmtblRelationshipList',
			destroy: 'form/Forms.do?method=deleteFrmtblRelationship'
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
	sorter: [{
		property: 'id',
		direction: 'ASC'
	}]
});
