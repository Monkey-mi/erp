Ext.define('erp.express.view.ExpressCityManager',{
	extend:'erp.ux.Window',
    alias:'widget.mng_ExpressCity',
    iconCls:'box',
    height:560,
    width:560,
    anchorSize:95,
    modal : true,
    initComponent:function(){
    	var me =this;
 		me.citystore=Ext.create('erp.express.store.ExpressCity');
 		Ext.apply(me.citystore.proxy.extraParams, {usePaging:true});
 		me.citystore.load();
 		
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
			        						me.citystore.reload();//必须的，避免记录没有主键的情况
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
						},
						'validateedit':function(editor,e,obj){								
							if(e.record.get('oo')=='000'){			        							
								var wro=erp.Const.callServiceMethodSync('es/expressCountry.crm?method=checkForAddCity',{
							    	name:e.newValues.name
							 	}).data;
							 	if(wro.flag==0){
							 		Ext.Msg.alert('提示',wro.msg);
									return false;
							 	}	
							 	return true;
			        		}else{
			        			var wro=erp.Const.callServiceMethodSync('es/expressCountry.crm?method=checkForEditCity',{
							    	id:e.record.get('id'),
							    	name:e.newValues.name
							 	}).data;
							 	if(wro.flag==0){
							 		Ext.Msg.alert('提示',wro.msg);
									return false;
							 	}
							 	return true;
			        		}
						}
			        }
			});
 		
    	Ext.apply(me,{	
    	  layout:'fit',
   	  	  items:[
	   	  	{
   	  	  	xtype:'grid',
   	  	  	itemId:'grid_city',
   	  	  	frame:true,
   	  	  	flex:1,
   	  	  	split:true,
   	  	  	store:me.citystore,
   	  	  	dockedItems:[
   	  	  			{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  			items:[
				  		{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD
				  			,handler:function(){
								var grid=me.down('#grid_city');
								var rowEditing=grid.getPlugin('rowEditing');
								rowEditing.cancelEdit();
								var r = Ext.create('erp.express.model.ExpressCity', {
									oo:'000'//标记是否是增加
								});
				                grid.getStore().insert(0, r);
				                rowEditing.startEdit(0, 1);
							}
				  		},
				  		'-',
		   	  		    {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true
		   	  		    	,handler:function(){
								var grid=me.down('#grid_city');
								me.doDelete(grid);
							}
		   	  		    },
						{xtype:'erps_searchcboOnlyName',itemId:'search',emptyText:'输入城市名..',labelWidth:60,width:200,
		   	  				hideTrigger:true,
		   	  			 	store:me.citystore,
				    	 	displayField:'name',
				    	 	valueField:'id'
		   	  			},
		   	  			{text:'查询',iconCls:'query',
		       	  				   handler:function(btn){
		       	  				    	me.citystore.loadPage(1,{
		           	  				    	params:{
		           	  				    		search:me.down('#search').getValue()
		           	  				    	}
		       	  				    	});
		       	  				    }
		   	  			 }
		
		   	  		]},
   	  	  			{
			    		xtype : 'pagingbar',
                        stateId : "pagingbar"+Ext.id(),
			    		store:me.citystore,
			    		dock:'bottom',
			    		displayInfo:true
			    	 }],
		 	plugins: [
  	  			rowEditing
   	  	  	],   	 
   	  	  	columns:[  	  	  			  	  	  			
					{header: '编号',dataIndex: 'id',flex:2},
					{header: '城市',dataIndex: 'name',flex:3,editor:{
						allowBlank : false
                        }}
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
				var cityArray=[];
				Ext.Array.each(recs,function(rec){
						cityArray.push(rec.get('id'));
					});
				var wro=erp.Const.callServiceMethodSync('es/expressCountry.crm?method=candeletecity',{
			    	cityArray:cityArray.join(',')
			 	}).data;
			 	if(wro.flag==1){			 		
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
			 	}else{
			 		var id=wro.msg;
		        	var rec=grid.getStore().findRecord('id',id,0,false,false,true);
					var name=rec? rec.get('name'):'';
		        	Ext.Msg.alert('提示',name+"不可删除");
		        	return;
			 	}
			}
		})
	}
});
