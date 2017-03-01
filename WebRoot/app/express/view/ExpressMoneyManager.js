Ext.define('erp.express.view.ExpressMoneyManager',{
	extend:'erp.ux.Window',
    alias:'widget.mng_ExpressMoney',
    iconCls:'box',
    height:560,
    width:800,
    anchorSize:95,
    modal : true,
    initComponent:function(){
    	var me =this;
 		me.moneystore=Ext.create('erp.express.store.ExpressMoney');
 		Ext.apply(me.moneystore.proxy.extraParams, {usePaging:true});
 		me.countrystore=Ext.create('erp.master.basicData.enumType.store.EnumType');
 		Ext.apply(me.countrystore.proxy.extraParams, {usePaging:true,mjbh:'0807'});
 		me.countrystore.load();
 		me.citystore=Ext.create('erp.express.store.ExpressCity');
 		me.citystore.load();
 		me.dsfsStore=Ext.create('erp.express.store.Dsfs'/*,{autoLoad:true}*/);
 		var query_rec=Ext.create('erp.express.model.QueryExpressMoney');
 		
 		var rowEditing=Ext.create('Ext.grid.plugin.RowEditing', {
			        clicksToMoveEditor: 1,
			        autoCancel: false,
			        itemId:'rowEditing',
			        pluginId: 'rowEditing',
			        listeners: {
			        	//编辑时事件
			        	'edit':function(editor, e) {
			        		if(e.record.get('oo')=='000'){			
			        			e.record.phantom =true;//标记这条记录在store中不存在
			        		}
			        		e.grid.getStore().sync({
			        					success : function(e, batch) {
			        						me.moneystore.reload();//必须的，避免记录没有主键的情况
											Ext.Msg.alert('提示', '保存成功！');
										},
										failure : function(batch, options) {
											Ext.Msg.alert('提示', '保存失败！');
										}
			        			});
			        		
			        		e.record.commit();
							},
						
						//取消编辑是触发
						'canceledit':function(editor, e){
							if(e.record.get('oo')=='000'){
								e.grid.getStore().remove(e.record);
							}
						}
			        }
			});
 		
    	Ext.apply(me,{	
    	  layout:'fit',
   	  	  items:[
	   	  	{
   	  	  	xtype:'grid',
   	  	  	itemId:'grid_expressMoney',
   	  	  	frame:true,
   	  	  	flex:1,
   	  	  	split:true,
   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'),
   	  	  	store:me.moneystore,
   	  	  	dockedItems:[
   	  	  			{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  			items:[
				  		{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD
				  			,handler:function(){
								 var win=Ext.widget('addExpressMoney',{
								 		countrystore:me.countrystore,
								  		itemId:'addExpressMoney'
								  });	
								  win.show();
							}
				  		},
				  		
		   	  		    {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true
		   	  		    	,handler:function(){
								var grid=me.down('#grid_expressMoney');
								me.doDelete(grid);
							}
		   	  		    },
		   	  		    
		   	  		    {text: '筛选', iconCls:'page_find',itemId:'btn_query'
		   	  		    	,handler:function(){
		   	  		    		var win=Ext.widget('expressMoneyQueryWin',{
								  		countrystore:me.countrystore,
								  		mainstore:me.moneystore,
								  		rec:query_rec,
								  		dsfsStore:me.dsfsStore,
								  		itemId:'expressMoneyQueryWin'
								  });	
								  win.show();
							}
		   	  		    },
		   	  		    '-',
		   	  		    {text:'燃油费维护',iconCls:'box',itemId:'FuelToMaintain'
							  ,handler:function(){
								  var win=Ext.widget('mng_ExpressRyf',{
								  		itemId:'mng_ExpressRyf'
								  });	
								  win.show();
							  }
						 },
						 {text:'导入',iconCls:'page_excel',itemId:'page_excel'//hidden:!erp.Util.currentUser.isAdmin
							  ,handler:function(){
								  var win=Ext.widget('upExcel_ExpressMoney',{
								  		itemId:'upExcel_ExpressMoney'
								  });	
								  win.show();
							  }
						 }
		   	  		]},
   	  	  			{
			    		xtype : 'pagingbar',
                        stateId : "pagingbar"+Ext.id(),
			    		store:me.moneystore,
			    		dock:'bottom',
			    		displayInfo:true
			    	 }],
		 	plugins: [
  	  			rowEditing
   	  	  	],   	 
   	  	  	columns:[  	  	  			  	  	  			
					{header: '编号',dataIndex: 'id',width:60},
					{header: '国别',dataIndex: 'country_id',width:120,
						renderer:function(v){
	   	  	  				var rec=me.countrystore.findRecord('zzid',v,0,false,false,true);
							return rec? rec.get('mjms'):"";
	   	  	  			}
					},
					{header: '城市',dataIndex: 'city_id',width:120,
						renderer:function(v){
	   	  	  				var rec=me.citystore.findRecord('id',v,0,false,false,true);
							return rec? rec.get('name'):"";
	   	  	  			}
					},
					{header: '厂商名称',dataIndex: 'csmc',width:240},
					{header: '重量',dataIndex: 'zl',width:60},
					{header: '快递类型',dataIndex: 'special',width:60,
                        renderer:function(v){
	   	  	  				var rec=me.dsfsStore.findRecord('cid',v,0,false,false,true);
							return rec? rec.get('display'):"";
	   	  	  			}
                    },
					{header: '费用',dataIndex: 'fy',width:100,editor:{
							xtype: 'numberfield',
							decimalPrecision :2,
							minValue:0,
	    					step:1
                        }
                    }
   	  	  	],
   	  	  	listeners: {
				selectionchange: function(grid, recs) {
					if (recs.length > 0) {
						me.down('#BTN_DEL').setDisabled(false);
					} else {
						me.down('#BTN_DEL').setDisabled(true);
					}
				}
			}
   	  	  			
   	  	  }]
   	  	  
		});		
 		me.callParent(arguments);
 	},
 	
 	doDelete : function(grid) {
		var me = this;
		var recs = grid.getSelectionModel().getSelection();
		
		Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
			if (btn == "yes") {														 		
					Ext.Array.each(recs,function(rec){
						grid.getStore().remove(rec);// 从 Store 中删除给定的记录,
					});
					grid.getStore().sync({
						success : function(e, batch) {
								Ext.Msg.alert('提示', '删除成功！');
						},
						failure : function(batch, options) {
								Ext.Msg.alert('提示', '删除失败！');
						}
					});			 	
			}
		})
	}
});
