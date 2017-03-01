Ext.define('erp.express.view.ChjhdrWin', {
	extend:'erp.ux.Window',
	alias : 'widget.chjhdrWin',
	title : '出货计划导入',
	iconCls:'box',
	requires:[	
    			'erp.ux.PagingBar',
    			'erp.ux.QueryPanel',
    			'erp.ux.SearchComboboxOnlyName'
    ],
	width : 800,
	height : 0.6 * window.screen.height,
	resizable : false,
	modal : true,
	initComponent : function() {
		var me = this;
		
		me.store = Ext.create('erp.express.store.Chjhdr');
		Ext.apply(me.store.proxy.extraParams,{usePaging:true});
		me.store.on({
    	 	 load:function(s,recs){
    	 	 	var grid=me.down('#grdUnSelData');
				var drecs=grid.getSelectionModel().getSelection();
				if(drecs.length>0){
					grid.getView().focusRow(drecs[0]);
				}else{
					if(recs.length>0){
						console.log(grid)
						console.log(grid.getSelectionModel())
						grid.getSelectionModel().selectAll();
					}
				}
    	 	 }
    	}),
    	me.store.load()
		Ext.apply(this, {
			layout:{type:'hbox',align: 'stretch',defaultMargins:{right:5}},
			items : [{ 
						xtype : 'panel',
						layout : 'fit',
						flex:2,
						tbar:[{
							xtype:'datefield',
							itemId:'cysj',
							name:'cysj',
							labelWidth : 60,
							format:'Y-m-d',
							fieldLabel:'拖柜日期',
							value:new Date(),
							listeners:{
	                        	specialkey: function(field, e){
	        	                    var Query="  and cysj >= '"+Ext.util.Format.date(me.down('#cysj').getValue(),'Y-m-d')+"' and cysj <='"+Ext.util.Format.date(me.down('#cysjw').getValue(),'Y-m-d')+"'";
			  				    	me.store.proxy.extraParams.Query=Query;
			  				    	me.store.proxy.extraParams.search=me.down('#search').getValue();
			  				    	me.store.loadPage(1,
			  				    		{
			   	  				    	params:{
			   	  				    		search:me.down('#search').getValue()
			   	  				    	}
			  				    	});
	        	                }
							}
							},{
							xtype:'datefield',
							itemId:'cysjw',
							name:'cysjw',
							format:'Y-m-d',
							value:new Date(),
							labelWidth : 20,
							fieldLabel:'至',
							listeners:{
		                    	specialkey: function(field, e){
		    	                    var Query="  and cysj >= '"+Ext.util.Format.date(me.down('#cysj').getValue(),'Y-m-d')+"' and cysj <='"+Ext.util.Format.date(me.down('#cysjw').getValue(),'Y-m-d')+"'";
			  				    	me.store.proxy.extraParams.Query=Query;
			  				    	me.store.proxy.extraParams.search=me.down('#search').getValue();
			  				    	me.store.loadPage(1,
			  				    		{
			   	  				    	params:{
			   	  				    		search:me.down('#search').getValue()
			   	  				    	}
			  				    	});
		    	                }
							}},
								'->',
						    {xtype:'textfield',itemId:'search',fieldLabel:'快速查询',emptyText:'输入出运编号..',labelWidth:60,width:320/*,
								hideTrigger:true,
							 	store:me.store,
					    	 	displayField:'cybh',
					    	 	valueField:'cybh'*/
							},
							{text:'查询',iconCls:'query',
			  				   handler:function(btn){
			  				   		
			  				    	var Query="  and cysj >= '"+Ext.util.Format.date(me.down('#cysj').getValue(),'Y-m-d')+"' and cysj <='"+Ext.util.Format.date(me.down('#cysjw').getValue(),'Y-m-d')+"'";
			  				    	me.store.proxy.extraParams.Query=Query;
			  				    	me.store.proxy.extraParams.search=me.down('#search').getValue();
			  				    	me.store.loadPage(1,
			  				    		{
			   	  				    	params:{
			   	  				    		
			   	  				    	}
			  				    	});
			  				    }
							 }
						  ],
						items : [{
								xtype : 'grid',
								store : me.store,
								itemId:'grdUnSelData',
								multiSelect:true,
   	  	  						selModel:Ext.create('Ext.selection.CheckboxModel'),
								columns : [{
											text : '选择',
											dataIndex : 'xzbj',
											xtype:'checkcolumn',
											width:40
										}, {
											text : '出运编号',
											dataIndex : 'cybh',
											width:120
										}, {
											text : '销售类别',
											dataIndex : 'xslbmc',
											width:100
										},{
										    text:'客户名称',
										    dataIndex:'khmc',
										    width:200
										},{
										    text:'出货日期',
										    dataIndex:'chsj',
										    width:100,
										    renderer:function(value){
												if(value!=null){
													return Ext.Date.format(value, 'Y-m-d');  
												}
											}
										},
										{
										    text:'议付金额',
										    dataIndex:'yfje',
										    width:100
										},
										{
										    text:'备注说明',
										    dataIndex:'bzsm',
										    width:200
										}
								],
								dockedItems:[{
						    		xtype : 'pagingbar',
					                stateId : 'mng_'+Ext.id(),
						    		store:me.store,
						    		dock:'bottom',
						    		displayInfo:true
						    	 }]
							}]
					}]
					,
				buttons:['->',{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
					{text:'关闭',iconCls:'page_error',handler:function(){me.close()}}
				]
		});
		this.callParent(arguments);
	}
});