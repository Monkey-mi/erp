Ext.define('erp.bi.store.DatasourceCenters', {
			extend : 'Ext.data.Store',
			model : 'erp.bi.model.DatasourceCenter',
			requires : ['erp.bi.model.DatasourceCenter'],
			proxy : {
				type : 'ajax',
				actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
				extraParams : {
					usePaging : true
				},
				api : {
					create : "dc/dsCenterService.do?method=addDsCenter",
					update : 'dc/dsCenterService.do?method=updateDsCenter',
					read : "dc/dsCenterService.do?method=getDsCenterList",
					destroy : "dc/dsCenterService.do?method=deleteDsCenter"
				},
				reader : {
					type : 'json',
					rootProperty : 'data',
					messageProperty : 'message'
				},
				writer : {
					type : 'json',
					rootProperty : 'data',
					encode : true,
					writeAllFields:true,
					allowSingle : false
				}
			},
			sorter : [{
						property : 'ds_id',
						direction : 'ASC'
					}]
		});