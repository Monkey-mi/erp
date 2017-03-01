Ext.define('erp.view.master.purchaseDetail.window.BatchChange',{
	extend:'erp.ux.Window',
	alias:'widget.batchChange',
	requires:[
	
	],
	modal:true,
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:'fit',
			title:me.title||'批量编辑',
			width: me.width||550,
			height:me.height||200,
			items:[{
				xtype:'fieldset',
				layout:me.lay||'anchor',
				defaults: {anchor: '100%',margin:'5 0 0 0'},
				items:me.item
			}],
			buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES'},{
				text:'关闭',
				iconCls:'cancel',
				handler:function(){
					me.close();
				}
			}]
		});
	me.callParent(arguments);
	}
});