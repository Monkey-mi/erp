Ext.define('erp.view.purchaseUrge.window.Parameter',{
	extend:'erp.ux.Window',
	alias:'widget.Parameter',
	title:'条件选择',
	modal:true,
	width:500,
	requires:[
		'erp.common.basic.view.field.HelpField'
	],
	height:200,
	frame:true,
	initComponent : function() {
		var me=this;
		var form=Ext.create('Ext.form.Panel',{
			xtype : 'fieldset',
			frame:true,
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
	            xtype      : 'fieldcontainer',
	            fieldLabel : '汇总类别',
	            defaultType: 'radiofield',
	            defaults: {
	                flex: 1,
	                padding:5
	            },
	            layout: 'hbox',
	            items: [
	                {
	                    boxLabel  : '合同编号+同材料+同物控交期汇总',
	                    name      : 'hzlx',
	                    inputValue: '0',
	                    value:true,
	                    flex: 3,
	                    labelWidth:150
	                }, {
	                    boxLabel  : '合同明细',
	                    name      : 'hzlx',
	                    inputValue: '1',
	                    flex: 2
	                }
	            ]
	        },{
	            xtype      : 'fieldcontainer',
	            fieldLabel : '记录条件',
	            defaultType: 'radiofield',
	            defaults: {
	                flex: 1,
	                padding:5
	            },
	            layout: 'hbox',
	            items: [
	                {
	                    boxLabel  : '物控交期未回复',
	                    name      : 'jltj',
	                    inputValue: '0',
	                    labelWidth:150,
	                    value:true
	                }, {
	                    boxLabel  : '当前界面记录',
	                    name      : 'jltj',
	                    inputValue: '1'
	                }
	            ]
	        },{
						name : 'cgym',
						itemId:'cgym',
						fieldLabel:'采购员名',
						allowBlank:false,
						xtype:'helpField',
						code : erp.DataConst.PurGroupMan,
						fieldConfig:{forceSelection:false},
						listeners:{
						   	'select':function(obj,recs){
						   	}
						}
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