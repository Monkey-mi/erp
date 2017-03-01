Ext.define('erp.view.master.perchasepriceadjust.view.WareHouseImp',{
	extend:'erp.ux.Window',
	alias:'widget.WareHouseImp',
	width:1200,
	title:'入库单导入',
	iconCls:'page_go',
	height:600,
	modal:true,
	controller:'PerchasePriceCtl',
    viewModel: {
        type: 'perchaseViewModel'
    },
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.master.perchasepriceadjust.store.RkdbImp');
		me.store.proxy.extraParams.hsbm=me.hsbm;
		me.store.proxy.extraParams.csbh=me.csbh;
		me.store.load();
		me.selStore=Ext.create('erp.view.master.perchasepriceadjust.store.RkdbImp');
		me.on('beforeclose',function(){
			delete me.store.proxy.extraParams.hsbm;
		});
		Ext.apply(me,{
			layout:{type:'vbox',align: 'stretch'},
			items:[{
				xtype:'grid',
				itemId:'proDetailData',
				flex:1,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.store.remove(rec);
					}
				},
				columns:[
							{header: '锁定',dataIndex: 'sdbj',width:35,
								renderer:function(value){
								if(value==true||value==1){
									return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}else {
									return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}
							}},
							{ dataIndex: 'ckmc' ,header:'仓库名称',width:90},
							{ dataIndex: 'rkdh', header:'入库单号',width:80},
							{ dataIndex: 'rkxh', header:'入库序号',width:80},
							{ dataIndex: 'fzhm' ,header:'分组',width:90},
							{ dataIndex: 'csmc' ,header:'供应厂商',width:90},
							{ dataIndex: 'rkrq', xtype:'datecolumn',format:'Y-m-d' ,header:'入库日期',width:90},
							{ dataIndex: 'clhh' ,header:'材料货号',width:80},
							{ dataIndex: 'clmc' ,header:'材料名称',width:210},
							{ dataIndex: 'cpmc' ,header:'产品名称',width:120},
							{ dataIndex: 'zcpmc' ,header:'主产品名称',width:260},
							{ dataIndex: 'cltx1' ,header:'规格尺寸',width:80},
							{ dataIndex: 'jldw' ,header:'单位',width:45},
							{ dataIndex: 'rksl', header:'入库数量',width:80 },
							{ dataIndex: 'rkdj', header:'入库单价',width:80 },
							{ dataIndex: 'rkje', header:'入库金额',width:80},
							{ dataIndex: 'hth',header:'合同后',width:90 }
							],
				store:me.store,
				dockedItems:[
					{
					xtype:'toolbar',
					dock:'top',
					defaults:{padding:'0 5 0 0',labelWidth:60,width:180},
					items:[{xtype:'textfield',fieldLabel:'入库单号',enableKeyEvents :true,itemId:'rkdh',
						listeners:{keyup:me.onKeyup}},
						{xtype:'helpField',
						code : erp.DataConst.FACTORYINFO,
						fieldConfig:{forceSelection:true},xtype:'textfield',fieldLabel:'供应厂商',enableKeyEvents :true,itemId:'csbh',
							listeners:{keyup:me.onKeyup}},'-',
					{   				
					    labelWidth: 70,                     
                        boxLabel: '按材料货号查询',
                        itemId:'checkbox_clhh1',
                        xtype: 'radio',
                        name: 'checkbox_clhh',
                        inputValue: 'Y',
                        width:110,
                        value:true
                    }, {
                        labelWidth: 70,
                        boxLabel: '按材料名称查询',
                        itemId:'checkbox_clhh2',
                        name: 'checkbox_clhh',
                        xtype: 'radio',
                        width:110,
                        inputValue: 'N'
                    },
						{xtype:'textfield',width:120,enableKeyEvents :true,itemId:'clhh',
						listeners:{keyup:me.onKeyup}},'-',
					{xtype:'button',iconCls:'query',text:'查询',width:80,itemId:'btn_query'
						,handler:function(){
							me.doSearch();
						}
					}]
					},{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
			    		defaultPageSize : 200,
			    		displayInfo:true
			    	  }]
			},{
				xtype:'container',
				width:40,
				layout:{type:'hbox',align:'stretch',pack:'center',defaultMargins:5},
				items:[{
					itemId:'btn_sel',
					xtype:'button',
					tooltip:'选择',
					text:'选择',
					iconCls:'control-270',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.down('#proDetailData').getSelectionModel().getSelection();
							Ext.each(recs,function(rec){
								me.selStore.insert(me.selStore.getCount(),rec);
								me.store.remove(rec);
							});
							
						}
					}
				},
				{
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
							});
							
						}
					}
				},
				{
					itemId:'btn_unSel',
					tooltip:'取消选择',
					text:'取消选择',
					xtype:'button',
					iconCls:'control-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.down('#proofimelData').getSelectionModel().getSelection();
								me.selStore.remove(recs);
							
						}
					}
				},
				{
					itemId:'btn_unSelAll',
					tooltip:'全不选',
					text:'全不选',
					xtype:'button',
					iconCls:'control-double-090',
					listeners:{
						click:function(but,  e,  eOpts){
							recs=me.selStore.removeAll();
						}
					}
					
				}]
			},{
				xtype:'grid',
				itemId:'proofimelData',
				flex:1,
//				selModel:Ext.create('Ext.selection.CheckboxModel'),
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.remove(rec);
					}
				},
				columns:[
							{header: '锁定',dataIndex: 'sdbj',width:35,
								renderer:function(value){
								if(value==true||value==1){
									return '<img class="x-grid-checkcolumn x-grid-checkcolumn-checked" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}else {
									return '<img class="x-grid-checkcolumn" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==">';
								}
							}},
							{ dataIndex: 'ckmc' ,header:'仓库名称',width:90},
							{ dataIndex: 'rkdh', header:'入库单号',width:80},
							{ dataIndex: 'rkxh', header:'入库序号',width:80},
							{ dataIndex: 'fzhm' ,header:'分组',width:90},
							{ dataIndex: 'csmc' ,header:'供应厂商',width:90},
							{ dataIndex: 'rkrq', xtype:'datecolumn',format:'Y-m-d' ,header:'入库日期',width:90},
							{ dataIndex: 'clhh' ,header:'材料货号',width:80},
							{ dataIndex: 'clmc' ,header:'材料名称',width:210},
							{ dataIndex: 'cpmc' ,header:'产品名称',width:120},
							{ dataIndex: 'zcpmc' ,header:'主产品名称',width:260},
							{ dataIndex: 'cltx1' ,header:'规格尺寸',width:80},
							{ dataIndex: 'jldw' ,header:'单位',width:45},
							{ dataIndex: 'rksl', header:'入库数量',width:80 },
							{ dataIndex: 'rkdj', header:'入库单价',width:80 },
							{ dataIndex: 'rkje', header:'入库金额',width:80},
							{ dataIndex: 'hth',header:'合同后',width:90 }
							],
				store:me.selStore
			}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	},
	doSearch:function(){
		var me=this;
		var rkdh=me.down('#rkdh').getValue();
		if (rkdh){
			me.store.proxy.extraParams.rkdh=rkdh;
		}else{
			delete me.store.proxy.extraParams.rkdh;
		}
		var csbh=me.down('#csbh').getValue();
		if (csbh){
			me.store.proxy.extraParams.csbhSearch=csbh;
		}else{
			delete me.store.proxy.extraParams.csbhSearch;
		}
		
		var clhh = me.down('#clhh').getValue();
		if(me.down('#checkbox_clhh1').getValue() && clhh){
			delete me.store.proxy.extraParams.clmc;
			me.store.proxy.extraParams.clhh=clhh;
		}
		else if(me.down('#checkbox_clhh2').getValue() && clhh){
			delete me.store.proxy.extraParams.clhh;
			me.store.proxy.extraParams.clmc=clhh;
		}else{
			delete me.store.proxy.extraParams.clhh;
			delete me.store.proxy.extraParams.clmc;
		}
		/*if (clhh){
			me.store.proxy.extraParams.clhh=clhh;
		}else{
			
		}*/
		me.store.loadPage(1);
	},
	onKeyup:function(field,e){
			if(e.getKey()==e.ENTER){
				var me=this.up('window');
				me.doSearch();
			}
	}
});