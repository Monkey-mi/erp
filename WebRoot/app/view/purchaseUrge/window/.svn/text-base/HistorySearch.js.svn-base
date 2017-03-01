Ext.define('erp.view.purchaseUrge.window.HistorySearch',{
	extend:'erp.ux.Window',
	alias:'widget.HistorySearch',
	title:'起止日期',
	modal:true,
	width:500,
	requires:[
		'erp.common.basic.view.field.HelpField',
		'erp.view.master.purchaseDetail.window.MateCombo',
		'erp.ux.CommonTrigger'
	],
	height:300,
	frame:true,
	initComponent : function() {
		var me=this;
		var curDate=new Date();
		curDate.setDate(1);
		var nDate=new Date();
		curDate.setMonth(nDate.getMonth()-1);
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
	            xtype      : 'datefield',
	            fieldLabel : '起始日期',
	            itemId:'qsrq',
	            value:curDate,
	            format:'Y.m.d',
	            name:'qsrq'
	        },{
	            xtype      : 'datefield',
	            fieldLabel : '截止日期',
	            itemId:'jzrq',
	            value:nDate,
	            format:'Y.m.d',
	            name:'jzrq'
	        },{
	        	xtype      : 'textfield',
	            fieldLabel : '合同号',
	            itemId:'hth',
	            name:'hth'
	        }, {
				name : 'cgym',
				itemId : 'cgym',
				fieldLabel : '采购员名',
				xtype : 'helpField',
				code : erp.DataConst.PurGroupMan,
				fieldConfig : {
					forceSelection : false
				},
				listeners : {
					'select' : function(obj, recs) {
					}
				}
			}, {
				fieldLabel : '供货厂商',
				itemId : 'csbh',
				name : 'csbh',
				xtype : 'helpField',
				code : erp.DataConst.FACTORYINFO,
				fieldConfig : {
					forceSelection : true
				},
				listeners : {

				}
			}, {
				xtype : 'commonTrigger',
				name : 'clmc',
				itemId : 'clmc',
				fieldLabel : '材料名称',
				win : 'erp.view.master.purchaseDetail.window.MateCombo'
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