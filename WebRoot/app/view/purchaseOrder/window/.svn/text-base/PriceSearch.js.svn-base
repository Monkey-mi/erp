Ext.define('erp.view.purchaseOrder.window.PriceSearch',{
	extend:'erp.ux.Window',
	alias:'widget.PriceSearch',
//	plugins : {
//		ptype : 'FormKey'
//	},
	width:900,
	iconCls:'page_find',
	modal:true,
	height:500,
	requires: [
		'erp.view.purchaseOrder.store.PriceSearch'
	],
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.view.purchaseOrder.store.PriceSearch');
		var login_id=erp.Util.currentUser.loginId;
    	var ip=erp.Util.currentUser.IP;
		Ext.apply(me.store.proxy.extraParams,{htbh:me.htbh,login_id:login_id,ip:ip})
		me.store.load();
		Ext.apply(me,{
			layout:{type:'border',align: 'stretch'},
			title:"【合同编号: "+me.htbh+"】",
			items:[{
				xtype:'grid',
				itemId:'ProductDescImp',
				flex:1,
				columns:[
					{header:'材料名称',dataIndex:'clmc',width:160},
					{header:'规格尺寸',dataIndex:'cltx1',width:120,align:'center'},
					{header:'单位',dataIndex:'jldw',align:'center',width:60},
					{header:'采购数量',dataIndex:'cgsl',align:'right',width:90},
					{header:'控制单价',dataIndex:'kzdj',width:90,align:'right',renderer:Ext.util.Format.floatRenderer},
					{header:'采购单价',dataIndex:'cgdj',width:90,align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	{header:'辅助单位',dataIndex:'fzdw',width:80},
			   	  	{header:'辅助数量',dataIndex:'fzcgsl',align:'right',width:90,renderer:Ext.util.Format.floatRenderer},
			   	  	{header:'辅助控价',dataIndex:'fzkj',width:85,align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	{header:'辅助单价',dataIndex:'fzdj',width:85,align:'right',renderer:Ext.util.Format.floatRenderer},
			   	  	{header:'采购金额',dataIndex:'cgje',width:85,align:'right',renderer:Ext.util.Format.floatRendererOne}
				],
				store:me.store,
				region: 'center'
			}],
			buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm',hidden:true},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	}
})