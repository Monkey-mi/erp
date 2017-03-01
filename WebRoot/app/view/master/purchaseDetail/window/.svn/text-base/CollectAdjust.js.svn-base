Ext.define('erp.view.master.purchaseDetail.window.CollectAdjust',{
	extend:'erp.ux.Window',
	alias:'widget.collect_adjust',
	requires:[
	
	],
	overflowY: 'auto',
	listeners:{
		beforeclose:function(){
			var mes=confirm('真的要关闭此页面吗?');
			return mes;
		},
		'close':function(cmp){
			cmp.destroy();
		}
	},
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			height:document.body.clientHeight<800?document.body.clientHeight:800,
			width:document.body.clientWidth<1200?document.body.clientWidth:1200,
			layout:{
		     type: 'fit',//垂直分布
		     align: 'stretch'
    		},
			items:[{
				xtyep:'grid',
				store:me.store,
				 features: [{
					       ftype: 'summary'
				 }],
				 columns:[
							{header:'序号',dataIndex:'htxh',width:40,align:'center',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return '合计';
					        }},
				   	  	  	{header:'材料货号',dataIndex:'clhh',width:80,align:'center'},
			   	  	  		{header:'材料名称',dataIndex:'clmc',width:160},
			   	  	  		{header:'规格尺寸',dataIndex:'cltx1',width:120,align:'center'},
			   	  	  		{header:'短料规格',dataIndex:'dgyk',width:80},
			   	  	  		{header:'备注说明',dataIndex:'bzsm',width:140},
			   	  	  		{header:'单位',dataIndex:'jldw',align:'center',width:60},
			   	  	  		{header:'采计数量',dataIndex:'cjsl',align:'right',width:80,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					        }},
			   	  	  		{header:'采购数量',dataIndex:'cgsl',align:'right',width:80,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					        }},
			   	  	  		{header:'控制单价',dataIndex:'kzdj',width:80,align:'right'},
			   	  	  		{header:'采购单价',dataIndex:'cgdj',width:80,align:'right'},
			   	  	  		{header:'税率',dataIndex:'zzsl',width:80,align:'right',renderer : Ext.util.Format.percentRenderer},
			   	  	  		{header:'采购金额',dataIndex:'cgje',width:80,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');;
					        }},
			   	  	  		{header:'短料根数',dataIndex:'dlgs',width:80,align:'right'},
			   	  	  		{header:'物控交期',dataIndex:'wkjq',align : 'center',width:80,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'评审交期',dataIndex:'psjq',align : 'center',width:80,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'交货日期',dataIndex:'jhrq',align : 'center',width:100,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'生产单号',dataIndex:'htbz',width:120},
			   	  	  		{header:'产品名称',dataIndex:'cpmc',width:80},
			   	  	  		{header:'计划号',dataIndex:'jhh',width:80},
			   	  	  		{header:'采计号',dataIndex:'cgh',width:80},
			   	  	  		{header:'采购日期',dataIndex:'cgrq',align:'center',width:100,renderer : Ext.util.Format.dateRendererOne},
			   	  	  		{header:'客户简称',dataIndex:'khjc',width:120},
			   	  	  		{header:'核算部门',dataIndex:'hsbm',width:180,renderer:function(v,r){
			   	  	  			return r.record.get('bmmc')
			   	  	  		}},
			   	  	  		{header:'送达仓库',dataIndex:'sdck',width:90,renderer:function(v,r){
			   	  	  			return r.record.get('ckmc')
			   	  	  		}},
			   	  	  		{header:'模具号',dataIndex:'mjh',width:80},
			   	  	  		{header:'辅助单位',dataIndex:'fzdw',width:80},
			   	  	  		{header:'辅助数量',dataIndex:'fzsl',align:'right',width:80,summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return Ext.util.Format.number(value,'0,000.00');;
					        }},
			   	  	  		{header:'控价类型',dataIndex:'kjlx',width:80,renderer:function(v){
			   	  	  			return v==0?'主控件':'辅控价'
			   	  	  		}},
			   	  	  		{header:'主转换系数',dataIndex:'zzhxs',width:80},
			   	  	  		{header:'供货周期',dataIndex:'ghzq',width:80,align:'right'},
			   	  	  		{header:'订单号',dataIndex:'ddh',width:80},
			   	  	  		{header:'需求号',dataIndex:'sqh',width:80},
			   	  	  		{header:'申购号',dataIndex:'sgh',width:80},
			   	  	  		{header:'主合同号',dataIndex:'zxhth',width:80},
			   	  	  		{header:'中止原因',dataIndex:'zzyx',width:80},
			   	  	  		{header:'原采购量',dataIndex:'ycgl',width:80,align:'right',summaryType: 'sum',
					        summaryRenderer: function(value, summaryData, dataIndex) {
					            return value;
					        }},
			   	  	  		{header:'原规格尺寸',dataIndex:'ysgg',width:140},
			   	  	  		{header:'拆分号',dataIndex:'cfh',width:80},
			   	  	  		{header:'英文描述',dataIndex:'ywms',width:180},
			   	  	  		{header:'PO.NO.:',dataIndex:'pono',width:80},
			   	  	  		{header:'FAC.NO.:',dataIndex:'fach',width:80},
			   	  	  		{header:'客户型号',dataIndex:'khxh',width:80},
			   	  	  		{header:'箱唛补充信息',dataIndex:'xmsjbc',width:80}
			   	  	 ]
			}]
		});
	me.callParent(arguments);
	me.loadRec();
	},
	loadRec:function(supplierRec,accessScore)
	{
		var me=this;
	}
});