Ext.define('erp.supplierAccess.view.AuditUnPassReason',{
	extend:'erp.ux.Window',
	alias:'widget.AuditUnPassReason',
	width:600,
	title:'不合格原因',
	modal:true,
	height:250,
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:{type:'fit',align: 'stretch'},
			items:[{
					split:true,
					flex:1,
					itemId:'topright',
					xtype:'form',
					itemId:'mainForm',
					layout:'fit',
					items:[{
						xtype:'fieldset',
						autoScroll:true,
						margin:'5 5 5 5',
						layout:'column',
						items:[{
							xtype:'textarea',
							itemId:'reason',
							columnWidth:1,
							height:120,
							margin:'5 0 0 0',
							region: 'center',
							fieldLabel:'不合格原因'
						}]
					}]
				}],
			tbar:[{text:'确认',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	}
})