Ext.define('erp.purchaseInspectionManage.view.purchaseInspectionPono',{
    extend: 'erp.ux.Window',
	alias: 'widget.win_purchaseInspectionPono',
	title: '成品采购PONO选择',
	requires:['erp.purchaseInspectionManage.store.PurchaseInspectionPono'],
	resizable : false,
	width:600,
	height:280,
	frame:true,
	modal : true,
	initComponent:function(){
		var me=this;
		me.store = Ext.create('erp.purchaseInspectionManage.store.PurchaseInspectionPono');
		me.store.proxy.extraParams.ddbh = me.ddbh;
		me.store.proxy.extraParams.ddxh = me.ddxh;
		me.store.load();
		this.on('beforedestroy',function(){
 			delete me.store.proxy.extraParams.ddbh;
 			delete me.store.proxy.extraParams.ddxh;
 		});
        Ext.apply(me,{
			layout:'fit',
            items:[{
               xtype :'grid',
               itemId : 'grd_InspectionPono',
               store : me.store,
               selModel:Ext.create('Ext.selection.CheckboxModel'),
               columns : [
               	{text : '数据来源',dataIndex : 'sjly',width:100}, 
                {text : '单据编号',dataIndex : 'ddbh',width:75},
                {text : '序号',dataIndex : 'ddxh',width:75},
                {text : 'PONO.:',dataIndex : 'pono',width:75},
                {text : 'FAC.NO',dataIndex : 'fach',width:75},
                {text : '客户型号',dataIndex : 'khxh',width:75},
                {text : '英文描述',dataIndex : 'ywms',width:150}
               	]
            }],
             buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]
        });
		this.callParent(arguments);
	}
})