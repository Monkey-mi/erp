Ext.define('erp.express.view.CountryCityManager',{
	extend:'erp.ux.Window',
    alias:'widget.mng_CountryCity',
    iconCls:'box',
    height:560,
    width:880,
    anchorSize:95,
    modal : true,
    
    initComponent:function(){
    	var me =this;
 		var title;
 		me.countrystore=Ext.create('erp.master.basicData.enumType.store.EnumType');
 		me.citystore=Ext.create('erp.express.store.ExpressCity');
 		me.linkstore=Ext.create('erp.express.store.Countrycity');
 		Ext.apply(me.countrystore.proxy.extraParams, {usePaging:true,mjbh:'0807'});
 		Ext.apply(me.citystore.proxy.extraParams, {usePaging:true});
 		this.on("afterrender",function(cmp){
				me.setTitle(cmp.modName);					
				me.countrystore.load();
				me.citystore.load();
 		});
 		this.on('beforedestroy',function(){
 			this.deleteProxyExtraParams();
 		});
 		
    	Ext.apply(me,{	
    	  	layout:'border',
			tbar:[
				  {text:'城市维护',iconCls:'box'
				  	 ,handler:function(){
						  var win=Ext.widget('mng_ExpressCity',{
						  		itemId:'mng_ExpressCity'
						  });	
						  win.show();
					  }
				  },
				  {text:'保存',iconCls:'save',itemId:'BTN_SAVE'},
	    			{text:'关闭',iconCls:'page_error',
	    				handler:function(){
	    					me.close();	
	    			}
				}
				],
   	  	  items:[
	   	  	{
   	  	  	xtype:'grid',
   	  	  	itemId:'grid_country',
   	  	  	frame:true,
   	  	  	width:300,
   	  	  	region:'west',
   	  	  	split:true,
   	  	  	store:me.countrystore,
   	  	  	dockedItems:[   	  	  			
   	  	  			{
			    		xtype : 'pagingbar',
                        stateId : "pagingbar"+Ext.id(),
			    		store:me.countrystore,
			    		dock:'bottom',
			    		displayInfo:true
			    	 }],		 	   	 
   	  	  	columns:[  	  	  			  	  	  			
					{header: '编号',dataIndex: 'zzid',width:60},
					{header: '国家',dataIndex: 'mjms',width:120},
					{header: '描述',dataIndex: 'mjbz',flex:1}
   	  	  	],
   	  	  	listeners: {
				selectionchange: function(grid, recs) {
					if (recs.length > 0) {
						me.loadDetail(recs[0].get('zzid'));																		
					}
				}
			}
   	  	  			
   	  	  },
   	  	  {   	  	  	
	   	  	  	flex:1,
	   	  	  	region:'center',
	   	  	  	split:true,
   	  	  		layout:{type:'hbox',align: 'stretch'},
				items:[{
					xtype:'grid',
					title:'可选',
					flex:1,
					itemId:'grdUnSelData',
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					dockedItems:[
	   	  	  		{
	    			    xtype: 'toolbar',
	    				dock: 'top',
	    				items:[
	    					{xtype:'erp_searchcboOnlyName',itemId:'search',emptyText:'输入城市名..',labelWidth:60,width:200,
			   	  				hideTrigger:true,
			   	  			 	store:me.citystore,
					    	 	displayField:'name',
					    	 	valueField:'id'
			   	  			}
//			   	  			,
//			   	  			{text:'查询',iconCls:'query',
//		       	  				   handler:function(btn){
//		       	  				    	me.citystore.loadPage(1,{
//		           	  				    	params:{
//		           	  				    		search:me.down('#search').getValue()
//		           	  				    	}
//		       	  				    	});
//		       	  				    }
//			   	  			 }
			   	  			]
	    			},
	    			{
			    		xtype : 'pagingbar',
                        stateId : "pagingbar"+Ext.id(),
			    		store:me.citystore,
			    		dock:'bottom',
			    		displayInfo:true
			    	 }
	    			],
					columns:[	   	  	  			
	   	  	  			{header: '城市',dataIndex: 'name',flex:1}
	   	  	  		],
					store:me.citystore
				},{
					xtype:'container',
					width:40,
					layout:{type:'vbox',align:'stretch',pack:'center',defaultMargins:5},
					items:[
					{
						itemId:'btn_sel',
						xtype:'button',
						tooltip:'选择',
						text:'>'
					},
					{
						itemId:'btn_selAll',
						xtype:'button',
						tooltip:'全选',
						text:'>>'
					},
					{
						itemId:'btn_unSel',
						tooltip:'取消选择',
						xtype:'button',
						text:'<'
					},
					{
						itemId:'btn_unSelAll',
						tooltip:'全不选',
						xtype:'button',
						text:'<<'
					}
					]
				},{
					xtype:'grid',
					itemId:'grdSelData',
					flex:1,
					title:'已选',
					selModel:Ext.create('Ext.selection.CheckboxModel'),
					columns:[
   	  	  				{header: '城市',dataIndex: 'name',flex:1}
   	  	  			],
					store:me.linkstore
				}]
   	  	  }]
   	  	  
		});		
 		me.callParent(arguments);
 	}
 	,deleteProxyExtraParams:function(){
 		var me=this;
 		delete me.countrystore.proxy.extraParams.mjbh;
 		delete me.citystore.proxy.extraParams.usePaging;
 	}
 	,loadDetail:function(country_id){
 		var me=this;
		me.linkstore.loadPage(1,
			{
				params : {
					country_id:country_id
				}					
			}
		);
 	}
});
