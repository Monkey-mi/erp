Ext.define('erp.payApply.view.SubmitObjectAdd', {
	extend : 'erp.ux.Window',
	alias : 'widget.SubmitObjectAdd',
	width : 500,
	title : '提交对象新增',
	iconCls : 'page_go',
	height : 600,
	modal: true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.payApply.store.Operator');
		me.store.load();
		Ext.apply(me, {
					layout : {
						type : 'border',
						align : 'stretch'
					},
					items : [{
						region : 'center',
						xtype : 'grid',
						itemId : 'Operator',
						flex : 1,
						overflowY : 'auto',
						overflowX : 'auto',
						selModel : Ext.create('Ext.selection.CheckboxModel'),
						columns : [{
							dataIndex : 'czy_gh',
							header : '工号',
							width : 50
						}, {
							dataIndex : 'czy_xm',
							header : '操作员',
							width : 100
						}, {
							dataIndex : 'lbmc',
							header : '所属部门',
							width : 100
						}, {
							dataIndex : 'gzgw',
							header : '工作岗位',
							width : 100
						}],
						store : me.store,
						dockedItems : [{
									xtype : 'toolbar',
									dock : 'top',
									defaults : {
										padding : '0 5 0 0',
										labelWidth : 60,
										width : 180
									},
									items : [{
												xtype : 'textfield',
												fieldLabel : '操作员',
												enableKeyEvents : true,
												itemId : 'czy',
												listeners : {
													keyup : me.onKeyup
												}
											}, {
												xtype : 'button',
												iconCls : 'query',
												text : '查询',
												width : 80,
												itemId : 'btn_query',
												handler : function() {
													me.doSearch();
												}
											}]
								}, {
									xtype : 'pagingbar',
									stateId : '8081d6f3-9db7-470d-b764-dbb70c5e81b1',
									store : me.store,
									dock : 'bottom',
									displayInfo : true
								}]
					}],
					buttons : [{
								text : '确认',
								iconCls : 'accept',
								itemId : 'btn_confirm'
//								handler : function() {
//									me.doSave();
//								}
							}, {
								text : '关闭',
								iconCls : 'cancel',
								handler : function() {
									me.close();
								}
							}]
				});
		me.callParent(arguments);
	},
	doSearch : function() {
		var me = this;
		var czy = me.down('#czy').getValue();
		if (czy) {
			me.store.proxy.extraParams.czy = czy;
		} else {
			delete me.store.proxy.extraParams.czy;
		}
		me.store.loadPage(1);
	},
	onKeyup : function(field, e) {
		if (e.getKey() == e.ENTER) {
			var me = this.up('window');
			me.doSearch();
		}
	}
	/*doSave : function() {
		var me = this.up('window');
		var grid = me.down('#SupplyInvoice');
		var rec = grid.getSelectionModel().getSelection()[0];
		var r = Ext.create('erp.payApply.model.PayApply',
								{
									csbh : rec.get('csbh'),
									fktj : rec.get('fktj'),
									fkts : rec.get('fkts'),
									skdw : rec.get('fptt'),
									mrdw : rec.get('fptt'),
									ztdw : rec.get('ztdw'),
									bzsm : rec.get('bzsm'),
									wbbh : rec.get('wbbh'),
									wbhl : rec.get('wbhl'),
									cszh : rec.get('cszh'),
									khyh : rec.get('khyh')
								});
	}*/
	
});