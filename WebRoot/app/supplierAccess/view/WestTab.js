//导航标签页
Ext.define('erp.supplierAccess.view.WestTab',{
	extend: 'Ext.tab.Panel',
	requires:['erp.basicdata.level.store.MaterialLevelTree',
			'erp.basicdata.materialClass.store.MaterialClassTree'],
	alias: 'widget.mng_AcessWestTab',
	initComponent: function(){
		var me = this;
		me.levstore=Ext.create('erp.basicdata.level.store.MaterialLevelTree'/*,{
			 proxy: {
		        type: 'ajax',
		        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		        url : 'supplierAccess/common.srm?method=getMaterialLevelTree',
		        reader: {
					type: 'json',
					rootProperty: 'data',
					messageProperty: 'message'
				}
		    }
		}*/);
		me.matstore=Ext.create('erp.basicdata.materialClass.store.MaterialClassTree'/*,{
			proxy: {
		        type: 'ajax',
		        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		        url : 'supplierAccess/common.srm?method=getMaterialClassTree',
		        reader: {
					type: 'json',
					rootProperty: 'data',
					messageProperty: 'message'
				}
		    }
		}*/);
		Ext.apply(me,{
		 defaults:{layout:'fit'},
		 tabPosition:'bottom',
		 items: [{
		 		title:'分层等级',
	   	  	  	xtype:'treepanel',
	   	  	  	itemId:'levelclass',
	   	  	  	width:200,
		    	useArrows: true,
		    	store:me.levstore,
		    	rootVisible:false
		    	}
		    	,{
		    	title:'材料类别',
	   	  	  	xtype:'treepanel',
	   	  	  	itemId:'materialclass',
	   	  	  	width:200,
		    	useArrows: true,
		    	rootVisible:false,
		    	store:me.matstore
		    }
		    ]
		});
		me.callParent(arguments);
   }
});