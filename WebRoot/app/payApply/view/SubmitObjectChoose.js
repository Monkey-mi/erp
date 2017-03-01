Ext.define('erp.payApply.view.SubmitObjectChoose', {
	extend : 'erp.ux.Window',
	alias : 'widget.SubmitObjectChoose',
	width : 600,
	title : '提交对象选择',
	iconCls : 'page_go',
	height : 400,
	modal: true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.payApply.store.SubmitObject');
		me.store.load();
		Ext.apply(me, {
					layout : {
						type : 'border',
						align : 'stretch'
					},
					items : [{
	    					xtype:'treepanel',
	    					region:'west',
//	    					reference:'perchasetree',
	    					collapsible:true,
	    					width:200,
	    					split:true,
	    					store : Ext.create('erp.view.master.perchasepriceadjust.store.CzybmListTree',{autoLoad:true}),
	    					listeners:{
	    				    	'itemclick':function(t,rec){
	    				  			if(rec.get('nodeId')!=0){
	    				  				me.store.proxy.extraParams.ssbm=rec.get('nodeId');
	    				  				me.store.loadPage(1);
	    				  			}else{
	    				  				delete me.store.proxy.extraParams.ssbm;
	    				  				me.store.loadPage(1);
	    				  			}
	    			 		 	}
	    					}
	    				},{
						region : 'center',
						xtype : 'grid',
						itemId : 'SubmitObject',
						flex : 1,
						overflowY : 'auto',
						overflowX : 'auto',
						columns : [{
							dataIndex : 'czy_gh',
							header : '工号',
							width : 80
						}, {
							dataIndex : 'czy_xm',
							header : '姓名',
							width : 80
						}, {
							dataIndex : 'lbmc',
							header : '所属部门',
							width : 120
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
												fieldLabel : '提交对象',
												enableKeyEvents : true,
												itemId : 'submitobject',
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
		var submitobject = me.down('#submitobject').getValue();
		if (submitobject) {
			me.store.proxy.extraParams.submitobject = submitobject;
		} else {
			delete me.store.proxy.extraParams.submitobject;
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