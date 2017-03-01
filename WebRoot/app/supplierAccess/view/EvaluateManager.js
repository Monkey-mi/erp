/*13项评估审核信息页面*/
Ext.define('erp.supplierAccess.view.EvaluateManager',{
	extend:'erp.ux.Panel',
	requires:[
			'erp.supplierAccess.view.EvaluateItemDetails'
			],
	alias:'widget.access_EvaluateManager',
	
	initComponent:function(){
		var  me=this;
		me.navStore=Ext.create('erp.supplierAccess.store.EvaluateItemTree'/*,{
			proxy: {
		        type: 'ajax',
		        actionMethods:{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
		        url : 'supplierAccess/common.srm?method=getEvaluateItemTree',
		        reader: {
					type: 'json',
					rootProperty: 'data',
					messageProperty: 'message'
				}
		    }
		}*/);
		Ext.apply(me,{
			defaults:{padding:1},
			layout:{type:'border'},
			items:[{
				//左侧13项评估树形结构
				region:'west',
				layout:'fit',
				title:'评估项选择',
				split:true,
   	  	  	 	collapsible: true,
   	  	  	 	width:260,
   	  	  	 	autoScroll:true,
   	  	  		itemId:'tree_evaluteNav',
   	  	  		xtype:'treepanel',
	   	  	  	useArrows: true,
		    	rootVisible:false,
		    	store:me.navStore
   	  	  	 	
			},{
			//中间区域
				region:'center',
				layout:'fit',
				xtype:'access_EvaluateItemDetails',
				itemId:'evaluateItemDetails',
   	  	  		overflowX:'auto',
   	  	  		overflowY:'auto',
   	  	  		loop_id:me.loop_id,
   	  	  		company_id:me.company_id,
   	  	  		accessScore:me.accessScore,
   	  	  		item_id:-1,
   	  	  		item_fid:-1
			}]
		});
		this.callParent(arguments);
		}
});