Ext.define('erp.payApply.store.AdjustmentDetail', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.AdjustmentDetail'],
	model: 'erp.payApply.model.AdjustmentDetail',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/adjustmentdetail.act?method=addAdjustmentDetail',
			update: 'payapply/adjustmentdetail.act?method=updateAdjustmentDetail',
			read: 'payapply/adjustmentdetail.act?method=getAdjustmentDetailList',
			destroy: 'payapply/adjustmentdetail.act?method=deleteAdjustmentDetail'
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
	sorter: [{
		property: 'tzdh'+'tzxh',
		direction: 'ASC'
	}]
});
