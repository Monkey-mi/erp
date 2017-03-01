Ext.define('erp.prepayAdjustment.view.PrepayAdjustmentQuery', {
			extend : 'erp.ux.Window',
			alias : 'widget.prepayAdjustmentQuery',
			iconCls : 'page_find',
			title : '预付调整单管理筛选条件',
			width : 400,
			height : 300,
			frame : true,
			modal : true,
			prefix : 'fksqyftzb.',
			initComponent : function() {
				var me = this;
				Ext.apply(me, {
							layout : 'fit',
							items : [{
								xtype : 'form',
								frame : true,
								heigth : 50,
								layout : 'column',
								defaults : {
									padding : 5,
									xtype : 'textfield',
									labelWidth : 80,
									selectOnFocus : true,
									listeners : {
										specialkey : function(field, e) {
											if (e.getKey() == e.ENTER) {
												me.doQuery();
											}
										}
									}
								},
								items : [
										{
											boxLabel: '全部记录',
											name: 'checkbox_qbjl',
											inputValue: '1',
											padding: '0 0 0 5',
											itemId: 'checkbox_qbjl',
											xtype: 'checkbox',
											columnWidth: 1,
											listeners: {
												change: function(form, newValue, oldValue, eOpts) {
													if (newValue == true) {
														me.down('#checkbox_sqbh').setValue(false);
														me.down('#checkbox_tzfydh').setValue(false);
														me.down('#checkbox_tzhtbh').setValue(false);
													}
												}
											}
										},
										{
											name : 'checkbox_sqbh',
											itemId : 'checkbox_sqbh',
											xtype : 'checkbox',
											columnWidth : 0.1
										}, {
											fieldLabel : '申请编号',
											name : 'sqbh',
											columnWidth : 0.9,
											listeners : {
												'change' : function(obj, value) {
													if (!Ext.isEmpty(value)) {
														me.down('#checkbox_sqbh').setValue(true);
													}
												},
												specialkey : function(field, e) {
													if (e.getKey() == e.ENTER) {
														me.doQuery();
													}
												}
											}
										}, {
											name : 'checkbox_tzfydh',
											itemId : 'checkbox_tzfydh',
											xtype : 'checkbox',
											columnWidth : 0.1
										}, {
											fieldLabel : '调整费用单',
											name : 'tzfydh',
											columnWidth : 0.9,
											listeners : {
												'change' : function(obj, value) {
													if (!Ext.isEmpty(value)) {
														me.down('#checkbox_tzfydh').setValue(true);
													}
												},
												specialkey : function(field, e) {
													if (e.getKey() == e.ENTER) {
														me.doQuery();
													}
												}
											}

										},

										{
											name : 'checkbox_tzhtbh',
											itemId : 'checkbox_tzhtbh',
											xtype : 'checkbox',
											columnWidth : 0.1
										}, {
											fieldLabel : '调整合同号',
											name : 'tzhtbh',
											columnWidth : 0.9,
											listeners : {
												'change' : function(obj, value) {
													if (!Ext.isEmpty(value)) {
														me.down('#checkbox_tzhtbh').setValue(true);
													}
												},
												specialkey : function(field, e) {
													if (e.getKey() == e.ENTER) {
														me.doQuery();
													}
												}
											}

										}],

								buttons : [{
											text : '重置',
											glyph : 0xf112,
											itemId : 'btn_reset',
											handler : function(btn) {
												var form = me.down('form');
												form.form.reset();
												var rec = form.getRecord();
												form.updateRecord(rec);
											}
										}, '->', {
											text : '确认',
											glyph : 0xf058,
											itemId : 'btn_confirm',
											handler : me.doQuery
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
				me.down('form').loadRecord(me.rec);
			},
			doQuery : function() {
				Ext.apply(me.mainstore.proxy.extraParams, {
							condition : me.getQueryCondition()
						});
				me.mainview.loadMain();
				me.close();
			},
			getQueryCondition : function() {
				var me = this;
				var condition = null;
				var form = me.down('form');
				if (form.getForm().isDirty()) {
					var rec = form.getRecord();
					form.updateRecord(rec);
					var obj = rec.getChanges();
					var arr = [];
					for (var x in obj) {
						if (!Ext.isEmpty(obj[x])) {
							if (x == 'sqbh' && obj['checkbox_sqbh']) {
								arr.push(me.prefix + "sqbh like '%" + obj[x]+ "%'");
							} else if (x == 'tzfydh' && obj['checkbox_tzfydh']) {
								arr.push(me.prefix + "tzfydh like '%" + obj[x]+ "%'");
							} else if (x == 'tzhtbh' && obj['checkbox_tzhtbh']) {
								arr.push(me.prefix + "tzhtbh like '%" + obj[x]+ "%'");
							}
						}
						condition = arr.join(' and ');
					}
					return condition;
				}
			}
		});