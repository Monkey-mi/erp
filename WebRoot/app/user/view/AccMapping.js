Ext.define('erp.user.view.AccMapping',{
	extend:'erp.ux.Window',
	alias:'widget.AccMapping',
	requires: [
		'erp.user.store.UserMapping'
	],
	width:600,
	title:'帐号映射',
	iconCls:'page_go',
	modal:true,
	height:500,
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.user.store.UserMapping');
		me.store.proxy.extraParams.usePaging=false;
		me.store.load();
		Ext.apply(me,{
			layout:{type:'border',align: 'stretch'},
			items:[{
					region:'north',
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
				  			fieldLabel:'系统名称',
				  			itemId:'sys_name',
						   	name : 'sys_name',
						   	columnWidth: .5,
						   	xtype:'combo',
							typeAhead:true,
							store:erp.DataUtil.getComboStore(erp.Const.APP_SYS),
							queryMode : 'local',
							displayField:'name',
							valueField:'value',
							editable:false,
							selectOnFocus:true,
							fieldConfig:{forceSelection:false}
				  		},{
				  			fieldLabel:'对应用户名',
				  			itemId:'ref_uid',
						   	name : 'ref_uid',
							xtype:'helpField',
							code:erp.DataConst.OPERATOR,
							flex:1
				  		}]
					}]
				},{
				xtype:'textarea',
				itemId:'zzyy',
				flex:5,
				region: 'center'
			}],
			tbar:[{text:'确认',itemId:'btn_confirm'},{text:'关闭',iconCls:'cancel',
				handler:function(){me.close();}
			}]
		});
		me.callParent(arguments);
	}
})