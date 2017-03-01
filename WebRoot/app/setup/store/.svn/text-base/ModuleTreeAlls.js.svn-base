Ext.define('erp.setup.store.ModuleTreeAlls',{
	extend: 'Ext.data.TreeStore', 
	requires:['erp.setup.model.ModuleTreeChk'],
	model:'erp.setup.model.ModuleTreeChk',
	proxy: {
		type: 'ajax',
		actionMethods:{'read':'post'},
		url: 'main/Modules.do?method=getAllModuleFuncsTree' ,
		reader: {
  			type: 'json',
  			rootProperty: 'data',
  			messageProperty: 'message'
  		}
	},
	sorters: [{
			property: 'order_seq',
			direction: 'ASC'
		},{
			property: 'text',
			direction: 'ASC'
		}
	],
	root: {
	  	id:0,
	  	text:'功能清单',
	  	leaf:false,
	  	expanded:true
	}
        
});