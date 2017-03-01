Ext.define('erp.materialQualityTesting.store.CreateLead', {
	extend: 'Ext.data.Store',
	reqiures: ['erp.materialQualityTesting.model.CreateLead'],
	model: 'erp.materialQualityTesting.model.CreateLead',
	pageSize: 50,
	proxy: {
		type: 'ajax',
		actionMethods: {create: 'POST', read: 'POST',  destroy: 'POST'},
		api: {
			read: 'materialQuality/materialquality.act?method=getCreateLeadList',	
			create: 'materialQuality/materialquality.act?method=addCreateLead',
			update: 'materialQuality/materialquality.act?method=updateCreateLead',
			destroy: 'materialQuality/materialquality.act?method=deleteCreateLead'
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
			writeAllFields:true,
			encode: true,
			allowSingle: false
		}
	},

	sorter: [{
		property: 'ckbh'+'dhxh',
		direction: 'ASC'
	}]
});
