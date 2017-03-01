Ext.define('erp.materialInspection.view.ArriveImp',{
    extend: 'erp.ux.Window',
	alias: 'widget.Imp_Arrive',
	modal:true,
	width : 0.75 * window.screen.width,
	height:0.8 * window.screen.height,
	layout:{
		type:'border',
		padding:2
	},
    initComponent : function(){
        var me =this;
        me.store = Ext.create('erp.materialInspection.store.ArriveList');
        me.selStore = Ext.create('erp.materialInspection.store.ArriveList');
        me.store.proxy.extraParams.csbh=me.csbh;
        me.store.load();
        me.on('beforeclose',function(){
           delete me.store.proxy.extraParams.csbh; 
        })
        var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [{
           text:'查询',iconCls:'query',itemId : 'btn_impquery',
           handler: me.doQueryAction
        }]})
        Ext.apply(me,{
        	tbar : sec_bar,
        	items : [{
	            region:'center',
   	  	  		flex:12,
   	  	  		split : true,
   	  	  		xtype:'panel',
   	  	  		itemId : 'main_EI',
   	  	  		layout:{type:'border',padding:2},
            items :[
            		{
					region:'west',
					xtype:'tree_warehouse',
					itemId:'pnl_warehouse',
					title:'仓库选择',
					split:true,
					width:100,
					listeners : {
					   selectionchange:function(panel,recs){
					      if(recs.length>0){
					           me.store.proxy.extraParams.ckbh=recs[0].get('nodeId');
					           me.store.load();
					      }
					   }
					}
				},{
               xtype : 'grid',
               itemId : 'grdUnSelData',
               region : 'center',
               flex : 10,
               overflowY:'auto',
			   overflowX:'auto',
			   selModel:Ext.create('Ext.selection.CheckboxModel'),
			   features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
				}],
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.remove(rec);
						me.store.add(rec);
					}
				},
				store : me.store,
				columns : [
				{header:'加急',dataIndex:'jjbj',width:35,
	   	  	  				renderer:function(value){
								if(value=="true"||value=="1"){
									return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}else {
									return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}
	   	  	  				},
                            summaryType: 'count',
                            summaryRenderer: function(value, summaryData, dataIndex) {
                                return '合计';
                            }},
				{header:'外协',dataIndex:'wxbj',width:35,
	   	  	  				renderer:function(value){
								if(value=="true"||value=="1"){
									return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}else {
									return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}
	   	  	  				}},
				{header:'到货号',width:80,dataIndex:'dhh'},
				{header:'合同号',width:80,dataIndex:'hth'},
				{header:'到货日期',width:80,dataIndex:'dhrq',xtype:'datecolumn',format:'Y-m-d'},
				{header:'供应厂商',width:180,dataIndex:'csmc'},
				{header:'生产单号',width:80,dataIndex:'jhbz'},
				{header:'材料货号',width:80,dataIndex:'clhh'},
				{header:'材料名称',width:180,dataIndex:'clmc'},
				{header:'主产品名称',width:180,dataIndex:'zcpmc'},
				{header:'计量单位',width:65,dataIndex:'jldw'},
				{header:'到货数量',width:80,dataIndex:'dhsl',
                            summaryType: 'sum',
                            summaryRenderer: function(value, summaryData, dataIndex) {
                                return value;
                            }},
				{header:'已入数量',width:80,dataIndex:'yrsl',
                            summaryType: 'sum',
                            summaryRenderer: function(value, summaryData, dataIndex) {
                                return value;
                            }},
				{header:'未入数量',width:80,dataIndex:'wrsl',
                            summaryType: 'sum',
                            summaryRenderer: function(value, summaryData, dataIndex) {
                                return value;
                            }},
				{header:'送货单号',width:80,dataIndex:'shdh'},
				{header:'交库人',width:60,dataIndex:'jkrm'}
				],
			   dockedItems:[{
				    xtype : 'pagingbar',
		            stateId : '8081d1236f3-9ddsadb7-470d-b764-dbb70c5e81b1',
				   	dock:'bottom',
				    displayInfo:true,
				    defaultPageSize : 100,
				    store:me.store
				}]
             },{
                region : 'south',
                flex : 1,
                layout : 'vbox',
                items:[
                {
              xtype:'container',
		      width : 1000,
		      align : 'right',  
		      flex : 1,
		      layout:{type:'hbox',align:'stretch',pack:'center',defaultMargins:5},
		          items:[{
		              itemId:'btn_sel',
					  xtype:'button',
					  tooltip:'选择',
					  text:'选择',
					  iconCls:'control-270',
					  listeners:{
					     click:function(but,  e,  eOpts){
					     	recs=me.down('#grdUnSelData').getSelectionModel().getSelection();
					        console.log(recs)
					        Ext.each(recs,function(rec){
								me.selStore.insert(me.selStore.getCount(),rec);
								me.store.remove(rec);
							})
					      }
					    }
		          },{
                     itemId:'btn_selAll',
					 xtype:'button',
					 tooltip:'全选',
					 text:'全选',
					 iconCls:'control-double-270',
					 listeners:{
						click:function(but,  e,  eOpts){
							recs=me.store.getRange();
							Ext.each(recs,function(rec){
								me.selStore.insert(me.selStore.getCount(),rec);
								me.store.remove(rec);
							})
						 }
					  }                
                   },{
                    itemId:'btn_unSel',
					tooltip:'取消选择',
					text:'取消选择',
					xtype:'button',
					iconCls:'control-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.down('#proofimelData').getSelectionModel().getSelection();
							    me.store.insert(me.store.getCount(),recs);
								me.selStore.remove(recs);
						}
					}
                   },{
                    itemId:'btn_unSelAll',
					tooltip:'全不选',
					text:'全不选',
					xtype:'button',
					iconCls:'control-double-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.selStore.getRange();
							me.store.insert(me.store.getCount(),recs);
							me.store.reload();
							me.selStore.removeAll();
						}
					}
				  }]
                }]
                }
                ]
             },{
             	region : 'south',
                xtype : 'grid',
                split : true,
               itemId : 'proofimelData',
               flex : 9,
               overflowY:'auto',
			   overflowX:'auto',
			   selModel:Ext.create('Ext.selection.CheckboxModel'),
			   features: [{
					        ftype: 'summary',
					        summaryType: 'count',
							dock: 'bottom'
				}],
				store : me.selStore,
				columns : [
				{header:'加急',dataIndex:'jjbj',width:35,
	   	  	  				renderer:function(value){
								if(value=="true"||value=="1"){
									return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}else {
									return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}
	   	  	  				},
                            summaryType: 'count',
                            summaryRenderer: function(value, summaryData, dataIndex) {
                                return '合计';
                            }},
				{header:'外协',dataIndex:'wxbj',width:35,
	   	  	  				renderer:function(value){
								if(value=="true"||value=="1"){
									return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}else {
									return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}
	   	  	  				}},
				{header:'到货号',width:80,dataIndex:'dhh'},
				{header:'合同号',width:80,dataIndex:'dhh'},
				{header:'到货日期',width:80,dataIndex:'dhrq',xtype:'datecolumn',format:'Y-m-d'},
				{header:'供应厂商',width:180,dataIndex:'csmc'},
				{header:'生产单号',width:80,dataIndex:'jhbz'},
				{header:'材料货号',width:80,dataIndex:'clhh'},
				{header:'材料名称',width:180,dataIndex:'clmc'},
				{header:'主产品名称',width:180,dataIndex:'zcpmc'},
				{header:'计量单位',width:65,dataIndex:'jldw'},
				{header:'到货数量',width:80,dataIndex:'dhsl',
                            summaryType: 'sum',
                            summaryRenderer: function(value, summaryData, dataIndex) {
                                return value;
                            }},
				{header:'已入数量',width:80,dataIndex:'yrsl',
                            summaryType: 'sum',
                            summaryRenderer: function(value, summaryData, dataIndex) {
                                return value;
                            }},
				{header:'未入数量',width:80,dataIndex:'wrsl',
                            summaryType: 'sum',
                            summaryRenderer: function(value, summaryData, dataIndex) {
                                return value;
                            }},
				{header:'送货单号',width:80,dataIndex:'shdh'},
				{header:'交库人',width:60,dataIndex:'jkrm'}
				]
                }],
		      buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]
        })
          me.callParent(arguments);  
    },
    doQueryAction : function(){
       var me=this.up('window');
        var rec = Ext.create('erp.materialInspection.model.ImpQueryParams');
        var win = Ext.widget('query_Imp',{
            rec : rec,
            store : me.store
        });
      /* win.down*/
       win.show();
    }
})