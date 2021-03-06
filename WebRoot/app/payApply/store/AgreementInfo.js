Ext.define('erp.payApply.store.AgreementInfo', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.payApply.model.AgreementInfo'],
	model: 'erp.payApply.model.AgreementInfo',
	pageSize: 25,
	proxy: {
		type: 'ajax',
		actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
		api: {
			create: 'payapply/agreementinfo.act?method=addAgreementInfo',
			update: 'payapply/agreementinfo.act?method=updateAgreementInfo',
			read: 'payapply/agreementinfo.act?method=getAgreementInfoList',
			destroy: 'payapply/agreementinfo.act.do?method=deleteAgreementInfo'
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
		property: 'htbh',
		direction: 'ASC'
	}]
});
