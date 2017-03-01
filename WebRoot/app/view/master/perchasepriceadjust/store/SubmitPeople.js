Ext.define('erp.view.master.perchasepriceadjust.store.SubmitPeople', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.master.perchasepriceadjust.model.SubmitPeople'],
	model: 'erp.view.master.perchasepriceadjust.model.SubmitPeople',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		extraParams:{usePaging:true},
		api: {
			create: 'perchase/perchase.act?method=addSubmitPeople',
			update: 'perchase/perchase.act?method=updateSubmitPeople',
			read: 'perchase/perchase.act?method=getSubmitPeopleList',
			destroy: 'perchase/perchase.act?method=deleteSubmitPeople'
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
			allowSingle: false,
			writeAllFields:true
		}
	},
	sorter: [{
		property: '',
		direction: 'ASC'
	}]
});
