Ext.define('erp.view.master.caterialPrice.window.ArgumentSet',{
	extend:'erp.ux.Window',
	modal:true,
	alias : 'widget.ArgumentSet',
	initComponent : function(){
	  var me=this;
	  me.argStore=Ext.create('erp.view.master.caterialPrice.store.CaterialPriceArgument',{autoLoad:true});
	  me.argColumns=erp.Util.getColumns(me.argStore.getModel());
	  Ext.apply(me,{
	  	width:560,
		height:440,
    	layout:{
		     type: 'fit',
		     pack: 'start',
		     align: 'stretch'
    	},
    	dockedItems:[{
	    	xtype: 'toolbar',
	    	dock: 'top',
	    	itemId:'ArgumentBar',
	    	items:[{text: '新增',	iconCls:'page_add',	itemId:erp.Const.FUNC_ITEMID_BTN_ADD,handler:function(){
	    		var rec=Ext.create('erp.view.master.caterialPrice.model.CaterialPriceArgument');
	    		me.edtShow(rec,true,true);
	    	}},
			   	  {text: '修改',	iconCls:'page_edit',	itemId:erp.Const.FUNC_ITEMID_BTN_EDT,	disabled:true,handler:function(){
			    		var recs=me.down('#ArgumentGrid').getSelectionModel().getSelection();
			    		if(recs==0){
							Ext.Msg.alert('提示','请至少选择一条记录!');
							return ;
						}
						var rec=recs[0];
			    		me.edtShow(rec,false,true);
			      }},
			   	  {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true,handler:function(){
			    		var recs=me.down('#ArgumentGrid').getSelectionModel().getSelection();
			    		if(recs==0){
							Ext.Msg.alert('提示','请至少选择一条记录!');
							return ;
						}
						Ext.Msg.confirm('提示','是否确认删除所选记录?',function(btn){
							if (btn=='yes'){
								me.argStore.remove(recs);
								me.argStore.sync({
									callback:function(){
										me.argStore.loadPage(1);
									}
								});
							}			
						});
			      }}
			]
	    }],
    	defaults:{padding:5},
	  	items:[{
	  		itemId:'ArgumentGrid',	
	  		xtype:'grid',	  			  			  		  		
	  		store:me.argStore,
	  		columns:me.argColumns,
	  		dockedItems:[{
				    		xtype : 'pagingbar',
		                    stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1123',
				    		dock:'bottom',
				    		displayInfo:true,
				    		defaultPageSize : 50,
				    		store:me.argStore
				    	}],
		    	listeners : {
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.setBtnStatus(false);
							} else {
								me.setBtnStatus(true);
							}
						},
						itemdblclick:function(t,rec,item,index){
							me.edtShow(rec,false,true);
						}
				}
	  	}]
	  });
	  this.callParent(arguments);
	},
	setBtnStatus:function(sts){
		var me=this;
		var panel=me.down('#ArgumentBar');
		panel.down('#BTN_EDT').setDisabled(sts);
		panel.down('#BTN_DEL').setDisabled(sts);
	},
	edtShow:function(rec,isAdd,isEdit){
		var me=this;
		var win = Ext.create('erp.view.master.caterialPrice.window.EdtArgument', {
					itemId : 'EdtArgument',
					title : '参数编辑',
					rec : rec,
					isAdd : isAdd,
					isEdit : isEdit,
					store : me.argStore,
					closable : true
				});
		win.show();
	}
});