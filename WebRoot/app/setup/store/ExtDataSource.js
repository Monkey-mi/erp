Ext.define('erp.setup.store.ExtDataSource',{
		extend:'Ext.data.Store',
		model: 'erp.setup.model.ExtDataSource',
		proxy:{
			type:'ajax',
			actionMethods : {create : 'POST',read : 'POST',update : 'POST',destroy : 'POST'},
			//extraParams:{model:'ExtDataSource'},
			api:{
				create:	'main/DSUtil.do?method=addExtDataSource',
				update:	'main/DSUtil.do?method=updateExtDataSource',
				read:	'main/DSUtil.do?method=getExtDataSourceList',
				destroy:'main/DSUtil.do?method=deleteExtDataSource'
			},
			reader:{
				type:'json',
				rootProperty:'data',
				messageProperty:'message'
			},
			writer:{
				type:'json',
				rootProperty:'data',
				encode:true,
				writeAllFields:true,
				allowSingle:false
			}
		}//,
//		sorters:[{
//			property:'id',//主键列
//			direction:'ASC'	
//		}]
});