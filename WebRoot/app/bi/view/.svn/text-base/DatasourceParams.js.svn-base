Ext.define('erp.bi.view.DatasourceParams',{
	extend: 'Ext.grid.Panel',
	alias: 'widget.datasourceParams',
	title: '数据源参数',
	requires: ['erp.bi.store.DatasourceParams','erp.bi.view.EditDatasourceParam'],
	columnLines: true,
	initComponent: function() {
		var me = this;
		me.store = Ext.create('erp.bi.store.DatasourceParams');
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
				text: '参数名',
				dataIndex: 'name',
				width: 80
			}, {
				text: '参数代码',
				dataIndex: 'code',
				width: 80
			}, {
				text: '参数数据类型',
				dataIndex: 'datatype',
				width: 120
			}, {
				text: '序列号',
				dataIndex: 'seq',
				width: 80
			}, {
				text: '基础数据代码',
				dataIndex: 'basic_code',
				width: 120
			},{
				text: '默认值',
				dataIndex: 'default_value',
				width: 120
			}],
//			dockedItems: [{
//				xtype: 'pagingtoolbar',
//				store: me.store,
//				dock: 'bottom',
//				displayInfo: true
//			}],
			listeners: {
				selectionchange: function() {
					me.down('#' + erp.Const.FUNC_ITEMID_BTN_EDT).setDisabled(false);
					me.down('#' + erp.Const.FUNC_ITEMID_BTN_DEL).setDisabled(false);
				}
			}
		});
		me.callParent(arguments);
	
	},
	InitParentId:function(list_id){
		var me = this;
		me.store.getProxy().setExtraParam("list_id", list_id);
		}
})