Ext.define('erp.view.purchaseOrder.view.PurOrderSouthTab',{
	extend: 'Ext.tab.Panel',
	alias: 'widget.mng_SouthTab',
	autoScroll:true,
	layoutOnTabChange:true,
	requires:[
		'erp.view.purchaseOrder.store.PurchaseOrderDetail',
		'erp.view.purchaseOrder.store.DetailSummarize',
		'erp.view.purchaseOrder.store.OrderDescribe',
		'erp.view.purchaseOrder.store.OrderSubsidiary',
		'erp.view.purchaseOrder.store.PurchaseChange',
		'erp.view.purchaseOrder.store.PurchaseFile',
		'erp.view.purchaseOrder.store.PurBom',
		'erp.view.purchaseOrder.store.Component',
		'erp.view.purchaseOrder.store.PurchaseOrderDetailBuffered'
	],
	initComponent: function(){
		var me = this;
		/*me.BuffDetailStore=Ext.create('erp.view.purchaseOrder.store.PurchaseOrderDetail',{
			listeners:{
				'load':function(s,recs){
					if(recs.length>0){
						me.down('#TrafficGrid').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid1').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid2').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid3').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid4').getSelectionModel().select(recs[0]);
					}
				}
			}
		});*/
		me.BuffDetailStore=Ext.create('erp.view.purchaseOrder.store.PurchaseOrderDetailBuffered',{
			listeners:{
				totalcountchange:function onStoreSizeChange() {
					var params={},
					s=me.BuffDetailStore,
					proxy=s.getProxy(),
					filterParam=proxy.filterParam,
					sortParam=proxy.sortParam;
					Ext.apply(params,proxy.extraParams);
					if(s.remoteFilter){
					   filters = s.getFilters().items;
					   if (filterParam && filters && filters.length > 0) {
					      params[filterParam] = proxy.encodeFilters(filters);
					   }
					}
					if(s.remoteSort){
						 sorters = s.getSorters().items;
						 if (sorters&&sorters.length > 0) {
					        params[sortParam] = proxy.encodeSorters(sorters);
					     }
					}
					var recs1 = erp.Const.callServiceMethodSync(
						'purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailSum', params);
					if(recs1!=null&&recs1.length>0&&recs1[0]!=null){
						Ext.apply(me.DetailSum.data,recs1[0]);
					}else{
						me.DetailSum=Ext.create('erp.view.purchaseOrder.model.PurchaseOrderDetail');
					}
			    },
				'load':function(s,recs){
					if(recs.length>0){
						me.down('#PurchaseDetail').getSelectionModel().select(recs[0]);
						me.down('#TrafficGrid').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid1').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid2').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid3').getSelectionModel().select(recs[0]);
						me.down('#MaterialGrid4').getSelectionModel().select(recs[0]);
					}else{
						me.BuffDetailStore.removeAll();
						me.DetailSum=Ext.create('erp.view.purchaseOrder.model.PurchaseOrderDetail');
					}
				}
			}
		});
		me.SummarizeStore=Ext.create('erp.view.purchaseOrder.store.DetailSummarize');
		me.ProDescStore=Ext.create('erp.view.purchaseOrder.store.OrderDescribe');
		me.SubsidiaryStore=Ext.create('erp.view.purchaseOrder.store.OrderSubsidiary');
		me.ChangeStore=Ext.create('erp.view.purchaseOrder.store.PurchaseChange');
		me.FileStore=Ext.create('erp.view.purchaseOrder.store.PurchaseFile');
		me.BomStore=Ext.create('erp.view.purchaseOrder.store.PurBom');
		me.LinkStore=Ext.create('erp.view.purchaseOrder.store.Component');
		me.outSourceStore=Ext.create('erp.view.purchaseOrder.store.OutSourcePicking');
		me.DetailSum=Ext.create('erp.view.purchaseOrder.model.PurchaseOrderDetail');
		Ext.apply(me,{
		 items: [{
		 		title:'合同明细',
	   	  	  	xtype:'grid',
	   	  	  	itemId:'PurchaseDetail',
		    	store:me.BuffDetailStore,
		    	features: [{
			        ftype: 'summary',
			        dock:'bottom'
			    }],
			    selModel:Ext.create('Ext.selection.CheckboxModel',{
					mode:'MULTI'
				}),
				viewConfig:{
					enableTextSelection:true,
			     	getRowClass:function(rec,rowIndex,rowParams,store){
			     		/*if(rec.get('kzdj')<rec.get('cgdj')){
						     return 'x-grid-record-red';
						}*/
				     	if(rec.get('gzbj')==1){
						     return 'x-grid-record-green';
						}
			     	}
			    },
			    plugins: [{ptype: 'bufferedrenderer'}],
		    	columns:[
		    		{header:'完成' ,dataIndex:'wcbj',width:35,renderer:erp.Util.Staterenderer,
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                 return '合计';
		            }},
		    		{header: '中止',dataIndex: 'zzbj',width:35,renderer:erp.Util.Staterenderer},
	   	  	  		{header: '品质确认',dataIndex: 'pzqrbj',width:60,renderer:erp.Util.Staterenderer},
	   	  	  		{header: '首次',dataIndex: 'scbj',width:35,renderer:erp.Util.Staterenderer},
	   	  	  		{header: '更改',dataIndex: 'ggcs',width:35,renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  		{header:'材料名称',dataIndex:'clmc',width:180},
	   	  	  		{header:'规格尺寸',dataIndex:'cltx1',width:90},
	   	  	  		{header:'备注说明',dataIndex:'bzsm',width:120},
	   	  	  		{header:'单位',dataIndex:'jldw',width:35},
	   	  	  		{header:'采计数量',dataIndex:'cjsl',width:80,align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('cjsl');
		                return v!=0? Ext.util.Format.number(v,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'采购数量',dataIndex:'cgsl',width:80,align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('cgsl');
		                return v!=0? Ext.util.Format.number(v,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header:'到货/入库',dataIndex:'dhrk',width:80,align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('dhrk');
		                return v!=0? Ext.util.Format.number(v,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header:'入库数量',dataIndex:'rksl',width:80,align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('rksl');
		                return v!=0? Ext.util.Format.number(v,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header:'入库未完',dataIndex:'rkww',width:80,align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('rkww');
		                return v!=0? Ext.util.Format.number(v,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'采购单价',dataIndex:'cgdj',width:80,renderer:Ext.util.Format.floatRenderer,align:'right'},
	   	  	  		{header:'税率',dataIndex:'zzsl',width:40,renderer:function(v){
	   	  	  			return v!=0?v*100+'%':''
	   	  	  		}},
	   	  	  		{header:'控制单价',dataIndex:'kzdj',width:60,renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'生产单号',dataIndex:'htbz',width:70},
	   	  	  		{header:'订单号',dataIndex:'ddh',width:60},
	   	  	  		{header:'客户简称',dataIndex:'khjc',width:60},
		            {header:'中止人',dataIndex:'zzrm',width:60},
	   	  	  		{header:'中止时间',dataIndex:'zzsj',width:70,renderer : Ext.util.Format.dateRendererOne},
		            {header:'产品名称',dataIndex:'cpmc',width:160},
	   	  	  		{header:'计划号',dataIndex:'jhh',width:60},
		            {header:'采计号',dataIndex:'cgh',width:65},
	   	  	  		{header:'核算部门',dataIndex:'hsbmmc',width:70},
	   	  	  		{header:'外箱',dataIndex:'wxbj',width:35,renderer:erp.Util.Staterenderer},
	   	  	  		{header:'序号',dataIndex:'htxh',width:40,align:'center'},
		            {header:'材料图号',dataIndex:'clth',width:60,align:'center'},	
		            {header:'排序',dataIndex:'pxxh',width:40,align:'center',renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'控价类型',dataIndex:'kjlx',width:60,align:'center',renderer:function(v){
	   	  	  			return v==0?'主控价':'辅控价';
	   	  	  		}},
	   	  	  		{header:'主转换系数',dataIndex:'zzhxs',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'辅助单位',dataIndex:'fzdw',width:60},
	   	  	  		{header:'辅助数量',dataIndex:'fzsl',width:80,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('fzsl');
		                return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		            },renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'短料根数',dataIndex:'dlgs',width:80,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('dlgs');
		                return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header:'专利单价',dataIndex:'zldj',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'采购金额',dataIndex:'cgje',width:80,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('cgje');
		                return v!=0? Ext.util.Format.number(v,'0,000.00'):'';
		            },renderer:Ext.util.Format.floatRendererOne},
	   	  	  		{header:'采购未完',dataIndex:'cgww',width:80,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('cgww');
		                return v!=0? Ext.util.Format.number(v,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'未完金额',dataIndex:'cgwwje',width:80,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('cgwwje');
		                return v!=0? Ext.util.Format.number(v,'0,000.00'):'';
		            },renderer:Ext.util.Format.floatRendererOne},
		            {header:'待检数量',dataIndex:'djsl',width:80,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('djsl');
		                return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header:'待入数量',dataIndex:'drsl',width:80,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('drsl');
		                return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header:'待退数量',dataIndex:'dtsl',width:60,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('dtsl');
		                return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header: '币种',dataIndex: 'wbdh',width:40},
		            {header: '汇率',dataIndex: 'wbhl',width:40,renderer:Ext.util.Format.floatRenderer},
		            {header: '外币单价',dataIndex: 'wbdj',width:60,renderer:Ext.util.Format.floatRenderer},
		            {header:'外币金额',dataIndex:'wbje',width:80,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('wbje');
		                return v!=0? Ext.util.Format.number(v,'0,000.00'):'';
		            },renderer:Ext.util.Format.floatRendererOne},
		            {header: '采购日期',dataIndex: 'cgrq',width:70,renderer:Ext.util.Format.dateRendererOne},
		            {header: '供货周期',dataIndex: 'ghzq',width:60},
		            {header: '交货日期',dataIndex: 'jhrq',width:70,renderer:Ext.util.Format.dateRendererOne},
		            {header: '采计交期',dataIndex: 'wkjq',width:70,renderer:Ext.util.Format.dateRendererOne},
		            {header: '更新时间',dataIndex: 'gxsj',width:70,renderer:Ext.util.Format.dateRendererOne},
		            {header: '回签交期',dataIndex: 'hqjq',width:70,renderer:Ext.util.Format.dateRendererOne},
		            {header: '确认交期',dataIndex: 'qrjq',width:70,renderer:Ext.util.Format.dateRendererOne},
		            {header: '拆分号',dataIndex: 'cfh',width:60},
		            {header: '需求号',dataIndex: 'sqh',width:60},
		            {header: '申购号',dataIndex: 'sgh',width:60},
		            {header: '主合同号',dataIndex: 'zxhth',width:60},
		            {header: '中止类型',dataIndex: 'zzlxmc',width:60},
		            {header: '中止原因',dataIndex: 'zzyx',width:60},
		            {header: '送达仓库',dataIndex: 'sdckmc',width:60},
		            {header: '模具号',dataIndex: 'mjh',width:60},
		            {header: '铝管系数(kg/m)',dataIndex: 'lgxs',width:100,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('lgxs');
		                return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header: '原采购量',dataIndex: 'ycgl',width:80,align:'right',align:'right',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
	   	  	  			var v=me.DetailSum.get('ycgl');
		                return v!=0? Ext.util.Format.number(v,'0,000.#####'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header: '原规格尺寸',dataIndex: 'ysgg',width:80},
			   	  	{header:'OA申请ID',dataIndex:'requestid',width:70}
		    	]
		    	},{
		    	title:'领料明细',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'outSouce',
		    	useArrows: true,
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid6',
					xtype:'grid',
					store:me.BuffDetailStore,
					plugins: [{ptype: 'bufferedrenderer'}],
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.outSourceStore.load({params:{htbh:recs[0].get('htbh')+'',htxh:recs[0].get('htxh')+''}});
							} else {
								me.outSourceStore.load({params:{htbh:-1,htxh:-1}});
							}
						}
					},
					columns:[
	   	  	  			{header:'序号',dataIndex:'htxh',width:40,//summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:40},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:60,//align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		   	  	  			var v=me.DetailSum.get('cgsl');
			                return v!=0? Ext.util.Format.number(v,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'箱只数',dataIndex:'mxzs',width:60,renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
		    		itemId:'outSourcePicking',
		    		xtype:'grid',
		    		flex:1,
					autoScroll:true,
		    		split:true,
					region:'east',
					store:me.outSourceStore,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
					columns:[
						{header:'序号',dataIndex:'tzxh',width:40,
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
						{header:'材料类别',dataIndex:'lbmc',width:60},
						{header:'材料货号',dataIndex:'clhh',width:60},
						{header:'材料名称',dataIndex:'clmc',width:60},
						{header:'规格尺寸',dataIndex:'cltx1',width:60},
						{header:'单位',dataIndex:'jldw',width:40},
						{header:'单件用量',dataIndex:'djyl',width:60},
						{header:'加工用量',dataIndex:'jgyl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
						{header:'×(1+损耗率)',dataIndex:'jsbl',width:90},
						{header:'=通知领料',dataIndex:'tzll',width:90,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'已领数量',dataIndex:'ylsl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'未领数量',dataIndex:'wlsl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
						{header:'出售单价',dataIndex:'csdj',width:60},
						{header:'出售金额',dataIndex:'csje',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
						{header:'备注说明',dataIndex:'jsbl',width:160}
					]
		    	}]
		    },{
		 		title:'明细汇总',
	   	  	  	xtype:'grid',
	   	  	  	itemId:'DetailSummarize',
		    	store:me.SummarizeStore,
		    	features: [{
			        ftype: 'summary',
			        dock:'bottom'
			    }],
		    	columns:[
		    		{header:'材料货号' ,dataIndex:'clhh',width:60,summaryType: 'count',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                 return '合计';
		            }},
		    		{header: '材料名称',dataIndex: 'clmc',width:180},
		    		{header:'规格尺寸',dataIndex:'cltx1',width:60},
		    		{header:'备注说明',dataIndex:'bzsm',width:60},
		    		{header:'单位',dataIndex:'jldw',width:35},
		    		{header:'采计数量',dataIndex:'cjsl',width:60,align:'right',summaryType: 'sum',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                return value!=0? Ext.util.Format.number(value,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
	   	  	  		{header:'采购数量',dataIndex:'cgsl',width:80,align:'right',summaryType: 'sum',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                return value!=0? Ext.util.Format.number(value,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header:'到货/数量',dataIndex:'dhrk',width:80,align:'right',summaryType: 'sum',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                return value!=0? Ext.util.Format.number(value,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header:'采计未完',dataIndex:'cjww',width:80,align:'right',summaryType: 'sum',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                return value!=0? Ext.util.Format.number(value,'0,000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header:'采购单价',dataIndex:'cgdj',width:80,renderer:Ext.util.Format.floatRenderer,align:'right'},
		            {header:'控制单价',dataIndex:'kzdj',width:80,renderer:Ext.util.Format.floatRenderer},
		            {header:'采购金额',dataIndex:'cgje',width:80,align:'right',summaryType: 'sum',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                return value!=0? Ext.util.Format.number(value,'0,000.00'):'';
		            },renderer:Ext.util.Format.floatRendererOne},
		            {header: '交货日期',dataIndex: 'jhrq',width:70,renderer:Ext.util.Format.dateRendererOne},
		            {header: '币种',dataIndex: 'wbdh',width:60},
		            {header: '外币单价',dataIndex: 'wbdj',width:60,renderer:Ext.util.Format.floatRenderer},
		            {header:'外币金额',dataIndex:'wbje',width:80,align:'right',summaryType: 'sum',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                return value!=0? Ext.util.Format.number(value,'0,000.00'):'';
		            },renderer:Ext.util.Format.floatRendererOne},
		            {header:'辅助单位',dataIndex:'fzdw',width:60},
		            {header:'辅助采购数量',dataIndex:'fzcgsl',width:120,align:'right',summaryType: 'sum',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                return value!=0? Ext.util.Format.number(value,'0,000.000'):'';
		            },renderer:Ext.util.Format.floatRenderer},
		            {header: '采购日期',dataIndex: 'cgrq',width:70,renderer:Ext.util.Format.dateRendererOne},
	   	  	  		{header: '材料图号',dataIndex: 'clth',width:60}
		    	]
		    	},{
		    	title:'材料描述',
	   	  	  	xtype:'panel',
	   	  	  	split:true,
	   	  	  	itemId:'MaterialDesc',
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid',
					xtype:'grid',
					store:me.BuffDetailStore,
					plugins: [{ptype: 'bufferedrenderer'}],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.down('#Material_Clbz').setValue(recs[0].get('clbz'));
							} else {
								me.down('#Material_Clbz').setValue('');
							}
						}
					},
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
					autoScroll:true,
					columns:[
	   	  	  			{header:'确认',dataIndex:'xjqrbj',width:35,renderer:erp.Util.Staterenderer,
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'序号',dataIndex:'htxh',width:35},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:40},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		   	  	  			var v=me.DetailSum.get('cgsl');
			                return v!=0? Ext.util.Format.number(v,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
					region:'east',
					split:true,
					flex:1,
					itemId:'Material_Clbz',
					xtype:'textarea',
					readOnly:true,
					minwidth:450
				}]
		    },{
		    	title:'业务描述',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'Traffic',
		    	useArrows: true,
		    	layout:'border',
		    	items:[{
					itemId:'TrafficGrid',
					xtype:'grid',
					store:me.BuffDetailStore,
					plugins: [{ptype: 'bufferedrenderer'}],
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.ProDescStore.load({params:{ddbh:recs[0].get('ddbh')+'',ddxh:recs[0].get('ddxh')+''}});
							} else {
								me.ProDescStore.load({params:{ddbh:-1,ddxh:-1}});
							}
						}
					},
					columns:[
	   	  	  			{header:'序号',dataIndex:'htxh',width:60,
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:40},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		   	  	  			var v=me.DetailSum.get('cgsl');
			                return v!=0? Ext.util.Format.number(v,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'箱只数',dataIndex:'mxzs',width:60,renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
		    		itemId:'Traffic_Desc',
		    		xtype:'grid',
		    		flex:1,
					autoScroll:true,
		    		split:true,
					region:'east',
					store:me.ProDescStore,
					columns:[
						{header:'确定',dataIndex:'qrbj',width:35,renderer:erp.Util.Staterenderer},
						{header:'顺序',dataIndex:'pxxh',width:35},
						{header:'描述项目',dataIndex:'xmmc',width:60},
						{header:'重要程度',dataIndex:'zycd',width:60,renderer:function(v){
							if(v==0){
							 return '普通';
							}else{
							 return '重要';
							}
						}},
						{header:'样品描述(业务)',dataIndex:'xmms',width:300,renderer: function(value, meta, record) {
                                 meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;' +
                                          		'white-space: nowrap;white-space:normal;line-height:20px;';   
                                   return value;   
                        }},
						{header:'样品描述(研发)',dataIndex:'xmms_yf',width:300,renderer: function(value, meta, record) {
                                          meta.style = 'overflow:auto;padding: 3px 6px;text-overflow: ellipsis;white-space: nowrap;white-space:normal;line-height:20px;';   
                                          return value;   
                        }
                    }]
		    	}]
		    },{
		    	title:'产品细节',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'ProDesc',
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid1',
					xtype:'grid',
					store:me.BuffDetailStore,
					plugins: [{ptype: 'bufferedrenderer'}],
					selModel:Ext.create('Ext.selection.CheckboxModel',{
						mode:'MULTI'
					}),
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.down('#Material_Cpxj').setValue(recs[0].get('cpxj'));
							} else {
								me.down('#Material_Cpxj').setValue('');
							}
						}
					},
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
					columns:[
	   	  	  			{header:'确认',dataIndex:'xjqrbj',width:35,renderer:erp.Util.Staterenderer,
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'序号',dataIndex:'htxh',width:60},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:40},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                var v=me.DetailSum.get('cgsl');
			                return v!=0? Ext.util.Format.number(v,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
					region:'east',
					split:true,
					flex:1,
					itemId:'Material_Cpxj',
					xtype:'textarea',
					readOnly:true,
					minwidth:450
				}]
		    },{
		    	title:'包装信息',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'PackDesc',
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid2',
					xtype:'grid',
					store:me.BuffDetailStore,
					plugins: [{ptype: 'bufferedrenderer'}],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.down('#Pack_Bzxx').setValue(recs[0].get('bzxx'));
							} else {
								me.down('#Pack_Bzxx').setValue('');
							}
						}
					},
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			      	 	dock:'bottom'
				    }],
					columns:[
	   	  	  			{header:'确认',dataIndex:'xjqrbj',width:40,renderer:erp.Util.Staterenderer,
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'序号',dataIndex:'htxh',width:60},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:40},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                var v=me.DetailSum.get('cgsl');
			                return v!=0? Ext.util.Format.number(v,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
					region:'east',
					split:true,
					flex:1,
					itemId:'Pack_Bzxx',
					xtype:'textarea',
					readOnly:true,
					minwidth:450
				}]
		    },{
		    	title:'合同条款',
		    	itemId:'httk',
		    	xtype:'textarea',
		    	readOnly:true
		    },{
		    	xtype:'panel',
		    	layout:'border',
		    	title:'采购要求',
		    	items:[{
			    	itemId:'cgyq',
			    	region:'center',
					flex:1,
			    	readOnly:true,
			    	xtype:'textarea'
		    	},{
		    		region:'east',
		    		flex:1,
		    		itemId:'http',
					autoScroll:true,
					xtype:'image',
					src:null,
					style:"position:absolute;left:0;top:0;width:100%;height:100%;"
		    	}]
		    },{
		    	title:'辅助明细',
	   	  	  	xtype:'panel',
	   	  	  	itemId:'Subsidiary',
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid4',
					xtype:'grid',
					store:me.BuffDetailStore,
					plugins: [{ptype: 'bufferedrenderer'}],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.SubsidiaryStore.load({params:{htbh:recs[0].get('htbh')+'',htxh:recs[0].get('htxh')+''}});
							} else {
								me.SubsidiaryStore.load({params:{htbh:-1,htxh:-1}});
							}
						}
					},
					region:'center',
					flex:1,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
					columns:[
	   	  	  			{header:'确认',dataIndex:'xjqrbj',width:40,renderer:erp.Util.Staterenderer,
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'序号',dataIndex:'htxh',width:45},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:40},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:80,align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                var v=me.DetailSum.get('cgsl');
			                return v!=0? Ext.util.Format.number(v,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'辅助单位',dataIndex:'fzdw',width:60}
		    		]
		    	},{
		    		itemId:'SubsidiaryGrid',
		    		xtype:'grid',
		    		flex:1,
					features: [{
				        ftype: 'summary',
			       		dock:'bottom'
				    }],
		    		split:true,
					region:'east',
					store:me.SubsidiaryStore,
					columns:[
						{header:'采购规格',dataIndex:'cggg',width:60,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
						{header:'转换规格',dataIndex:'zhgg',width:60},
						{header:'转换数量',dataIndex:'zhsl',width:60},
						{header:'转换计量',dataIndex:'zhjl',width:60},
						{header:'辅助数量',dataIndex:'fzsl',width:60,align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer},
						{header:'辅助单位',dataIndex:'fzdw',width:60},
						{header:'采购数量',dataIndex:'cgsl',width:80,align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'计量单位',dataIndex:'jldw',width:60}
					]
		    	}]
		    },{
		    	title:'更改明细',
		    	xtype:'grid',
		    	store:me.ChangeStore,
		    	features: [{
			        ftype: 'summary',
			        dock:'bottom'
			    }],
				columns:[
					{header:'更改单号',dataIndex:'ggdh',width:60,summaryType: 'count',
	   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
		                 return '合计';
		            }},
					{header:'序号',dataIndex:'ggxh',width:45},
					{header:'合同号',dataIndex:'hth',width:60},
					{header:'材料货号',dataIndex:'clhh',width:60},
					{header:'材料名称',dataIndex:'clmc',width:160},
					{header:'规格尺寸',dataIndex:'cltx1',width:60},
					{header:'单位',dataIndex:'jldw',width:60},
					{header:'改前数量',dataIndex:'gqsl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000'):'';
			        },renderer:Ext.util.Format.floatRenderer},
			        {header:'更改数量',dataIndex:'ggsl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000'):'';
			        },renderer:Ext.util.Format.floatRenderer},
					{header:'改后数量',dataIndex:'ghsl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000'):'';
			        },renderer:Ext.util.Format.floatRenderer},
					{header:'改前单价',dataIndex:'gqdj',width:60,renderer:Ext.util.Format.floatRenderer},
					{header:'更改单价',dataIndex:'ggdj',width:60,renderer:Ext.util.Format.floatRenderer},
			        {header:'改后单价',dataIndex:'ghdj',width:80,renderer:Ext.util.Format.floatRenderer},
			        {header:'改前数量',dataIndex:'gqsl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.00'):'';
			        },renderer:Ext.util.Format.floatRendererOne},
			        {header:'更改数量',dataIndex:'ggsl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.00'):'';
			        },renderer:Ext.util.Format.floatRendererOne},
					{header:'改后数量',dataIndex:'ghsl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.00'):'';
			        },renderer:Ext.util.Format.floatRendererOne},
			        {header:'单价选择',dataIndex:'djxz',width:60},
			        {header:'更改原因',dataIndex:'ggyy',width:60}
				]
		    },{
		    	title:'附件信息',
		    	xtype:'grid',
		    	store:me.FileStore,
		    	itemId:'PurFile',
		    	selModel:Ext.create('Ext.selection.CheckboxModel',{
					mode:'MULTI'
				}),
				columns:[
				    {header:'取消',dataIndex:'qxbj',width:50,renderer:erp.Util.Staterenderer},
					{header:'文件编号',dataIndex:'wjbh',width:60},
					{header:'文件名称',dataIndex:'wjmc',width:300},
					{header:'创建人名',dataIndex:'cjrm',width:60},
					{header:'创建日期',dataIndex:'scrq',width:120,renderer : Ext.util.Format.dateRendererOne},
					{header:'文件路径',dataIndex:'wjlj',width:330},
					{header:'附件类型',dataIndex:'fjlx',width:100,
					renderer : function(value){
					   if(value ==0){
					      return '采购方提交'
					   }else if(value ==1){
					      return '回签合同'
					   }
					 }
					},
					{header : '附件状态',width :100 ,dataIndex: 'fjzt',
	                renderer:function(value){
	                if(value == 0){
	                return '未提交';  
	                }else if(value == 1){
	                 return '已提交';
	                }else if(value == 2){
	                 return '已接受';
	                }
	                }},
					{header: '操作',xtype:'actioncolumn',width:150,
					   items : [
					   {iconCls:'download',tooltip:'下载',
					   handler: function(grid,rowIndex,colIndex){
					      var rec = grid.getStore().getAt(rowIndex);
					      if(Ext.isEmpty(rec.get('wjlj')))
							{
								Ext.Msg.alert('提示','未上传，无法下载');
								return;
							}
						  file_path=rec.get('wjlj');
							window.open('ftp://'+tp_ftpUrl+file_path, 'newwindow','height=400,width=400,top=0,left=100,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
					   }}/*,{
					      tooltip:'预览',
							iconCls:'application_view_list',
							handler:function(grid,rowIndex,colIndex){
								var rec = grid.getStore().getAt(rowIndex);
								var file_path=rec.get('wjlj');
								if(!Ext.isEmpty(file_path)){
									var suffixIndex=rec.get('wjmc').lastIndexOf('.');
	                            	var suffixStr=rec.get('wjmc').substring(suffixIndex+1).toLowerCase();
	                            	if(suffixStr=='bmp'||suffixStr=='jpg'||suffixStr=='jpeg'||suffixStr=='png'||suffixStr=='gif'){
	                            		me.showPic(file_path,'PIC1');
	                            	}
	                            	else{
	                            		Ext.Msg.alert('提示','当前格式不可直接预览,请通过下载方式查看');
										return;
	                            	}
								}
								else{
									Ext.Msg.alert('提示','当前还没有上传文件');
									return;
								}
							}
					}*/
				]}]
		    },{
		    	title:'钢架计价',
		    	xtype:'panel',
		    	layout:'border',
		    	items:[{
					itemId:'MaterialGrid3',
					xtype:'grid',
					store:me.BuffDetailStore,
					plugins: [{ptype: 'bufferedrenderer'}],
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.BomStore.load({params:{htbh:recs[0].get('htbh')+'',htxh:recs[0].get('htxh')+''}});
							} else {
								me.BomStore.load({params:{htbh:-1,htxh:-1}});
							}
						}
					},
					region:'west',
					flex:1,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
				    split:true,
					columns:[
	   	  	  			{header:'确认',dataIndex:'xjqrbj',width:40,renderer:erp.Util.Staterenderer,
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
	   	  	  			{header:'序号',dataIndex:'htxh',width:45},
	   	  	  			{header:'材料货号',dataIndex:'clhh',width:60},
	   	  	  			{header:'材料名称',dataIndex:'clmc',width:160},
	   	  	  			{header:'规格尺寸',dataIndex:'cltx1',width:60},
	   	  	  			{header:'单位',dataIndex:'jldw',width:40},
	   	  	  			{header:'采购数量',dataIndex:'cgsl',width:90,align:'right',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                var v=me.DetailSum.get('cgsl');
			                return v!=0? Ext.util.Format.number(v,'0,000'):'';
			            },renderer:Ext.util.Format.floatRenderer}
		    		]
		    	},{
		    		itemId:'BomGrid',
		    		xtype:'grid',
		    		flex:1,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
					region:'center',
					store:me.BomStore,
					viewConfig:{
						enableTextSelection:true,
			     		getRowClass:function(rec,rowIndex,store){
				     		if(rec.get('mjbz')==0&&rec.get('bjbb')==''){
				     			return 'x-grid-record-blue';
				     		}
				     	}
				    },
					listeners:{
						selectionchange : function(grid, recs) {
							if (recs.length > 0) {
								me.LinkStore.load({
									params:{
										cpbh:recs[0].get('cpbh'),
										cptx1:recs[0].get('cptx1'),
										cptx2:recs[0].get('cptx2'),
										cptx3:recs[0].get('cptx3'),
										bbbh:recs[0].get('bbbh'),
										jgbh:recs[0].get('jgbh')
									},callback:function(recs){
										if(recs.length>0){
											me.down('#LinkGrid').show();
										}else{
											me.down('#LinkGrid').hide();
										}
									}
								});
							} else {
								me.LinkStore.load({
									params:{
										cpbh:-1,
										cptx1:-1,
										cptx2:-1,
										cptx3:-1,
										bbbh:-1,
										jgbh:-1
									}
								})
								me.down('#LinkGrid').hide();
							}
						}
					},
					columns:[
						{header:'序号',dataIndex:'jlxh',width:40,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
						{header:'材料类别',dataIndex:'lbmc',width:60},
						{header:'材料类型',dataIndex:'cllx',width:60,renderer:function(v){
							if(v==1){
								return "小五金类";
							}else if(v==2){
								return "管材类";
							}else{
								return "";
							}
						}},
						{header:'材料厂商',dataIndex:'csmc',width:160},
						{header:'下单日期',dataIndex:'xdrq',width:60,renderer : Ext.util.Format.dateRendererOne},
						{header:'材料货号',dataIndex:'clhh',width:60},
						{header:'部件或材料名称',dataIndex:'clmc',width:240,renderer:function(v,r){
		   	  	  				var rec=r.record;
		   	  	  				var jgbh = rec.get('jgbh');
								if (jgbh.length == 0) {
									for (i = 0; i < 14; i++) {
										v = '&nbsp' + v;
									}
								} else {
									for (i = 0; i < jgbh.length; i++) {
										v = '&nbsp' + v;
									}
								}
		   	  	  				return v;
		   	  	  			}},
						{header:'规格尺寸',dataIndex:'cltx1',width:60},
						{header:'米重',dataIndex:'zzhxs',width:60,align:'right',renderer:Ext.util.Format.floatRenderer},
						{header:'版本',dataIndex:'bjbb',width:40},
						{header:'单位',dataIndex:'jldw',width:40},
						{header:'单件用量',dataIndex:'djyl',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
			            {header:'单价',dataIndex:'gjdj',width:60,align:'right'},
						{header:'外协损耗',dataIndex:'wxsh',width:80,align:'right'},
						{header:'额外金额',dataIndex:'ewje',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.00'):'';
			            },renderer:Ext.util.Format.floatRenderer},
						{header:'材料金额',dataIndex:'clje',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value>0? Ext.util.Format.number(value,'0,000.00'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'备注说明',dataIndex:'bzsm',width:80},
			            {header:'操作员名',dataIndex:'czym',width:80},
						{header:'操作时间',dataIndex:'czsj',width:70,renderer : Ext.util.Format.dateRendererOne}
					]
		    	},{
		    		itemId:'LinkGrid',
		    		xtype:'grid',
		    		flex:1,
		    		split:true,
					features: [{
				        ftype: 'summary',
			        	dock:'bottom'
				    }],
					region:'south',
					weight:-70,
					store:me.LinkStore,
					columns:[
						{header:'序号',dataIndex:'gjxh',width:40,summaryType: 'count',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                 return '合计';
			            }},
						{header:'构件名称/使用部位',dataIndex:'gjmc',width:160,align:'center'},
						{header:'预想规格',dataIndex:'yxgg',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
						{header:'单个用量',dataIndex:'dgyl',width:80,align:'right',renderer:Ext.util.Format.floatRenderer,summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.######'):'';
			            }},
						{header:'构件数量',dataIndex:'gjsl',width:80,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'=构件用量',dataIndex:'gjyl',width:100,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
						{header:'*材料周长',dataIndex:'clzc',width:100,align:'right',renderer:Ext.util.Format.floatRenderer},
						{header:'=喷塑面积',dataIndex:'psmj',width:85,align:'right',summaryType: 'sum',
		   	  	  		summaryRenderer: function(value, summaryData, dataIndex) {
			                return value!=0? Ext.util.Format.number(value,'0,000.######'):'';
			            },renderer:Ext.util.Format.floatRenderer},
			            {header:'主辅单位',dataIndex:'fzdw',width:60},
			            {header:'构件图号',dataIndex:'gjth',width:60},
			            {header:'备注说明',dataIndex:'bzsm',width:120}
					]
		    	}]
		    }]
		})
		me.callParent(arguments);
		//me.loadDate(rec);
   },
   loadDate:function(rec){
   		var me=this;
   		var recs = erp.Const.callServiceMethodSync(
				'purchaseorder/purchaseorderdetail.act?method=getPurchaseOrderDetailSum', {
					htbh : rec.get('htbh')
				});
		if(recs.length>0){
			Ext.apply(me.DetailSum.data,recs[0]);
		}else{
			me.DetailSum=Ext.create('erp.view.purchaseOrder.model.PurchaseOrderDetail');
		}
		me.BuffDetailStore.proxy.extraParams.htbh = rec.get('htbh');
		me.BuffDetailStore.load();
   		me.SummarizeStore.load({params:{htbh:rec.get('htbh')}});
   		me.ChangeStore.load({params:{htbh:rec.get('htbh')}});
   		me.FileStore.load({params:{htbh:rec.get('htbh')}});
   		me.down('#httk').setValue(rec.get('httk'));
   		me.down('#cgyq').setValue(rec.get('cgyq'));
   		var http =rec.get('http');
   		if(http!=null&&Ext.String.trim(http)!=''){
   			me.down('#http').setSrc('ftp://'+tp_ftpUrl+http);
   		}else{
   			me.down('#http').setSrc(null);
   		}
   		me.LinkStore.load({
					params : {
						cpbh : -1,
						cptx1 : -1,
						cptx2 : -1,
						cptx3 : -1,
						bbbh : -1,
						jgbh : -1
					}
				})
		me.down('#LinkGrid').hide();
   },
   // 图片展示
   showPic:function(rec){
   		var me=this;
   		var panel=me.down('#PIC');
   		var dytp=rec.get('dytp');
   		if(dytp!=null&&dytp!=''){
   			var src='ftp://'+tp_ftpUrl;
   			src+=rec.get('dytp');
   			panel.setSrc(src);
   		}else{
   			panel.setSrc(null);
   		}
   }
});