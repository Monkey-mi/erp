/**
 * 材料选择帮助窗口
 */
Ext.define('erp.view.master.purchaseDetail.window.OutSourceMaterialImp', {
	extend : 'erp.ux.Window',
	alias : 'widget.MateCombo_HelpOne',
	title : '材料选择帮助窗口',
	//iconCls:'box',
	//modal : true,
	requires : [
			'erp.view.master.purchaseDetail.store.MaterialCateTree',
			'erp.view.master.purchaseDetail.window.MateCombo',
			'erp.view.master.purchaseDetail.store.MaterialDetail'
	],
	width : 840,
	height : 0.6 * window.screen.height,
	initComponent : function() {
		var me = this;
		me.Treestore = Ext.create('erp.view.master.purchaseDetail.store.MaterialCateTree');
		me.store = Ext.create('erp.view.master.purchaseDetail.store.MaterialDetail');
		me.store.load();
		Ext.apply(this, {
			items : [{
				buttons : [{
							text : '确定',
							iconCls : 'accept',
							itemId : 'BTN_YES'
						}, {
							text : '关闭',
							iconCls : 'cancel',
							handler : function() {
								me.close();
							}
						}],
				xtype : 'panel',
				layout : 'border',
				items : [{
							itemId : 'kind',
							region : 'west',
							split : true,
							width : 200,
							xtype : 'treepanel',
							store : me.Treestore,
							listeners : {
								select : function(row, rec) {
									var lbbh = rec.get('nodeId');
									me.store.proxy.extraParams.lbbh = lbbh;
									me.store.loadPage(1);
								}
							}
						}, {
							tbar : [{
										xtype : 'gridsearchfield',
										fieldLabel : '材料名称或材料货号',
										labelWidth : 140,
										focusWidth : 280,
										blurWidth : 160,
										width : 200,
										store : me.store
									}],
							xtype : 'grid',
							region : 'center',
							itemId : 'Material',
							store : me.store,
							listeners : {
								itemdblclick : function(th, rec, item) {

								}
							},
							selModel : Ext.create('Ext.selection.CheckboxModel'),
							columns : [{
										text : '材料货号',
										dataIndex : 'clhh',
										width : 80
									}, {
										text : '材料名称',
										dataIndex : 'clmc',
										width : 180
									}, {
										text : '单位',
										dataIndex : 'jldw',
										width : 80
									}, {
										text : '加工用量',
										dataIndex : 'jgyl',
										width : 100
									}, {
										text : '*(1+损耗率)',
										dataIndex : 'jsbl',
										width : 100
									}, {
										text : '＝通知领料',
										dataIndex : 'tzll',
										width : 100
									}],
							dockedItems : [{
								xtype : 'pagingbar',
								stateId : '8081d6f3-9db7-470d-b764-dasddbb70c5e81b1',
								dock : 'bottom',
								displayInfo : true,
								defaultPageSize : 50,
								store : me.store
							}]
						}]
			}]
		});
		this.callParent(arguments);
	}
});