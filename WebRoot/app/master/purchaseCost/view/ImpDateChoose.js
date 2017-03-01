Ext.define('erp.master.purchaseCost.view.ImpDateChoose',{
    extend : 'erp.ux.Window',
	alias : 'widget.win_ImpDate',
	requires :[],
	title : '起止日期',
	width : 320,
	height : 160,
	iconCls : 'page_go',
	modal : true,
	initComponent : function() {
		var me = this;
		Ext.apply(me, {
					layout : {
						type : 'fit',
						pack : 'start',
						align : 'stretch'
					},
					defaults : {
						padding : 5
					},
					items : [{
								itemId : 'TimeChooseForm',
								xtype : 'form',
								plugins : {
									ptype : 'FormKey'
								},
								store : me.store,
								layout : {
									type : 'column',
									pack : 'start',
									align : 'stretch'
								},
								defaults : {
									anchor : '95%',
									labelWidth : 72,
									margin : '5 5 5 5',
									columnWidth : 1
								},
								items : [{
											fieldLabel : '起始日期',
											xtype : 'datefield',
											itemId : 'qsrq',
											name : 'qsrq',
											columnWidth : 1,
											value : Ext.util.Format.date(new Date(), "Y-m-") + "01"
										}, {
											fieldLabel : '截止日期',
											itemId : 'jzrq',
											name : 'jzrq',
											columnWidth : 1,
											xtype : 'datefield',
											value : new Date()
										}],
								buttons : [{
											text : '确认',
											glyph : 0xf058,
											itemId : 'btn_confirm',
											handler : me.doPrepayAdjustment
										}, {
											text : '关闭',
											glyph : 0xf057,
											handler : function() {
												me.close();
											}
										}]
							}]
				});
				this.callParent(arguments);
	},
	getQsrq : function(){
		   var me = this;
		   var qsrq = me.down('#qsrq').getValue();
           return qsrq;
        },
    getJzrq : function(){
    	   var me = this;
		   var jzrq = me.down('#jzrq').getValue();
           return jzrq;
        },
    getData: function(){
           var me = this;
           var form = me.down('#TimeChooseForm');
           return form.getValues();
        }
})