Ext.define('erp.bi.store.DatasourceDesc', {
			extend : 'Ext.data.Store',
			model : "erp.bi.model.DatasourceDesc",
			requires : ["erp.bi.model.DatasourceDesc"],
			proxy : {
				type : 'ajax',
				actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
				extraParam : {
					usePaging : true
				},
				api : {
					create : 'dc/dsCenterService.do?method=addDsDesc',
					update : 'dc/dsCenterService.do?method=updateDsDesc',
					read :   'dc/dsCenterService.do?method=getDsDescList',
					destroy :'dc/dsCenterService.do?method=deleteDsDesc'
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
						property : 'ds_desc_id',
						direction : 'ASC'
					}]
		});