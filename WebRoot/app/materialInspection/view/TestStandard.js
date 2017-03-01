Ext.define('erp.materialInspection.view.TestStandard',{
    extend: 'erp.ux.Window',
	alias: 'widget.Test_Standard',
	title: '测试标准选择',
	requires:['erp.materialInspection.store.TestMethod'],
	resizable : false,
	width:600,
	height:280,
	frame:true,
	modal : true,
	initComponent:function(){
		var me=this;
		me.store = Ext.create('erp.materialInspection.store.TestMethod');
		me.store.proxy.extraParams.xmbh = me.xmbh;
		me.store.proxy.extraParams.csjg = me.csjg;
		me.store.load();
		this.on('beforedestroy',function(){
 			delete me.store.proxy.extraParams.xmbh;
 			delete me.store.proxy.extraParams.csjg;
 		});
        Ext.apply(me,{
			layout:'fit',
            items:[{
               xtype :'grid',
               itemId : 'grd_TestStandard',
               store : me.store,
               selModel:Ext.create('Ext.selection.CheckboxModel'),
               columns : [
               	{text : '项目编号',dataIndex : 'xmbh',width:100}, 
                {text : '记录序号',dataIndex : 'jlxh',width:75},
                {text : '测试标准',dataIndex : 'xmbz',width:500}
               	]
            }],
             buttons:[{text:'确认',iconCls:'accept',itemId:'btn_confirm'},
                	{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}}]
        });
		this.callParent(arguments);
	}
})