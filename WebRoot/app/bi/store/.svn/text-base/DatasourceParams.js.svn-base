Ext.define('erp.bi.store.DatasourceParams', {
			extend : 'Ext.data.Store',
			requires : ['erp.bi.model.DatasourceParam'],
			model : 'erp.bi.model.DatasourceParam',
			proxy : {
				type : 'ajax',
				actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
//				extraParams : {
//					usePaging : true
//				},
				api : {
					create : 'dc/dsCenterService.do?method=addDsParam',
					update : 'dc/dsCenterService.do?method=updateDsParam',
					read : 'dc/dsCenterService.do?method=getDsParamList',
					destroy : 'dc/dsCenterService.do?method=deleteDsParam'
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
						property : 'ds_param_id',
						direction : 'ASC'
					}]
		});