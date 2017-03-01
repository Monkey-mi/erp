Ext.define('erp.express.view.ExpressRyfManager',{
	extend:'erp.ux.Window',
    alias:'widget.mng_ExpressRyf',
    iconCls:'box',
    height:480,
    width:560,
    anchorSize:95,
    modal : true,
    title:'燃油费维护',
    initComponent:function(){
    	var me =this;
    	var query_rec=Ext.create('erp.express.model.QueryExpressRyf');
 		me.store=Ext.create('erp.express.store.ExpressRyf');
 		Ext.apply(me.store.proxy.extraParams, {usePaging:true});
 		me.store.load();
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
   	  	  	itemId:'grid_ryf',
   	  	  	frame:true,
   	  	  	flex:1,
   	  	  	split:true,
   	  	  	store:me.store,
   	  	  	dockedItems:[
   	  	  			{xtype:'toolbar',dock:'top',itemId:'top_bar',
   	  	  			items:[
				  		{text: '新增',	iconCls:'page_add',		itemId:erp.Const.FUNC_ITEMID_BTN_ADD
				  			,handler:function(){
								var win=Ext.widget('addExpressRyf',{
								  		itemId:'addExpressRyf'
								 });
								 win.show();
							}
				  		},				  		
		   	  		    {text: '删除',	iconCls:'page_delete',		itemId:erp.Const.FUNC_ITEMID_BTN_DEL, disabled:true
		   	  		    	,handler:function(){
								var grid=me.down('#grid_ryf');
								me.doDeletecountry(grid);
							}
		   	  		    },'-',
		   	  		    {text: '筛选', iconCls:'page_find',itemId:'btn_query'
		   	  		    	,handler:function(){
		   	  		    		var win=Ext.widget('expressRyfQueryWin',{
								  		mainstore:me.store,
								  		rec:query_rec,
								  		itemId:'expressRyfQueryWin'
								  });	
								  win.show();
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
					{header: '厂商名称',dataIndex: 'csmc',width:200},
					{header: '年份',dataIndex: 'nf',width:60},
					{header: '月份',dataIndex: 'yf',width:200},
					{header: '燃油费率',dataIndex: 'ryf',xtype:'numbercolumn',format:'0.0000',flex:1,
						editor:{
							xtype: 'numberfield',
					    	allowBlank : false,
							decimalPrecision :4
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
 	
 	doDeletecountry : function(grid) {
		var me = this;
		var recs = grid.getSelectionModel().getSelection();
		
		Ext.Msg.confirm("提示", "真的要删除选中的记录吗?", function(btn) {
			if (btn == "yes") {		
				grid.getStore().remove(recs);
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
