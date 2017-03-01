Ext.define('erp.view.purchaseOrder.window.CollectAdjust',{
	extend:'erp.ux.Window',
	alias:'widget.CollectAdjust',
//	plugins : {
//		ptype : 'FormKey'
//	},
	width:1200,
	title:'汇总调整',
	iconCls:'page_go',
	modal:true,
	height:500,
	requires: [
		'erp.view.purchaseOrder.store.CollectAdjust'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseOrder.store.CollectAdjust');
		me.store.proxy.extraParams.htbh=me.htbh;
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		Ext.apply(me.store.proxy.extraParams,{htbh:me.htbh,login_id:login_id,ip:ip})
		me.store.load();
		Ext.apply(me,{
			layout:{type:'border',align: 'stretch'},
			items:[{
				xtype:'grid',
				itemId:'ProductDescImp',
				flex:1,
				features: [{
				    ftype: 'summary',
			       	dock:'bottom'
				}],
				plugins: Ext.create('Ext.grid.plugin.CellEditing', {
					        ptype: 'cellediting',
					        autoCancel: false,
					        listeners:{
					        	beforeedit:function(editor,con,e){
					        		return false;
					        		var field=con.field;
					        		var rec=con.record;
					        		switch(field){
					        			
					        		}
					        	},
					        	edit:function(editor,con,e){
					        		var field=con.field;
					        		var rec=con.record;
					        		var s_kjlx,s_clhh,s_cgsl,s_fzsl,s_cgdj,s_cgje,s_wbhl,s_wbje,s_wbdj,s_zhxs;
					        		if(con.originalValue==con.value){
					        			return ;
					        		}
					        		switch(field){
					        			case 'cgsl':
					        				s_cgsl=rec.get('cgsl');
					        				s_cgdj=rec.get('cgdj');
					        				s_wbdj=rec.get('wbdj');
					        				s_cgje=me.round(s_cgsl*s_cgdj,2);
					        				s_wbje=me.round(s_cgsl*s_wbdj,2);
					        				rec.set('cgje',s_cgje);
					        				rec.set('wbje',s_wbdj);
					        				var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getZhxsWithOut',
											{
												clhh:rec.get('clhh'),
												cltx1:rec.get('cltx1')
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											s_zhxs=data.zhxs;
											if(s_zhxs>0){
												rec.set('fzcgsl',me.round(s_cgsl*s_zhxs,3));
											}else{
												rec.set('fzcgsl',0);
											}
					        			break;
					        			case 'fzcgsl':
					        				var ls_fzcgsl=rec.get('fzcgsl');
					        				var result = erp.Const.callServiceMethodSync('purchaseorder/purchaseorderdetail.act?method=getZhxsWithOut',
											{
												clhh:rec.get('clhh'),
												cltx1:rec.get('cltx1')
											});
											var data = Ext.decode(result);
											if (!data.bool) {
												Ext.toastErrorInfo(data.msg);
												return;
											}
											s_zhxs=data.zhxs;
											if(s_zhxs>0){
												rec.set('cgsl',me.round(ls_fzcgsl/s_zhxs,3));
											}else{
												rec.set('cgsl',0);
											}
											s_cgsl=rec.get('cgsl');
					        				s_cgdj=rec.get('cgdj');
					        				s_wbdj=rec.get('wbdj');
					        				s_cgje=me.round(s_cgsl*s_cgdj,2);
					        				s_wbje=me.round(s_cgsl*s_wbdj,2);
					        				rec.set('cgje',s_cgje);
					        				rec.set('wbje',s_wbdj);
					        			break;
					        		}
					        	}
					        },
					        clicksToEdit: 1
					    }),
				columns:[
					{header:'材料货号',dataIndex:'clhh',width:80,align:'center',summaryRenderer: function(value, summaryData, dataIndex) {
						return '合计';
					}},
					{header:'材料名称',dataIndex:'clmc',width:160},
					{header:'规格尺寸',dataIndex:'cltx1',width:120,align:'center'},
					{header:'单位',dataIndex:'jldw',align:'center',width:60},
					{header:'采购数量',dataIndex:'cgsl',align:'right',width:80,field:{
			   	  	  	xtype:'numberfield',
			   	  	  	decimalPrecision:3
			   	  	},align:'right',summaryType: 'sum',
					      summaryRenderer: function(value, summaryData, dataIndex) {
					        	return value;
					}},
					{header:'采购单价',dataIndex:'cgdj',width:80,align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	{header:'采购金额',dataIndex:'cgje',width:80,align:'right',summaryType: 'sum',
					summaryRenderer: function(value, summaryData, dataIndex) {
					      return Ext.util.Format.number(value,'0,000.00');;
					},renderer:Ext.util.Format.floatRendererOne},
					{header: '币种',dataIndex: 'wbdh',width:60},
					{header: '外币单价',dataIndex: 'wbdj',width:80,renderer:Ext.util.Format.floatRenderer,field:{
			   	  	  	xtype:'numberfield',
			   	  	  	decimalPrecision:4
			   	  	}},
		            {header:'外币金额',dataIndex:'wbje',width:80,align:'right',
	   	  	  		summaryRenderer: function(v, summaryData, dataIndex) {
		                return v>0? Ext.util.Format.number(v,'0,000.00'):'';
		            },renderer:Ext.util.Format.floatRendererOne},
		            {header:'辅助单位',dataIndex:'fzdw',width:80},
					{header:'辅助数量',dataIndex:'fzcgsl',align:'right',width:80,summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return Ext.util.Format.number(value,'0,000.00');;
					},renderer:Ext.util.Format.floatRenderer},
					{header:'采计数量',dataIndex:'cjsl',align:'right',width:80,align:'right',summaryType: 'sum',
						summaryRenderer: function(value, summaryData, dataIndex) {
							return value;
					}},
					{header: '采购日期',dataIndex: 'cgrq',width:85,renderer:Ext.util.Format.dateRendererOne},
					{header:'交货日期',dataIndex:'jhrq',align : 'center',width:85,renderer : Ext.util.Format.dateRendererOne}
				],
				store:me.store,
				region: 'center'
			}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	},round:function(v,l){
		return Ext.util.Format.round(v,l);
	}
})