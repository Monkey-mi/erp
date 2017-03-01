Ext.define('erp.purchaseInspectionManage.view.DistributeObject', {
	extend : 'erp.ux.Window',
	alias : 'widget.win_DistributeObject',
	width : 600,
	title : '品管员选择',
	iconCls : 'page_go',
	height : 400,
	modal: true,
	initComponent : function() {
		var me = this;
		me.store = Ext.create('erp.purchaseInspectionManage.store.DistributeObject');
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
	    					itemId : 'distributeTree',
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
						itemId : 'DistributeObjectGrid',
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
							dataIndex : 'ssbmc',
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
									items : [
											{
												xtype : 'button',
												iconCls : 'page_add',
												text : '增加',
												hidden: me.isFp,
												width : 80,
												itemId : 'BTN_ADD'
											},
											{
												xtype : 'button',
												iconCls : 'page_delete',
												hidden: me.isFp,
												text : '删除',
												width : 80,
												itemId : 'btn_del'
											},
											{
												xtype : 'textfield',
												fieldLabel : '品管员',
												hidden: me.isWh,
												enableKeyEvents : true,
												itemId : 'submitobject',
												listeners : {
													keyup : me.onKeyup
												}
											}, {
												xtype : 'button',
												hidden: me.isWh,
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
								hidden: me.isWh,
								itemId : 'btn_confirm'
							}, {
								text : '关闭',
								iconCls : 'cancel',
								hidden: me.isWh,
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
	
});