Ext.define('erp.bi.view.DatasourceDesc', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.dsdesc',
	requires: ['erp.bi.store.DatasourceDesc','erp.bi.view.EditDatasrouceDesc'],
	title: '数据源字段描述',
	columnLines: true,
	initComponent: function() {
		var me = this;
		me.store = Ext.create('erp.bi.store.DatasourceDesc');
		Ext.apply(me, {
			tbar: [{
				text: '新增',
				iconCls: 'page_add',
				itemId: erp.Const.FUNC_ITEMID_BTN_ADD
			}, {
				text: '修改',
				iconCls: 'page_edit',
				itemId: erp.Const.FUNC_ITEMID_BTN_EDT,
				disabled: true
			}, {
				text: '删除',
				iconCls: 'page_delete',
				itemId: erp.Const.FUNC_ITEMID_BTN_DEL,
				disabled: true
			}, {
				text: '刷新',
				iconCls: 'page_refresh',
				itemId: erp.Const.FUNC_ITEMID_BTN_REFRESH
			}],
			store: me.store,
			columns: [{
				text: '字段名',
				dataIndex: 'col_name',
				flex: 1
			}, {
				text: '字段代码',
				dataIndex: 'col_code',
				flex: 1
			}, {
				text: '数据类型',
				dataIndex: 'data_type',
				flex: 1
			}],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: me.store,
				dock: 'bottom',
				displayInfo: true
			}],
			listeners: {
				selectionchange: function() {
					me.down('#' + erp.Const.FUNC_ITEMID_BTN_EDT).setDisabled(false);
					me.down('#' + erp.Const.FUNC_ITEMID_BTN_DEL).setDisabled(false);
				}
			}
		});
		me.callParent(arguments);
	},
	DataChange: function(ds_id) {
		var me = this;
		me.store.getProxy().setExtraParam("ds_id", ds_id);
		me.store.load();
	}
});