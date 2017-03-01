Ext.define('erp.master.operator.view.CooperatorImp',{
	extend:'erp.ux.Window',
	requires:['erp.master.operator.store.Operator','erp.ux.SearchCombobox'],
	alias:'widget.imp_CooperatorImp',
//	plugins : {
//		ptype : 'FormKey'
//	},
	width:900,
	title:'协同人员选择',
	iconCls:'page_go',
	modal:true,
	height:600,
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.master.operator.store.Operator');
		Ext.apply(me.store.getProxy().extraParams,{tybj:0,usePaging:true});
		me.store.load();
		me.selStore=Ext.create('erp.master.operator.store.Operator');
		this.on('beforedestroy',function(){
 			this.deleteExtraParams();//关闭前清空额外的参数
 		});
		Ext.apply(me,{
			layout:{type:'hbox',align: 'stretch'},
			items:[{
				xtype:'grid',
				title:'可选协同人员',
				flex:1,
				itemId:'grdUnSelData',
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				columns:[{header: '工号',dataIndex: 'czy_gh',flex:2},
						{header: '协同人员 ',dataIndex: 'czy_xm',flex: 3},						
						{header: '所属部门 ',dataIndex: 'bmmc',flex: 2},												
						{header: '工作岗位 ',dataIndex: 'gzgw',flex: 2}
				],
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.store.remove(rec);
					}
				},
				store:me.store,
				dockedItems:[{
					xtype:'toolbar',
					dock:'top',
					defaults:{padding:'0 5 0 0',labelWidth:60},
					items:[{xtype:'tps_searchcbo',itemId:'search',fieldLabel:'快速查询',emptyText:'输入协同人员名称',labelWidth:80,
   	  					hideTrigger:true,
   	  			 		store:me.store,
		    	 		displayField:'czy_gh',
		    	 		valueField:'czy_xm',listeners:{keyup:function(){
		    	 			Ext.apply(me.store.proxy.extraParams, {condition:me.down('#search').getValue()});
		    	 			me.store.loadPage(1);
		    	 		}}
		    	 	},'->',{text:'查询',iconCls:'query',
       	  				    handler:function(btn){
       	  				    	Ext.apply(me.store.proxy.extraParams, {condition:me.down('#search').getValue()});
       	  				    	me.store.loadPage(1);
       	  				    }
   	  				    }]
					},{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		displayInfo:true
			    	  }]
			},{
				xtype:'container',
				width:40,
				layout:{type:'vbox',align:'stretch',pack:'center',defaultMargins:5},
				items:[{
					itemId:'btn_sel',
					xtype:'button',
					tooltip:'选择',
					text:'>',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.down('#grdUnSelData').getSelectionModel().getSelection();
							Ext.each(recs,function(rec){
								me.selStore.insert(me.selStore.getCount(),rec);
								me.store.remove(rec);
							})
							
						}
					}
				},
				{
					itemId:'btn_selAll',
					xtype:'button',
					tooltip:'全选',
					text:'>>',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.store.getRange();
							Ext.each(recs,function(rec){
								me.selStore.insert(me.selStore.getCount(),rec);
								me.store.remove(rec);
							})
							
						}
					}
				},
				{
					itemId:'btn_unSel',
					tooltip:'取消选择',
					xtype:'button',
					text:'<',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.down('#grdSelData').getSelectionModel().getSelection();
								me.selStore.remove(recs);
							
						}
					}
				},
				{
					itemId:'btn_unSelAll',
					tooltip:'全不选',
					xtype:'button',
					text:'<<',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.selStore.removeAll();
						}
					}
				}]
			},{
				xtype:'grid',
				itemId:'grdSelData',
				flex:1,
				title:'已选协同人员',
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				columns:[{header: '工号',dataIndex: 'czy_gh',flex:2},
						{header: '协同人员 ',dataIndex: 'czy_xm',flex: 3},						
						{header: '所属部门 ',dataIndex: 'bmmc',flex: 2},												
						{header: '工作岗位 ',dataIndex: 'gzgw',flex: 2}
				],
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.remove(rec);
					}
				},
				store:me.selStore
			}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){
					me.close();
				}
			}]
		});
		me.callParent(arguments);
	},
	deleteExtraParams:function(){
		var me=this;
		delete me.store.proxy.extraParams.dydh;
		delete me.store.proxy.extraParams.cpmc;
		delete me.store.proxy.extraParams.khbh;
		delete me.store.proxy.extraParams.gdbj;
	}
})