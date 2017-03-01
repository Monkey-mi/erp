Ext.define('erp.view.purchaseOrder.window.BackupType',{
	extend:'erp.ux.Window',
	alias:'widget.BackupType',
//	plugins : {
//		ptype : 'FormKey'
//	},
	width:350, 
	title:'归档类型',
	iconCls:'page_go',
	modal:true,
	height:150,
	initComponent:function(){
		var me=this;
		Ext.apply(me,{
			layout:{type:'fit',align: 'stretch'},
			items:[{
					region:'north',
					split:true,
					flex:1,
					xtype:'form',
					itemId:'mainForm',
					layout:'fit',
					items:[{
						xtype:'fieldset',
						autoScroll:true,
						margin:'5 5 5 5',
						layout:'fit',
				    	defaults: {
							xtype: 'textfield',
							margin:'5 5 5 5',
							labelWidth:80,
							columnWidth: .15
						},
						items:[{
			            xtype      : 'fieldcontainer',
			            fieldLabel : '请选择归档方式',
			            labelWidth:100,
			            defaultType: 'radiofield',
			            itemId:'gdlx',
			            defaults: {
			                flex: 1,
			                padding:'0 5 0 5'
			            },
			            layout: 'hbox',
			            items: [
			                {
			                    boxLabel  : '单一归档',
			                    name      : 'gdlx',
			                    inputValue: 1
			                }, {
			                    boxLabel  : '统一归档',
			                    name      : 'gdlx',
			                    inputValue: 0
			                }
			            ]
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