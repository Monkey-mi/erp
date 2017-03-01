Ext.define('erp.purchaseInspectionManage.view.ImpPurchaseInspetion',{
    extend: 'erp.ux.Window',
	alias: 'widget.Imp_PurchaseInspetion',
	modal:true,
	width : 0.75 * window.screen.width,
	height:0.8 * window.screen.height,
	layout:{
		type:'border',
		padding:2
	},
    initComponent : function(){
        var me =this;
        me.store = Ext.create('erp.purchaseInspectionManage.store.ImpPurchaseInspetion');
        me.selStore = Ext.create('erp.purchaseInspectionManage.store.ImpPurchaseInspetion');
        me.store.load();
        me.on('beforeclose',function(){
//           delete me.store.proxy.extraParams.csbh; 
        })
       /* var sec_bar=Ext.create('Ext.toolbar.Toolbar',{dock:'top',items: [{
           text:'查询',iconCls:'query',itemId : 'btn_impquery',
           handler: me.doQueryAction
        }]})*/
        Ext.apply(me,{
        	tbar : [{
					xtype : 'textfield',
					fieldLabel : '合同编号',
					enableKeyEvents : true,
					itemId : 'htbh',
					listeners : {
						keyup : me.onKeyup
					}
				}, {
					xtype : 'textfield',
					fieldLabel : '厂商名称',
					enableKeyEvents : true,
					itemId : 'csmc',
					listeners : {
						keyup : me.onKeyup
					}
				}, {
					xtype : 'button',
					hidden: me.isWh,
					iconCls : 'query',
					text : '查询',
					width : 80,
					itemId : 'btn_query',
					handler : function() {
						me.doSearch();
					}
				}],
        	items : [{
	            region:'center',
   	  	  		flex:12,
   	  	  		split : true,
   	  	  		xtype:'panel',
   	  	  		itemId : 'main_EI',
   	  	  		layout:{type:'border',padding:2},
            items :[
            	{
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
				{header:'合同号',width:80,dataIndex:'hth'},
				{header:'订单号',width:80,dataIndex:'ddh'},
				{header:'计划号',width:80,dataIndex:'jhh'},
				{header:'PO.NO',width:80,dataIndex:'pono'},
				{header:'生产单号',width:80,dataIndex:'htbz'},
				{header:'客户编号',width:80,dataIndex:'khbh'},
				{header:'客户型号',width:80,dataIndex:'khxh'},
				{header:'客户名称',width:80,dataIndex:'khmc'},
				{header:'产品编号',width:80,dataIndex:'cpbh'},
				{header:'产品编号',width:80,dataIndex:'cpbh'},
				{header:'产品名称',width:80,dataIndex:'cpmc'},
				{header:'单位',width:80,dataIndex:'jldw'},
				{header:'通知数量',width:80,dataIndex:'tzsl'},
				{header:'采购数量',width:80,dataIndex:'cgsl'},
				{header:'厂商编号',width:80,dataIndex:'csbh'},
				{header:'厂商名称',width:80,dataIndex:'csmc'},
				{header:'入库数量',width:80,dataIndex:'rksl'},
				{header:'拆分号',width:80,dataIndex:'cfh'},
				{header:'箱规格',width:80,dataIndex:'zxgz'},
				{header:'箱长',width:80,dataIndex:'xtcd'},
				{header:'箱宽',width:80,dataIndex:'xtkd'},
				{header:'箱高',width:80,dataIndex:'xtgd'},
				{header:'箱体积',width:80,dataIndex:'mxtj'},
				{header:'箱毛重',width:80,dataIndex:'mxmz'},
				{header:'箱净重',width:80,dataIndex:'mxjz'},
				{header:'箱只数',width:80,dataIndex:'mxzs'},
				{header:'外协号',width:80,dataIndex:'wxh'},
				{header:'英文描述',width:80,dataIndex:'ywms'},
				{header:'拆分编号',width:80,dataIndex:'cfbh'},
				{header:'拆分序号',width:80,dataIndex:'cfxh'}
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
				{header:'合同号',width:80,dataIndex:'hth'},
				{header:'订单号',width:80,dataIndex:'ddh'},
				{header:'计划号',width:80,dataIndex:'jhh'},
				{header:'PO.NO',width:80,dataIndex:'pono'},
				{header:'生产单号',width:80,dataIndex:'htbz'},
				{header:'客户编号',width:80,dataIndex:'khbh'},
				{header:'客户型号',width:80,dataIndex:'khxh'},
				{header:'客户名称',width:80,dataIndex:'khmc'},
				{header:'产品编号',width:80,dataIndex:'cpbh'},
				{header:'产品编号',width:80,dataIndex:'cpbh'},
				{header:'产品名称',width:80,dataIndex:'cpmc'},
				{header:'单位',width:80,dataIndex:'jldw'},
				{header:'通知数量',width:80,dataIndex:'tzsl'},
				{header:'采购数量',width:80,dataIndex:'cgsl'},
				{header:'厂商编号',width:80,dataIndex:'csbh'},
				{header:'厂商名称',width:80,dataIndex:'csmc'},
				{header:'入库数量',width:80,dataIndex:'rksl'},
				{header:'拆分号',width:80,dataIndex:'cfh'},
				{header:'箱规格',width:80,dataIndex:'zxgz'},
				{header:'箱长',width:80,dataIndex:'xtcd'},
				{header:'箱宽',width:80,dataIndex:'xtkd'},
				{header:'箱高',width:80,dataIndex:'xtgd'},
				{header:'箱体积',width:80,dataIndex:'mxtj'},
				{header:'箱毛重',width:80,dataIndex:'mxmz'},
				{header:'箱净重',width:80,dataIndex:'mxjz'},
				{header:'箱只数',width:80,dataIndex:'mxzs'},
				{header:'外协号',width:80,dataIndex:'wxh'},
				{header:'英文描述',width:80,dataIndex:'ywms'},
				{header:'拆分编号',width:80,dataIndex:'cfbh'},
				{header:'拆分序号',width:80,dataIndex:'cfxh'}
				]
                }],
		      buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]
        })
          me.callParent(arguments);  
    },
    doSearch : function() {
		var me = this;
		var htbh = me.down('#htbh').getValue();
		var csmc = me.down('#csmc').getValue();
		if (csmc!=''&&csmc!=null) {
			me.store.proxy.extraParams.csmc = csmc;
		} else {
			delete me.store.proxy.extraParams.csmc;
		}
		if (htbh!=''&&csmc!=null) {
			me.store.proxy.extraParams.htbh = htbh;
		} else {
			delete me.store.proxy.extraParams.htbh;
		}
		me.store.loadPage(1);
	},
	onKeyup : function(field, e) {
		if (e.getKey() == e.ENTER) {
			var me = this.up('window');
			me.doSearch();
		}
	}
})