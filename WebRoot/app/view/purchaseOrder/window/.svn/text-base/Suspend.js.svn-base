Ext.define('erp.view.purchaseOrder.window.Suspend',{
	extend:'erp.ux.Window',
	alias:'widget.Suspend',
//	plugins : {
//		ptype : 'FormKey'
//	},
	requires: [
		'erp.master.contractStop.store.ContractType'
	],
	width:600,
	title:'中止原因',
	iconCls:'page_go',
	modal:true,
	height:500,
	initComponent:function(){
		var me=this;
		me.store=Ext.create('erp.master.contractStop.store.ContractType');
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
				  			fieldLabel:'中止类型',
				  			itemId:'zzlx',
						   	name : 'zzlx',
						   	columnWidth: .5,
						   	xtype:'combo',
							typeAhead:true,
							store:me.store,
							queryMode : 'local',
							displayField:'lxmc',
							valueField:'lxbh',
							selectOnFocus:true,
							fieldConfig:{forceSelection:false}
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