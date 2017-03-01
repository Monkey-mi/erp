/*公司注册附件自定义上传表store*/
Ext.define('erp.supplierManager.store.AppCustomAttched', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.supplierManager.model.AppRegisterAttched'],
	model: 'erp.supplierManager.model.AppRegisterAttched',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			create: 'supplier/attched.srm?method=addAttched',
			update: 'supplier/attched.srm?method=updateAttched',
			read: 'supplier/attched.srm?method=getAttchedList',
			destroy: 'supplier/attched.srm?method=deleteAttched'
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
			writeAllFields:true,
			allowSingle: false
		}
	},
	sorter: [{
		property: 'id',
		direction: 'ASC'
	}]
});
