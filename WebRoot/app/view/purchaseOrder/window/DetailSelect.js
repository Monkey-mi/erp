Ext.define('erp.view.purchaseOrder.window.DetailSelect',{
	extend:'erp.ux.Window',
	alias:'widget.sel_Detail',
//	plugins : {
//		ptype : 'FormKey'
//	},
	width:1200,
	title:'汇总调整明细选择',
	iconCls:'page_go',
	modal:true,
	height:600,
	requires: [
		'erp.view.purchaseOrder.store.PurchaseOrderDetail'
	],
	initComponent:function(){
		var me=this;
		me.store=me.DetailStore=Ext.create('erp.view.purchaseOrder.store.PurchaseOrderDetail',{
		
		});
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		me.store.proxy.api.read='purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailListForEdt';
		me.store.proxy.extraParams.htbh=me.htbh;
		me.store.proxy.extraParams.login_id=login_id;
		me.store.proxy.extraParams.ip=ip;
		me.store.load();
		me.selStore=Ext.create('erp.view.purchaseOrder.store.PurchaseOrderDetail');
		me.MainColumns=[
			{header:'序号',dataIndex:'htxh',width:40,align:'center',summaryRenderer: function(value, summaryData, dataIndex) {
				return '合计';
			}},
			{header:'材料货号',dataIndex:'clhh',width:80,align:'center'},
			{header:'材料名称',dataIndex:'clmc',width:160},
			{header:'规格尺寸',dataIndex:'cltx1',width:120,align:'center'},
			{header:'单位',dataIndex:'jldw',align:'center',width:60},
			{header:'采计数量',dataIndex:'cjsl',align:'right',width:80,align:'right',summaryType: 'sum',
				summaryRenderer: function(value, summaryData, dataIndex) {
					return value;
			}},
			{header:'采购数量',dataIndex:'cgsl',align:'right',width:80,align:'right',summaryType: 'sum',
				summaryRenderer: function(value, summaryData, dataIndex) {
					return value;
			}},
			{header:'辅助单位',dataIndex:'fzdw',width:80},
			{header:'辅助数量',dataIndex:'fzsl',align:'right',width:80,summaryType: 'sum',
				summaryRenderer: function(value, summaryData, dataIndex) {
					return Ext.util.Format.number(value,'0,000.00');;
			},renderer:Ext.util.Format.floatRenderer},
			{header:'控制单价',dataIndex:'kzdj',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
			{header:'采购单价',dataIndex:'cgdj',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
			{header:'采购金额',dataIndex:'cgje',width:80,align:'right',summaryType: 'sum',
				summaryRenderer: function(value, summaryData, dataIndex) {
					return Ext.util.Format.number(value,'0,000.00');;
			},renderer:Ext.util.Format.floatRendererOne},
			{header: '币种',dataIndex: 'wbdh',width:60},
		    {header: '汇率',dataIndex: 'wbhl',width:60,renderer:Ext.util.Format.floatRenderer},
		    {header: '外币单价',dataIndex: 'wbdj',width:80,renderer:Ext.util.Format.floatRenderer},
		    {header:'外币金额',dataIndex:'wbje',width:80,align:'right',align:'right',
	   	  	  	summaryRenderer: function(value, summaryData, dataIndex) {
		            return value>0? Ext.util.Format.number(v,'0,000.00'):'';
		    },renderer:Ext.util.Format.floatRendererOne},
		    {header: '辅助控价',dataIndex: 'fzkj',width:80,renderer:Ext.util.Format.floatRenderer},
		    {header: '采购日期',dataIndex: 'cgrq',width:85,renderer:Ext.util.Format.dateRendererOne},
		    {header: '供货周期',dataIndex: 'ghzq',width:60},
		    {header: '交货日期',dataIndex: 'jhrq',width:85,renderer:Ext.util.Format.dateRendererOne},
		    {header:'生产单号',dataIndex:'htbz',width:80},
	   	  	{header:'订单号',dataIndex:'ddh',width:80},
	   	  	{header:'计划号',dataIndex:'jhh',width:80},
		    {header:'采计号',dataIndex:'cgh',width:80},
		    {header: '需求号',dataIndex: 'sqh',width:80},
		    {header: '申购号',dataIndex: 'sgh',width:80},
		    {header:'核算部门',dataIndex:'hsbmmc',width:80},
		    {header: '送达仓库',dataIndex: 'sdckmc',width:90},
		    {header:'备注说明',dataIndex:'jsbl',width:160},
		    {header: '原采购量',dataIndex: 'ycgl',width:100,align:'right',align:'right',
	   	  	  	summaryRenderer: function(value, summaryData, dataIndex) {
		            return value>0? Ext.util.Format.number(value,'0,000.#####'):'';
		    },renderer:Ext.util.Format.floatRenderer}
		];
		Ext.apply(me,{
			layout:{type:'vbox',align: 'stretch'},
			items:[{
				xtype:'grid',
				itemId:'grdUnSelData',
				flex:1,
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.insert(me.selStore.getCount(),rec);
						me.store.remove(rec);
					}
				},
				features: [{
				    ftype: 'summary',
			       	dock:'bottom'
				}],
				columns:me.MainColumns,
				store:me.store,
				dockedItems:[
					/*{ xtype:'toolbar',
					dock:'top',
					defaults:{labelWidth:60,flex:2,xtype:'textfield'},
					items:[
						{xtype:'textfield',fieldLabel:'订单号',enableKeyEvents :true,itemId:'ddh',listeners:{keypress:me.onKeyup}},
					    {xtype:'textfield',fieldLabel:'采计号',enableKeyEvents :true,itemId:'cjh',listeners:{keypress:me.onKeyup}},
					 	{fieldLabel:'计划类别',itemId:'jhlb',winParam:{spbj:1,khzt:1},enableKeyEvents :true,listeners:{keypress:me.onKeyup}},
					 	{fieldLabel:'采购员',flex:2,forceSelection:false,enableKeyEvents :true,itemId:'cgym',listeners:{keypress:me.onKeyup}},
					 	{xtype:'textfield',fieldLabel:'材料名称',enableKeyEvents :true,itemId:'clmc',listeners:{keypress:me.onKeyup}},
					 	'->',
					{width:40,xtype:'button',iconCls:'query',text:'查询',width:80,itemId:'btn_query',handler:me.doQueryAction}
					]
					},*/{
			    		xtype : 'pagingbar',
                        stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
			    		store:me.store,
			    		dock:'bottom',
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
				},
				{
					itemId:'btn_unSel',
					tooltip:'取消选择',
					text:'取消选择',
					xtype:'button',
					iconCls:'control-090',
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
				itemId:'grdSelData',
				flex:1,
				features: [{
				    ftype: 'summary',
			       	dock:'bottom'
				}],
				selModel:Ext.create('Ext.selection.CheckboxModel'),
				listeners:{
					'itemdblclick':function(view,rec){
						me.selStore.remove(rec);
					}
				},
				columns:me.MainColumns,
				store:me.selStore
			}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	},
	onKeyup:function(field,e){
		var me=this.up('window');
			if(e.getKey()==e.ENTER){
				me.doQueryAction();
			}
	},
	doQueryAction:function(){
		var me=this.up('window');
		if(me==null){
			me=this;
		}
		var ddh=me.down('#ddh').getValue();
		var cjh=me.down('#cjh').getValue();
		var jhlb=me.down('#jhlb').getValue();
		var cgym=me.down('#cgym').getValue();
		var clmc=me.down('#clmc').getValue();
		if (ddh&&ddh!=''){
			me.store.proxy.extraParams.ddh=ddh;
		}else{
			delete me.store.proxy.extraParams.ddh;
		}
		if (cjh&&cjh!=''){
			me.store.proxy.extraParams.cgh=cjh;
		}else{
			delete me.store.proxy.extraParams.cgh
		}
		if (jhlb&&jhlb!=''){
			me.store.proxy.extraParams.jhlb=jhlb;
		}else{
			delete me.store.proxy.extraParams.jhlb
		}
		if (cgym&&cgym!=''){
			me.store.proxy.extraParams.cgym=cgym;
		}else{
			delete me.store.proxy.extraParams.cgym
		}
		if (clmc&&clmc!=''){
			me.store.proxy.extraParams.clmc=clmc;
		}else{
			delete me.store.proxy.extraParams.clmc
		}
		me.store.loadPage(1);
	}
})