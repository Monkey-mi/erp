Ext.define('erp.view.purchaseUrge.PurchaseTypeTree',{
	extend:'erp.ux.Window',
	alias : 'widget.purchaseTypeTree',
	title:'采购类别选择',
	modal:true,
	width: 300,
	height:400,
	controller:'PurchaseUrgeCtl',
	requires:[
		'erp.view.master.category.store.CategoryTree',
		'erp.view.purchaseUrge.PurchaseUrgeCtl',
		'erp.view.purchaseUrge.PurchaseUrge'
	],
	initComponent:function(){
		var me=this;
		me.cateTreeStore=Ext.create('erp.view.master.category.store.CategoryTree',{
			root : {
				nodeId : 0,
				id:0,
				text : '全部',
				leaf : false,
				expanded : true
			}
		});
		Ext.apply(me,{
    		layout:{
			     type: 'fit',
			     pack: 'start',
			     align: 'stretch'
	    	},
			items:[{
	    			xtype:'treepanel',
	    			itemId:'categorytree',
	    			width:200,
	    			split:true,
	    			store:me.cateTreeStore,
	    			listeners:{
	    			  'itemdblclick':function(t,rec){
	    			  		me.showMain();
	    			  }
	    			}
	    	}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm',handler:function(){
				me.showMain();
			}},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		})
		me.callParent(arguments);
	},
	showMain:function(){
		var me=this;
		var tree=me.down('#categorytree');
		var recs=tree.getSelectionModel().getSelection();
		if(recs.length==0){
			Ext.toastInfo('请至少选择一个采购类别');
		}else{
			var rec=recs[0];
			var lbbh=rec.get('nodeId');
			var panel = erp.Util.addContentTab({
			 	 xtype:'PurchaseUrge',
                 itemId : 'PurchaseUrge',
                 cglb:lbbh,
                 modFuncsDisabled:me.modFuncsDisabled,
                 title: '采购追催管理【采购类别：'+rec.get('text')+'】',
                 cglbmc:rec.get('text'),
                 closable : true
			})
			me.close();
		}
	}
});