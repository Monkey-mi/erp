Ext.define('erp.view.purchaseUrge.window.ConfirmTime',{
	extend:'erp.ux.Window',
	alias : 'widget.confirmTime',
	title:'确认交期',
	modal:true,
	width: 800,
	height:400,
	controller:'PurchaseUrgeCtl',
	requires:[
		'erp.view.purchaseUrge.store.ConfirmTime'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseUrge.store.ConfirmTime');
		me.store.load({params:{hths:me.hths}})
		Ext.apply(me,{
    		layout:{
			     type: 'fit',
			     pack: 'start',
			     align: 'stretch'
	    	},
	    	dockedItems:[{
		    	xtype: 'toolbar',
		    	dock: 'top',
		    	itemId:'ConfirmTimeBar',
		    	items:[
		    		{text:'确定', iconCls:'accept', itemId:'btn_yes'},
				   	{text:'同步物控',iconCls:'',itemId:'btn_sync'},
				   	{fieldLabel:'确认交期',xtype:'datefield',format:'Y.m.d',itemId:'qrjq',listeners:{
				   		change:function(t,v){
				   			var recs=me.down('#mainGrid').getSelectionModel().getSelection();
				   			if(recs.length==0){
				   				Ext.toastInfo('请选择一条或多条记录!');
				   				return ;
				   			}
				   			Ext.each(recs,function(rec){
				   				rec.set('qrjq',v);
				   				rec.set('zxqrrm',erp.Util.currentUser.userInfo.name);
				   			})
				   		}
				   	}}
				]
		    }],
			items:[{
	    			xtype:'grid',
	    			itemId:'mainGrid',
	    			width:200,
	    			store:me.store,
	    			selModel:Ext.create('Ext.selection.CheckboxModel'),
	    			plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		switch(field){
					        			case 'qrjq':
					        				rec.set('zxqrrm',erp.Util.currentUser.userInfo.name);
					        			break;
					        		}
					        	}
					        },
					        clicksToEdit: 1
					}),
	    			columns:[
	    				{header:'合同号',dataIndex:'hth',width:80},
	    				{header:'材料名称',dataIndex:'clmc',width:160},
	    				{header:'规格尺寸',dataIndex:'cltx1',width:80},
	    				{header:'上线日期',dataIndex: 'sxrq',width:85,renderer:Ext.util.Format.dateRendererOne},
	    				{header:'物控交期',dataIndex: 'wkjq',width:85,renderer:Ext.util.Format.dateRendererOne},
	    				{header:'确认交期',dataIndex: 'qrjq',width:120,renderer:Ext.util.Format.dateRendererOne,field:{
			   	  	  			xtype:'datefield',
			   	  	  			format:'Y.m.d'
			   	  	  	}},
	    				{header:'追催摘要',dataIndex:'zczy',width:80},
	    				{header:'采购数量',dataIndex:'cgsl',width:80},
	    				{header:'厂商名称',dataIndex:'csmc',width:160}
	    			]
	    	}]
		})
		me.callParent(arguments);
	}
});