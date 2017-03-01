Ext.define('erp.view.purchaseUrge.window.ReplyPMC',{
	extend:'erp.ux.Window',
	alias:'widget.ReplyPMC',
	width:600,
	title:'回复意见',
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
				    	defaults: {
							xtype: 'textfield',
							margin:'5 5 5 5',
							labelWidth:65,
							columnWidth: .15
						},
						items:[{
				  			fieldLabel:'回复结论',
				  			itemId:'hfjl',
						   	name : 'hfjl',
						   	columnWidth: .5,
						   	xtype:'combo',
							typeAhead:true,
							store:[['OK','OK'],['NG','NG']],
							queryMode : 'local',
							selectOnFocus:true,
							fieldConfig:{forceSelection:false}
				  		},{
							xtype:'textarea',
							itemId:'hfyj',
							columnWidth:1,
							region: 'center',
							fieldLabel:'回复意见'
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