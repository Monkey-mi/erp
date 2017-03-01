Ext.define('erp.view.purchaseUrge.window.ContractSplit',{
	extend:'erp.ux.Window',
	alias:'widget.ContractSplit',
	title:'拆分数量',
	modal:true,
	width:300,
	height:120,
	initComponent : function() {
		var me=this;
		var curDate=new Date();
		curDate.setDate(1);
		var nDate=new Date();
		curDate.setMonth(nDate.getMonth()-1);
		var form=Ext.create('Ext.form.Panel',{
			xtype : 'fieldset',
			defaults : {
				labelWidth:70,
				padding:5,
				xtype : 'container',
				anchor:'95%',
					layout : {
							type : 'hbox',
							align : 'stretch'
					}
			},
			items:[{
				xtype:'numberfield',
	            fieldLabel : '拆分数量',
	            itemId:'cfsl',
	            name:'cfsl'
	        }]
		});
		Ext.apply(me,{
			layout:'fit',
			items:[form],
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