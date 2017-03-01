Ext.define('erp.view.purchaseOrder.store.Component', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.view.purchaseOrder.model.Component'],
	model: 'erp.view.purchaseOrder.model.Component',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'erp/erp/purchaseOrder/Component.do?method=addComponent',
			update: 'erp/erp/purchaseOrder/Component.do?method=updateComponent',
			read: 'purchaseorder/purchaseorderdetail.act?method=getComponentList',
			destroy: 'erp/erp/purchaseOrder/Component.do?method=deleteComponent'
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
		property: 'jlxh',
		direction: 'ASC'
	}]
});
