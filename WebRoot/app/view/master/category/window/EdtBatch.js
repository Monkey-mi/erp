Ext.define('erp.view.master.category.window.EdtBatch',{
	extend:'erp.ux.Window',
	modal:true,
	width:300,
	height:130,
	frame:true,
	resizable:false,
	initComponent : function() {
		var me=this;
		var form=Ext.create('Ext.form.Panel',{
			frame:true,
			layout:'fit',
			items:[{
				layout:'hbox',
				xtype : 'fieldset',
					items:[
						me.field
					]
				}
			]
		});
		Ext.apply(me,{
			layout:'fit',
			items:[form],
			title:me.title,
			buttons:[{text:'确定',iconCls:'accept',itemId:'BTN_YES'},{
				text:'关闭',
				iconCls:'cancel',
				handler:function(){
					me.close();
				}
			}]
		});
		this.callParent(arguments);
	}
})