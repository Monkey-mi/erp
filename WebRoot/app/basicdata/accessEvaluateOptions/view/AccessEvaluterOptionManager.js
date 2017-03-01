Ext.define('erp.basicdata.accessEvaluateOptions.view.AccessEvaluterOptionManager',{	
	extend:'erp.ux.Panel',
    alias:'widget.accessEvaluterOptionManager',    
    initComponent:function(){
    	var me =this;
    	me.store=Ext.create('erp.basicdata.accessEvaluateOptions.store.AccessEvaluterOption');
 		Ext.apply(me.store.proxy.extraParams, {usePaging:true});
 		
 		me.treeStore=Ext.create('erp.supplierAccess.store.EvaluateItemTree');
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
			        						me.store.reload();//必须的，避免记录没有主键的情况
			        						me.treeStore.reload();
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
								var rec=e.record;
								var result=erp.Const.callServiceMethodSync('accessEvalute/accessEvalute.act?method=checkForAdd',{
										item_name:e.newValues.item_name,
										f_id:rec.get('f_id')
								});
								var result=Ext.decode(result);  
								if(result.status==true){
									return true;
								}else if(result.status==false){					
									Ext.Msg.alert('提示',"该名称已存在");
									return false;
								}
			        		}else{
			        			var rec=e.record;
								var result=erp.Const.callServiceMethodSync('accessEvalute/accessEvalute.act?method=checkForUpdate',{
										item_name:e.newValues.item_name,
										f_id:rec.get('f_id'),
										item_id:rec.get('item_id')
								});
								var result=Ext.decode(result);  
								if(result.status==true){
									return true;
								}else if(result.status==false){					
									Ext.Msg.alert('提示',"该名称已存在");
									return false;
								}
			        		}
			        		
						},	
						'beforeedit':function(editor, e, obj){
							if(e.record.get('oo')=='000'){
			        			var columns=editor.grid.columns;
								Ext.each(columns,function(column){
									if(column.dataIndex=='area_id'){
										column.field.setDisabled(false);
									}
							    });	        	
			        		}else{
			        			var columns=editor.grid.columns;
								Ext.each(columns,function(column){
									if(column.dataIndex=='item_id'){
										column.field.setDisabled(true);
									}
							    });
			        		}//if				
						}
			        }
			});
 		
    	Ext.apply(me,{	
    	  layout:'border',
   	  	  items:[
   	  	   {
   	  	   		width:300,
		  		region:'west',
				split:true,
				title: '评估项选择',
				tools:[
			           {type:'refresh',tooltip:'刷新'}
			    ],
			    collapsible:true,
	  			xtype:'treepanel',
	   	  	  	itemId:'tree_access',
	   	  	  	width:200,
		    	useArrows: true,
		    	store:me.treeStore
		   	  	
   	  	   },
	   	  	{
	   	  	xtype:'grid',
   	  	  	region:'center',
   	  	  	itemId:'grid_access',
   	  	  	frame:true,
   	  	  	flex:1,
   	  	  	split:true,
   	  	  	store:me.store,
   	  	  	dockedItems:[
   	  	  			{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  			items:[
				  		{text: '新增',	glyph : 0xf016,		itemId:erp.Const.FUNC_ITEMID_BTN_ADD
				  			,handler:function(){
								var tree=me.down('#tree_access');
	 	 						var treeSelected=tree.getSelectionModel().getSelection()[0];
	 	 						if(Ext.isEmpty(treeSelected)){
	 	 							Ext.Msg.alert('提示','请先选中上级');
	 	 							return;
	 	 						}
	 	 						var parentId=treeSelected.get('id');
								var grid=me.down('#grid_access');
								var rowEditing=grid.getPlugin('rowEditing');
								rowEditing.cancelEdit();
								var rec=Ext.create('erp.basicdata.accessEvaluateOptions.model.AccessEvaluterOption',{
									oo:'000',
									f_id:parentId
								});
								me.store.insert(0, rec);
								rowEditing.startEdit(rec); 
							}
				  		},				  		
		   	  		    {text: '删除',	glyph : 0xf014,	itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true
		   	  		    	,handler:function(){
								me.doDelete();
							}
		   	  		    }
		   	  		]},
   	  	  			{
			    		xtype : 'pagingbar',
                        stateId : "pagingbar"+Ext.id(),
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	 }],
		 	plugins: [
  	  			rowEditing
   	  	  	],   	 
   	  	  	columns:[  	
   	  	  			{header: '评估项代码',dataIndex: 'item_id',width:100,editor:{}},
					{header: '评估项名称',dataIndex: 'item_name',width:260,editor:{maxLength:50}},
					{header: '上级编号',dataIndex: 'f_id',width:80},
					{header: '有效状态',dataIndex: 'activity_status',width:80,editor:{xtype:'numberfield',maxValue:1,minValue:0},renderer : erp.Util.Staterenderer},
					{header: '权重值',dataIndex: 'weightValue',editor:{xtype:'numberfield'}}
					
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
 	
 	doDelete: function() {
		var me = this;
		var grid=me.down('#grid_access');
		var rec = grid.getSelectionModel().getSelection()[0];
		var result=erp.Const.callServiceMethodSync('accessEvalute/accessEvalute.act?method=candeleted',{
				item_id:rec.get('item_id')
		});
		var result=Ext.decode(result);  
		if(result.status==false){
			Ext.Msg.alert('提示',"有下级，不可删除");
			return false;
		}
		Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
			if (btn == "yes") {		
				grid.getStore().remove(rec);
				grid.getStore().sync({
					success : function(e, batch) {
							Ext.Msg.alert('提示', '删除成功！');
							me.treeStore.reload();
					},
					failure : function(batch, options) {
							Ext.Msg.alert('提示', '删除失败！');
					}
				});				
			}
		});
	}
});
