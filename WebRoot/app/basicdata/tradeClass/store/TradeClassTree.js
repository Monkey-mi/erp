Ext.define('erp.basicdata.tradeClass.store.TradeClassTree',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.basic.model.TreeModel'],
	model: 'erp.basic.model.TreeModel',
    proxy: {
        type: 'ajax',
        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        url : 'tradeClass/tradeClass.srm?method=getTradeClassTree',
        reader: {
			type: 'json',
			rootProperty: 'data',
			messageProperty: 'message'
		}
    },
    sorters: [
		{   
			  property: 'parentId',   
			  direction: 'ASC'  
		 },
        {
			property: 'nodeId',
			direction: 'ASC'
		}
	],
	root: {
	  	id:0,
	  	text:'类别树',
	  	leaf:false,
	  	expanded:true
	}
});