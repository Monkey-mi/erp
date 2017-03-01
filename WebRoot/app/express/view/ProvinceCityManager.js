Ext.define('erp.express.view.ProvinceCityManager',{
	extend:'erp.ux.Window',
    alias:'widget.mng_ProvinceCity',
    iconCls:'box',
    height:560,
    width:560,
    anchorSize:95,
    modal : true,
    layout:'border',
    initComponent:function(){
    	var me =this;
 		var type_code;
 		var title;
 		me.provincestore=Ext.create('erp.express.store.Province');
 		me.citystore=Ext.create('erp.express.store.City');
 		Ext.apply(me.provincestore.proxy.extraParams, {usePaging:true});
 		this.on("afterrender",function(cmp){
				me.setTitle(cmp.modName);					
				me.provincestore.load();
 		});
 		this.on('beforedestroy',function(){
 			this.deleteProxyExtraParams();
 		});
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
			        						me.provincestore.reload();//必须的，避免记录没有主键的情况
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
								var wro=erp.Const.callServiceMethodSync('es/province.crm?method=checkForAdd',{
							    	code:e.newValues.code,
							    	name:e.newValues.name
							 	}).data;
							 	if(wro.flag==0){
							 		Ext.Msg.alert('提示',wro.msg);
									return false;
							 	}	
							 	return true;
			        		}else{
			        			var wro=erp.Const.callServiceMethodSync('es/province.crm?method=checkForEdit',{
							    	id:e.record.get('id'),
							    	code:e.newValues.code,
							    	name:e.newValues.name
							 	}).data;
							 	if(wro.flag==0){
							 		Ext.Msg.alert('提示',wro.msg);
									return false;
							 	}
							 	return true;
			        		}
						},
						'beforeedit':function(editor, e, obj){
							if(e.record.get('oo')=='000'){
			        			var columns=editor.grid.columns;
								Ext.each(columns,function(column){
									if(column.dataIndex=='code'){
										column.field.setDisabled(false);
									}
							    });	        	
			        		}else{
			        			var columns=editor.grid.columns;
								Ext.each(columns,function(column){
									if(column.dataIndex=='code'){
										column.field.setDisabled(true);
									}
							    });
			        		}//if								
						}//before
			        }
			});
 		var rowEditing2=Ext.create('Ext.grid.plugin.RowEditing', {
			        clicksToMoveEditor: 1,
			        autoCancel: false,
			        itemId:'rowEditing2',
			        pluginId: 'rowEditing2',
			        listeners: {
			        	//编辑时事件
			        	'edit':function(editor, e) {
			        		
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
								var wro=erp.Const.callServiceMethodSync('es/province.crm?method=checkForAddCity',{
							    	provincecode:e.record.get('provincecode'),
							    	code:e.newValues.code,
							    	name:e.newValues.name
							 	}).data;
							 	if(wro.flag==0){
							 		Ext.Msg.alert('提示',wro.msg);
									return false;
							 	}	
							 	return true;
			        		}else{
			        			var wro=erp.Const.callServiceMethodSync('es/province.crm?method=checkForEditCity',{
							    	id:e.record.get('id'),
							    	provincecode:e.record.get('provincecode'),
							    	code:e.newValues.code,
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
   	  	  items:[
	   	  	{
   	  	  	xtype:'grid',
   	  	  	itemId:'gird_province',
   	  	  	frame:true,
   	  	  	flex:1,
   	  	  	region:'center',
   	  	  	split:true,
   	  	  	store:me.provincestore,
   	  	  	dockedItems:[
   	  	  			{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  			items:[
				  		{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD
				  			,handler:function(){
								var grid=me.down('#gird_province');
								var rowEditing=grid.getPlugin('rowEditing');
								rowEditing.cancelEdit();
								var r = Ext.create('erp.express.model.Province', {
									oo:'000'//标记是否是增加
								});
				                grid.getStore().insert(0, r);
				                rowEditing.startEdit(0, 1);
							}
				  		},
				  		'-',
		   	  		    {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true
		   	  		    	,handler:function(){
								var grid=me.down('#gird_province');
								me.doDeleteProvince(grid);
							}
		   	  		    }
		
		   	  		]},
   	  	  			{
			    		xtype : 'pagingbar',
                        stateId : "pagingbar"+Ext.id(),
			    		store:me.provincestore,
			    		dock:'bottom',
			    		displayInfo:true
			    	 }],
		 	plugins: [
  	  			rowEditing
   	  	  	],   	 
   	  	  	columns:[  	  	  			  	  	  			
					{header: '代码',dataIndex: 'code',flex:2,editor:{   	  	  				
   	  	  				allowBlank:false
                        }},
					{header: '省级',dataIndex: 'name',flex:3,editor:{
						allowBlank : false
                        }}
   	  	  	],
   	  	  	listeners: {
				selectionchange: function(grid, recs) {
					if (recs.length > 0) {
						me.down('#BTN_DEL').setDisabled(false);
//						me.down('#BTN_ADD2').setDisabled(false);
//						if(!Ext.isEmpty(recs[0]) && !Ext.isEmpty(recs[0].get('code'))){
//							me.loadDetail(recs[0].get('code'));
//						}
						
					} else {
						me.down('#BTN_DEL').setDisabled(true);
//						me.down('#BTN_ADD2').setDisabled(true);
					}
				}
			}
   	  	  			
   	  	  }
//   	  	  ,{
//   	  	  	xtype:'grid',
//   	  	  	itemId:'grid_city',
//   	  	  	flex:1,
//   	  	  	frame:true,
//   	  	  	region:'east',
//   	  	  	hidden:true,
//   	  	  	split:true,
//   	  	  	store:me.citystore,
//   	  	  	multiSelect:true,
//   	  	  	selModel:Ext.create('Ext.selection.CheckboxModel'),
//   	  	  	dockedItems:[
//			    	 {xtype:'toolbar',dock:'top',itemId:'top_bar',
//			    	 items:[
//		  			{text: '新增',	iconCls:'page_add',		itemId:'BTN_ADD2',disabled:true
//			  			,handler:function(){
//							
//							var grid_pro=me.down('#gird_province');
//							var recs=grid_pro.getSelectionModel().getSelection();
//							if(recs.length>0){
//								var provincecode=recs[0].get('code');
//								var grid_city=me.down('#grid_city');
//								var rowEditing=grid_city.getPlugin('rowEditing2');
//								rowEditing.cancelEdit();
//								var r = Ext.create('erp.express.model.City', {
//									provincecode:provincecode,
//									oo:'000'//标记是否是增加
//								});
//								
//				                grid_city.getStore().insert(0, r);
//				                rowEditing.startEdit(0, 1);
//							}
//							
//						}
//			  		},
//			  		'-',
//	   	  		    {text: '删除',	iconCls:'page_delete',		itemId:'BTN_DEL2', disabled:true
//	   	  		    	,handler:function(){
//							var grid=me.down('#grid_city');
//							me.doDeleteEP(grid);
//						}
//	   	  		    }
//	
//	   	  			]}
//			 ],
//   	  	  	plugins: [
//   	  	  			rowEditing2
//   	  	  	],
//   	  	  	columns:[
//					  {header: '代码',dataIndex: 'code',flex:2,editor:{   	  	  				
//   	  	  				allowBlank:false
//                        }},
//					{header: '市级',dataIndex: 'name',flex:3,editor:{
//						allowBlank : false
//                        }}
//   	  	  			]
//   	  	  	,listeners: {
//				selectionchange: function(grid, recs) {
//					if (recs.length > 0) {
//						me.down('#BTN_DEL2').setDisabled(false);
//					} else {
//						me.down('#BTN_DEL2').setDisabled(true);
//					}
//				}
//			}
//   	  	  	}
   	  	  	]
   	  	  
		});		
 		me.callParent(arguments);
 	}
 	,deleteProxyExtraParams:function(){
 		var me=this;
 		delete me.provincestore.proxy.extraParams.usePaging;
 	}
 	,loadDetail:function(provincecode){
 		var me=this;
		me.citystore.loadPage(1,
			{
				params : {
					provincecode:provincecode
				}					
			}
		);
 	},
 	doDeleteProvince : function(grid) {
		var me = this;
		var recs = grid.getSelectionModel().getSelection();
//		if(me.citystore.getCount()>0){
//			Ext.Msg.alert('提示', '请先清空该省的市级');
//			return;
//		}
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
	},
 	/*删除方法*/
	doDeleteEP : function(grid) {
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
